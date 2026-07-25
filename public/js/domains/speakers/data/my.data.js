// Meyer Sound 배럴 — 시리즈별 데이터 파일을 결합.
import { MY_PANTHER_SERIES } from "./my/panther-series.data.js";
import { MY_LEOPARD_SERIES } from "./my/leopard-series.data.js";
import { MY_TIGRA_SERIES } from "./my/tigra-series.data.js";
import { MY_LINA_SERIES } from "./my/lina-series.data.js";
import { MY_MM_SERIES } from "./my/mm-series.data.js";
import { MY_X400C } from "./my/x-400c.data.js";
import { MY_LFC_SERIES } from "./my/lfc-series.data.js";
import { MY_USW_SERIES } from "./my/usw-series.data.js";
import { MY_ULTRA_X_SERIES } from "./my/ultra-x-series.data.js";
import { MY_UP_SERIES } from "./my/up-series.data.js";
import { MY_ASHBY_SERIES } from "./my/ashby-series.data.js";
import { MY_MJF_SERIES } from "./my/mjf-series.data.js";

export const MY_SPEAKERS = [
  ...MY_PANTHER_SERIES,
  ...MY_LEOPARD_SERIES,
  ...MY_TIGRA_SERIES,
  ...MY_LINA_SERIES,
  ...MY_ULTRA_X_SERIES,
  ...MY_UP_SERIES,
  ...MY_ASHBY_SERIES,
  ...MY_MJF_SERIES,
  ...MY_MM_SERIES,
  ...MY_X400C,
  ...MY_LFC_SERIES,
  ...MY_USW_SERIES,
];
