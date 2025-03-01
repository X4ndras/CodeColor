<script lang="ts">
  import type { theme } from "../Types.svelte";

  export let colors: theme;

  let showPopup = false;
  let exportFormat = "json";
  let exportContent = "";
  let importError = "";
  let toast = { show: false, message: "", type: "success" };

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
  --color14: ${colors.color14};
  --color15: ${colors.color15};
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
    showToast("Theme downloaded successfully", "success");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(exportContent)
      .then(() => {
        showToast("Copied to clipboard", "success");
      })
      .catch(err => {
        showToast("Failed to copy to clipboard", "error");
        console.error("Copy failed:", err);
      });
  }

  function showToast(message, type = "success") {
    toast = { show: true, message, type };
    setTimeout(() => {
      toast = { ...toast, show: false };
    }, 3000);
  }

  function parseCSS(cssContent) {
    const themeData = {};
    const regex = /--(\w+):\s*([^;]+);/g;
    let match;
    
    while ((match = regex.exec(cssContent)) !== null) {
      const property = match[1];
      const value = match[2].trim();
      
      // Map CSS variables to theme properties
      if (property === "base") {
        themeData.text = value;
      } else if (property === "surface") {
        themeData.background = value;
      } else if (property.startsWith("color")) {
        themeData[property] = value;
      }
    }
    
    return themeData;
  }

  function handleFileImport(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let importedTheme;
        
        // Detect if the file is JSON or CSS
        if (file.name.endsWith('.json')) {
          importedTheme = JSON.parse(content);
        } else if (file.name.endsWith('.css')) {
          importedTheme = parseCSS(content);
        } else {
          throw new Error("Unsupported file format");
        }

        // Validate the imported theme structure
        const requiredKeys = [
          'background', 'text', 
          'color0', 'color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7',
          'color8', 'color9', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15'
        ];

        const missingKeys = requiredKeys.filter(key => !(key in importedTheme));
        
        if (missingKeys.length > 0) {
          importError = `Invalid theme format. Missing properties: ${missingKeys.join(', ')}`;
          showToast(importError, "error");
          return;
        }

        // Create a new object to trigger reactivity
        colors = { ...importedTheme };
        
        // Force update the DOM
        colors = colors;
        
        importError = "";
        showPopup = false; // Close the popup after successful import
        showToast("Theme imported successfully", "success");
      } catch (error) {
        importError = "Failed to parse file. Please check the format.";
        showToast(importError, "error");
        console.error("Import error:", error);
      }
    };

    reader.onerror = () => {
      importError = "Failed to read file. Please try again.";
      showToast(importError, "error");
    };

    reader.readAsText(file);
  }

  $: if (showPopup) {
    exportContent = exportFormat === "json" ? generateJSON() : generateCSS();
  }
</script>

<div class="export-popup">
  <button class="export-button" on:click={() => (showPopup = !showPopup)}>
    Export
  </button>
  
  <button class="import-button" on:click={() => document.getElementById('import-file')?.click()}>
    Import
    <input
      id="import-file"
      type="file"
      accept=".json,.css"
      style="display: none;"
      on:change={handleFileImport}
    />
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
      {#if importError}
        <div class="import-error">
          {importError}
        </div>
      {/if}
    </div>
  {/if}
  
  {#if toast.show}
    <div class="toast" class:toast-success={toast.type === "success"} class:toast-error={toast.type === "error"}>
      <div class="toast-icon">
        {#if toast.type === "success"}
          ✓
        {:else}
          ✗
        {/if}
      </div>
      <div class="toast-message">{toast.message}</div>
    </div>
  {/if}
</div>

<style>
  .export-popup {
    position: relative;
    display: flex;
    gap: 0.5rem;
  }

  .export-button,
  .import-button {
    background-color: var(--primary);
    border: 0px;
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .export-button:hover,
  .import-button:hover {
    background-color: var(--secondary);
  }

  .import-error {
    color: #ff4444;
    font-size: 0.8rem;
    margin-top: 0.5rem;
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
    border-color: var(--text-color);
  }

  .preview-window {
    background-color: var(--bg-color);
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

  .copy-button:hover {
    border-color: var(--text-color);
  }

  .download-button {
    background-color: var(--primary);
    color: white;
    border: none;
  }

  .download-button:hover {
    background-color: var(--secondary);
  }
  
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideUp 0.3s ease-out forwards;
  }
  
  .toast-success {
    background-color: #27c93f;
  }
  
  .toast-error {
    background-color: #ff5f56;
  }
  
  .toast-icon {
    margin-right: 0.5rem;
    font-weight: bold;
  }
  
  .toast-message {
    font-size: 0.9rem;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>
