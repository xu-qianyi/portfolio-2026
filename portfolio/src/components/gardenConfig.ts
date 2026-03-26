// ─── Asset paths ─────────────────────────────────────────────────────────────
export const ASSETS = {
  wand:        "/footer/CatToy.gif",
  catA_arrive: "/footer/yawn_stand.gif",
  catA_walkR:  "/footer/walk_right.gif",
  catA_walkL:  "/footer/walk_left.gif",
  catA_walkU:  "/footer/walk_up.gif",
  catA_walkD:  "/footer/walk_down.gif",
  catA_walkRD: "/footer/walk_right_d.gif",
  catA_walkLD: "/footer/walk_left_d.gif",
  catA_walkRU: "/footer/walk_right_up.gif",
  catA_walkLU: "/footer/walk_left_up.gif",
  catA_sleep1: "/footer/catA_sleep1(r).gif",
  catB_0: "/footer/sleep3(r).gif",
  catB_1: "/footer/sleep4(l).gif",
  catB_2: "/footer/scratch(l).gif",
  catB_3: "/footer/sleep2(l).gif",
  bunny_idle:  "/footer/BunnySitting.gif",
  bunny_react: "/footer/BunnyJump.gif",
  chick:       "/footer/chick idle.gif",
  chicken_sit: "/footer/chicken_sitting.gif",
  catbed:      "/footer/CatBedBlue.png",
  catfood:     "/footer/catfood.png",
  plant_arnica:   "/footer/arnica arnika 3.png",
  plant_cosmo:    "/footer/Cosmo.png",
  plant_daisy:    "/footer/Daisy.png",
  plant_lavender: "/footer/Lavender.png",
  plant_lily:     "/footer/Lily.png",
  plant_pansy:    "/footer/Pansy.png",
  plant_tulip:    "/footer/Tulip.png",
  plant_valerian: "/footer/valerian kozek lekarski.png",
} as const;

export type AssetKey = keyof typeof ASSETS;

// ─── Layout constants ─────────────────────────────────────────────────────────
export const ROW_A = 160;
export const ROW_B = 90;
export const ROW_C = 8;
export const ROW_D = 230;
export const INTERACTIVE_BOTTOM_AREA = 44;

export const GARDEN_LEFT_PCT = 6;
export const GARDEN_RIGHT_PCT = 94;
const GARDEN_X_MIN = 2;
const GARDEN_X_MAX = 93;

export function gardenX(x: number): number {
  return GARDEN_LEFT_PCT + (x - GARDEN_X_MIN) * (GARDEN_RIGHT_PCT - GARDEN_LEFT_PCT) / (GARDEN_X_MAX - GARDEN_X_MIN);
}

// X positions per row (%), step ~14%, each row offset by ~7%
export const rowA_x = [2,  16, 30, 44, 58, 72, 86];
export const rowB_x = [9,  23, 37, 51, 65, 79, 93];
export const rowC_x = [5,  19, 33, 47, 61, 75, 89];
export const rowD_x = [2,  16, 30, 44, 58, 72, 86];

export const FLOWERS: { x: number; y: number; key: AssetKey }[] = [
  { x: rowD_x[0], y: ROW_D, key: "plant_daisy" },
  { x: rowD_x[1], y: ROW_D, key: "plant_valerian" },
  { x: rowD_x[2], y: ROW_D, key: "plant_tulip" },
  { x: rowD_x[3], y: ROW_D, key: "plant_lavender" },
  { x: rowD_x[4], y: ROW_D, key: "plant_cosmo" },
  { x: rowD_x[5], y: ROW_D, key: "plant_arnica" },
  { x: rowD_x[6], y: ROW_D, key: "plant_lily" },
  { x: rowA_x[0], y: ROW_A, key: "plant_arnica" },
  { x: rowA_x[1], y: ROW_A, key: "plant_tulip" },
  { x: rowA_x[2], y: ROW_A, key: "plant_lavender" },
  { x: rowA_x[3], y: ROW_A, key: "plant_cosmo" },
  { x: rowA_x[4], y: ROW_A, key: "plant_lily" },
  { x: rowA_x[5], y: ROW_A, key: "plant_pansy" },
  { x: rowA_x[6], y: ROW_A, key: "plant_valerian" },
  { x: rowB_x[0], y: ROW_B, key: "plant_daisy" },
  { x: rowB_x[1], y: ROW_B, key: "plant_pansy" },
  { x: rowB_x[2], y: ROW_B, key: "plant_arnica" },
  { x: rowB_x[3], y: ROW_B, key: "plant_valerian" },
  { x: rowB_x[4], y: ROW_B, key: "plant_tulip" },
  { x: rowB_x[5], y: ROW_B, key: "plant_lily" },
  { x: rowB_x[6], y: ROW_B, key: "plant_daisy" },
];

export const PROPS: { x: number; key: AssetKey; size: number }[] = [
  { x: rowC_x[0], key: "chick",       size: 24 },
  { x: rowC_x[1], key: "catbed",      size: 52 },
  { x: rowC_x[2], key: "chicken_sit", size: 32 },
  { x: rowC_x[3], key: "catfood",     size: 32 },
];

export const CATB_POS_X    = gardenX(rowC_x[4]);
export const BUNNY_POS_X   = gardenX(rowC_x[5]);
export const EXTRA_PLANT   = { x: rowC_x[6], key: "plant_cosmo" as AssetKey };

export const CAT_B_KEYS: AssetKey[] = ["catB_0", "catB_1", "catB_2", "catB_3"];

export const CATB_CSS_X    = CATB_POS_X;
export const CHICK_CSS_X   = gardenX(rowC_x[0]);
export const FOOD_CSS_X    = gardenX(rowC_x[3]);
export const CHICKEN_CSS_X = gardenX(rowC_x[2]);
export const BUNNY_CSS_X   = BUNNY_POS_X;

export const FLOWER_CSS_XS = FLOWERS.map(f => gardenX(f.x));

export const IDLE_PHRASES = ["meow?", "야옹~", "म्याऊ~", "miau~", "miaou~"] as const;

export const GARDEN_KEYFRAMES = `
  @keyframes chickShake {
    0%   { transform: rotate(0deg); }
    20%  { transform: rotate(-12deg); }
    40%  { transform: rotate(12deg); }
    60%  { transform: rotate(-8deg); }
    80%  { transform: rotate(6deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes bubbleFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes crabBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-3px) scale(1.05); }
  }
  @keyframes crabAppear {
    from { opacity: 0; transform: scale(0.2); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

