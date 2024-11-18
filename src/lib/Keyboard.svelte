<script>
  import { LAYOUT_60 } from "./utils";
  let { keyPresses } = $props();
</script>

<div>
  {#each LAYOUT_60.rows as keys}
    <div class="variant-ringed-primary flex">
      {#each keys as key}
        <div
          class="variant-ghost-primary flex flex-col items-stretch"
          style="width: calc(var(--key-size)*{key.width}); height: var(--key-size);"
        >
          <div>
            {#if key.legends[0]}
              {key.legends[0].display}
            {:else}
              &nbsp;
            {/if}
          </div>
          <div>
            {keyPresses && keyPresses[key.name] && keyPresses[key.name].cumulative
              ? keyPresses[key.name].cumulative.toFixed(2)
              : (0).toFixed(2)
            }
          </div>
        </div>
      {/each}
      <br />
    </div>
  {/each}
</div>
