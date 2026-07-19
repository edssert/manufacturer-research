// Meyer Sound 배럴 — 시리즈별 데이터 파일을 결합.
import { MY_PANTHER_SERIES } from "./my/panther-series.data.js";
import { MY_LEOPARD_SERIES } from "./my/leopard-series.data.js";
import { MY_TIGRA_SERIES } from "./my/tigra-series.data.js";
import { MY_LINA_SERIES } from "./my/lina-series.data.js";

export const MY_SPEAKERS = [
  ...MY_PANTHER_SERIES,
  ...MY_LEOPARD_SERIES,
  ...MY_TIGRA_SERIES,
  ...MY_LINA_SERIES,
];
