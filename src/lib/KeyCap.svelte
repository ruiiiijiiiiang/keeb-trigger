<script lang="ts">
  import { clsx } from "@nick/clsx";
  import { popup } from "@skeletonlabs/skeleton";
  import type { KeyPress, ColorPalette } from "./types";
  import { renderSingleStats, renderGroupedStats } from "./utils";

  const {
    mode,
    width = 1,
    topText,
    bottomText,
    color = "primary",
    pressed = false,
    background = "",
    keyPress = undefined,
    groupedKeyPresses = [],
  }: {
    mode: "single" | "grouped";
    width?: number;
    topText: string;
    bottomText: string;
    color?: ColorPalette;
    pressed?: boolean;
    background: string;
    keyPress?: KeyPress;
    groupedKeyPresses?: KeyPress[];
  } = $props();
</script>

{#snippet statLi(label: string, stat: string)}
  <li>
    <span class="font-bold">{label}:</span>
    <span>{stat}</span>
  </li>
{/snippet}

<div
  class={clsx(
    `
    relative
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
    [&>*]:pointer-events-none
  `,
    {
      "scale-95 translate-y-0.5 transition-transform duration-[25ms]": pressed,
    },
  )}
  style="width: calc(var(--keycap-size)*{width});
    height: var(--keycap-size);
    background: rgba(var(--color-{color}-800) / 1);"
  use:popup={{
    event: "hover",
    target: `statPopup-${topText}`,
    placement: "top",
  }}
>
  <div
    class={clsx(
      `
      absolute
      bottom-1.5
      left-1/2
      transform
      -translate-x-1/2
      border
      rounded
      text-center
    `,
      { "scale-95 translate-y-0.5": pressed },
    )}
    style="width: calc(100% - 5px);
      height: calc(100% - 8px);
      background: rgba(var({background}) / 1);"
  >
    <div class="font-bold text-secondary-900 min-h-6">
      {topText}
    </div>
    <div class="font-condensed text-primary-700 min-h-6">
      {bottomText}
    </div>
  </div>
  <div
    class="card p-4 variant-filled-secondary w-60"
    data-popup="statPopup-{topText}"
  >
    <div class="arrow variant-filled-secondary"></div>
    <ul class="list">
      {@render statLi(
        "Count",
        mode === "single"
          ? renderSingleStats(keyPress, "count")
          : renderGroupedStats(groupedKeyPresses, "count"),
      )}
      {@render statLi(
        "Average Duration",
        mode === "single"
          ? renderSingleStats(keyPress, "duration")
          : renderGroupedStats(groupedKeyPresses, "duration"),
      )}
      {@render statLi(
        "Average gap",
        mode === "single"
          ? renderSingleStats(keyPress, "gap")
          : renderGroupedStats(groupedKeyPresses, "gap"),
      )}
      {@render statLi(
        "Accuracy",
        mode === "single"
          ? renderSingleStats(keyPress, "accuracy")
          : renderGroupedStats(groupedKeyPresses, "accuracy"),
      )}
    </ul>
  </div>
</div>

<style>
  [data-popup] {
    transition-duration: 0s;
  }
</style>
