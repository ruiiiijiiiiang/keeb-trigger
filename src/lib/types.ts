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
  correctPressCount: number;
  incorrectPressCount: number;
};

type KeyPressMap = Record<string, KeyPress>;

type CharacterStatus = "correct" | "incorrect" | "skipped" | "default";

type StatsMode = "count" | "duration" | "delay";

export type {
  CharacterStatus,
  Key,
  KeyboardLayout,
  KeyPress,
  KeyPressMap,
  KeyType,
  StatsMode,
};
