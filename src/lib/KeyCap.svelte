<script lang="ts">
  import { getContext } from "svelte";
  import { clsx } from "@nick/clsx";
  import { popup } from "@skeletonlabs/skeleton";
  import type { KeyPressMap } from "./types";
  import { renderStats, renderAverageStats } from "./utils";

  const {
    mode,
    name,
    groupType,
    group,
    width = 1,
    topText = "",
    bottomText = "",
    color = "primary",
    pressed = false,
  }: {
    mode: "single" | "grouped";
    name?: string;
    groupType?: "finger" | "row";
    group?: number | string;
    width?: number;
    topText: string;
    bottomText: string;
    color?: "primary" | "secondary" | "tertiary";
    pressed?: boolean;
  } = $props();
  const getKeyPresses: () => KeyPressMap =
    getContext<() => KeyPressMap>("keyPresses");
  const keyPresses: KeyPressMap = $derived(getKeyPresses());
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
      background: rgba(var(--color-{color}-300) / 1);"
  >
    <div class="font-bold text-secondary-900 min-h-6">
      {topText}
    </div>
    <div class="font-condensed text-primary-700 min-h-6">
      {bottomText}
    </div>
  </div>
  <div
    class="card p-4 variant-glass-secondary w-40"
    data-popup="statPopup-{topText}"
  >
    <ul class="list">
      {@render statLi(
        "Count",
        mode === "single"
          ? renderStats(keyPresses[name], "count")
          : renderAverageStats(keyPresses, "count", groupType, group),
      )}
      {@render statLi(
        "Duration",
        mode === "single"
          ? renderStats(keyPresses[name], "duration")
          : renderAverageStats(keyPresses, "duration", groupType, group),
      )}
      {@render statLi(
        "Delay",
        mode === "single"
          ? renderStats(keyPresses[name], "delay")
          : renderAverageStats(keyPresses, "delay", groupType, group),
      )}
    </ul>
  </div>
</div>
