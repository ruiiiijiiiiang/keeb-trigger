import type { KeyPressMap } from "./types";

const LAYOUT_60 = {
  rows: [
    [
      {
        name: "Backquote",
        width: 1,
        legends: [{ display: "`" }],
        finger: "L-5",
        row: 1,
      },
      {
        name: "Digit1",
        width: 1,
        legends: [{ display: "1" }],
        finger: "L-5",
        row: 1,
      },
      {
        name: "Digit2",
        width: 1,
        legends: [{ display: "2" }],
        finger: "L-4",
        row: 1,
      },
      {
        name: "Digit3",
        width: 1,
        legends: [{ display: "3" }],
        finger: "L-3",
        row: 1,
      },
      {
        name: "Digit4",
        width: 1,
        legends: [{ display: "4" }],
        finger: "L-2",
        row: 1,
      },
      {
        name: "Digit5",
        width: 1,
        legends: [{ display: "5" }],
        finger: "L-2",
        row: 1,
      },
      {
        name: "Digit6",
        width: 1,
        legends: [{ display: "6" }],
        finger: "R-2",
        row: 1,
      },
      {
        name: "Digit7",
        width: 1,
        legends: [{ display: "7" }],
        finger: "R-2",
        row: 1,
      },
      {
        name: "Digit8",
        width: 1,
        legends: [{ display: "8" }],
        finger: "R-3",
        row: 1,
      },
      {
        name: "Digit9",
        width: 1,
        legends: [{ display: "9" }],
        finger: "R-4",
        row: 1,
      },
      {
        name: "Digit0",
        width: 1,
        legends: [{ display: "0" }],
        finger: "R-5",
        row: 1,
      },
      {
        name: "Minus",
        width: 1,
        legends: [{ display: "-" }],
        finger: "R-5",
        row: 1,
      },
      {
        name: "Equal",
        width: 1,
        legends: [{ display: "=" }],
        finger: "R-5",
        row: 1,
      },
      {
        name: "Backspace",
        width: 2,
        legends: [{ display: "Backspace" }],
        finger: "R-5",
        row: 1,
      },
    ],
    [
      {
        name: "Tab",
        width: 1.5,
        legends: [{ display: "Tab" }],
        finger: "L-5",
        row: 2,
      },
      {
        name: "KeyQ",
        width: 1,
        legends: [{ display: "Q" }],
        finger: "L-5",
        row: 2,
      },
      {
        name: "KeyW",
        width: 1,
        legends: [{ display: "W" }],
        finger: "L-4",
        row: 2,
      },
      {
        name: "KeyE",
        width: 1,
        legends: [{ display: "E" }],
        finger: "L-3",
        row: 2,
      },
      {
        name: "KeyR",
        width: 1,
        legends: [{ display: "R" }],
        finger: "L-2",
        row: 2,
      },
      {
        name: "KeyT",
        width: 1,
        legends: [{ display: "T" }],
        finger: "L-2",
        row: 2,
      },
      {
        name: "KeyY",
        width: 1,
        legends: [{ display: "Y" }],
        finger: "R-2",
        row: 2,
      },
      {
        name: "KeyU",
        width: 1,
        legends: [{ display: "U" }],
        finger: "R-2",
        row: 2,
      },
      {
        name: "KeyI",
        width: 1,
        legends: [{ display: "I" }],
        finger: "R-3",
        row: 2,
      },
      {
        name: "KeyO",
        width: 1,
        legends: [{ display: "O" }],
        finger: "R-4",
        row: 2,
      },
      {
        name: "KeyP",
        width: 1,
        legends: [{ display: "P" }],
        finger: "R-5",
        row: 2,
      },
      {
        name: "BracketLeft",
        width: 1,
        legends: [{ display: "[" }],
        finger: "R-5",
        row: 2,
      },
      {
        name: "BracketRight",
        width: 1,
        legends: [{ display: "]" }],
        finger: "R-5",
        row: 2,
      },
      {
        name: "Backslash",
        width: 1.5,
        legends: [{ display: "\\" }],
        finger: "R-5",
        row: 2,
      },
    ],
    [
      {
        name: "CapsLock",
        width: 1.75,
        legends: [{ display: "Caps" }],
        finger: "L-5",
        row: 3,
      },
      {
        name: "KeyA",
        width: 1,
        legends: [{ display: "A" }],
        finger: "L-5",
        row: 3,
      },
      {
        name: "KeyS",
        width: 1,
        legends: [{ display: "S" }],
        finger: "L-4",
        row: 3,
      },
      {
        name: "KeyD",
        width: 1,
        legends: [{ display: "D" }],
        finger: "L-3",
        row: 3,
      },
      {
        name: "KeyF",
        width: 1,
        legends: [{ display: "F" }],
        finger: "L-2",
        row: 3,
      },
      {
        name: "KeyG",
        width: 1,
        legends: [{ display: "G" }],
        finger: "L-2",
        row: 3,
      },
      {
        name: "KeyH",
        width: 1,
        legends: [{ display: "H" }],
        finger: "R-2",
        row: 3,
      },
      {
        name: "KeyJ",
        width: 1,
        legends: [{ display: "J" }],
        finger: "R-2",
        row: 3,
      },
      {
        name: "KeyK",
        width: 1,
        legends: [{ display: "K" }],
        finger: "R-3",
        row: 3,
      },
      {
        name: "KeyL",
        width: 1,
        legends: [{ display: "L" }],
        finger: "R-4",
        row: 3,
      },
      {
        name: "Semicolon",
        width: 1,
        legends: [{ display: ";" }],
        finger: "R-5",
        row: 3,
      },
      {
        name: "Quote",
        width: 1,
        legends: [{ display: "'" }],
        finger: "R-5",
        row: 3,
      },
      {
        name: "Enter",
        width: 2.25,
        legends: [{ display: "Enter" }],
        finger: "R-5",
        row: 3,
      },
    ],
    [
      {
        name: "ShiftLeft",
        width: 2.25,
        legends: [{ display: "Shift" }],
        finger: "L-5",
        row: 4,
      },
      {
        name: "KeyZ",
        width: 1,
        legends: [{ display: "Z" }],
        finger: "L-5",
        row: 4,
      },
      {
        name: "KeyX",
        width: 1,
        legends: [{ display: "X" }],
        finger: "L-4",
        row: 4,
      },
      {
        name: "KeyC",
        width: 1,
        legends: [{ display: "C" }],
        finger: "L-3",
        row: 4,
      },
      {
        name: "KeyV",
        width: 1,
        legends: [{ display: "V" }],
        finger: "L-2",
        row: 4,
      },
      {
        name: "KeyB",
        width: 1,
        legends: [{ display: "B" }],
        finger: "L-2",
        row: 4,
      },
      {
        name: "KeyN",
        width: 1,
        legends: [{ display: "N" }],
        finger: "R-2",
        row: 4,
      },
      {
        name: "KeyM",
        width: 1,
        legends: [{ display: "M" }],
        finger: "R-2",
        row: 4,
      },
      {
        name: "Comma",
        width: 1,
        legends: [{ display: "," }],
        finger: "R-3",
        row: 4,
      },
      {
        name: "Period",
        width: 1,
        legends: [{ display: "." }],
        finger: "R-4",
        row: 4,
      },
      {
        name: "Slash",
        width: 1,
        legends: [{ display: "/" }],
        finger: "R-5",
        row: 4,
      },
      {
        name: "ShiftRight",
        width: 2.75,
        legends: [{ display: "Shift" }],
        finger: "R-5",
        row: 4,
      },
    ],
    [
      {
        name: "ControlLeft",
        width: 1.5,
        legends: [{ display: "Ctrl" }],
        finger: "L-5",
        row: 5,
      },
      {
        name: "MetaLeft",
        width: 1.5,
        legends: [{ display: "Meta" }],
        finger: "L-1",
        row: 5,
      },
      {
        name: "AltLeft",
        width: 1.5,
        legends: [{ display: "Alt" }],
        finger: "L-1",
        row: 5,
      },
      {
        name: "Space",
        width: 6,
        legends: [],
        finger: "R-1",
        row: 5,
      },
      {
        name: "AltRight",
        width: 1.5,
        legends: [{ display: "Alt" }],
        finger: "R-1",
        row: 5,
      },
      {
        name: "MetaRight",
        width: 1.5,
        legends: [{ display: "Meta" }],
        finger: "R-1",
        row: 5,
      },
      {
        name: "ControlRight",
        width: 1.5,
        legends: [{ display: "Ctrl" }],
        finger: "R-5",
        row: 5,
      },
    ],
  ],
};

const Keys = LAYOUT_60.rows.flat();

const getDurationByFinger = (keyPresses: KeyPressMap, finger: string) => {
  let count = 0,
    cumulative = 0;
  const keysByFinger = Keys.filter((key) => key.finger === finger);
  for (const keyByFinger of keysByFinger) {
    const pressedKey = keyPresses[keyByFinger.name];
    if (!pressedKey) {
      continue;
    }
    cumulative += pressedKey.cumulative;
    count += 1;
  }
  return cumulative / count || 0;
};

const getDurationByRow = (keyPresses: KeyPressMap, row: number) => {
  let count = 0,
    cumulative = 0;
  const keysByRow = Keys.filter((key) => key.row === row);
  for (const keyByRow of keysByRow) {
    const pressedKey = keyPresses[keyByRow.name];
    if (!pressedKey) {
      continue;
    }
    cumulative += pressedKey.cumulative;
    count += 1;
  }
  return cumulative / count || 0;
};

export { LAYOUT_60, Keys, getDurationByFinger, getDurationByRow };
