<script>
  import { getDurationByFinger } from "./utils";
  const fingersMap = {
    1: "thumb",
    2: "index",
    3: "middle",
    4: "ring",
    5: "pinky",
  };
  let { keyPresses } = $props();
</script>

<div class="variant-ringed-primary flex justify-center gap-10">
  <div class="flex justify-center gap-4">
    {#each [5, 4, 3, 2, 1] as finger}
      <div
        class="variant-ghost-primary flex flex-col items-stretch"
        style="width: var(--key-size); height: var(--key-size);"
      >
        <div>
          {fingersMap[finger]}
        </div>
        <div>
          {getDurationByFinger(keyPresses, `L-${finger}`).toFixed(2)}
        </div>
      </div>
    {/each}
  </div>
  <div class="flex justify-center gap-4">
    {#each [1, 2, 3, 4, 5] as finger}
      <div
        class="variant-ghost-primary flex flex-col items-stretch"
        style="width: var(--key-size); height: var(--key-size);"
      >
        <div>
          {fingersMap[finger]}
        </div>
        <div>
          {getDurationByFinger(keyPresses, `R-${finger}`).toFixed(2)}
        </div>
      </div>
    {/each}
  </div>
</div>
