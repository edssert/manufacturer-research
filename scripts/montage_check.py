#!/usr/bin/env python3
"""런타임 이미지 전체를 육안 검수용 PNG montage로 만든다.

``public/assets/img`` 아래 PNG, JPEG, WebP를 재귀 탐색한다. 흰 배경 위의
제품 크기, 불투명 배경, 워터마크, 여백 편차를 한 화면에서 비교하는 용도다.

사용법::

    python scripts/montage_check.py
    python scripts/montage_check.py path/to/check.png --columns 8 --thumb 180
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "public" / "assets" / "img"
SUPPORTED_SUFFIXES = frozenset({".png", ".jpg", ".jpeg", ".webp"})


def iter_image_files(root: Path = SRC_DIR) -> list[Path]:
    return sorted(
        (path for path in root.rglob("*") if path.is_file() and path.suffix.lower() in SUPPORTED_SUFFIXES),
        key=lambda path: path.relative_to(root).as_posix().casefold(),
    )


def build_montage(out_path: Path, thumb: int = 150, columns: int = 6) -> int:
    files = iter_image_files()
    if not files:
        raise RuntimeError(f"지원 이미지가 없습니다: {SRC_DIR}")

    label_height = 32
    rows = (len(files) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * thumb, rows * (thumb + label_height)), (40, 40, 40))
    draw = ImageDraw.Draw(sheet)

    for index, path in enumerate(files):
        with Image.open(path) as source:
            image = ImageOps.exif_transpose(source).convert("RGBA")
        background = Image.new("RGBA", image.size, (255, 255, 255, 255))
        background.alpha_composite(image)
        preview = background.convert("RGB")
        preview.thumbnail((thumb - 6, thumb - 6))

        x = (index % columns) * thumb
        y = (index // columns) * (thumb + label_height)
        offset_x = x + (thumb - preview.width) // 2
        offset_y = y + (thumb - preview.height) // 2
        sheet.paste(preview, (offset_x, offset_y))

        relative = path.relative_to(SRC_DIR).with_suffix("").as_posix()
        parts = relative.split("/")
        label = "/".join(parts[-2:]) if len(parts) >= 2 else relative
        draw.text((x + 2, y + thumb + 2), label[:24], fill=(255, 255, 0))

    out_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out_path, "PNG", optimize=True)
    print(f"saved {out_path} ({len(files)} images: PNG/JPEG/WebP)")
    return len(files)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", nargs="?", type=Path, default=Path("montage_check_output.png"))
    parser.add_argument("--thumb", type=int, default=150)
    parser.add_argument("--columns", type=int, default=6)
    args = parser.parse_args()
    if args.thumb < 32:
        parser.error("--thumb는 32 이상이어야 합니다.")
    if args.columns < 1:
        parser.error("--columns는 1 이상이어야 합니다.")
    return args


def main() -> int:
    args = parse_args()
    build_montage(args.output, thumb=args.thumb, columns=args.columns)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
