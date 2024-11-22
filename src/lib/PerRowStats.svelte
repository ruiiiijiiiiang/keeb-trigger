<script lang="ts">
  import type { KeyPressMap } from "./types";
  import { getAverageByGroup } from "./utils";
  import KeyCap from "./KeyCap.svelte";
  const { keyPresses }: { keyPresses: KeyPressMap } = $props();
  const rows = [1, 2, 3, 4, 5];
</script>

<div class="variant-ringed-primary flex flex-col">
  {#each rows as row}
    <KeyCap
      topText={`Row ${row}`}
      bottomText={getAverageByGroup(keyPresses, "row", row).toFixed(2)}
    />
  {/each}
</div>
