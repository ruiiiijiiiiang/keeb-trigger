<script lang="ts">
  import { getContext } from "svelte";
  import { clsx } from "@nick/clsx";
  import TextAA from "phosphor-svelte/lib/TextAA";
  import Target from "phosphor-svelte/lib/Target";
  import Clock from "phosphor-svelte/lib/Clock";
  import type { CharacterStatus } from "./types";

  const {
    cursorPosition,
    characterStatus,
    timeElapsed,
    wpm,
    accuracy,
  }: {
    cursorPosition: number,
    characterStatus: CharacterStatus[],
    timeElapsed: number,
    wpm: number,
    accuracy: number,
  } = $props();
  const sampleWords: string[] = getContext("sampleWords");
  const typedWords: string[] = getContext("typedWords");
</script>

{#snippet stats(icon, stat, label, unit, lowThreshold?, highThreshold?)}
  <div class="flex justify-between items-center">
    <div class="text-secondary-400 text-xl">
      {icon}{label}:
      <span
        class={clsx("font-bold", highThreshold && lowThreshold && {
          "text-success-500": stat >= highThreshold,
          "text-warning-500": stat >= lowThreshold && stat < highThreshold,
          "text-error-500": stat < lowThreshold,
        })}
      >
        {`${stat.toFixed(0)}${unit}`}
      </span>
    </div>
  </div>
{/snippet}

<div
  class="mx-auto p-6 text-center"
>
  <h2 class="text-5xl font-bold mb-4">Keeb Trigger</h2>
  <div class="
    variant-soft-primary
    card
    border-2
    border-primary-400
    leading-relaxed
    p-4
    mb-4
    min-h-[100px]
    font-mono
    text-2xl
    cursor-text
  ">
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
    {@render stats(<TextAA />, wpm, "Words per minute", "", 40, 60)}
    {@render stats(<Target />, accuracy, "Accuracy", "%", 80, 95)}
    {@render stats(<Clock />, timeElapsed / 1000, "Time", "s")}
  </div>
</div>
