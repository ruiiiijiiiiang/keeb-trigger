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
  pressTime: Date;
  totalDuration: number;
  totalDelay: number;
  correctPressCount: number;
  incorrectPressCount: number;
};

type KeyPressMap = Record<string, KeyPress>;

type KeyCapProps = {
  width: number;
  topText: string;
  bottomText: string;
  color: "primary" | "secondary" | "tertiary";
  pressed: boolean;
};

type CharacterStatus = "correct" | "incorrect" | "skipped" | "default";

export type {
  KeyType,
  Key,
  KeyboardLayout,
  KeyPress,
  KeyPressMap,
  KeyCapProps,
  CharacterStatus,
};
