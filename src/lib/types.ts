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

type KeyCapBase = {
  mode: "single" | "grouped";
  width: number;
  topText: string;
  bottomText: string;
  color: "primary" | "secondary" | "tertiary";
  pressed: boolean;
};

type SingleKeyCap = KeyCapBase & {
  mode: "single";
  name: string;
}

type GroupedKeyCap = KeyCapBase & {
  mode: "grouped";
  group: string;
  groupType: "finger" | "row";
}

type KeyCap<T extends KeyCapBase> =
  T["mode"] extends "single"
    ? SingleKeyCap
    : T["mode"] extends "grouped"
      ? GroupedKeyCap
      : never;

type CharacterStatus = "correct" | "incorrect" | "skipped" | "default";

type StatsMode = "count" | "duration" | "delay";

export type {
  KeyType,
  Key,
  KeyboardLayout,
  KeyPress,
  KeyPressMap,
  KeyCap,
  CharacterStatus,
  StatsMode,
};
