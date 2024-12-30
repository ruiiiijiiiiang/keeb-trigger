<script lang="ts">
  import { computeSingleBackground, renderSingleStats } from "./utils";
  import { KEYBOARD_LAYOUT, KEYTYPE_COLOR_MAP } from "./const";
  import type { KeyPressMap, StatsMode } from "./types";
  import KeyCap from "./KeyCap.svelte";

  const {
    keyPresses,
    statsMode,
  }: {
    keyPresses: KeyPressMap;
    statsMode: StatsMode;
  } = $props();
</script>

<div class="flex flex-col">
  {#each KEYBOARD_LAYOUT.rows as keys}
    <div class="flex">
      {#each keys as key}
        {@const keyPress = keyPresses[key.name]}
        <KeyCap
          mode={"single"}
          width={key.width}
          topText={key.legend}
          bottomText={renderSingleStats(keyPress, statsMode)}
          color={KEYTYPE_COLOR_MAP[key.keyType]}
          pressed={keyPress?.pressed}
          background={computeSingleBackground(keyPress, statsMode, key.keyType)}
          {keyPress}
        />
      {/each}
      <br />
    </div>
  {/each}
</div>
