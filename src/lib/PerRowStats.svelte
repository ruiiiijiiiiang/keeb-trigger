<script lang="ts">
  import { getContext } from "svelte";
  import type { KeyPressMap } from "./types";
  import { renderAverageStats } from "./utils";
  import KeyCap from "./KeyCap.svelte";
  const keyPresses: KeyPressMap = getContext("keyPresses");
  const getStatsMode = getContext<() => StatsMode>("statsMode");
  const statsMode: StatsMode = $derived(getStatsMode());
  const rows = [1, 2, 3, 4, 5];
</script>

<div class="variant-ringed-primary flex flex-col">
  {#each rows as row}
    <KeyCap
      topText={`Row ${row}`}
      bottomText={renderAverageStats(keyPresses, statsMode, "row", row)}
    />
  {/each}
</div>
