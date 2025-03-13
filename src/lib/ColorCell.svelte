<script lang="ts">
  import { mdiClose, mdiContentCopy, mdiGrid } from "@mdi/js";
  import tinycolor from "tinycolor2";
  import Snackbar, { Actions, Label } from "@smui/snackbar";
  import IconButton, { Icon } from "@smui/icon-button";
  
  export let color: string;
  export let label: string;
  // Replace event dispatcher with callback prop
  export let onColorChange: (newColor: string) => void = () => {};

  let snackbarWithClose: Snackbar;
  let showShades = false;
  let shades: Array<{ hex: string; isBase: boolean }> = [];
  let baseColor: string = color;
  let copiedColor: string = color;

  function copyColor(hex: string) {
    copiedColor = hex;
    snackbarWithClose.close();
    navigator.clipboard.writeText(hex).catch((err) => {
      console.error("Failed to copy color:", err);
    });
    snackbarWithClose.forceOpen();
  }

  function generateShades(baseColor: string) {
    const color = tinycolor(baseColor);
    const hsl = color.toHsl();

    // Get the base lightness
    const baseLightness = hsl.l;

    // Total number of shades to generate (excluding base)
    const totalShades = 14;

    // Calculate number of steps for lighter and darker shades
    const stepsToWhite = Math.round(totalShades * (1 - baseLightness));
    const stepsToBlack = Math.round(totalShades * baseLightness);

    const shades = [];

    // Generate lighter shades (toward white)
    if (stepsToWhite > 0) {
      const lightnessStep = (0.97 - baseLightness) / stepsToWhite;
      for (let i = 1; i <= stepsToWhite; i++) {
        const lightness = Math.min(0.97, baseLightness + i * lightnessStep);
        const shade = tinycolor({
          h: hsl.h,
          s: hsl.s,
          l: lightness,
        }).toHexString();
        shades.unshift({ hex: shade, isBase: false });
      }
    }

    // Add base color
    shades.push({ hex: baseColor, isBase: true });

    // Generate darker shades (toward black)
    if (stepsToBlack > 0) {
      const lightnessStep = (baseLightness - 0.03) / stepsToBlack;
      for (let i = 1; i <= stepsToBlack; i++) {
        const lightness = Math.max(0.03, baseLightness - i * lightnessStep);
        const shade = tinycolor({
          h: hsl.h,
          s: hsl.s,
          l: lightness,
        }).toHexString();
        shades.push({ hex: shade, isBase: false });
      }
    }

    return shades.reverse();
  }

  function toggleShades(hex: string) {
    if (!showShades) shades = generateShades(hex);
    showShades = !showShades;
  }

  function onShadeClick(shade: string, event: MouseEvent) {
    // If shift key is pressed, just copy the color
    if (event.shiftKey) {
      copyColor(shade);
      return;
    }

    // Set it as new base color and regenerate shades
    baseColor = shade;
    shades = generateShades(baseColor);
    
    // Use callback instead of dispatch
    onColorChange(shade);
  }
</script>

<div
  class="color-cell {tinycolor(color).isLight() ? 'light' : 'dark'}"
  style="background-color: {color}"
>
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
          class="shade {shade.isBase ? 'base-shade' : ''}"
          style="background-color: {shade.hex}"
          on:click={(e) => onShadeClick(shade.hex, e)}
          title={shade.isBase ? "Base color: " + shade.hex : shade.hex}
        >
          {#if shade.isBase}
            <div class="base-indicator"></div>
          {/if}
          <span class="shade-label">{shade.hex}</span>
        </button>
      {/each}
    </div>
  {/if}

  <Snackbar bind:this={snackbarWithClose}>
    <Label>Copied {copiedColor} to clipboard!</Label>
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
    height: 8rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;

    position: relative;
  }

  .color-cell.light {
    color: #000;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
  }

  .color-cell.dark {
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
    border-radius: 0.2vw;
    padding: 0.2vw;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 2vw;
    height: 2vw;
    min-width: 24px;
    min-height: 24px;
  }

  .button-container button svg {
    width: 1.2vw;
    height: 1.2vw;
    min-width: 16px;
    min-height: 16px;
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
    border-radius: 2px;
    /*border-radius: 0 0 4px 4px;*/
    max-width: 100%;
  }

  .shade {
    flex: 1;
    height: 2rem;
    border: none;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s;
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

  .shade.base-shade {
    position: relative;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5);
  }

  .base-indicator {
    position: absolute;
    top: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
</style>
