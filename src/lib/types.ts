type KeyType = "letter" | "digit" | "mod";

type Key = {
  name: string;
  width: number;
  legend?: string;
  fingers: string[];
  keyType: KeyType;
};

type KeyboardLayout = {
  rows: Key[][];
};

type KeyPress = {
  count: number;
  totalDuration: number;
  pressed: boolean;
  pressTime?: number;
  cumulative?: number;
};

type KeyPressMap = Record<string, KeyPress>;

type KeyCapProps = {
  width?: number;
  topText?: string;
  bottomText?: string;
  color?: "primary" | "secondary" | "tertiary";
  pressed?: boolean;
};

export type {
  KeyType,
  Key,
  KeyboardLayout,
  KeyPress,
  KeyPressMap,
  KeyCapProps,
};
