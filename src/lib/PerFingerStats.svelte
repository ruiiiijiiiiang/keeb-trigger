<script lang="ts">
  import type { KeyPress, KeyPressMap, StatsMode, Key } from "./types";
  import { renderGroupedStats, computeGroupedBackground } from "./utils";
  import { KEYS } from "./const";
  import KeyCap from "./KeyCap.svelte";

  const {
    keyPresses,
    statsMode,
  }: {
    keyPresses: KeyPressMap;
    statsMode: StatsMode;
  } = $props();

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
</script>

<div class="flex justify-center gap-12">
  {#each [leftFingers, rightFingers] as fingers, i}
    <div class="card variant-ghost-primary flex justify-center gap-5">
      {#each fingers as finger}
        {@const keyGroup: Key[] = KEYS.filter((key: Key) =>
          key.fingers.includes(`${hands[i]}-${finger}`),
        )}
        {@const groupedKeyPresses: KeyPress[] = keyGroup.map((key) => keyPresses[key.name])}
        <KeyCap
          mode={"grouped"}
          topText={fingersMap[finger]}
          bottomText={renderGroupedStats(groupedKeyPresses, statsMode)}
          background={computeGroupedBackground(groupedKeyPresses, statsMode)}
          {groupedKeyPresses}
        />
      {/each}
    </div>
  {/each}
</div>
