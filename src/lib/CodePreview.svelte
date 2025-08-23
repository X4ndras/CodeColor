<script lang="ts">
  import { onMount } from "svelte";
  import { darkTheme, lightTheme, darkMode, syntaxMapping } from "../stores.svelte";
  import type { Theme } from "../Types.svelte";
  import Button, { Group } from "@smui/button";
  import { getContext } from "svelte";

  // Import raw code snippets using Vite's ?raw feature
  import jsSnippet from "../snipppets/js.html?raw";
  import tsSnippet from "../snipppets/ts.html?raw";
  import rustSnippet from "../snipppets/rust.html?raw";
  import goSnippet from "../snipppets/go.html?raw";
  import cSnippet from "../snipppets/c.html?raw";
  import pythonSnippet from "../snipppets/python.html?raw";
  import cssSnippet from "../snipppets/css.html?raw";
  import htmlSnippet from "../snipppets/html.html?raw";
  import luaSnippet from "../snipppets/lua.html?raw";

  const tabs = [
    { id: "rust", name: "Rust", content: rustSnippet },
    { id: "lua", name: "Lua", content: luaSnippet },
    { id: "go", name: "Go", content: goSnippet },
    { id: "c", name: "C", content: cSnippet },
    { id: "ts", name: "TS", content: tsSnippet },
    { id: "js", name: "JS", content: jsSnippet },
    { id: "python", name: "Python", content: pythonSnippet },
    { id: "html", name: "HTML", content: htmlSnippet },
    { id: "css", name: "CSS", content: cssSnippet },
  ];

  let displayedCode = "";
  let selectedTab: string = tabs[0].id;
  let colors: Theme;
  let containerElement: HTMLElement;

  // Update the CSS variables when colors or syntax mappings change
  $: {
    colors = $darkMode ? $darkTheme : $lightTheme;
    if (containerElement) {
      // set syntax highlighting colors based on the syntax mapping
      Object.entries($syntaxMapping).forEach(([token, colorKey]) => {
        containerElement.style.setProperty(`--${token}`, colors[colorKey]);
      });

      // set css variables based on ANSI colors
      Object.entries(colors).forEach(([key, value]) => {
        containerElement.style.setProperty(`--${key}`, value as string);
      });

      // Background colors for the preview and tabs are set globally in app.scss
    }
  }

  function selectTab(tabId: string) {
    selectedTab = tabId;
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      processSnippet(tab.content);
    } else {
      displayedCode = `<div class="error">No snippet available for ${tabId}</div>`;
    }
  }

  // Process the snippet and add line numbers
  function processSnippet(content: string) {
    if (!content) {
      displayedCode = `<div class="error">No content available</div>`;
      return;
    }

    const lines = content.split("\n");
    let result = "";

    // Process each line and add line numbers
    for (let i = 1; i < lines.length; i++) {
      const lineNumber = i;
      // Trim whitespace but preserve indentation
      const lineContent = lines[i] || "&nbsp;"; // Use &nbsp; for empty lines

      result += `<div class="line">
        <span class="line-number">${lineNumber}</span>
        <span class="line-content">${lineContent}</span>
      </div>`;
    }

    displayedCode = result;
  }

  onMount(() => {
    // Initially process the default tab's content
    const initialTab = tabs.find((t) => t.id === selectedTab);
    if (initialTab) {
      processSnippet(initialTab.content);
    }

    // Initial setup of CSS variables
    if (containerElement) {
      Object.entries(colors).forEach(([key, value]) => {
        containerElement.style.setProperty(`--${key}`, value);
      });
    }
  });
</script>

<!--
  HTML
  So i dont overread this part so easlily,
  since its the smallest
-->
<div class="code-preview-container" bind:this={containerElement}>
  <div class="tabs">
    <Group>
      {#each tabs as tab}
        <Button
          class="tab-button"
          onclick={() => selectTab(tab.id)}
          variant="unelevated"
          color={selectedTab === tab.id ? "primary" : "secondary"}
        >
          {tab.name}
        </Button>
      {/each}
    </Group>
  </div>
  <div class="code-preview">{@html displayedCode}</div>
</div>

<!--
  CSS
-->
<style lang="scss">
  .code-preview-container {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    overflow: hidden;
  }
  .tabs {
    display: flex;
    border-bottom: 1px solid var(--app-border);
    overflow-x: auto;
    scrollbar-width: thin;
    border-radius: 16px 16px 0 0;
  }
  .code-preview {
    padding: 1rem;
    border-radius: 0 0 8px 8px;
    overflow: auto;
    font-family: "JetBrains Mono", monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Global styles for code highlighting */
  :global(.line) {
    display: flex;
    width: 100%;
    min-height: 1.5em;
  }

  :global(.line-number) {
    color: var(--fg2, #7f848e);
    text-align: right;
    padding-right: 1em;
    user-select: none;
    width: 2em;
    min-width: 2em;
    border-right: 1px solid var(--bg2, #353b45);
    margin-right: 0.5em;
    flex-shrink: 0;
  }

  :global(.line-content) {
    white-space: pre;
  }

  :global(.line-content) {
    white-space: pre;
  }

  /*
    Core syntax highlighting classes
  */
  :global(.comment) {
    color: var(--comment);
    font-style: italic;
  }

  :global(.keyword) {
    color: var(--keyword);
  }

  :global(.string) {
    color: var(--string);
  }

  :global(.number) {
    color: var(--number);
  }

  :global(.variable) {
    color: var(--variable);
  }

  :global(.function) {
    color: var(--function);
  }

  :global(.builtin) {
    color: var(--builtin);
    font-weight: normal;
  }

  :global(.property) {
    color: var(--property);
  }

  :global(.parameter) {
    color: var(--parameter);
  }

  :global(.type) {
    color: var(--type);
  }

  :global(.class) {
    color: var(--class);
    //font-style: italic;
    //font-weight: bold;
  }

  :global(.special) {
    color: var(--special);
  }

  :global(.namespace) {
    color: var(--namespace);
  }

  :global(.operator) {
    color: var(--operator);
  }

  :global(.enum),
  :global(.enum-member),
  :global(.variant) {
    color: var(--color3);
  }

  :global(.macro) {
    color: var(--macro);
    font-weight: normal;
  }

  :global(.decorator),
  :global(.decorator-call) {
    color: var(--color4);
  }

  :global(.interface),
  :global(.trait) {
    color: var(--color3);
    font-style: normal;
  }

  :global(.tag) {
    color: var(--color1);
  }

  :global(.attribute) {
    color: var(--color11);
  }

  :global(.html-delimiter) {
    color: var(--color7);
  }

  :global(.constant) {
    color: var(--color1);
    font-weight: normal;
  }

  :global(.preprocessor) {
    color: var(--color5);
  }

  :global(.label) {
    color: var(--color3);
  }

  :global(.underscore) {
    color: var(--color8);
  }

  :global(.css-unit) {
    color: var(--color1);
  }

  :global(.css-tag) {
    color: var(--color1);
  }

  :global(.css-macro) {
    color: var(--macro);
  }

  :global(.value) {
    color: var(--color2);
  }

  :global(.css-modifier) {
    color: var(--color5);
  }

  :global(.py-property) {
    color: var(--property);
  }

  :global(.constructor) {
    color: var(--color4);
  }

  :global(.lua-function-builtin) {
    color: var(--color6);
  }

  :global(.lua-operator) {
    color: var(--color5);
  }

  :global(.c-buildin) {
    color: var (--builtin);
  }

  :global(.error) {
    color: var(--color1);
    font-weight: bold;
  }
</style>
