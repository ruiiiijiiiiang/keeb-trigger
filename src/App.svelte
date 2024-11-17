<script lang="ts">
  import Keyboard from './lib/Keyboard.svelte';

  let keyPresses = $state({});
  function keyDownHandler(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.key;
    if (!keyPresses[key]) {
      keyPresses[key] = {
        totalDuration: 0,
        count: 0
      };
    }
    keyPresses[key].pressTime = Date.now();
  }

  function keyUpHandler(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.key;
    if (!keyPresses[key] || !keyPresses[key].pressTime) {
      return;
    }
    const releaseTime = Date.now();
    let { totalDuration, pressTime, count } = keyPresses[key];
    const duration = releaseTime - pressTime;
    totalDuration += duration;
    count += 1;
    keyPresses[key] = {
      duration,
      pressTime: undefined,
      totalDuration,
      count,
    };
    const current = duration, accumulative = totalDuration / count;
    console.log({ key, current, accumulative });
  }
</script>

<svelte:window
  onkeyup = {keyUpHandler}
  onkeydown = {keyDownHandler}
/>

<main>
  <Keyboard keyPresses={keyPresses}/>
</main>
