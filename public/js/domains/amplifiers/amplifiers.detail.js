/** @module domains/amplifiers/detail */
import { registerDetailProvider } from "../../relationships/detail-registry.js";
import {
  accessoriesByIds,
  findAmpConfigsBySpeaker,
  findSpeakerById,
  findSpeakersMatchingAmp,
  registerAmplifiers,
} from "../../relationships/cross-ref.js";
import { AMPLIFIERS } from "./amplifiers.data.js";
import { modalBodyHTML } from "./amplifiers.view.js";

let initialized = false;

/** Amplifier 관계 인덱스와 상세 provider를 함께 등록한다. */
export function initAmplifierDetailProvider() {
  if (initialized) return;
  registerAmplifiers(AMPLIFIERS);
  registerDetailProvider({
    kind: "amplifier",
    attribute: "data-amp-id",
    records: AMPLIFIERS,
    label: amplifier => amplifier.model,
    render: amplifier =>
      modalBodyHTML(
        amplifier,
        speakerId => findSpeakerById(speakerId)?.name || speakerId,
        findSpeakersMatchingAmp(amplifier.id),
        findAmpConfigsBySpeaker(amplifier.id),
        accessoriesByIds(amplifier.rack && amplifier.rack.relatedAccessoryIds),
      ),
  });
  initialized = true;
}
