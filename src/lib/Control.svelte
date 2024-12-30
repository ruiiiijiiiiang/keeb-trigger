<script lang="ts">
  import type { StatsMode, ExtraChar } from "./types";
  import { RadioGroup, RadioItem, SlideToggle } from "@skeletonlabs/skeleton";
  import { ArrowClockwise } from "phosphor-svelte";

  let {
    statsMode = $bindable(),
    extraCharSet = $bindable(),
    reset,
  }: {
    statsMode: StatsMode;
    extraCharSet: Record<ExtraChar, boolean>;
    reset: () => void;
  } = $props();
</script>

<RadioGroup active="variant-glass-primary" hover="hover:variant-soft-primary">
  <RadioItem name="statsMode" bind:group={statsMode} value="count"
    >Count</RadioItem
  >
  <RadioItem name="statsMode" bind:group={statsMode} value="duration"
    >Duration</RadioItem
  >
  <RadioItem name="statsMode" bind:group={statsMode} value="gap">Gap</RadioItem>
  <RadioItem name="statsMode" bind:group={statsMode} value="accuracy"
    >Accuracy</RadioItem
  >
</RadioGroup>
<div>
  <SlideToggle name="upper" bind:checked={extraCharSet.upper}
    >Upper Case</SlideToggle
  >
  <SlideToggle name="number" bind:checked={extraCharSet.number}
    >Numbers</SlideToggle
  >
  <SlideToggle name="symbol" bind:checked={extraCharSet.symbol}
    >Symbols</SlideToggle
  >
</div>
<button class="btn variant-glass-primary" type="button" onclick={reset}>
  <span><ArrowClockwise weight="duotone" /></span>
  <span>Reset</span>
</button>
