<script lang="ts">
  import { generate } from "npm:random-words";
  import type { KeyPressMap } from "./lib/types";
  import Keyboard from "./lib/Keyboard.svelte";
  import PerFingerStats from "./lib/PerFingerStats.svelte";
  import PerRowStats from "./lib/PerRowStats.svelte";
  import TypingArea from "./lib/TypingArea.svelte";

  const SAMPLE_WORD_LENGTH: number = 50;

  let keyPresses: KeyPressMap = $state({});
  let inputText: string = $state("");
  let startTime: Date = $state(null);

  const sampleWords: string[] = generate(SAMPLE_WORD_LENGTH);
  const typedWords: string[] = $derived(inputText.split(" "));

  function keyDownHandler(event: KeyboardEvent) {
    // event.preventDefault();
    if (!startTime) {
      startTime = Date.now();
    }
    const keyCode = event.code;
    if (!keyPresses[keyCode]) {
      keyPresses[keyCode] = {
        totalDuration: 0,
        count: 0,
        pressed: false,
      };
    }
    keyPresses[keyCode].pressed = true;
    keyPresses[keyCode].pressTime = Date.now();
  }

  function keyUpHandler(event: KeyboardEvent) {
    const keyCode = event.code;
    // TODO: handle space
    if (keyCode === "Space") {
      event.preventDefault();
    }
    if (!keyPresses[keyCode] || !keyPresses[keyCode].pressTime) {
      return;
    }
    const releaseTime = Date.now();
    let { totalDuration, pressTime, count } = keyPresses[keyCode];
    const duration = releaseTime - pressTime;
    totalDuration += duration;
    count += 1;
    keyPresses[keyCode] = {
      pressTime: undefined,
      totalDuration,
      count,
      cumulative: totalDuration / count,
      pressed: false,
    };

    if (keyCode === "Backspace") {
      inputText = inputText.slice(0, -1);
    }
    if (event.key.length === 1 && typedWords.length < sampleWords.length) {
      inputText += event.key;
    }
  }
</script>

<svelte:window
  onkeyup = {keyUpHandler}
  onkeydown = {keyDownHandler}
/>

<main class="flex flex-col gap-14 max-w-screen-xl">
  <TypingArea sampleWords={sampleWords} typedWords={typedWords} startTime={startTime} />
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
