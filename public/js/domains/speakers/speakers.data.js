// Barrel file: combines per-brand speaker datasets into a single SPEAKERS array.
// Add a new brand by creating data/<mk>.data.js and importing/spreading it below.
import { LA_SPEAKERS } from "./data/la.data.js";
import { DB_SPEAKERS } from "./data/db.data.js";
import { MY_SPEAKERS } from "./data/my.data.js";
import { AD_SPEAKERS } from "./data/ad.data.js";
import { CO_SPEAKERS } from "./data/co.data.js";
import { NEXO_SPEAKERS } from "./data/nexo.data.js";
import { MARTIN_SPEAKERS } from "./data/martin.data.js";
import { JBL_SPEAKERS } from "./data/jbl.data.js";
import { PK_SPEAKERS } from "./data/pk.data.js";
import { EAW_SPEAKERS } from "./data/eaw.data.js";
import { CODA_SPEAKERS } from "./data/coda.data.js";
import { FUNKTION_SPEAKERS } from "./data/funktion.data.js";
import { EV_SPEAKERS } from "./data/ev.data.js";
import { RCF_SPEAKERS } from "./data/rcf.data.js";

export const SPEAKERS = [
  ...LA_SPEAKERS,
  ...DB_SPEAKERS,
  ...MY_SPEAKERS,
  ...AD_SPEAKERS,
  ...CO_SPEAKERS,
  ...NEXO_SPEAKERS,
  ...MARTIN_SPEAKERS,
  ...JBL_SPEAKERS,
  ...PK_SPEAKERS,
  ...EAW_SPEAKERS,
  ...CODA_SPEAKERS,
  ...FUNKTION_SPEAKERS,
  ...EV_SPEAKERS,
  ...RCF_SPEAKERS,
];
