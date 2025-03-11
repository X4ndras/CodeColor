<script lang="ts">
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import css from "highlight.js/lib/languages/css";
  import { colorStore, darkMode } from "../stores.svelte";
  import { colorKeys } from "../Types.svelte";
  import Button, { Group, Icon, Label } from "@smui/button";
  import {
    mdiContentCopy,
    mdiDownload,
    mdiFileExport,
    mdiFileImport,
  } from "@mdi/js";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import { onMount } from "svelte";
  import Snackbar, {
    Actions as SnackbarActions,
    Label as SnackbarLabel,
  } from "@smui/snackbar";

  let exportFormat = $state("json");
  let exportContent = $state("");
  let rawExportContent = $state(""); // Add this to store raw content
  let importError = "";
  let snackbar = $state({ message: "", type: "success" });
  let openDialog = $state(false);
  let previewWindow: HTMLElement;
  let snackbarWithOpen: Snackbar;

  function changeExportContent(format: string) {
    exportFormat = format;
    exportFormat === "json" ? generateJSON() : generateCSS();
  }

  function generateJSON() {
    const jsonString = JSON.stringify($colorStore, null, 2);
    rawExportContent = jsonString; // Store the raw content
    exportContent = hljs.highlight(jsonString, { language: "json" }).value;
  }

  function generateCSS() {
    const cssProperties = Object.entries($colorStore)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");

    const cssString = `:root {\n${cssProperties}\n}`;
    rawExportContent = cssString; // Store the raw content
    exportContent = hljs.highlight(cssString, { language: "css" }).value;
  }

  function downloadFile() {
    // Use the raw content instead of the highlighted HTML
    const blob = new Blob([rawExportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `colors.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSnackbar("Theme downloaded successfully", "success");
  }

  function copyToClipboard() {
    // Use the raw content for clipboard too
    navigator.clipboard
      .writeText(rawExportContent)
      .then(() => {
        showSnackbar("Copied to clipboard", "success");
      })
      .catch((err) => {
        showSnackbar("Failed to copy to clipboard", "error");
        console.error("Copy failed:", err);
      });
  }

  function showSnackbar(message: any, type = "success") {
    snackbarWithOpen.close();
    snackbar = { message, type };
    snackbarWithOpen.forceOpen();
  }

  function parseCSS(cssContent: any) {
    const themeData: Record<string, string> = {};
    const regex = /--(\w+):\s*([^;]+);/g;
    let match;

    while ((match = regex.exec(cssContent)) !== null) {
      // Remove the "--" prefix that was added during export
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

        // Get all required keys from colorKeys array
        const requiredKeys = colorKeys.map((colorKey) => colorKey.key);

        // Check for missing keys
        const missingKeys = requiredKeys.filter(
          (key) => !(key in importedTheme),
        );

        if (missingKeys.length > 0) {
          importError = `Invalid theme format. Missing properties: ${missingKeys.join(", ")}`;
          showSnackbar(importError, "error");
          return;
        }

        // Create a new object to trigger reactivity
        $colorStore = { ...importedTheme };

        importError = "";
        showSnackbar("Theme imported successfully", "success");
      } catch (error) {
        importError = "Failed to parse file. Please check the format.";
        showSnackbar(importError, "error");
        console.error("Import error:", error);
      }
    };

    reader.onerror = () => {
      importError = "Failed to read file. Please try again.";
      showSnackbar(importError, "error");
    };

    reader.readAsText(file);
  }

  // Update preview window background color based on theme
  $effect(() => {
    if (previewWindow && $colorStore) {
      if ($darkMode) {
        previewWindow.style.backgroundColor = $colorStore.bg0;
      } else {
        previewWindow.style.backgroundColor = $colorStore.fg0;
      }
    }
  });

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
    <div class="preview-window" bind:this={previewWindow}>
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

  <Snackbar
    bind:this={snackbarWithOpen}
    class={snackbar.type === "error" ? "error-snackbar" : ""}
  >
    <SnackbarLabel>{snackbar.message}</SnackbarLabel>
    <SnackbarActions>
      <Button>Dismiss</Button>
    </SnackbarActions>
  </Snackbar>
</div>

<style>
  .preview-window {
    padding-top: 0.5rem;
    border-radius: 16px;
    max-height: 50vh; /* Set a maximum height */
    overflow-y: auto; /* Add vertical scroll to preview window */
    padding: 1rem;
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
  }

  :global(.error-snackbar) {
    --mdc-snackbar-container-color: #ff5f56;
  }
</style>
