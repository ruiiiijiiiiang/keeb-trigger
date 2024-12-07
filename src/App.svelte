<script lang="ts">
  import { generate } from "random-words";
  import type { KeyPressMap } from "./lib/types";
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

  let keyPresses: KeyPressMap = $state(initialKeyPress());
  let inputText: string = $state("");
  let firstPressTime: Date = $state(null);
  let lastPressTime: Date = $state(null);

  const sampleWords: string[] = generate(SAMPLE_WORD_LENGTH);
  const typedWords: string[] = $derived(inputText.split(" "));

  const keyDownHandler = (event: KeyboardEvent) => {
    firstPressTime ??= Date.now();

    const code = event.code;
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
      totalDelay += (releaseTime - lastPressTime);
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
  $inspect(keyPresses);

  const cursorPosition: number = $derived.by(() => {
    // Special case for the first word
    if (typedWords.length === 1) {
      return typedWords[0].length;
    }
    const wordsTyped: string[] = sampleWords.slice(0, typedWords.length - 1 - sampleWords.length);
    const lastTypedWord: string = typedWords[typedWords.length - 1];
    return wordsTyped.join(" ").length + lastTypedWord.length + 1;
  });

  const characterStatus: CharacterStatus[] = $derived.by(() => {
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

  const wpm: number = $derived.by(() => {
    // Do not count time until the first word is finished
    if (typedWords.length === 1) {
      return 0;
    }
    const timeElapsed: number = (lastPressTime - firstPressTime) / 1000 / 60;
    return typedWords.length / timeElapsed || 0;
  });

  const accuracy: number = $derived.by(() => {
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
    sampleWords={sampleWords}
    typedWords={typedWords}
    cursorPosition={cursorPosition}
    characterStatus={characterStatus}
    wpm={wpm}
    accuracy={accuracy}
  />
  <div class="flex gap-14 mx-auto">
    <div>
      <Keyboard keyPresses={keyPresses} />
      <br />
      <PerFingerStats keyPresses={keyPresses} />
    </div>
    <div>
      <PerRowStats keyPresses={keyPresses} />
    </div>
  </div>
</main>
