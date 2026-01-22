<script lang="ts">
  import { checkContrast, suggestAccessibleColor, type ContrastResult } from './colorUtils';
  import { darkMode, darkTheme, lightTheme } from '../stores.svelte';
  import type { Theme } from '../Types.svelte';

  // Get foreground and background colors from current theme
  $: theme = $darkMode ? $darkTheme : $lightTheme;
  
  // Default pairs to check
  interface ContrastPair {
    name: string;
    fg: keyof Theme;
    bg: keyof Theme;
    result: ContrastResult;
  }

  $: pairs = ([
    { name: 'Text on Background', fg: 'color15' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Muted on Background', fg: 'fg2' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Comment on Background', fg: 'color8' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Text on Surface', fg: 'color15' as keyof Theme, bg: 'bg1' as keyof Theme },
    { name: 'Red on Background', fg: 'color1' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Green on Background', fg: 'color2' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Yellow on Background', fg: 'color3' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Blue on Background', fg: 'color4' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Magenta on Background', fg: 'color5' as keyof Theme, bg: 'color0' as keyof Theme },
    { name: 'Cyan on Background', fg: 'color6' as keyof Theme, bg: 'color0' as keyof Theme },
  ] as const).map(pair => ({
    ...pair,
    result: checkContrast(theme[pair.fg], theme[pair.bg])
  })) as ContrastPair[];

  function getLevelClass(level: string): string {
    return level.toLowerCase().replace(' ', '-');
  }

  function handleSuggestFix(pair: ContrastPair) {
    const suggested = suggestAccessibleColor(theme[pair.fg], theme[pair.bg], 4.5);
    if ($darkMode) {
      $darkTheme = { ...$darkTheme, [pair.fg]: suggested };
    } else {
      $lightTheme = { ...$lightTheme, [pair.fg]: suggested };
    }
  }
</script>

<div class="contrast-checker">
  <h3 class="checker-title">Contrast Checker</h3>
  <p class="checker-description">WCAG 2.1 contrast ratio requirements</p>
  
  <div class="pairs-list">
    {#each pairs as pair}
      <div class="pair-row">
        <div class="pair-preview" style="background-color: {theme[pair.bg]}">
          <span style="color: {theme[pair.fg]}">Aa</span>
        </div>
        <div class="pair-info">
          <span class="pair-name">{pair.name}</span>
          <div class="pair-stats">
            <span class="ratio">{pair.result.ratio}:1</span>
            <span class="level {getLevelClass(pair.result.level)}">
              {pair.result.level}
            </span>
          </div>
        </div>
        {#if pair.result.level === 'Fail' || pair.result.level === 'AA Large'}
          <button 
            class="fix-button" 
            on:click={() => handleSuggestFix(pair)}
            title="Auto-fix to meet AA contrast"
          >
            Fix
          </button>
        {/if}
      </div>
    {/each}
  </div>

  <div class="legend">
    <div class="legend-item">
      <span class="level aaa">AAA</span>
      <span>7:1+ (Enhanced)</span>
    </div>
    <div class="legend-item">
      <span class="level aa">AA</span>
      <span>4.5:1+ (Normal text)</span>
    </div>
    <div class="legend-item">
      <span class="level aa-large">AA Large</span>
      <span>3:1+ (Large text only)</span>
    </div>
    <div class="legend-item">
      <span class="level fail">Fail</span>
      <span>Below 3:1</span>
    </div>
  </div>
</div>

<style>
  .contrast-checker {
    padding: 1rem;
  }

  .checker-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: var(--fg0, #dcdfe4);
  }

  .checker-description {
    font-size: 0.75rem;
    color: var(--fg2, #7f848e);
    margin: 0 0 1rem 0;
  }

  .pairs-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pair-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: var(--bg1, #2c313a);
    border-radius: 4px;
  }

  .pair-preview {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  .pair-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .pair-name {
    font-size: 0.8rem;
    color: var(--fg1, #9da5b4);
  }

  .pair-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ratio {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--fg0, #dcdfe4);
  }

  .level {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .level.aaa {
    background: #2ecc71;
    color: #000;
  }

  .level.aa {
    background: #3498db;
    color: #fff;
  }

  .level.aa-large {
    background: #f39c12;
    color: #000;
  }

  .level.fail {
    background: #e74c3c;
    color: #fff;
  }

  .fix-button {
    padding: 4px 10px;
    font-size: 0.7rem;
    font-weight: 600;
    background: var(--color5, #c678dd);
    color: var(--bg0, #21252b);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .fix-button:hover {
    opacity: 0.8;
  }

  .legend {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--fg2, #444);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    color: var(--fg1, #9da5b4);
  }
</style>
