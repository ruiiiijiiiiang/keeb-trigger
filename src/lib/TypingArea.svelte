<script lang="ts">
  import { type Component } from "svelte";
  import { clsx } from "@nick/clsx";
  import { TextAa } from "phosphor-svelte";
  import { Target } from "phosphor-svelte";
  import { Clock } from "phosphor-svelte";
  import type { CharacterStatus } from "./types";

  const {
    cursorPosition,
    characterStatus,
    timeElapsed,
    wpm,
    accuracy,
    lineFeed,
    pausedAt,
    sampleWords,
    typedWords,
  }: {
    cursorPosition: number;
    characterStatus: CharacterStatus[];
    timeElapsed: number;
    wpm: number;
    accuracy: number;
    lineFeed: () => void;
    pausedAt: number;
    sampleWords: string[];
    typedWords: string[];
  } = $props();

  let cursorSpan: HTMLSpanElement = $state(null);
  $effect(() => {
    typedWords;
    sampleWords;
    if (cursorSpan) {
      const parentRect = cursorSpan.parentElement!.getBoundingClientRect();
      const spanRect = cursorSpan.getBoundingClientRect();
      const parentCenter = parentRect.top + parentRect.height / 2;
      const pastFirstLine = spanRect.top > parentCenter;
      if (pastFirstLine) {
        lineFeed();
      }
    }
  });
</script>

{#snippet stats(
  Icon: Component,
  stat: number,
  label: string,
  unit: string,
  lowThreshold?: number,
  highThreshold?: number,
)}
  <div class="flex justify-between items-center">
    <div class="text-secondary-400 text-xl flex items-center gap-2">
      <Icon weight="duotone" />{label}:
      <span
        class={clsx(
          "font-bold",
          highThreshold &&
            lowThreshold && {
              "text-success-500": stat >= highThreshold,
              "text-warning-500": stat >= lowThreshold && stat < highThreshold,
              "text-error-500": stat < lowThreshold,
            },
        )}
      >
        {`${stat.toFixed(0)}${unit}`}
      </span>
    </div>
  </div>
{/snippet}

<div class="mx-auto text-center">
  <h2 class="text-5xl font-bold mb-4">Keeb Trigger</h2>
  <div
    class="
    variant-soft-primary
    card
    border-2
    border-primary-400
    leading-relaxed
    p-4
    my-4
    font-mono
    text-2xl
    cursor-text
    line-clamp-2
    overflow-hidden
    relative
  "
  >
    {#if pausedAt}
      <div
        class="
        absolute
        inset-0
        backdrop-blur-md
        variant-glass-primary
        flex
        justify-center
        items-center
      "
      >
        Paused
      </div>
    {/if}
    {#each [...sampleWords.join(" ")] as char, index}
      {#if index === cursorPosition}
        <span
          bind:this={cursorSpan}
          class="text-primary-400 underline animate-cursor"
        >
          {char}
        </span>
      {:else}
        <span
          class={clsx({
            "text-primary-400": characterStatus[index] === "default",
            "text-success-400": characterStatus[index] === "correct",
            "text-error-400": characterStatus[index] === "incorrect",
            "text-gray-400": characterStatus[index] === "skipped",
          })}
        >
          {char}
        </span>
      {/if}
    {/each}
  </div>
  <div class="flex gap-10">
    {@render stats(TextAa, wpm, "Words per minute", "", 40, 60)}
    {@render stats(Target, accuracy, "Accuracy", "%", 80, 95)}
    {@render stats(Clock, timeElapsed / 1000, "Time", "s")}
  </div>
</div>
