<script lang="ts">
  import { clsx } from "@nick/clsx";
  import type { CharacterStatus } from "./types";

  const { sampleWords, typedWords, startTime }: {
    sampleWords: string[],
    typedWords: string[],
    startTime: Date,
  } = $props();

  const cursorPosition: number = $derived.by(() => {
    // Special case for the first word
    if (typedWords.length === 1) {
      return typedWords[0].length;
    }
    const wordsTyped: string[] = sampleWords.slice(0, typedWords.length - 1 - sampleWords.length);
    const lastTypedWord: string = typedWords[typedWords.length - 1];
    return wordsTyped.join(" ").length + lastTypedWord.length + 1;
  });

  const characterStatus: CharacterStatus[] = $derived.by(() => {
    const status: CharacterStatus[] = [];
    sampleWords.forEach((word, wordIndex) => {
      // Check for words that have not been typed
      if (wordIndex >= typedWords.length) {
        [...word].forEach(() => {
          status.push("default")
        });
      } else {
        // Check for words that have been typed
        const inputWord: string = typedWords[wordIndex];
        [...word].forEach((char, charIndex) => {
          if (charIndex >= inputWord.length) {
            // Check if the current word is the last typed word
            status.push(wordIndex === typedWords.length - 1 ? "default" : "skipped");
          } else {
            status.push(inputWord[charIndex] === char ? "correct" : "incorrect");
          }
        });
      }
      // Append space after each word
      status.push("default");
    });
    return status;
  });

  const wpm: number = $derived.by(() => {
    // Do not count time until the first word is finished
    if (typedWords.length === 1) {
      return 0;
    }
    const endTime: Date = new Date();
    const timeElapsed: number = (endTime - startTime) / 1000 / 60;
    return typedWords.length / timeElapsed || 0;
  });

  const accuracy: number = $derived.by(() => {
    const correctCharsTyped: number = characterStatus.filter(
      char => char === "correct"
    ).length;
    const incorrectCharsTyped: number = characterStatus.filter(
      char => ["incorrect", "skipped"].includes(char)
    ).length;
    return correctCharsTyped / (correctCharsTyped + incorrectCharsTyped) * 100 || 100;
  });
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
    {@render stats(accuracy, "Accuracy", "%", [80, 95])}
    {@render stats(wpm, "Words per minute", "", [40, 60])}
  </div>
</div>
