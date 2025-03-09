<script lang="ts">
  import type { ColorKey, Theme } from "../Types.svelte";
  import ColorCell from "./ColorCell.svelte";
  import { colorStore } from "../stores.svelte";

  export let column: ColorKey[];
</script>

<div>
  {#each column as colorKeyItem}
    {#if $colorStore && $colorStore[colorKeyItem.key]}
      <ColorCell
        color={$colorStore[colorKeyItem.key].value}
        label={$colorStore[colorKeyItem.key].label}
      />
    {:else}
      <div class="error-cell">Error: {colorKeyItem.key} not found</div>
    {/if}
  {/each}
</div>

<style>
  .error-cell {
    background-color: #ffdddd;
    color: #ff0000;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
