/** @module domains/accessories/detail */
import { registerDetailProvider } from "../../relationships/detail-registry.js";
import {
  findAmplifiersUsingAccessory,
  findRelatedAccessories,
  findSpeakersUsingAccessory,
  registerAccessories,
} from "../../relationships/cross-ref.js";
import { ACCESSORIES } from "./accessories.data.js";
import { modalBodyHTML } from "./accessories.view.js";

let initialized = false;

/** Accessory 관계 인덱스와 상세 provider를 함께 등록한다. */
export function initAccessoryDetailProvider() {
  if (initialized) return;
  registerAccessories(ACCESSORIES);
  registerDetailProvider({
    kind: "accessory",
    attribute: "data-accessory-id",
    records: ACCESSORIES,
    label: accessory => accessory.name,
    render: accessory =>
      modalBodyHTML(
        accessory,
        findAmplifiersUsingAccessory(accessory.id),
        findSpeakersUsingAccessory(accessory.id),
        findRelatedAccessories(accessory.id),
      ),
  });
  initialized = true;
}
