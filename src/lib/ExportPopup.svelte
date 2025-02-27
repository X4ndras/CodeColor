<script lang="ts">
  import type { theme } from "../Types.svelte";

  export let colors: theme;

  let showPopup = false;
  let exportFormat = "json";
  let exportContent = "";

  function generateJSON() {
    return JSON.stringify(colors, null, 2);
  }

  function generateCSS() {
    return `:root {
  --base: ${colors.text};
  --color0: ${colors.color0};
  --color1: ${colors.color1};
  --color2: ${colors.color2};
  --color3: ${colors.color3};
  --color4: ${colors.color4};
  --color5: ${colors.color5};
  --color6: ${colors.color6};
  --surface: ${colors.background};
  --color7: ${colors.color7};
  --color8: ${colors.color8};
  --color9: ${colors.color9};
  --color10: ${colors.color10};
  --color11: ${colors.color11};
  --color12: ${colors.color12};
  --color13: ${colors.color13};
}`;
  }

  function downloadFile() {
    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `colors.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(exportContent);
  }

  $: if (showPopup) {
    exportContent = exportFormat === "json" ? generateJSON() : generateCSS();
  }
</script>

<div class="export-popup">
  <button class="export-button" on:click={() => (showPopup = !showPopup)}>
    Export
  </button>

  {#if showPopup}
    <div class="popup-content">
      <div class="format-selector">
        <button
          class="format-button"
          class:active={exportFormat === "json"}
          on:click={() => (exportFormat = "json")}
        >
          JSON
        </button>
        <button
          class="format-button"
          class:active={exportFormat === "css"}
          on:click={() => (exportFormat = "css")}
        >
          CSS
        </button>
      </div>

      <div class="preview-window">
        <pre>{exportContent}</pre>
      </div>

      <div class="button-group">
        <button class="download-button" on:click={downloadFile}>
          Download
        </button>
        <button class="copy-button" on:click={copyToClipboard}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .export-popup {
    position: relative;
  }

  .export-button {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .popup-content {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    margin-top: 0.5rem;
    width: 400px;
    z-index: 1000;
  }

  .format-selector {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .format-button {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    background-color: var(--card-bg);
    color: var(--text-color);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .format-button.active {
    background-color: var(--surface);
    border-color: var(--text-color);
  }

  .preview-window {
    background-color: var(--surface);
    padding: 1rem;
    border-radius: 4px;
    max-height: 300px;
    overflow: auto;
    margin-bottom: 1rem;
  }

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    color: var(--text-color);
  }

  .button-group {
    display: flex;
    gap: 0.5rem;
  }

  .copy-button,
  .download-button {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    border-radius: 4px;
    cursor: pointer;
  }

  .copy-button {
    background-color: var(--surface);
  }

  .download-button {
    background-color: #0066cc;
    color: white;
    border: none;
  }

  .download-button:hover {
    background-color: #0052a3;
  }
</style>
