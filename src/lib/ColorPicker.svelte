<script lang="ts">
  import { onMount } from 'svelte';
  import tinycolor from 'tinycolor2';
  import {
    type ColorMode,
    formatColor,
    parseToHex,
    getColorComponents,
    getAllHarmonies,
    checkContrast,
    hexToCmyk,
    cmykToHex,
    type ColorHarmony,
    type ContrastResult,
  } from './colorUtils';

  // Props
  export let value: string = '#ff0000';
  export let label: string = '';
  export let onChange: (color: string) => void = () => {};
  export let backgroundColorForContrast: string | null = null;

  // State
  let isOpen = false;
  let pickerRef: HTMLDivElement;
  let triggerRef: HTMLButtonElement;
  let canvasRef: HTMLCanvasElement;
  let hueSliderRef: HTMLInputElement;
  let popupStyle = '';
  
  let colorMode: ColorMode = 'hex';
  let inputValue: string = value;
  let harmonies: ColorHarmony[] = [];
  let contrastResult: ContrastResult | null = null;
  
  // HSV values for the picker
  let hue = 0;
  let saturation = 100;
  let brightness = 100;

  // Initialize from value
  $: {
    if (value && !isOpen) {
      const color = tinycolor(value);
      const hsv = color.toHsv();
      hue = hsv.h;
      saturation = hsv.s * 100;
      brightness = hsv.v * 100;
      inputValue = formatColor(value, colorMode);
    }
  }

  // Update harmonies when color changes
  $: {
    harmonies = getAllHarmonies(value);
  }

  // Update contrast when colors change
  $: {
    if (backgroundColorForContrast) {
      contrastResult = checkContrast(value, backgroundColorForContrast);
    } else {
      contrastResult = null;
    }
  }

  function updateFromHsv() {
    const color = tinycolor({ h: hue, s: saturation / 100, v: brightness / 100 });
    const hex = color.toHexString();
    value = hex;
    inputValue = formatColor(hex, colorMode);
    onChange(hex);
    drawGradient();
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    inputValue = target.value;
    
    const hex = parseToHex(inputValue);
    if (hex) {
      value = hex;
      const color = tinycolor(hex);
      const hsv = color.toHsv();
      hue = hsv.h;
      saturation = hsv.s * 100;
      brightness = hsv.v * 100;
      onChange(hex);
      drawGradient();
    }
  }

  function handleHueChange(e: Event) {
    const target = e.target as HTMLInputElement;
    hue = parseFloat(target.value);
    updateFromHsv();
  }

  function handleCanvasClick(e: MouseEvent) {
    if (!canvasRef) return;
    
    const rect = canvasRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    saturation = (x / rect.width) * 100;
    brightness = 100 - (y / rect.height) * 100;
    
    updateFromHsv();
  }

  function handleCanvasDrag(e: MouseEvent) {
    if (e.buttons !== 1) return;
    handleCanvasClick(e);
  }

  function drawGradient() {
    if (!canvasRef) return;
    
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;
    
    const width = canvasRef.width;
    const height = canvasRef.height;
    
    // Draw saturation gradient (left to right)
    const satGradient = ctx.createLinearGradient(0, 0, width, 0);
    satGradient.addColorStop(0, '#ffffff');
    satGradient.addColorStop(1, tinycolor({ h: hue, s: 1, v: 1 }).toHexString());
    ctx.fillStyle = satGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw brightness gradient (top to bottom)
    const valGradient = ctx.createLinearGradient(0, 0, 0, height);
    valGradient.addColorStop(0, 'rgba(0,0,0,0)');
    valGradient.addColorStop(1, '#000000');
    ctx.fillStyle = valGradient;
    ctx.fillRect(0, 0, width, height);
  }

  function selectHarmonyColor(hex: string) {
    value = hex;
    const color = tinycolor(hex);
    const hsv = color.toHsv();
    hue = hsv.h;
    saturation = hsv.s * 100;
    brightness = hsv.v * 100;
    inputValue = formatColor(hex, colorMode);
    onChange(hex);
    drawGradient();
  }

  function handleColorModeChange(mode: ColorMode) {
    colorMode = mode;
    inputValue = formatColor(value, mode);
  }

  function calculatePopupPosition() {
    if (!triggerRef) return;
    
    const rect = triggerRef.getBoundingClientRect();
    const popupWidth = 280;
    const popupHeight = 500; // approximate max height
    
    let top = rect.bottom + 4;
    let left = rect.left;
    
    // Check if popup would overflow right edge
    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth - 16;
    }
    
    // Check if popup would overflow bottom edge
    if (top + popupHeight > window.innerHeight) {
      // Position above the trigger instead
      top = rect.top - popupHeight - 4;
      if (top < 0) {
        // If still doesn't fit, just position at top with scroll
        top = 8;
      }
    }
    
    popupStyle = `top: ${top}px; left: ${left}px;`;
  }

  function togglePicker() {
    isOpen = !isOpen;
    if (isOpen) {
      calculatePopupPosition();
      setTimeout(() => {
        drawGradient();
      }, 0);
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (pickerRef && !pickerRef.contains(e.target as Node)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  // Component-specific color inputs
  function handleRgbInput(component: 'r' | 'g' | 'b', e: Event) {
    const target = e.target as HTMLInputElement;
    const val = Math.min(255, Math.max(0, parseInt(target.value) || 0));
    const color = tinycolor(value);
    const rgb = color.toRgb();
    rgb[component] = val;
    const newColor = tinycolor(rgb).toHexString();
    value = newColor;
    const hsv = tinycolor(newColor).toHsv();
    hue = hsv.h;
    saturation = hsv.s * 100;
    brightness = hsv.v * 100;
    inputValue = formatColor(newColor, colorMode);
    onChange(newColor);
    drawGradient();
  }

  function handleHslInput(component: 'h' | 's' | 'l', e: Event) {
    const target = e.target as HTMLInputElement;
    const color = tinycolor(value);
    const hsl = color.toHsl();
    if (component === 'h') {
      hsl.h = Math.min(360, Math.max(0, parseInt(target.value) || 0));
    } else {
      hsl[component] = Math.min(100, Math.max(0, parseInt(target.value) || 0)) / 100;
    }
    const newColor = tinycolor(hsl).toHexString();
    value = newColor;
    const hsv = tinycolor(newColor).toHsv();
    hue = hsv.h;
    saturation = hsv.s * 100;
    brightness = hsv.v * 100;
    inputValue = formatColor(newColor, colorMode);
    onChange(newColor);
    drawGradient();
  }

  function handleCmykInput(component: 'c' | 'm' | 'y' | 'k', e: Event) {
    const target = e.target as HTMLInputElement;
    const val = Math.min(100, Math.max(0, parseInt(target.value) || 0));
    const cmyk = hexToCmyk(value);
    cmyk[component] = val;
    const newColor = cmykToHex(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    value = newColor;
    const hsv = tinycolor(newColor).toHsv();
    hue = hsv.h;
    saturation = hsv.s * 100;
    brightness = hsv.v * 100;
    inputValue = formatColor(newColor, colorMode);
    onChange(newColor);
    drawGradient();
  }

  // Get current component values for display
  $: rgbComponents = getColorComponents(value, 'rgb');
  $: hslComponents = getColorComponents(value, 'hsl');
  $: cmykComponents = getColorComponents(value, 'cmyk');
</script>

<div class="color-picker-wrapper" bind:this={pickerRef}>
  <button
    class="color-trigger"
    style="background-color: {value}"
    on:click|stopPropagation={togglePicker}
    title={label || 'Pick a color'}
    bind:this={triggerRef}
  >
    <span class="color-trigger-label {tinycolor(value).isLight() ? 'light' : 'dark'}">
      {formatColor(value, colorMode)}
    </span>
  </button>

  {#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="picker-popup" style={popupStyle} on:click|stopPropagation>
      {#if label}
        <div class="picker-header">{label}</div>
      {/if}

      <!-- Color gradient area -->
      <div class="gradient-wrapper">
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
        <canvas
          bind:this={canvasRef}
          width="240"
          height="160"
          class="gradient-canvas"
          on:click={handleCanvasClick}
          on:mousemove={handleCanvasDrag}
        ></canvas>
        <div
          class="gradient-cursor"
          style="left: {saturation}%; top: {100 - brightness}%"
        ></div>
      </div>

      <!-- Hue slider -->
      <div class="hue-slider-wrapper">
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={hue}
          on:input={handleHueChange}
          class="hue-slider"
          bind:this={hueSliderRef}
        />
      </div>

      <!-- Color mode tabs -->
      <div class="mode-tabs">
        {#each (['hex', 'rgb', 'hsl', 'cmyk'] as const) as mode}
          <button
            class="mode-tab {colorMode === mode ? 'active' : ''}"
            on:click={() => handleColorModeChange(mode)}
          >
            {mode.toUpperCase()}
          </button>
        {/each}
      </div>

      <!-- Input fields based on mode -->
      <div class="input-area">
        {#if colorMode === 'hex'}
          <input
            type="text"
            value={inputValue}
            on:input={handleInputChange}
            class="hex-input"
            placeholder="#000000"
          />
        {:else if colorMode === 'rgb'}
          <div class="component-inputs">
            <label>
              R
              <input type="number" min="0" max="255" value={rgbComponents.r} on:input={(e) => handleRgbInput('r', e)} />
            </label>
            <label>
              G
              <input type="number" min="0" max="255" value={rgbComponents.g} on:input={(e) => handleRgbInput('g', e)} />
            </label>
            <label>
              B
              <input type="number" min="0" max="255" value={rgbComponents.b} on:input={(e) => handleRgbInput('b', e)} />
            </label>
          </div>
        {:else if colorMode === 'hsl'}
          <div class="component-inputs">
            <label>
              H
              <input type="number" min="0" max="360" value={hslComponents.h} on:input={(e) => handleHslInput('h', e)} />
            </label>
            <label>
              S
              <input type="number" min="0" max="100" value={hslComponents.s} on:input={(e) => handleHslInput('s', e)} />
            </label>
            <label>
              L
              <input type="number" min="0" max="100" value={hslComponents.l} on:input={(e) => handleHslInput('l', e)} />
            </label>
          </div>
        {:else if colorMode === 'cmyk'}
          <div class="component-inputs cmyk">
            <label>
              C
              <input type="number" min="0" max="100" value={cmykComponents.c} on:input={(e) => handleCmykInput('c', e)} />
            </label>
            <label>
              M
              <input type="number" min="0" max="100" value={cmykComponents.m} on:input={(e) => handleCmykInput('m', e)} />
            </label>
            <label>
              Y
              <input type="number" min="0" max="100" value={cmykComponents.y} on:input={(e) => handleCmykInput('y', e)} />
            </label>
            <label>
              K
              <input type="number" min="0" max="100" value={cmykComponents.k} on:input={(e) => handleCmykInput('k', e)} />
            </label>
          </div>
        {/if}
      </div>

      <!-- Contrast checker -->
      {#if contrastResult}
        <div class="contrast-section">
          <div class="contrast-header">Contrast</div>
          <div class="contrast-info">
            <span class="contrast-ratio">{contrastResult.ratio}:1</span>
            <span class="contrast-level {contrastResult.level.toLowerCase().replace(' ', '-')}">
              {contrastResult.level}
            </span>
          </div>
        </div>
      {/if}

      <!-- Color harmonies -->
      <div class="harmonies-section">
        <div class="harmonies-header">Color Harmonies</div>
        {#each harmonies as harmony}
          <div class="harmony-row">
            <span class="harmony-name" title={harmony.description}>{harmony.name}</span>
            <div class="harmony-colors">
              {#each harmony.colors as harmonyColor}
                <button
                  class="harmony-swatch {harmonyColor === value ? 'active' : ''}"
                  style="background-color: {harmonyColor}"
                  on:click={() => selectHarmonyColor(harmonyColor)}
                  title={harmonyColor}
                  aria-label="Select harmony color {harmonyColor}"
                ></button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .color-picker-wrapper {
    position: relative;
    display: inline-block;
  }

  .color-trigger {
    width: 2.5rem;
    height: 2.8rem;
    border: 2px solid var(--fg2, #666);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;
  }

  .color-trigger:hover {
    border-color: var(--fg1, #888);
  }

  .color-trigger-label {
    display: none;
  }

  .picker-popup {
    position: fixed;
    z-index: 10000;
    background: var(--bg1, #2c313a);
    border: 1px solid var(--fg2, #666);
    border-radius: 8px;
    padding: 12px;
    min-width: 264px;
    max-width: 300px;
    max-height: calc(100vh - 32px);
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .picker-header {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--fg0, #dcdfe4);
  }

  .gradient-wrapper {
    position: relative;
    width: 240px;
    height: 160px;
    border-radius: 4px;
    overflow: hidden;
  }

  .gradient-canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }

  .gradient-cursor {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0, 0, 0, 0.3);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .hue-slider-wrapper {
    margin-top: 10px;
  }

  .hue-slider {
    width: 100%;
    height: 12px;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 6px;
    background: linear-gradient(to right,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    outline: none;
    cursor: pointer;
  }

  .hue-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    border: 2px solid #333;
    cursor: grab;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .hue-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    border: 2px solid #333;
    cursor: grab;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .mode-tabs {
    display: flex;
    gap: 4px;
    margin-top: 10px;
  }

  .mode-tab {
    flex: 1;
    padding: 4px 8px;
    font-size: 0.7rem;
    font-weight: 600;
    background: var(--bg2, #353b45);
    border: none;
    border-radius: 4px;
    color: var(--fg1, #9da5b4);
    cursor: pointer;
    transition: all 0.2s;
  }

  .mode-tab:hover {
    background: var(--bg0, #21252b);
  }

  .mode-tab.active {
    background: var(--color5, #c678dd);
    color: var(--bg0, #21252b);
  }

  .input-area {
    margin-top: 10px;
  }

  .hex-input {
    width: 100%;
    padding: 8px;
    font-size: 0.9rem;
    font-family: 'JetBrains Mono', monospace;
    background: var(--bg0, #21252b);
    border: 1px solid var(--fg2, #666);
    border-radius: 4px;
    color: var(--fg0, #dcdfe4);
    box-sizing: border-box;
  }

  .hex-input:focus {
    outline: none;
    border-color: var(--color5, #c678dd);
  }

  .component-inputs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .component-inputs.cmyk {
    grid-template-columns: repeat(4, 1fr);
  }

  .component-inputs label {
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--fg1, #9da5b4);
  }

  .component-inputs input {
    width: 100%;
    padding: 6px;
    font-size: 0.85rem;
    font-family: 'JetBrains Mono', monospace;
    background: var(--bg0, #21252b);
    border: 1px solid var(--fg2, #666);
    border-radius: 4px;
    color: var(--fg0, #dcdfe4);
    box-sizing: border-box;
    margin-top: 2px;
  }

  .component-inputs input:focus {
    outline: none;
    border-color: var(--color5, #c678dd);
  }

  /* Remove number input spinners */
  .component-inputs input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .component-inputs input[type="number"]::-webkit-outer-spin-button,
  .component-inputs input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .contrast-section {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--fg2, #444);
  }

  .contrast-header {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fg1, #9da5b4);
    margin-bottom: 6px;
  }

  .contrast-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .contrast-ratio {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--fg0, #dcdfe4);
  }

  .contrast-level {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .contrast-level.aaa {
    background: #2ecc71;
    color: #000;
  }

  .contrast-level.aa {
    background: #3498db;
    color: #fff;
  }

  .contrast-level.aa-large {
    background: #f39c12;
    color: #000;
  }

  .contrast-level.fail {
    background: #e74c3c;
    color: #fff;
  }

  .harmonies-section {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid var(--fg2, #444);
  }

  .harmonies-header {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--fg1, #9da5b4);
    margin-bottom: 8px;
  }

  .harmony-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .harmony-name {
    font-size: 0.7rem;
    color: var(--fg1, #9da5b4);
    cursor: help;
  }

  .harmony-colors {
    display: flex;
    gap: 4px;
  }

  .harmony-swatch {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .harmony-swatch:hover {
    transform: scale(1.15);
  }

  .harmony-swatch.active {
    border-color: white;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1024px) {
    .color-trigger {
      width: 2rem;
      height: 2.3rem;
    }

    .picker-popup {
      min-width: 220px;
      padding: 10px;
    }

    .gradient-wrapper {
      width: 196px;
      height: 130px;
    }

    .gradient-canvas {
      width: 196px;
      height: 130px;
    }
  }
</style>
