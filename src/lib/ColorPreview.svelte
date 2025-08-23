<script lang="ts">
  import { colorKeys, type ColorKey, type Theme } from "../Types.svelte";
  import ColorColumn from "./ColorColumn.svelte";
  import { darkTheme, lightTheme, darkMode } from "../stores.svelte";

  const terminalColors = colorKeys.slice(0, 16);
  const leftColumn = terminalColors.slice(0, 8); // Colors 0-7
  const rightColumn = terminalColors.slice(8, 16); // Colors 8-15
  const additionalColors = colorKeys.slice(16); // Colors 16-n

  // Split additional colors into columns
  const leftAdditionalColumn: ColorKey[] = [];
  const rightAdditionalColumn: ColorKey[] = [];

  additionalColors.forEach((color, index) => {
    if (index % 2 === 0) {
      leftAdditionalColumn.push(color);
    } else {
      rightAdditionalColumn.push(color);
    }
  });
</script>

<div class="terminal">
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
      <ColorColumn column={leftColumn} />
      <ColorColumn column={rightColumn} />
      <div>
        <div
          class="separator"
          style="background-color: {($darkMode ? $darkTheme : $lightTheme).color7};"
        ></div>
      </div>
      <div>
        <div
          class="separator"
          style="background-color: {($darkMode ? $darkTheme : $lightTheme).color15};"
        ></div>
      </div>
      <ColorColumn column={leftAdditionalColumn} />
      <ColorColumn column={rightAdditionalColumn} />
    </div>
  </div>
</div>

<style>
  .separator {
    border-radius: 18px;
    height: 0.5rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .terminal {
    /*background-color: var(--surface);*/
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    position: relative;
    transition: all 0.3s ease;
  }

  .terminal-header {
    background-color: #181818;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
    font-size: 1.2rem;
  }

  .terminal-content {
    flex: 1;
    padding: 0rem;
    min-height: 0; /* Important for flex children */
  }

  .color-grid {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>
