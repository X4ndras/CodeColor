<script lang="ts">
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import css from "highlight.js/lib/languages/css";
  import { colorStore } from "../stores.svelte";
  import Button, { Group, Icon, Label } from "@smui/button";
  import {
    mdiContentCopy,
    mdiDownload,
    mdiFileExport,
    mdiFileImport,
  } from "@mdi/js";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import { onMount } from "svelte";

  let exportFormat = $state("json");
  let exportContent = $state("");
  let importError = "";
  let toast = $state({ show: false, message: "", type: "success" });
  let openDialog = $state(false);

  function changeExportContent(format: string) {
    exportFormat = format;
    exportFormat === "json" ? generateJSON() : generateCSS();
  }

  function generateJSON() {
    const jsonString = JSON.stringify($colorStore, null, 2);
    exportContent = hljs.highlight(jsonString, { language: "json" }).value;
  }

  function generateCSS() {
    const cssProperties = Object.entries($colorStore)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    const cssString = `:root {\n${cssProperties}\n}`;
    exportContent = hljs.highlight(cssString, { language: "css" }).value;
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
    navigator.clipboard
      .writeText(exportContent)
      .then(() => {
        showToast("Copied to clipboard", "success");
      })
      .catch((err) => {
        showToast("Failed to copy to clipboard", "error");
        console.error("Copy failed:", err);
      });
  }

  function showToast(message: any, type = "success") {
    toast = { show: true, message, type };
    setTimeout(() => {
      toast = { ...toast, show: false };
    }, 3000);
  }

  function parseCSS(cssContent: any) {
    const themeData: Record<string, string> = {};
    const regex = /--(\w+):\s*([^;]+);/g;
    let match;

    while ((match = regex.exec(cssContent)) !== null) {
      const themeProperty: string = match[1] as string;
      const themeValue = match[2].trim();
      themeData[themeProperty] = themeValue;
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
        if (file.name.endsWith(".json")) {
          importedTheme = JSON.parse(content);
        } else if (file.name.endsWith(".css")) {
          importedTheme = parseCSS(content);
        } else {
          throw new Error("Unsupported file format");
        }

        // Validate the imported theme structure
        const requiredKeys = [
          "background",
          "text",
          "color0",
          "color1",
          "color2",
          "color3",
          "color4",
          "color5",
          "color6",
          "color7",
          "color8",
          "color9",
          "color10",
          "color11",
          "color12",
          "color13",
          "color14",
          "color15",
        ];

        const missingKeys = requiredKeys.filter(
          (key) => !(key in importedTheme),
        );

        if (missingKeys.length > 0) {
          importError = `Invalid theme format. Missing properties: ${missingKeys.join(", ")}`;
          showToast(importError, "error");
          return;
        }

        // Create a new object to trigger reactivity
        $colorStore = { ...importedTheme };

        importError = "";
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

  onMount(() => {
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("css", css);
    // Set initial content after languages are registered
    generateJSON();
  });
</script>

<Dialog bind:open={openDialog} surface$style="max-height: 80vh">
  <Title>Export Theme</Title>
  <Content>
    <Group variant="outlined">
      <Button
        class="format-button"
        variant="outlined"
        color={exportFormat === "json" ? "primary" : "secondary"}
        onclick={() => changeExportContent("json")}
      >
        <Label>JSON</Label>
      </Button>
      <Button
        class="format-button"
        variant="outlined"
        color={exportFormat === "css" ? "primary" : "secondary"}
        onclick={() => changeExportContent("css")}
      >
        <Label>CSS</Label>
      </Button>
    </Group>
    <div class="preview-window">
      <pre><code>{@html exportContent}</code></pre>
    </div>
  </Content>
  <Actions>
    <Button variant="raised" color="secondary" onclick={copyToClipboard}>
      <Icon tag="svg" viewBox="0 0 24 24">
        <path fill="currentColor" d={mdiContentCopy} />
      </Icon>
      <Label>Copy to Clipboard</Label>
    </Button>
    <Button variant="raised" onclick={downloadFile}>
      <Icon tag="svg" viewBox="0 0 24 24">
        <path fill="currentColor" d={mdiDownload} />
      </Icon>
      <Label>Download</Label>
    </Button>
  </Actions>
</Dialog>

<div class="export-import-buttons">
  <Button
    class="import-button"
    onclick={() => document.getElementById("import-file")?.click()}
    variant="raised"
    color="secondary"
  >
    <Icon tag="svg" viewBox="0 0 24 24">
      <path fill="currentcolor" d={mdiFileImport} />
    </Icon>
    <Label>Import</Label>
    <input
      id="import-file"
      type="file"
      accept=".json,.css"
      style="display: none;"
      onchange={handleFileImport}
    />
  </Button>

  <Button
    class="export-button"
    onclick={() => {
      openDialog = !openDialog;
      generateJSON();
    }}
    variant="raised"
  >
    <Icon tag="svg" viewBox="0 0 24 24">
      <path fill="currentcolor" d={mdiFileExport} />
    </Icon>
    <Label>Export</Label>
  </Button>

  {#if toast.show}
    <div
      class="toast"
      class:toast-success={toast.type === "success"}
      class:toast-error={toast.type === "error"}
    >
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
  .preview-window {
    background-color: var(--bg-color);
    padding-top: 0.5rem;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    max-height: 50vh; /* Set a maximum height */
    overflow-y: auto; /* Add vertical scroll to preview window */
  }

  :global(.mdc-dialog__content) {
    margin: 0 !important;
    padding: 0.5rem !important;
    overflow: hidden !important;
  }

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9rem;
    color: var(--text-color);
    background: #000;
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
