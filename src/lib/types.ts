type KeyType = "character" | "mod";

type LegendLocation =
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type KeyLegend = {
  display: string;
  location?: LegendLocation;
};

type Key = {
  name: string;
  width: number;
  legends?: KeyLegend[];
};

type KeyboardLayout = {
  rows: Key[][];
};

type KeyPress = {
  pressTime?: number;
  duration?: number;
  totalDuration: number;
  count: number;
};

type KeyPressMap = Record<string, KeyPress>;

export type { KeyType, Key, KeyboardLayout, KeyPress, KeyPressMap };
