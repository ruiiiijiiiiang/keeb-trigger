<script>
  import { LAYOUT_60 } from "./utils";
  let { keyPresses } = $props();
</script>

<div>
  {#each LAYOUT_60.rows as keys, i}
    <div class="variant-ringed-primary">
      {#each keys as key}
        <div
          class="variant-ghost-primary inline-block h-14"
          style="width: calc(3.5em*{key.width});"
        >
          <div class="mt-0">
            {#if key.legends[0]}
              {key.legends[0].display}
            {:else}
              &nbsp;
            {/if}
          </div>
          <div class="mb-0">
            {#if keyPresses[key.name]}
              {@const keyPress = keyPresses[key.name]}
              {@const accumalative = (keyPress.totalDuration / keyPress.count).toFixed(2)}
              {accumalative}
            {/if}
          </div>
        </div>
      {/each}
      <br />
    </div>
  {/each}
</div>
