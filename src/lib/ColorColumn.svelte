<script lang="ts">
  import type { ColorKey, theme } from "../Types.svelte";
  import ColorCell from "./ColorCell.svelte";

  export let colors: theme;
  export let column: ColorKey[];
</script>

<div>
  {#each column as colorKeyItem}
    {#if colors && colors[colorKeyItem.key]}
      <ColorCell
        color={colors[colorKeyItem.key].value}
        label={colors[colorKeyItem.key].label}
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
