<script lang="ts">
  import { clsx } from "@nick/clsx";
  import type { KeyCapProps } from "./types";
  const {
    width = 1,
    topText = "",
    bottomText = "",
    color = "primary",
    pressed = false,
  }: KeyCapProps = $props();
</script>

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
    outline-gray-300
    outline-offset-[-2px]
    transition-transform
    duration-0`,
    { "scale-95 translate-y-0.5": pressed },
  )}
  style="width: calc(var(--keycap-size)*{width});
    height: var(--keycap-size);
    background: rgba(var(--color-{color}-800) / 1);"
>
  <div
    class={clsx(`absolute
      bottom-1.5
      left-1/2
      transform
      -translate-x-1/2
      border
      rounded
      text-surface-700`,
      { "translate-y-0.5": pressed },
    )}
    style="width: calc(100% - 5px);
      height: calc(100% - 8px);
      background: rgba(var(--color-{color}-300) / 1);"
  >
    <div class="font-bold">
      {#if topText}
        {topText}
      {:else}
        &nbsp;
      {/if}
    </div>
    <div>
      {#if bottomText}
        {bottomText}
      {:else}
        &nbsp;
      {/if}
    </div>
  </div>
</div>
