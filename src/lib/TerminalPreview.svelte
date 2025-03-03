<script lang="ts">
  import type { theme } from "../Types.svelte";
  import { mdiArrowExpand, mdiArrowCollapse } from "@mdi/js";
  import Button from "@smui/button";
  import ColorCell from "./ColorCell.svelte";

  export let colors: theme;

  let expanded = false;

  function toggleExpand() {
    expanded = !expanded;
    // Close sidebar when expanded
    if (expanded) {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        sidebar.classList.add("sidebar-hidden");
      }
    }
  }
</script>

<div
  class="terminal"
  class:expanded
  style="--surface: {colors.background}; --base: {colors.text};"
>
  <div class="terminal-header">
    <div class="terminal-buttons">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="terminal-title">Terminal</div>
    <div class="expand-button">
      <Button onclick={toggleExpand} variant="raised">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="currentColor"
            d={expanded ? mdiArrowCollapse : mdiArrowExpand}
          />
        </svg>
      </Button>
    </div>
  </div>
  <div class="terminal-content">
    <div class="color-grid">
      <div class="color-row">
        <ColorCell color={colors.color0} label="Color 0" {expanded} />
        <ColorCell color={colors.color1} label="Color 1" {expanded} />
        <ColorCell color={colors.color2} label="Color 2" {expanded} />
        <ColorCell color={colors.color3} label="Color 3" {expanded} />
      </div>
      <div class="color-row">
        <ColorCell color={colors.color4} label="Color 4" {expanded} />
        <ColorCell color={colors.color5} label="Color 5" {expanded} />
        <ColorCell color={colors.color6} label="Color 6" {expanded} />
        <ColorCell color={colors.color7} label="Color 7" {expanded} />
      </div>
      <div class="color-row">
        <ColorCell color={colors.color8} label="Color 8" {expanded} />
        <ColorCell color={colors.color9} label="Color 9" {expanded} />
        <ColorCell color={colors.color10} label="Color 10" {expanded} />
        <ColorCell color={colors.color11} label="Color 11" {expanded} />
      </div>
      <div class="color-row">
        <ColorCell color={colors.color12} label="Color 12" {expanded} />
        <ColorCell color={colors.color13} label="Color 13" {expanded} />
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
    position: relative;
    transition: all 0.3s ease;
  }

  .terminal.expanded {
    position: fixed;
    top: 2rem;
    left: 2rem;
    right: 2rem;
    bottom: 4rem;
    z-index: 1000;
    box-shadow: 6px 4px 32px 2px #000000;
    margin: 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .expand-button {
    margin-left: auto;
    border: none;
    color: var(--base);
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
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
    padding: 1rem;
    min-height: 0; /* Important for flex children */
  }

.color-grid {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

.color-row {
    flex: 1;
    display: flex;
    gap: 0.5rem;
    min-height: 0; /* Important for flex children */
  }
</style>
