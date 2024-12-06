<script lang="ts">
  import type { CharacterStatus } from "./types";
  const { words, inputText }: { words: string[], inputText: string } = $props();
  const text = $derived(words.join(" "));

  const inputWords = $derived(inputText.split(" "));

  const cursorPosition = $derived.by(() => {
    const wordsTyped = words.slice(0, inputWords.length - 1 - words.length);
    const lastTypedWord = inputWords[inputWords.length - 1];
    return wordsTyped.join(" ").length + lastTypedWord.length;
  });
  $inspect(cursorPosition);

  let lastCorrectWordIndex = $state(0);
  const characterStatus: CharacterStatus[] = $derived.by(() => {
    const status: boolean[] = [];
    words.forEach((word, wordIndex) => {
      // Check for words that have not been typed
      if (wordIndex >= inputWords.length) {
        word.split("").forEach(() => {
          status.push("default")
        });
      } else {
        // Check for words that have been typed
        const inputWord = inputWords[wordIndex];
        word.split("").forEach((char, charIndex) => {
          if (charIndex >= inputWord.length) {
            // Check if the current word is the last typed word
            status.push(wordIndex === inputWords.length - 1 ? "default" : "incorrect");
          } else {
            status.push(inputWord[charIndex] === char ? "correct" : "incorrect");
          }
        });
      }
      status.push("default");
    });
    return status;
  });

  let errorCount = $derived(
    characterStatus.filter(status => status === "incorrect").length
  );

  let accuracy = $derived(
    Math.round(((text.length - errorCount) / text.length) * 100)
  );
</script>

<div
  class="card w-full mx-auto p-6"
>
  <h2 class="text-2xl font-bold mb-4 text-center">Keeb Trigger</h2>
  <div
    class="font-mono text-lg leading-relaxed p-2 border rounded mb-4 min-h-[100px] focus:outline-none cursor-text"
  >
    {#each text.split("") as char, index}
      <span
        class={`
          ${characterStatus[index] === "correct"
            ? "text-success-500"
            : characterStatus[index] === "incorrect"
              ? "text-error-500"
              : ""
          }
        `}
      >
        {char}
      </span>
      {#if index === cursorPosition}
        {`|`}
      {/if}
    {/each}
  </div>

  <div class="flex justify-between items-center">
    <div class="text-sm text-gray-600">
      Accuracy:
      <span
        class={`
          font-bold
          ${accuracy === 100 ? "text-success-500" :
            accuracy >= 80 ? "text-warning-500" :
            "text-error-500"
          }
        `}
      >
        {accuracy}%
      </span>
    </div>
  </div>
</div>
