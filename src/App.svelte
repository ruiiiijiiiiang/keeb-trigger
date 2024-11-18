<script lang="ts">
  import Keyboard from './lib/Keyboard.svelte';
  import PerFingerStats from './lib/PerFingerStats.svelte';
    import PerRowStats from './lib/PerRowStats.svelte';

  let keyPresses = $state({});
  function keyDownHandler(event: KeyboardEvent) {
    event.preventDefault();
    const key = event.code;
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
    };
  }
</script>

<svelte:window
  onkeyup = {keyUpHandler}
  onkeydown = {keyDownHandler}
/>

<main>
  <div class="flex gap-14">
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
