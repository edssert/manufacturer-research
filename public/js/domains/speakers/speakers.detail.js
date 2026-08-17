/** @module domains/speakers/detail */
import { registerDetailProvider } from "../../relationships/detail-registry.js";
import { findAccessoriesForSpeaker, registerSpeakers, resolveAmpIdForModel } from "../../relationships/cross-ref.js";
import { SPEAKERS } from "./speakers.data.js";
import { createSpeakerCatalog } from "./speakers.schema.js";
import { modalBodyHTML } from "./speakers.view.js";

export const SPEAKER_CATALOG = createSpeakerCatalog(SPEAKERS);

let initialized = false;

/** Speaker 관계 인덱스와 상세 provider를 함께 등록한다. */
export function initSpeakerDetailProvider() {
  if (initialized) return;
  registerSpeakers(SPEAKER_CATALOG);
  registerDetailProvider({
    kind: "speaker",
    attribute: "data-speaker-id",
    records: SPEAKER_CATALOG,
    label: speaker => speaker.name,
    render: speaker => modalBodyHTML(speaker, resolveAmpIdForModel, findAccessoriesForSpeaker(speaker.id)),
  });
  initialized = true;
}
