<script lang="ts">
  import { Keyboard_Layout } from "./utils";
  let { keyPresses } = $props();
</script>

<div class="flex flex-col">
  {#each Keyboard_Layout.rows as keys}
    <div class="flex">
      {#each keys as key}
        <div
          class="relative flex items-center justify-center keycap"
          style="width: calc(var(--keycap-size)*{key.width}); height: var(--keycap-size);"
        >
          <div
            class="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-transparent border border-primary-300 rounded"
            style="width: calc(100% - 5px); height: calc(100% - 6px);"
          >
            <div>
              {#if key.legends[0]}
                {key.legends[0].display}
              {:else}
                &nbsp;
              {/if}
            </div>
            <div>
              {keyPresses?.[key.name]?.cumulative
                ? keyPresses[key.name].cumulative.toFixed(2)
                : (0).toFixed(2)
              }
            </div>
          </div>
        </div>
      {/each}
      <br />
    </div>
  {/each}
</div>
