<script lang="ts">
  import { getContext } from "svelte";
  import { clsx } from "@nick/clsx";
  import type { CharacterStatus } from "./types";

  const {
    cursorPosition,
    characterStatus,
    wpm,
    accuracy,
  }: {
    cursorPosition: number,
    characterStatus: CharacterStatus[],
    wpm: number,
    accuracy: number,
  } = $props();
  const sampleWords: string[] = getContext("sampleWords");
  const typedWords: string[] = getContext("typedWords");
</script>

{#snippet stats(stat, label, unit, [lowThreshold, highThreshold])}
  <div class="flex justify-between items-center">
    <div class="text-sm text-secondary-400 text-xl">
      {label}:
      <span
        class={clsx("font-bold", {
          "text-success-500": stat >= highThreshold,
          "text-warning-500": stat >= lowThreshold && stat < highThreshold,
          "text-error-500": stat < lowThreshold,
        })}
      >
        {`${stat.toFixed(2)}${unit}`}
      </span>
    </div>
  </div>
{/snippet}

<div
  class="w-full mx-auto p-6"
>
  <h2 class="text-5xl font-bold mb-4 text-center">Keeb Trigger</h2>
  <div
    class="variant-soft-primary card border-2 border-primary-400 leading-relaxed p-4 mb-4 min-h-[100px] font-mono text-2xl cursor-text"
  >
    {#each [...sampleWords.join(" ")] as char, index}
      <span
        class={clsx({
          "text-primary-400": characterStatus[index] === "default",
          "text-success-400": characterStatus[index] === "correct",
          "text-error-400": characterStatus[index] === "incorrect",
          "text-gray-400": characterStatus[index] === "skipped",
          "underline animate-cursor": index === cursorPosition,
        })}
      >
        {char}
      </span>
    {/each}
  </div>
  <div class="flex gap-10">
    {@render stats(wpm, "Words per minute", "", [40, 60])}
    {@render stats(accuracy, "Accuracy", "%", [80, 95])}
  </div>
</div>
