<script lang="ts">
  import { getContext } from "svelte";
  import type { KeyPressMap } from "./types";
  import { renderAverageStats } from "./utils";
  import KeyCap from "./KeyCap.svelte";
  const fingersMap = {
    1: "thumb",
    2: "index",
    3: "middle",
    4: "ring",
    5: "pinky",
  };
  const leftFingers = Object.keys(fingersMap).reverse();
  const rightFingers = Object.keys(fingersMap);
  const hands = ["L", "R"];
  const keyPresses: KeyPressMap = getContext("keyPresses");
  const getStatsMode = getContext<() => StatsMode>("statsMode");
  const statsMode: StatsMode = $derived(getStatsMode());
</script>

<div class="flex justify-center gap-10">
  {#each [leftFingers, rightFingers] as fingers, i}
    <div class="card variant-ghost-primary flex justify-center gap-4">
      {#each fingers as finger}
        <KeyCap
          topText={fingersMap[finger]}
          bottomText={renderAverageStats(keyPresses, statsMode, "finger", `${hands[i]}-${finger}`)}
        />
      {/each}
    </div>
  {/each}
</div>
