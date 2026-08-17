/** @module domains/dsps/detail */
import { detailLabelOf, registerDetailProvider } from "../../relationships/detail-registry.js";
import { DSPS } from "./dsps.data.js";
import { modalBodyHTML } from "./dsps.view.js";

let initialized = false;

export function initDspDetailProvider() {
  if (initialized) return;
  registerDetailProvider({
    kind: "dsp",
    attribute: "data-dsp-id",
    records: DSPS,
    label: dsp => dsp.model,
    render: dsp => modalBodyHTML(dsp, softwareId => detailLabelOf(softwareId) || softwareId),
  });
  initialized = true;
}
