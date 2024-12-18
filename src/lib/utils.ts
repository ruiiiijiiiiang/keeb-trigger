import type {
  Key,
  KeyboardLayout,
  KeyPress,
  KeyPressMap,
  StatsMode,
} from "./types.ts";

const Keyboard_Layout: KeyboardLayout = {
  rows: [
    [
      {
        name: "Backquote",
        width: 1,
        legend: "`",
        fingers: ["L-5"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit1",
        width: 1,
        legend: "1",
        fingers: ["L-5"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit2",
        width: 1,
        legend: "2",
        fingers: ["L-4"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit3",
        width: 1,
        legend: "3",
        fingers: ["L-3"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit4",
        width: 1,
        legend: "4",
        fingers: ["L-2"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit5",
        width: 1,
        legend: "5",
        fingers: ["L-2"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit6",
        width: 1,
        legend: "6",
        fingers: ["R-2"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit7",
        width: 1,
        legend: "7",
        fingers: ["R-2"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit8",
        width: 1,
        legend: "8",
        fingers: ["R-3"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit9",
        width: 1,
        legend: "9",
        fingers: ["R-4"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Digit0",
        width: 1,
        legend: "0",
        fingers: ["R-5"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Minus",
        width: 1,
        legend: "-",
        fingers: ["R-5"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Equal",
        width: 1,
        legend: "=",
        fingers: ["R-5"],
        row: 1,
        keyType: "digit",
      },
      {
        name: "Backspace",
        width: 2,
        legend: "Backspace",
        fingers: ["R-5"],
        row: 1,
        keyType: "mod",
      },
    ],
    [
      {
        name: "Tab",
        width: 1.5,
        legend: "Tab",
        fingers: ["L-5"],
        row: 2,
        keyType: "mod",
      },
      {
        name: "KeyQ",
        width: 1,
        legend: "Q",
        fingers: ["L-5"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyW",
        width: 1,
        legend: "W",
        fingers: ["L-4"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyE",
        width: 1,
        legend: "E",
        fingers: ["L-3"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyR",
        width: 1,
        legend: "R",
        fingers: ["L-2"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyT",
        width: 1,
        legend: "T",
        fingers: ["L-2"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyY",
        width: 1,
        legend: "Y",
        fingers: ["R-2"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyU",
        width: 1,
        legend: "U",
        fingers: ["R-2"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyI",
        width: 1,
        legend: "I",
        fingers: ["R-3"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyO",
        width: 1,
        legend: "O",
        fingers: ["R-4"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "KeyP",
        width: 1,
        legend: "P",
        fingers: ["R-5"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "BracketLeft",
        width: 1,
        legend: "[",
        fingers: ["R-5"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "BracketRight",
        width: 1,
        legend: "]",
        fingers: ["R-5"],
        row: 2,
        keyType: "letter",
      },
      {
        name: "Backslash",
        width: 1.5,
        legend: "\\",
        fingers: ["R-5"],
        row: 2,
        keyType: "letter",
      },
    ],
    [
      {
        name: "CapsLock",
        width: 1.75,
        legend: "Caps",
        fingers: ["L-5"],
        row: 3,
        keyType: "mod",
      },
      {
        name: "KeyA",
        width: 1,
        legend: "A",
        fingers: ["L-5"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyS",
        width: 1,
        legend: "S",
        fingers: ["L-4"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyD",
        width: 1,
        legend: "D",
        fingers: ["L-3"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyF",
        width: 1,
        legend: "F",
        fingers: ["L-2"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyG",
        width: 1,
        legend: "G",
        fingers: ["L-2"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyH",
        width: 1,
        legend: "H",
        fingers: ["R-2"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyJ",
        width: 1,
        legend: "J",
        fingers: ["R-2"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyK",
        width: 1,
        legend: "K",
        fingers: ["R-3"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "KeyL",
        width: 1,
        legend: "L",
        fingers: ["R-4"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "Semicolon",
        width: 1,
        legend: ";",
        fingers: ["R-5"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "Quote",
        width: 1,
        legend: "'",
        fingers: ["R-5"],
        row: 3,
        keyType: "letter",
      },
      {
        name: "Enter",
        width: 2.25,
        legend: "Enter",
        fingers: ["R-5"],
        row: 3,
        keyType: "mod",
      },
    ],
    [
      {
        name: "ShiftLeft",
        width: 2.25,
        legend: "Shift",
        fingers: ["L-5"],
        row: 4,
        keyType: "mod",
      },
      {
        name: "KeyZ",
        width: 1,
        legend: "Z",
        fingers: ["L-5"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "KeyX",
        width: 1,
        legend: "X",
        fingers: ["L-4"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "KeyC",
        width: 1,
        legend: "C",
        fingers: ["L-3"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "KeyV",
        width: 1,
        legend: "V",
        fingers: ["L-2"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "KeyB",
        width: 1,
        legend: "B",
        fingers: ["L-2", "R-2"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "KeyN",
        width: 1,
        legend: "N",
        fingers: ["R-2"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "KeyM",
        width: 1,
        legend: "M",
        fingers: ["R-2"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "Comma",
        width: 1,
        legend: ",",
        fingers: ["R-3"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "Period",
        width: 1,
        legend: ".",
        fingers: ["R-4"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "Slash",
        width: 1,
        legend: "/",
        fingers: ["R-5"],
        row: 4,
        keyType: "letter",
      },
      {
        name: "ShiftRight",
        width: 2.75,
        legend: "Shift",
        fingers: ["R-5"],
        row: 4,
        keyType: "mod",
      },
    ],
    [
      {
        name: "ControlLeft",
        width: 1.5,
        legend: "Ctrl",
        fingers: ["L-5"],
        row: 5,
        keyType: "mod",
      },
      {
        name: "MetaLeft",
        width: 1.5,
        legend: "Meta",
        fingers: ["L-1"],
        row: 5,
        keyType: "mod",
      },
      {
        name: "AltLeft",
        width: 1.5,
        legend: "Alt",
        fingers: ["L-1"],
        row: 5,
        keyType: "mod",
      },
      {
        name: "Space",
        width: 6,
        fingers: ["L-1", "R-1"],
        row: 5,
        keyType: "letter",
      },
      {
        name: "AltRight",
        width: 1.5,
        legend: "Alt",
        fingers: ["R-1"],
        row: 5,
        keyType: "mod",
      },
      {
        name: "MetaRight",
        width: 1.5,
        legend: "Meta",
        fingers: ["R-1"],
        row: 5,
        keyType: "mod",
      },
      {
        name: "ControlRight",
        width: 1.5,
        legend: "Ctrl",
        fingers: ["R-5"],
        row: 5,
        keyType: "mod",
      },
    ],
  ],
};

const Keys = Keyboard_Layout.rows.flat();

const getKeysByGroup = (
  groupType: "finger" | "row",
  group: string | number,
) => {
  let keysByGroup: Key[] = [];
  switch (groupType) {
    case "finger":
      keysByGroup = Keys.filter((key: Key) =>
        key.fingers.includes(group as string)
      );
      break;
    case "row":
      keysByGroup = Keys.filter((key: Key) => key.row === group);
      break;
  }
  return keysByGroup;
};

const formatWithUnit = (num: number): string => `${num.toFixed(0)} ms`;

const renderAverageStats = (
  keyPresses: KeyPressMap,
  statsMode: StatsMode,
  groupType: "finger" | "row",
  group: string | number,
): string => {
  const keysByGroup = getKeysByGroup(groupType, group);
  const totalCount = keysByGroup.reduce(
    (count: number, key: Key) => count + keyPresses[key.name].count,
    0,
  );
  if (!totalCount) {
    return "0";
  }
  switch (statsMode) {
    case "count":
      return totalCount.toString();
    case "duration": {
      const totalDuration = keysByGroup.reduce(
        (duration: number, key: Key) =>
          duration + keyPresses[key.name].totalDuration,
        0,
      );
      return formatWithUnit(totalDuration / totalCount);
    }
    case "delay": {
      const totalDelay = keysByGroup.reduce(
        (delay: number, key: Key) => delay + keyPresses[key.name].totalDelay,
        0,
      );
      return formatWithUnit(totalDelay / totalCount);
    }
  }
};

const renderStats = (keyPress: KeyPress, statsMode: StatsMode): string => {
  if (!keyPress.count) {
    return "0";
  }
  switch (statsMode) {
    case "count":
      return keyPress.count.toString();
    case "duration":
      return formatWithUnit(keyPress.totalDuration / keyPress.count);
    case "delay":
      return formatWithUnit(keyPress.totalDelay / keyPress.count);
  }
};

export { Keyboard_Layout, Keys, renderAverageStats, renderStats };
