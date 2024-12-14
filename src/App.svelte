<script lang="ts">
  import { setContext, tick } from "svelte";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { ArrowClockwise } from "phosphor-svelte";
  import { generate } from "random-words";
  import type { KeyPressMap, StatsMode, CharacterStatus } from "./lib/types";
  import { Keys } from "./lib/utils";
  import Keyboard from "./lib/Keyboard.svelte";
  import PerFingerStats from "./lib/PerFingerStats.svelte";
  import PerRowStats from "./lib/PerRowStats.svelte";
  import TypingArea from "./lib/TypingArea.svelte";

  const SAMPLE_WORD_LENGTH: number = 30;

  const initialKeyPress = () => {
    const keyPresses = {};
    Keys.forEach((key) => {
      keyPresses[key.name] = {
        count: 0,
        pressed: false,
        pressTime: 0,
        totalDuration: 0,
        totalDelay: 0,
        correctCount: 0,
        falsePositiveCount: 0,
        falseNegativeCount: 0,
      };
    });
    return keyPresses;
  };

  let keyPresses: KeyPressMap = $state<KeyPressMap>(initialKeyPress());
  setContext<() => KeyPressMap>("keyPresses", () => keyPresses);
  let inputText: string = $state<string>("");
  let firstPressTime: number = $state<number>(undefined);
  let lastPressTime: number = $state<number>(undefined);
  let timeElapsed: number = $state<number>(0);
  let typedWordsCounter: number = $state<number>(0);
  let pausedAt: number = $state<number>(undefined);
  let timeStampedAt: number = $state<number>(undefined);

  let sampleWords: string[] = $state<string[]>(
    generate(SAMPLE_WORD_LENGTH) as string[],
  );
  setContext<() => string[]>("sampleWords", () => sampleWords);
  const typedWords: string[] = $derived<string[]>(inputText.split(" "));
  setContext<() => string[]>("typedWords", () => typedWords);

  let statsMode: StatsMode = $state<StatsMode>("count");
  setContext<() => StatsMode>("statsMode", () => statsMode);

  $effect(() => {
    const interval = setInterval(() => {
      if (!firstPressTime || !lastPressTime) {
        return;
      }
      if (Date.now() - lastPressTime >= 3000) {
        pausedAt ??= Date.now();
        return;
      }
      if (pausedAt) {
        timeElapsed += pausedAt - timeStampedAt;
        pausedAt = undefined;
      } else {
        timeElapsed += Date.now() - (timeStampedAt || firstPressTime);
      }
      timeStampedAt = Date.now();
    }, 1000);
    return () => clearInterval(interval);
  });

  const keyDownHandler = (event: KeyboardEvent) => {
    firstPressTime ??= Date.now();

    const { code } = event;
    if (keyPresses[code].pressed) {
      return;
    }
    keyPresses[code] = {
      ...keyPresses[code],
      pressed: true,
      pressTime: Date.now(),
    };
  };

  const keyUpHandler = (event: KeyboardEvent) => {
    //TODO: handle escape
    const releaseTime = Date.now();

    const { code, key } = event;
    // TODO: handle space
    if (code === "Space") {
      event.preventDefault();
      typedWordsCounter += 1;
    }
    if (!keyPresses[code] || !keyPresses[code].pressTime) {
      return;
    }

    let {
      totalDuration,
      pressTime,
      count,
      totalDelay,
      correctCount,
      falsePositiveCount,
      falseNegativeCount,
    } = keyPresses[code];
    const nextLetter = sampleWords.join(" ").charAt(cursorPosition);
    if (nextLetter === key) {
      correctCount += 1;
    } else {
      const nextLetterCode = `Key${nextLetter.toUpperCase()}`;
      keyPresses[nextLetterCode] = {
        ...keyPresses[nextLetterCode],
        falsePositiveCount: falsePositiveCount + 1,
      };
      keyPresses[code] = {
        ...keyPresses[code],
        falseNegativeCount: falseNegativeCount + 1,
      };
    }
    if (lastPressTime) {
      totalDelay += releaseTime - lastPressTime;
    }
    totalDuration += releaseTime - pressTime;
    count += 1;
    keyPresses[code] = {
      ...keyPresses[code],
      pressTime: undefined,
      totalDuration,
      count,
      totalDelay,
      pressed: false,
      correctCount,
    };

    if (code === "Backspace") {
      inputText = inputText.slice(0, -1);
    }
    if (key.length === 1 && typedWords.length <= sampleWords.length) {
      inputText += key;
    }

    lastPressTime = releaseTime;
  };

  const cursorPosition: number = $derived.by<number>(() => {
    // Special case for the first word
    if (typedWords.length === 1) {
      return typedWords[0].length;
    }
    const numWordsFinished = typedWords.length - 1;
    const wordsTyped: string[] = sampleWords.slice(
      0,
      numWordsFinished - sampleWords.length,
    );
    const lastTypedWord: string = typedWords.at(-1);
    return (
      wordsTyped.join(" ").length +
      Math.min(sampleWords.at(numWordsFinished).length, lastTypedWord.length) +
      1
    );
  });

  const characterStatus: CharacterStatus[] = $derived.by<CharacterStatus[]>(
    () => {
      const status: CharacterStatus[] = [];
      sampleWords.forEach((word, wordIndex) => {
        // Check for words that have not been typed
        if (wordIndex >= typedWords.length) {
          [...word].forEach(() => {
            status.push("default");
          });
        } else {
          // Check for words that have been typed
          const inputWord: string = typedWords[wordIndex];
          [...word].forEach((char, charIndex) => {
            if (charIndex >= inputWord.length) {
              // Check if the current word is the last typed word
              status.push(
                wordIndex === typedWords.length - 1 ? "default" : "skipped",
              );
            } else {
              status.push(
                inputWord[charIndex] === char ? "correct" : "incorrect",
              );
            }
          });
        }
        // Append space after each word
        status.push("default");
      });
      return status;
    },
  );

  const wpm: number = $derived.by<number>(() => {
    return typedWordsCounter / (timeElapsed / 1000 / 60) || 0;
  });

  const accuracy: number = $derived.by<number>(() => {
    const correctCharsTyped: number = characterStatus.filter(
      (char) => char === "correct",
    ).length;
    const incorrectCharsTyped: number = characterStatus.filter((char) =>
      ["incorrect", "skipped"].includes(char),
    ).length;
    return (
      (correctCharsTyped / (correctCharsTyped + incorrectCharsTyped)) * 100 ||
      100
    );
  });

  const lineFeed = () => {
    const sampleText = sampleWords.join(" ");
    const remainingText = sampleText.slice(cursorPosition);
    const addedSampleWords = generate(SAMPLE_WORD_LENGTH);
    sampleWords = [...remainingText.split(" "), ...addedSampleWords];
    inputText = "";
  };

  const reset = () => {
    sampleWords = generate(SAMPLE_WORD_LENGTH) as string[];
    keyPresses = initialKeyPress();
    inputText = "";
    firstPressTime = undefined;
    lastPressTime = undefined;
    timeElapsed = 0;
    typedWordsCounter = 0;
    pausedAt = undefined;
    timeStampedAt = undefined;
  };
</script>

<svelte:window onkeyup={keyUpHandler} onkeydown={keyDownHandler} />

<main class="flex flex-col gap-14 max-w-[1048px]">
  <TypingArea
    {cursorPosition}
    {characterStatus}
    {timeElapsed}
    {wpm}
    {accuracy}
    {lineFeed}
    {pausedAt}
  />
  <div class="flex gap-6 mx-auto">
    <div class="flex flex-col gap-6">
      <Keyboard />
      <br />
      <PerFingerStats />
    </div>
    <div>
      <PerRowStats />
    </div>
  </div>
  <div class="mx-auto flex gap-6">
    <RadioGroup
      active="variant-glass-primary"
      hover="hover:variant-soft-primary"
    >
      <RadioItem name="statsMode" bind:group={statsMode} value="count"
        >Count</RadioItem
      >
      <RadioItem name="statsMode" bind:group={statsMode} value="duration"
        >Duration</RadioItem
      >
      <RadioItem name="statsMode" bind:group={statsMode} value="delay"
        >Delay</RadioItem
      >
    </RadioGroup>
    <div>
      <button class="btn variant-glass-primary" type="button" onclick={reset}>
        <span><ArrowClockwise weight="duotone" /></span>
        <span>Reset</span>
      </button>
    </div>
  </div>
</main>
