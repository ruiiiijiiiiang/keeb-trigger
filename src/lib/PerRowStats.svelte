<script lang="ts">
  import { getAverageByGroup } from "./utils";
  let { keyPresses } = $props();
</script>

<div class="variant-ringed-primary flex flex-col gap-1">
  {#each [1, 2, 3, 4, 5] as row}
    <div
      class="variant-filled-primary flex flex-col items-around rounded"
      style="width: var(--keycap-size); height: var(--keycap-size);"
    >
      <div>
        Row{` ${row}`}
      </div>
      <div>
        {getAverageByGroup(keyPresses, "row", row).toFixed(2)}
      </div>
    </div>
  {/each}
</div>
