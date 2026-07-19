// Barrel file: combines per-brand accessory datasets into a single ACCESSORIES array.
// Add a new brand by creating data/<mk>.data.js and importing/spreading it below.
import { LA_ACCESSORIES } from "./data/la.data.js";
import { DB_ACCESSORIES } from "./data/db.data.js";
import { MY_ACCESSORIES } from "./data/my.data.js";

export const ACCESSORIES = [
  ...LA_ACCESSORIES,
  ...DB_ACCESSORIES,
  ...MY_ACCESSORIES,
];
