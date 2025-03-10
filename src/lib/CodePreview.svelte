<!--
Module
-->
<script lang="ts" context="module">
  let parsers: Record<string, Parser> = {};

  const tabs = [
    { id: "rust", name: "Rust" },
    //{ id: "lua", name: "Lua" },
    { id: "go", name: "Go" },
    { id: "c", name: "C" },
    { id: "typescript", name: "TS" },
    { id: "javascript", name: "JS" },
    { id: "python", name: "Python" },
    { id: "css", name: "CSS" },
    //{ id: "html", name: "HTML" },
  ];

  function getNodeClassName(type: string): string {
    console.debug(`getNodeClassName(${type})`);
    const mappings: { [key: string]: string } = {
      // Common types
      string: "ts-string",
      number: "ts-number",
      comment: "ts-comment",
      keyword: "ts-keyword",
      function: "ts-function",
      method: "ts-function",
      property: "ts-property",
      type: "ts-type",
      variable: "ts-variable",
      identifier: "ts-identifier",
      operator: "ts-operator",
      punctuation: "ts-punctuation",
    };
    return mappings[type] || "";
  }

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  //
  // Tree Sitter
  //
  async function initTreeSitter() {
    await Parser.init({
      locateFile(scriptName: string) {
        return `/${scriptName}`;
      },
    });

    // Initialize parsers for each language
    for (const tab of tabs) {
      try {
        const newParser = new Parser();
        const Lang = await Language.load(
          `/tree-sitter/tree-sitter-${tab.id}.wasm`,
        );
        newParser.setLanguage(Lang);
        parsers[tab.id] = newParser;
      } catch (error) {
        console.error(`Failed to load ${tab.id} parser:`, error);
      }
    }
  }

  function highlightCode(code: string, language: string): string {
    const parser = parsers[language];
    if (!parser) {
      console.warn(`No parser available for ${language}`);
      return escapeHtml(code);
    }

    const tree = parser.parse(code);
    return formatTree(tree?.rootNode, code);
  }

  function formatTree(node: any, code: string): string {
    if (node.childCount === 0) {
      const text = code.substring(node.startIndex, node.endIndex);
      const className = getNodeClassName(node.type);
      return className
        ? `<span class="${className}">${escapeHtml(text)}</span>`
        : escapeHtml(text);
    }

    let result = "";
    let currentIndex = node.startIndex;

    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i)!;
      if (child.startIndex > currentIndex) {
        result += escapeHtml(code.substring(currentIndex, child.startIndex));
      }
      result += formatTree(child, code);
      currentIndex = child.endIndex;
    }

    if (currentIndex < node.endIndex) {
      result += escapeHtml(code.substring(currentIndex, node.endIndex));
    }

    return result;
  }

  //
  // Misc Helper function
  //
  function addLineNumbers(code: string): string {
    const lines = code.split("\n");
    return lines
      .map(
        (line, index) =>
          `<span class="line-number">${index}</span><span class="line-content">${line}</span>`,
      )
      .join("\n");
  }
</script>

<!--
*************************
Code Preview
*************************
-->
<script lang="ts">
  import { onMount } from "svelte";
  import { Language, Parser } from "web-tree-sitter";
  import { colorStore } from "../stores.svelte";
  import type { Theme } from "../Types.svelte";
  import { codeSnippets } from "../Snippets.svelte";
  import Button, { Group } from "@smui/button";

  let colors: Theme;
  let highlighted: { [key: string]: string } = {};

  colorStore.subscribe((value) => {
    colors = value;
  });

  let selectedTab = tabs[0].id;

  function selectTab(tabId: string) {
    selectedTab = tabId;
    highlighted[selectedTab] = highlightCode(
      codeSnippets[selectedTab],
      selectedTab,
    );
  }

  onMount(async () => {
    await initTreeSitter();
    selectTab(selectedTab);
  });
</script>

<!--
*************************
HTML
*************************
-->
<div class="code-preview-container">
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
  <div class="code-preview">
    <pre><code
        >{@html highlighted[selectedTab]
          ? addLineNumbers(highlighted[selectedTab])
          : ""}</code
      ></pre>
  </div>
</div>

<style>
  .code-preview-container {
    background: var(--color0);
    color: var(--color15);
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 8px 8px;
    overflow: hidden;
  }
  .tabs {
    display: flex;
    border-bottom: 1px solid #fff;
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
  pre {
    margin: 0;
    counter-reset: line;
  }
  code {
    counter-reset: line;
    display: grid;
    grid-template-columns: max-content 1fr;
    width: 100%;
  }

  :global(.line-number) {
    color: var(--fg2);
    text-align: right;
    padding-right: 1em;
    user-select: none;
    display: inline-block;
    min-width: 3em;
  }

  :global(.line-content) {
    display: inline-block;
    white-space: pre;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .tabs {
      flex-wrap: nowrap;
    }
  }

  :global(.ts-string) {
    color: var(--color2);
  }

  :global(.ts-number) {
    color: var(--color16);
  }

  :global(.ts-boolean) {
    color: var(--color16);
  }

  :global(.ts-comment) {
    color: var(--color8);
    font-style: italic;
  }

  :global(.ts-keyword) {
    color: var(--color1);
  }

  :global(.ts-function) {
    color: var(--color5);
  }

  :global(.ts-method) {
    color: var(--color5);
  }

  :global(.ts-property) {
    color: var(--color6);
  }

  :global(.ts-type) {
    color: var(--color3);
  }

  :global(.ts-variable) {
    color: var(--color1);
  }

  :global(.ts-identifier) {
    color: var(--color4);
  }

  :global(.ts-operator) {
    color: var(--color15);
  }
</style>
