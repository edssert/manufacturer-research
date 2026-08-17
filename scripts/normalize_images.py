#!/usr/bin/env python3
"""제품 이미지 여백을 분석하고 선택적으로 정규화한다.

런타임 이미지 루트(`public/assets/img`)의 PNG, JPEG, WebP를 같은 규칙으로
탐색한다. 기본 모드는 파일을 바꾸지 않는 ``dry``이며, 원본과 예상 출력의
크기·해상도·알파 채널·SHA-256을 JSON Lines로 출력한다. ``apply``는 같은
인코딩 형식으로 원본을 원자적으로 교체하므로 반드시 manifest를 검토한 뒤
명시적으로 실행한다.

사용법::

    python scripts/normalize_images.py dry --manifest image-normalize-plan.json
    python scripts/normalize_images.py apply \
        --approved-manifest image-normalize-plan.json \
        --manifest image-normalize-applied.json

매입형 제품, 불투명 배경, 로고·워터마크가 포함된 사진은 알파 bounding box
만으로 제품 경계를 판별할 수 없다. 그런 파일은 ``EXCLUDE``에 등록하고
``scripts/montage_check.py`` 결과를 통해 수동 검수한다.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
from pathlib import Path
from typing import Any

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "public" / "assets" / "img"
SUPPORTED_SUFFIXES = frozenset({".png", ".jpg", ".jpeg", ".webp"})
MARGIN_PCT = 0.08

# Alpha bbox가 제품 외 프레임까지 포함하는 것으로 확인된 파일이다.
EXCLUDE = frozenset({
    "spk-la-sb6r.png",
    "spk-la-sb10r.png",
})


def iter_image_files(root: Path = SRC_DIR) -> list[Path]:
    """지원 이미지 파일을 대소문자와 무관하게 안정된 순서로 반환한다."""
    return sorted(
        (path for path in root.rglob("*") if path.is_file() and path.suffix.lower() in SUPPORTED_SUFFIXES),
        key=lambda path: path.relative_to(root).as_posix().casefold(),
    )


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def has_alpha(image: Image.Image) -> bool:
    return "A" in image.getbands() or "transparency" in image.info


def normalized_canvas(image: Image.Image, margin_pct: float = MARGIN_PCT) -> tuple[Image.Image | None, tuple[int, int, int, int] | None]:
    """EXIF 방향을 반영한 RGBA 이미지에서 내용 bbox와 새 canvas를 만든다."""
    rgba = ImageOps.exif_transpose(image).convert("RGBA")
    bbox = rgba.getchannel("A").getbbox()
    if bbox is None:
        return None, None

    left, top, right, bottom = bbox
    content_width = right - left
    content_height = bottom - top
    margin_width = int(content_width * margin_pct)
    margin_height = int(content_height * margin_pct)
    canvas = Image.new(
        "RGBA",
        (content_width + margin_width * 2, content_height + margin_height * 2),
        (0, 0, 0, 0),
    )
    cropped = rgba.crop(bbox)
    canvas.paste(cropped, (margin_width, margin_height), cropped)
    return canvas, bbox


def encode_for_path(image: Image.Image, path: Path) -> bytes:
    """확장자에 맞는 형식으로 인코딩하되 다른 형식으로 변환하지 않는다."""
    suffix = path.suffix.lower()
    output = io.BytesIO()
    if suffix == ".png":
        image.save(output, "PNG", optimize=True)
    elif suffix in {".jpg", ".jpeg"}:
        background = Image.new("RGB", image.size, (255, 255, 255))
        if "A" in image.getbands():
            background.paste(image, mask=image.getchannel("A"))
        else:
            background.paste(image.convert("RGB"))
        background.save(output, "JPEG", quality=92, optimize=True)
    elif suffix == ".webp":
        image.save(output, "WEBP", quality=92, method=6)
    else:
        raise ValueError(f"지원하지 않는 이미지 형식: {path.suffix}")
    return output.getvalue()


def inspect_image(path: Path, margin_pct: float = MARGIN_PCT) -> tuple[dict[str, Any], bytes | None]:
    """원본과 예상 출력 manifest 항목 및 적용할 바이트를 만든다."""
    source = path.read_bytes()
    relative = path.relative_to(SRC_DIR).as_posix()
    with Image.open(io.BytesIO(source)) as image:
        oriented = ImageOps.exif_transpose(image)
        original_size = oriented.size
        original_alpha = has_alpha(image)
        alpha_bbox = oriented.convert("RGBA").getchannel("A").getbbox()
        canvas, bbox = normalized_canvas(image, margin_pct)

    record: dict[str, Any] = {
        "file": relative,
        "format": path.suffix.lower().lstrip("."),
        "status": "ready",
        "original": {
            "bytes": len(source),
            "dimensions": list(original_size),
            "hasAlpha": original_alpha,
            "sha256": sha256(source),
        },
    }
    if canvas is None or bbox is None:
        record["status"] = "fully-transparent"
        record["output"] = None
        return record, None

    record["bbox"] = list(bbox)
    if not original_alpha:
        record["status"] = "manual-review-no-alpha"
        record["output"] = None
        return record, None
    if alpha_bbox == (0, 0, *original_size):
        record["status"] = "manual-review-full-frame"
        record["output"] = None
        return record, None

    encoded = encode_for_path(canvas, path)
    record["output"] = {
        "bytes": len(encoded),
        "dimensions": list(canvas.size),
        "hasAlpha": path.suffix.lower() not in {".jpg", ".jpeg"},
        "sha256": sha256(encoded),
    }
    return record, encoded


def replace_bytes(path: Path, data: bytes) -> None:
    """같은 디렉터리의 임시 파일을 사용해 부분 기록된 원본을 남기지 않는다."""
    temporary = path.with_name(f".{path.name}.normalize.tmp")
    try:
        temporary.write_bytes(data)
        os.replace(temporary, path)
    finally:
        if temporary.exists():
            temporary.unlink()


def remove_region(path: str | Path, box: tuple[int, int, int, int], save: bool = True) -> Image.Image:
    """제품과 겹치지 않는 수동 지정 영역을 투명하게 만든다."""
    image_path = Path(path)
    with Image.open(image_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGBA")
    transparent = Image.new("RGBA", (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
    image.paste(transparent, box[:2])
    if save:
        replace_bytes(image_path, encode_for_path(image, image_path))
    return image


def write_manifest(path: Path, mode: str, records: list[dict[str, Any]]) -> None:
    payload = {
        "schemaVersion": 1,
        "mode": mode,
        "sourceRoot": SRC_DIR.relative_to(PROJECT_ROOT).as_posix(),
        "marginPercent": MARGIN_PCT,
        "supportedExtensions": sorted(SUPPORTED_SUFFIXES),
        "records": records,
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def validate_approved_manifest(path: Path, records: list[dict[str, Any]]) -> None:
    """dry-run 승인본과 현재 계산 결과가 완전히 같을 때만 apply를 허용한다."""
    approved = json.loads(path.read_text(encoding="utf-8"))
    expected_header = {
        "schemaVersion": 1,
        "mode": "dry",
        "sourceRoot": SRC_DIR.relative_to(PROJECT_ROOT).as_posix(),
        "marginPercent": MARGIN_PCT,
        "supportedExtensions": sorted(SUPPORTED_SUFFIXES),
    }
    for key, expected in expected_header.items():
        if approved.get(key) != expected:
            raise ValueError(f"승인 manifest의 {key} 값이 현재 정책과 다릅니다.")
    if approved.get("records") != records:
        raise ValueError("승인 manifest 이후 이미지 또는 예상 출력이 바뀌었습니다. dry-run부터 다시 실행하세요.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", nargs="?", choices=("dry", "apply"), default="dry")
    parser.add_argument("--manifest", type=Path, help="전체 결과를 기록할 JSON 경로")
    parser.add_argument("--approved-manifest", type=Path, help="apply 전에 검토한 dry-run manifest")
    args = parser.parse_args()
    if args.mode == "apply" and args.approved_manifest is None:
        parser.error("apply에는 검토한 --approved-manifest가 필요합니다.")
    if args.mode == "dry" and args.approved_manifest is not None:
        parser.error("--approved-manifest는 apply에서만 사용합니다.")
    if (
        args.mode == "apply"
        and args.manifest is not None
        and args.manifest.resolve() == args.approved_manifest.resolve()
    ):
        parser.error("적용 결과 manifest는 승인한 dry-run manifest와 다른 경로여야 합니다.")
    return args


def main() -> int:
    args = parse_args()
    records: list[dict[str, Any]] = []
    prepared: list[tuple[Path, bytes | None]] = []
    applied = 0

    for path in iter_image_files():
        if path.name in EXCLUDE:
            record, _ = inspect_image(path)
            record["status"] = "excluded"
            records.append(record)
            prepared.append((path, None))
            print(json.dumps(record, ensure_ascii=False))
            continue

        record, encoded = inspect_image(path)
        records.append(record)
        prepared.append((path, encoded))
        print(json.dumps(record, ensure_ascii=False))

    # 전체 파일을 먼저 분석하고 승인본과 비교한다. 중간 파일에서 검증이
    # 실패해 일부 이미지만 바뀌는 상태를 만들지 않는다.
    if args.mode == "apply":
        validate_approved_manifest(args.approved_manifest, records)
        for path, encoded in prepared:
            if encoded is None:
                continue
            replace_bytes(path, encoded)
            applied += 1

    if args.manifest:
        write_manifest(args.manifest, args.mode, records)

    summary = {
        "mode": args.mode,
        "discovered": len(records),
        "ready": sum(record["status"] == "ready" for record in records),
        "excluded": sum(record["status"] == "excluded" for record in records),
        "manualReview": sum(record["status"].startswith("manual-review") for record in records),
        "applied": applied,
        "inputBytes": sum(record["original"]["bytes"] for record in records),
        "projectedOutputBytes": sum(
            record["output"]["bytes"] if record["status"] == "ready" else record["original"]["bytes"]
            for record in records
        ),
    }
    summary["projectedDeltaBytes"] = summary["projectedOutputBytes"] - summary["inputBytes"]
    print(json.dumps({"summary": summary}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
