import type { Key, KeyboardLayout } from "./types";

const LAYOUT_60: KeyboardLayout = {
  rows: [
    [
      {
        name: "tilde",
        width: 1,
        legends: [{ display: "`" }],
      },
      {
        name: "1",
        width: 1,
        legends: [{ display: "1" }],
      },
      {
        name: "2",
        width: 1,
        legends: [{ display: "2" }],
      },
      {
        name: "3",
        width: 1,
        legends: [{ display: "3" }],
      },
      {
        name: "4",
        width: 1,
        legends: [{ display: "4" }],
      },
      {
        name: "5",
        width: 1,
        legends: [{ display: "5" }],
      },
      {
        name: "6",
        width: 1,
        legends: [{ display: "6" }],
      },
      {
        name: "7",
        width: 1,
        legends: [{ display: "7" }],
      },
      {
        name: "8",
        width: 1,
        legends: [{ display: "8" }],
      },
      {
        name: "9",
        width: 1,
        legends: [{ display: "9" }],
      },
      {
        name: "0",
        width: 1,
        legends: [{ display: "0" }],
      },
      {
        name: "-",
        width: 1,
        legends: [{ display: "-" }],
      },
      {
        name: "=",
        width: 1,
        legends: [{ display: "=" }],
      },
      {
        name: "backspace",
        width: 2,
        legends: [{ display: "Backspace" }],
      },
    ],
    [
      {
        name: "tab",
        width: 1.5,
        legends: [{ display: "Tab" }],
      },
      {
        name: "q",
        width: 1,
        legends: [{ display: "Q" }],
      },
      {
        name: "w",
        width: 1,
        legends: [{ display: "W" }],
      },
      {
        name: "e",
        width: 1,
        legends: [{ display: "E" }],
      },
      {
        name: "r",
        width: 1,
        legends: [{ display: "R" }],
      },
      {
        name: "t",
        width: 1,
        legends: [{ display: "T" }],
      },
      {
        name: "y",
        width: 1,
        legends: [{ display: "Y" }],
      },
      {
        name: "u",
        width: 1,
        legends: [{ display: "U" }],
      },
      {
        name: "i",
        width: 1,
        legends: [{ display: "I" }],
      },
      {
        name: "o",
        width: 1,
        legends: [{ display: "O" }],
      },
      {
        name: "p",
        width: 1,
        legends: [{ display: "P" }],
      },
      {
        name: "[",
        width: 1,
        legends: [{ display: "[" }],
      },
      {
        name: "]",
        width: 1,
        legends: [{ display: "]" }],
      },
      {
        name: "\\",
        width: 1.5,
        legends: [{ display: "\\" }],
      },
    ],
    [
      {
        name: "cap-lock",
        width: 1.75,
        legends: [{ display: "Caps" }],
      },
      {
        name: "a",
        width: 1,
        legends: [{ display: "A" }],
      },
      {
        name: "s",
        width: 1,
        legends: [{ display: "S" }],
      },
      {
        name: "d",
        width: 1,
        legends: [{ display: "D" }],
      },
      {
        name: "f",
        width: 1,
        legends: [{ display: "F" }],
      },
      {
        name: "g",
        width: 1,
        legends: [{ display: "G" }],
      },
      {
        name: "h",
        width: 1,
        legends: [{ display: "H" }],
      },
      {
        name: "j",
        width: 1,
        legends: [{ display: "J" }],
      },
      {
        name: "k",
        width: 1,
        legends: [{ display: "K" }],
      },
      {
        name: "l",
        width: 1,
        legends: [{ display: "L" }],
      },
      {
        name: ";",
        width: 1,
        legends: [{ display: ";" }],
      },
      {
        name: "'",
        width: 1,
        legends: [{ display: "'" }],
      },
      {
        name: "enter",
        width: 2.25,
        legends: [{ display: "Enter" }],
      },
    ],
    [
      {
        name: "l-shift",
        width: 2.25,
        legends: [{ display: "Shift" }],
      },
      {
        name: "z",
        width: 1,
        legends: [{ display: "Z" }],
      },
      {
        name: "x",
        width: 1,
        legends: [{ display: "X" }],
      },
      {
        name: "c",
        width: 1,
        legends: [{ display: "C" }],
      },
      {
        name: "v",
        width: 1,
        legends: [{ display: "V" }],
      },
      {
        name: "b",
        width: 1,
        legends: [{ display: "B" }],
      },
      {
        name: "n",
        width: 1,
        legends: [{ display: "N" }],
      },
      {
        name: "m",
        width: 1,
        legends: [{ display: "M" }],
      },
      {
        name: ",",
        width: 1,
        legends: [{ display: "," }],
      },
      {
        name: ".",
        width: 1,
        legends: [{ display: "." }],
      },
      {
        name: "/",
        width: 1,
        legends: [{ display: "/" }],
      },
      {
        name: "r-shift",
        width: 2.75,
        legends: [{ display: "Shift" }],
      },
    ],
    [
      {
        name: "l-ctrl",
        width: 1.5,
        legends: [{ display: "Ctrl" }],
      },
      {
        name: "l-meta",
        width: 1.5,
        legends: [{ display: "Meta" }],
      },
      {
        name: "l-alt",
        width: 1.5,
        legends: [{ display: "Alt" }],
      },
      {
        name: "space",
        width: 6,
        legends: [],
      },
      {
        name: "r-alt",
        width: 1.5,
        legends: [{ display: "Alt" }],
      },
      {
        name: "r-meta",
        width: 1.5,
        legends: [{ display: "Meta" }],
      },
      {
        name: "r-ctrl",
        width: 1.5,
        legends: [{ display: "Ctrl" }],
      },
    ],
  ],
};

export { LAYOUT_60 };
