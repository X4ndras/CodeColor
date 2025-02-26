<script lang="ts">
  export let colors: {
    base: string;
    color0: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    surface: string;
    color7: string;
    color8: string;
    color9: string;
    color10: string;
    color11: string;
    color12: string;
    color13: string;
  };
</script>

<div class="terminal" style="--surface: {colors.surface}; --base: {colors.base};">
  <div class="terminal-header">
    <div class="terminal-buttons">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="terminal-title">Terminal</div>
  </div>
  <div class="terminal-content">
    <div class="color-grid">
      <div class="color-row">
        <div class="color-cell" style="background-color: {colors.color0}">Color 0</div>
        <div class="color-cell" style="background-color: {colors.color1}">Color 1</div>
        <div class="color-cell" style="background-color: {colors.color2}">Color 2</div>
        <div class="color-cell" style="background-color: {colors.color3}">Color 3</div>
      </div>
      <div class="color-row">
        <div class="color-cell" style="background-color: {colors.color4}">Color 4</div>
        <div class="color-cell" style="background-color: {colors.color5}">Color 5</div>
        <div class="color-cell" style="background-color: {colors.color6}">Color 6</div>
        <div class="color-cell" style="background-color: {colors.color7}">Color 7</div>
      </div>
      <div class="color-row">
        <div class="color-cell" style="background-color: {colors.color8}">Color 8</div>
        <div class="color-cell" style="background-color: {colors.color9}">Color 9</div>
        <div class="color-cell" style="background-color: {colors.color10}">Color 10</div>
        <div class="color-cell" style="background-color: {colors.color11}">Color 11</div>
      </div>
      <div class="color-row">
        <div class="color-cell" style="background-color: {colors.color12}">Color 12</div>
        <div class="color-cell" style="background-color: {colors.color13}">Color 13</div>
      </div>
    </div>
  </div>
</div>

<style>
  .terminal {
    background-color: var(--surface);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

  .terminal-header {
    background-color: #2d2d2d;
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  .terminal-buttons {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
  }

  .terminal-buttons span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ff5f56;
  }

  .terminal-buttons span:nth-child(2) {
    background-color: #ffbd2e;
  }

  .terminal-buttons span:nth-child(3) {
    background-color: #27c93f;
  }

  .terminal-title {
    color: #fff;
    font-size: 0.9rem;
  }

  .terminal-content {
    padding: 1rem;
  }

  .color-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .color-row {
    display: flex;
    gap: 0.5rem;
  }

  .color-cell {
    flex: 1;
    height: 60px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--base);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
</style>