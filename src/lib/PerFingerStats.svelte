<script lang="ts">
  import type { KeyPressMap } from "./types";
  import { getAverageByGroup } from "./utils";
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
  const { keyPresses }: { keyPresses: KeyPressMap } = $props();
</script>

<div class="flex justify-center gap-10">
  {#each [leftFingers, rightFingers] as fingers, i}
    <div class="card variant-ghost-primary flex justify-center gap-4">
      {#each fingers as finger}
        <KeyCap
          topText={fingersMap[finger]}
          bottomText={getAverageByGroup(keyPresses, "finger", `${hands[i]}-${finger}`).toFixed(2)}
        />
      {/each}
    </div>
  {/each}
</div>
