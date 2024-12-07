<script lang="ts">
  import { clsx } from "@nick/clsx";
  import { popup } from "@skeletonlabs/skeleton";
  import type { KeyCapProps } from "./types";
			
  const {
    width = 1,
    topText = "",
    bottomText = "",
    color = "primary",
    pressed = false,
  }: KeyCapProps = $props();
</script>

{#snippet keyCapText(text)}
  {#if text}
    {text}
  {:else}
    &nbsp;
  {/if}
{/snippet}

<div
  class={clsx(`relative
    flex
    items-center
    justify-center
    rounded 
    border-solid
    border-2
    border-surface-600
    outline
    outline-1
    outline-gray-500
    outline-offset-[-2px]
    [&>*]:pointer-events-none`,
    { "scale-95 translate-y-0.5 transition-transform duration-[25ms]": pressed },
  )}
  style="width: calc(var(--keycap-size)*{width});
    height: var(--keycap-size);
    background: rgba(var(--color-{color}-800) / 1);"
  use:popup={{
    event: "hover",
    target: `statPopup-${topText}`,
    placement: "top"
  }}
>
  <div
    class={clsx(`absolute
      bottom-1.5
      left-1/2
      transform
      -translate-x-1/2
      border
      rounded
      text-surface-800`,
      { "scale-95 translate-y-0.5": pressed },
    )}
    style="width: calc(100% - 5px);
      height: calc(100% - 8px);
      background: rgba(var(--color-{color}-300) / 1);"
  >
    <div class="font-bold">
      {@render keyCapText(topText)}
    </div>
    <div>
      {@render keyCapText(bottomText)}
    </div>
  </div>
  <div class="card p-4 variant-filled-secondary" data-popup="statPopup-{topText}">
    <p>Hover Content</p>
    <div class="arrow variant-filled-secondary"></div>
  </div>
</div>
