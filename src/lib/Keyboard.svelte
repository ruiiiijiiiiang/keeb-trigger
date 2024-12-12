<script lang="ts">
  import { getContext } from "svelte";
  import { Keyboard_Layout, renderStats } from "./utils";
  import type { KeyPressMap, StatsMode } from "./types";
  import KeyCap from "./KeyCap.svelte";

  const getKeyPresses: () => KeyPressMap =
    getContext<() => KeyPressMap>("keyPresses");
  const keyPresses: KeyPressMap = $derived(getKeyPresses());
  const getStatsMode = getContext<() => StatsMode>("statsMode");
  const statsMode: StatsMode = $derived(getStatsMode());
</script>

<div class="flex flex-col">
  {#each Keyboard_Layout.rows as keys}
    <div class="flex">
      {#each keys as key}
        <KeyCap
          mode={"single"}
          name={key.name}
          width={key.width}
          topText={key.legend}
          bottomText={renderStats(keyPresses[key.name], statsMode)}
          color={key.keyType === "letter"
            ? "primary"
            : key.keyType === "digit"
              ? "secondary"
              : "tertiary"}
          pressed={keyPresses[key.name]?.pressed}
        />
      {/each}
      <br />
    </div>
  {/each}
</div>
