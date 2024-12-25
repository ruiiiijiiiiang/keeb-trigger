type KeyType = "letter" | "digit" | "mod";

type Key = {
  name: string;
  width: number;
  legend?: string;
  fingers: string[];
  row: number;
  keyType: KeyType;
};

type KeyboardLayout = {
  rows: Key[][];
};

type KeyPress = {
  count: number;
  pressed: boolean;
  pressTime: number;
  totalDuration: number;
  totalDelay: number;
  correctCount: number;
  falsePositiveCount: number;
  falseNegativeCount: number;
};

type KeyPressMap = Record<string, KeyPress>;

type CharacterStatus = "correct" | "incorrect" | "skipped" | "default";

type StatsMode = "count" | "duration" | "delay";

type ColorPalette =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error";

export type {
  CharacterStatus,
  ColorPalette,
  Key,
  KeyboardLayout,
  KeyPress,
  KeyPressMap,
  KeyType,
  StatsMode,
};
