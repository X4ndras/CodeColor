<script lang="ts">
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import { colorStore, darkMode, syntaxMapping } from "../stores.svelte";
  import { colorKeys, type ColorConfig } from "../Types.svelte";
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

  let exportContent = $state("");
  let rawExportContent = $state(""); // Store raw content
  let importError = "";
  let snackbar = $state({ message: "", type: "success" });
  let openDialog = $state(false);
  let previewWindow: HTMLElement;
  let snackbarWithOpen: Snackbar;

  function generateJSON() {
    const config: ColorConfig = {
      colors: $colorStore,
      mappings: {
          comment: $syntaxMapping.comment,
          keyword: $syntaxMapping.keyword,
          string: $syntaxMapping.string,
          number: $syntaxMapping.number,
          variable: $syntaxMapping.variable,
          fn: $syntaxMapping.function,
          type: $syntaxMapping.type,
          class: $syntaxMapping.class,
          parameter: $syntaxMapping.parameter,
          operator: $syntaxMapping.operator,
          builtin: $syntaxMapping.builtin,
          property: $syntaxMapping.property,
      }
    };
    const jsonString = JSON.stringify(config, null, 2);
    rawExportContent = jsonString; // Store the raw content
    exportContent = hljs.highlight(jsonString, { language: "json" }).value;
  }

  function downloadFile() {
    // Use the raw content instead of the highlighted HTML
    const blob = new Blob([rawExportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `colors.json`;
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

  function handleFileImport(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        // Check if the imported file has the expected ColorConfig structure
        if (!parsedData.colors || !parsedData.mappings) {
          throw new Error("Invalid theme format: missing colors or mappings");
        }
        
        // Get all required keys from colorKeys array
        const requiredKeys = colorKeys.map((colorKey) => colorKey.key);

        // Check for missing keys in the colors object
        const missingKeys = requiredKeys.filter(
          (key) => !(key in parsedData.colors),
        );

        if (missingKeys.length > 0) {
          importError = `Invalid theme format. Missing properties: ${missingKeys.join(", ")}`;
          showSnackbar(importError, "error");
          return;
        }

        // Update the color store with imported colors
        $colorStore = { ...parsedData.colors };
        
        // Update the syntax mappings if available
        if (parsedData.mappings) {
          // Temporary mapping to convert from ColorConfig.mappings to expected format
          const mappingKeys: Record<string, keyof typeof $syntaxMapping> = {
            fn: 'function',
            // Add other keys if they differ
          };
          
          Object.entries(parsedData.mappings).forEach(([key, value]) => {
            // Check if this key needs to be mapped
            const syntaxKey = mappingKeys[key] || key as keyof typeof $syntaxMapping;
            
            // Only update if the key exists in our syntax mapping
            if (syntaxKey in $syntaxMapping) {
              $syntaxMapping[syntaxKey] = value as keyof typeof $colorStore;
            }
          });
        }

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
    // Set initial content after languages are registered
    generateJSON();
  });
</script>

<Dialog bind:open={openDialog} surface$style="max-height: 80vh">
  <Title>Export Theme</Title>
  <Content>
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
      accept=".json"
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