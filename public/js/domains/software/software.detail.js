/** @module domains/software/detail */
import { detailLabelOf, registerDetailProvider } from "../../relationships/detail-registry.js";
import { SOFTWARE } from "./software.data.js";
import { modalBodyHTML } from "./software.view.js";

let initialized = false;

export function initSoftwareDetailProvider() {
  if (initialized) return;
  registerDetailProvider({
    kind: "software",
    attribute: "data-software-id",
    records: SOFTWARE,
    label: software => software.name,
    render: software => modalBodyHTML(software, dspId => detailLabelOf(dspId) || dspId),
  });
  initialized = true;
}
