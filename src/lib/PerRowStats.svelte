<script lang="ts">
  import { getContext } from "svelte";
  import type { KeyPress, KeyPressMap, StatsMode, Key } from "./types";
  import { renderGroupedStats, computeGroupedBackground } from "./utils";
  import { KEYS } from "./const";
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
    {@const keyGroup: Key[] = KEYS.filter((key: Key) => key.row === row)}
    {@const groupedKeyPresses: KeyPress[] = keyGroup.map((key) => keyPresses[key.name])}
    <KeyCap
      mode={"grouped"}
      topText={`Row ${row}`}
      bottomText={renderGroupedStats(groupedKeyPresses, statsMode)}
      background={computeGroupedBackground(groupedKeyPresses, statsMode)}
      {groupedKeyPresses}
    />
  {/each}
</div>
