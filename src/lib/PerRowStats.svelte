<script>
  import { getDurationByRow } from "./utils";
  let { keyPresses } = $props();
</script>

<div class="variant-ringed-primary flex flex-col">
  {#each [1, 2, 3, 4, 5] as row}
    <div
      class="variant-ghost-primary flex flex-col items-stretch"
      style="width: var(--key-size); height: var(--key-size);"
    >
      <div>
        Row{` ${row}`}
      </div>
      <div>
        {getDurationByRow(keyPresses, row).toFixed(2)}
      </div>
    </div>
  {/each}
</div>
