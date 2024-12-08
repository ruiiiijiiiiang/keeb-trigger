<script lang="ts">
  import { setContext } from "svelte";
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { generate } from "random-words";
  import type { KeyPressMap, StatsMode } from "./lib/types";
  import { Keys } from "./lib/utils";
  import Keyboard from "./lib/Keyboard.svelte";
  import PerFingerStats from "./lib/PerFingerStats.svelte";
  import PerRowStats from "./lib/PerRowStats.svelte";
  import TypingArea from "./lib/TypingArea.svelte";

  const SAMPLE_WORD_LENGTH: number = 50;

  const initialKeyPress = () => {
    const keyPresses = {};
    Keys.forEach(key => {
      keyPresses[key.name] = {
        count: 0,
        pressed: false,
        pressTime: undefined,
        totalDuration: 0,
        totalDelay: 0,
        correctPressCount: 0,
        incorrectPressCount: 0,
      };
    });
    return keyPresses;
  };

  let keyPresses: KeyPressMap = $state<KeyPressMap>(initialKeyPress());
  setContext<KeyPressMap>("keyPresses", keyPresses);
  let inputText: string = $state<string>("");
  let firstPressTime: Date = $state<Date>(null);
  let lastPressTime: Date = $state<Date>(null);

  const sampleWords: string[] = generate(SAMPLE_WORD_LENGTH);
  setContext<string[]>("sampleWords", sampleWords);
  const typedWords: string[] = $derived<string[]>(inputText.split(" "));
  setContext<string[]>("typedWords", typedWords);

  let statsMode: StatsMode = $state<StatsMode>("count");
  setContext("statsMode", () => statsMode);
  $inspect(statsMode);

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
    const releaseTime = Date.now();

    const { code, key } = event;
    // TODO: handle space
    if (code === "Space") {
      event.preventDefault();
    }
    if (!keyPresses[code] || !keyPresses[code].pressTime) {
      return;
    }

    let { totalDuration, pressTime, count, totalDelay, correctPressCount, incorrectPressCount } = keyPresses[code];
    const nextLetter = sampleWords.join(" ").charAt(cursorPosition);
    if (nextLetter === key) {
      correctPressCount += 1;
      if (lastPressTime) {
        totalDelay += (releaseTime - lastPressTime);
      }
    } else {
      //TODO: find a more elegant way to handle this
      keyPresses[`Key${nextLetter.toUpperCase()}`] = {
        ...keyPresses[`Key${nextLetter.toUpperCase()}`],
        incorrectPressCount: incorrectPressCount + 1,
      };
    }
    totalDuration += (releaseTime - pressTime);
    count += 1;
    keyPresses[code] = {
      ...keyPresses[code],
      pressTime: undefined,
      totalDuration,
      count,
      totalDelay,
      pressed: false,
      correctPressCount,
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
    const wordsTyped: string[] = sampleWords.slice(0, numWordsFinished - sampleWords.length);
    const lastTypedWord: string = typedWords.at(-1);
    return wordsTyped.join(" ").length
      + Math.min(sampleWords.at(numWordsFinished).length, lastTypedWord.length)
      + 1;
  });

  const characterStatus: CharacterStatus[] = $derived.by<CharacterStatus[]>(() => {
    const status: CharacterStatus[] = [];
    sampleWords.forEach((word, wordIndex) => {
      // Check for words that have not been typed
      if (wordIndex >= typedWords.length) {
        [...word].forEach(() => {
          status.push("default")
        });
      } else {
        // Check for words that have been typed
        const inputWord: string = typedWords[wordIndex];
        [...word].forEach((char, charIndex) => {
          if (charIndex >= inputWord.length) {
            // Check if the current word is the last typed word
            status.push(wordIndex === typedWords.length - 1 ? "default" : "skipped");
          } else {
            status.push(inputWord[charIndex] === char ? "correct" : "incorrect");
          }
        });
      }
      // Append space after each word
      status.push("default");
    });
    return status;
  });

  const wpm: number = $derived.by<number>(() => {
    // Do not count time until the first word is finished
    if (typedWords.length === 1) {
      return 0;
    }
    const timeElapsed: number = (lastPressTime - firstPressTime) / 1000 / 60;
    return typedWords.length / timeElapsed || 0;
  });

  const accuracy: number = $derived.by<number>(() => {
    const correctCharsTyped: number = characterStatus.filter(
      char => char === "correct"
    ).length;
    const incorrectCharsTyped: number = characterStatus.filter(
      char => ["incorrect", "skipped"].includes(char)
    ).length;
    return correctCharsTyped / (correctCharsTyped + incorrectCharsTyped) * 100 || 100;
  });

</script>

<svelte:window
  onkeyup = {keyUpHandler}
  onkeydown = {keyDownHandler}
/>

<main class="flex flex-col gap-14 max-w-screen-xl">
  <TypingArea
    cursorPosition={cursorPosition}
    characterStatus={characterStatus}
    wpm={wpm}
    accuracy={accuracy}
  />
  <div>
    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
      <RadioItem bind:group={statsMode} value="count">Count</RadioItem>
      <RadioItem bind:group={statsMode} value="duration">Duration</RadioItem>
      <RadioItem bind:group={statsMode} value="delay">Delay</RadioItem>
    </RadioGroup>
  </div>
  <div class="flex gap-14 mx-auto">
    <div>
      <Keyboard />
      <br />
      <PerFingerStats />
    </div>
    <div>
      <PerRowStats />
    </div>
  </div>
</main>
