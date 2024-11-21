<script lang="ts">
  import { getAverageByGroup } from "./utils";
  const fingersMap = {
    1: "thumb",
    2: "index",
    3: "middle",
    4: "ring",
    5: "pinky",
  };
  let { keyPresses } = $props();
</script>

<div class="flex justify-center gap-10">
  <div class="card variant-ghost-primary flex justify-center gap-4">
    {#each [5, 4, 3, 2, 1] as finger}
      <div
        class="variant-filled-primary flex flex-col items-around rounded"
        style="width: var(--keycap-size); height: var(--keycap-size);"
      >
        <div>
          {fingersMap[finger]}
        </div>
        <div>
          {getAverageByGroup(keyPresses, "finger", `L-${finger}`).toFixed(2)}
        </div>
      </div>
    {/each}
  </div>
  <div class="card variant-ghost-primary flex justify-center gap-4">
    {#each [1, 2, 3, 4, 5] as finger}
      <div
        class="variant-filled-primary flex flex-col items-around rounded"
        style="width: var(--keycap-size); height: var(--keycap-size);"
      >
        <div>
          {fingersMap[finger]}
        </div>
        <div>
          {getAverageByGroup(keyPresses, "finger", `R-${finger}`).toFixed(2)}
        </div>
      </div>
    {/each}
  </div>
</div>
