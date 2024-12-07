<script lang="ts">
  import { Keyboard_Layout } from "./utils";
  import KeyCap from "./KeyCap.svelte";
  const { keyPresses } = $props();
</script>

<div class="flex flex-col">
  {#each Keyboard_Layout.rows as keys}
    <div class="flex">
      {#each keys as key}
        <KeyCap
          width={key.width}
          topText={key.legend}
          bottomText={
              keyPresses[key.name]?.count > 0
                ? (keyPresses[key.name].totalDuration / keyPresses[key.name].count).toFixed(2)
                : (0).toFixed(2)
              }
          color={
            key.keyType === "letter" ? "primary" :
            key.keyType === "digit" ? "secondary" :
            "tertiary"
          }
          pressed={keyPresses[key.name]?.pressed}
        />
      {/each}
      <br />
    </div>
  {/each}
</div>
