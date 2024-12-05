<script lang="ts">
  import { generate } from "npm:random-words";
  import type { KeyPressMap } from "./lib/types";
  import Keyboard from "./lib/Keyboard.svelte";
  import PerFingerStats from "./lib/PerFingerStats.svelte";
  import PerRowStats from "./lib/PerRowStats.svelte";
  import TypingArea from "./lib/TypingArea.svelte";

  let keyPresses: KeyPressMap = $state({});
  const length = 50;
  const words = generate(length);
  let inputText = $state("");

  function keyDownHandler(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.code;
    if (!keyPresses[key]) {
      keyPresses[key] = {
        totalDuration: 0,
        count: 0,
        pressed: false,
      };
    }
    keyPresses[key].pressed = true;
    keyPresses[key].pressTime = Date.now();
  }

  function keyUpHandler(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.code;
    if (!keyPresses[key] || !keyPresses[key].pressTime) {
      return;
    }
    const releaseTime = Date.now();
    let { totalDuration, pressTime, count } = keyPresses[key];
    const duration = releaseTime - pressTime;
    totalDuration += duration;
    count += 1;
    keyPresses[key] = {
      pressTime: undefined,
      totalDuration,
      count,
      cumulative: totalDuration / count,
      pressed: false,
    };

    if (event.key === 'Backspace') {
      inputText = inputText.slice(0, -1);
      return;
    }
    if (event.key.length === 1) {
      inputText += event.key;
    }
  }
</script>

<svelte:window
  onkeyup = {keyUpHandler}
  onkeydown = {keyDownHandler}
/>

<main class="flex flex-col gap-14 max-w-screen-xl">
  <TypingArea words={words} inputText={inputText} />
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
