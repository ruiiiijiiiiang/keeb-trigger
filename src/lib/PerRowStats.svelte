<script lang="ts">
  import { getContext } from "svelte";
  import type { KeyPressMap, StatsMode } from "./types";
  import { renderAverageStats } from "./utils";
  import KeyCap from "./KeyCap.svelte";

  const getKeyPresses: () => KeyPressMap =
    getContext<() => KeyPressMap>("keyPresses");
  const keyPresses: KeyPressMap = $derived(getKeyPresses());
  const getStatsMode: () => StatsMode =
    getContext<() => StatsMode>("statsMode");
  const statsMode: StatsMode = $derived(getStatsMode());

  const rows = [1, 2, 3, 4, 5];
</script>

<div class="variant-ringed-primary flex flex-col">
  {#each rows as row}
    <KeyCap
      mode={"grouped"}
      groupType={"row"}
      group={row}
      topText={`Row ${row}`}
      bottomText={renderAverageStats(keyPresses, statsMode, "row", row)}
    />
  {/each}
</div>
