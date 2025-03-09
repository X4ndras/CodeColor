<script lang="ts">
  import { onMount } from "svelte";
  import hljs from "highlight.js/lib/core";
  import javascript from "highlight.js/lib/languages/javascript";
  import python from "highlight.js/lib/languages/python";
  import java from "highlight.js/lib/languages/java";
  import csharp from "highlight.js/lib/languages/csharp";
  import rust from "highlight.js/lib/languages/rust";
  import lua from "highlight.js/lib/languages/lua";
  import typescript from "highlight.js/lib/languages/typescript";
  import go from "highlight.js/lib/languages/go";
  import c from "highlight.js/lib/languages/c";
  import css from "highlight.js/lib/languages/css";
  import "highlight.js/styles/github-dark.css";
  import Button, { Group } from "@smui/button";
  import { codeSnippets, type CodeSnippets } from "../Snippets.svelte";
  // Tab management
  let tabs = [
    { id: "rust", name: "Rust" },
    { id: "lua", name: "Lua" },
    { id: "go", name: "Go" },
    { id: "c", name: "C" },
    { id: "typescript", name: "TS" },
    { id: "javascript", name: "JS" },
    { id: "python", name: "Python" },
    //{ id: "html", name: "HTML" },
    { id: "css", name: "CSS" },
  ];
  let selectedTab = tabs[0].id;
  // Code snippets for each language
  let highlighted: CodeSnippets = {};
  onMount(() => {
    // Register languages
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("java", java);
    hljs.registerLanguage("csharp", csharp);
    hljs.registerLanguage("rust", rust);
    hljs.registerLanguage("lua", lua);
    hljs.registerLanguage("c", c);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("go", go);
    hljs.registerLanguage("css", css);
    // Fix the reactive statement to use the correct parameter format
    highlighted[selectedTab] = hljs.highlight(codeSnippets[selectedTab], {
      language: selectedTab,
    }).value;
  });
  function selectTab(tabId: string) {
    selectedTab = tabId;
    highlighted[selectedTab] = hljs.highlight(codeSnippets[selectedTab], {
      language: selectedTab,
    }).value;
  }
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
          : addLineNumbers(codeSnippets[selectedTab])}</code
      ></pre>
  </div>
</div>

<style>
  .code-preview-container {
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
    background-color: #000;
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
    color: #6e7681;
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
</style>
