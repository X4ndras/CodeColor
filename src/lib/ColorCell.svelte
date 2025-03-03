<script lang="ts">
  import { mdiClose, mdiContentCopy, mdiGrid } from "@mdi/js";
  export let color: string;
  export let label: string;
  export let expanded = false;
  import tinycolor from "tinycolor2";

  import Snackbar, { Actions, Label } from "@smui/snackbar";
  import IconButton, { Icon } from "@smui/icon-button";

  let snackbarWithClose: Snackbar;
  let showShades = false;
  let shades: string[] = [];

  function copyColor(hex: string) {
    snackbarWithClose.close();
    navigator.clipboard.writeText(hex).catch((err) => {
      console.error("Failed to copy color:", err);
    });
    snackbarWithClose.forceOpen();
  }

  function generateShades(baseColor: string) {
    const color = tinycolor(baseColor);
    return [
      color.clone().lighten(50).toHexString(),
      color.clone().lighten(40).toHexString(),
      color.clone().lighten(30).toHexString(),
      color.clone().lighten(20).toHexString(),
      color.clone().lighten(10).toHexString(),
      color.clone().lighten(5).toHexString(),
      baseColor,
      color.clone().darken(5).toHexString(),
      color.clone().darken(10).toHexString(),
      color.clone().darken(20).toHexString(),
      color.clone().darken(30).toHexString(),
      color.clone().darken(40).toHexString(),
      color.clone().darken(50).toHexString(),
    ];
  }

  function toggleShades(hex: string) {
    if (!showShades) {
      shades = generateShades(hex);
    }
    showShades = !showShades;
  }
</script>

<div class="color-cell" class:expanded style="background-color: {color}">
  {label}
  {color}
  <div class="button-container">
    <button
      on:click={() => copyColor(color)}
      title="Copy color"
      aria-label="copy"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d={mdiContentCopy} />
      </svg>
    </button>
    <button
      on:click={() => toggleShades(color)}
      title="Show shades"
      aria-label="shades"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d={mdiGrid} />
      </svg>
    </button>
  </div>

  {#if showShades}
    <div class="shades-container">
      {#each shades as shade}
        <button
          class="shade"
          class:expanded
          style="background-color: {shade}"
          on:click={() => copyColor(shade)}
        >
          <span class="shade-label">{shade}</span>
        </button>
      {/each}
    </div>
  {/if}

  <Snackbar bind:this={snackbarWithClose}>
    <Label>Copied {color} to clipboard!</Label>
    <Actions>
      <IconButton>
        <Icon tag="svg" viewBox="0 0 24 24">
          <path fill="currentColor" d={mdiClose} />
        </Icon>
      </IconButton>
    </Actions>
  </Snackbar>
</div>

<style>
  .color-cell {
    flex: 1;
    height: 6rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--base);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .color-cell.expanded {
    min-height: 6rem;
    height: 100%;
  }

  .button-container {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .color-cell:hover .button-container {
    opacity: 1;
  }

  .button-container button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .button-container button:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  .shades-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    gap: 2px;
    padding: 4px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0 0 4px 4px;
  }

  .shade {
    flex: 1;
    height: 2rem;
    border: none;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s;
  }

  .shade.expanded {
    height: 3rem;
  }

  .shade:hover {
    transform: scale(1.1);
    z-index: 1;
  }

  .shade-label {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    opacity: 0;
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  .shade:hover .shade-label {
    opacity: 1;
  }
</style>
