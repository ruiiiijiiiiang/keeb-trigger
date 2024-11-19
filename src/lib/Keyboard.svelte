<script>
  import { Keyboard_Layout } from "./utils";
  let { keyPresses } = $props();
</script>

<div>
  {#each Keyboard_Layout.rows as keys}
    <div class="flex">
      {#each keys as key}
        <div
          class="flex flex-col justify-around keycap"
          style="width: calc(var(--keycap-size)*{key.width});"
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
      {/each}
      <br />
    </div>
  {/each}
</div>

<style>
  /* keycap style based on https://uiverse.io/pipic1/slimy-parrot-86 */
  .keycap {
     --key-text-color: #969faf;
     --docsearch-key-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
       0 1px 2px 1px rgba(30, 35, 90, 0.4);
     --docsearch-key-gradient: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
     border: none;
     background: var(--docsearch-key-gradient);
     border-radius: 0.3em;
     box-shadow: var(--docsearch-key-shadow);
     color: var(--key-text-color);
     height: var(--keycap-size);
     text-align: center;
     font-weight: bold;
     font-size: 1em;
     min-width: 1em;
     line-height: 1em;
     user-select: none;
  }
</style>
