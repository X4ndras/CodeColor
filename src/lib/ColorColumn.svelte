<script lang="ts">
  import type { ColorKey, Theme } from "../Types.svelte";
  import ColorCell from "./ColorCell.svelte";
  import { darkTheme, lightTheme, darkMode } from "../stores.svelte";

  export let column: ColorKey[];
  
  function handleColorChange(key: string, newColor: string) {
    if ($darkMode) {
      darkTheme.update((store) => ({ ...store, [key]: newColor }));
    } else {
      lightTheme.update((store) => ({ ...store, [key]: newColor }));
    }
  }
</script>

<div>
  {#each column as { key, label, description }}
    {#if ($darkMode ? $darkTheme : $lightTheme)[key]}
      <ColorCell 
        color={($darkMode ? $darkTheme : $lightTheme)[key]} 
        label={`${label} ${description}`} 
        onColorChange={(newColor) => handleColorChange(key, newColor)}
      />
    {:else}
      <div class="error-cell">Error: {key} not found</div>
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
