<script lang="ts" context="module">
  import { colorStore } from "../stores.svelte";
  import type { Theme } from "../Types.svelte";

  let colors: Theme;
  colorStore.subscribe((value) => {
    colors = value;
    updateHighlightStyles();
  });

  function updateHighlightStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .hljs {
          color: ${colors.fg1}; /* Default text color */
          background: transparent;
        }

        /* Variables */
        .hljs-attr,
        .hljs-property,
        .hljs-template-variable,
        .hljs-params {
          color: ${colors.color1}; /* red */
        }

        /* Strings */
        .hljs-string,
        .hljs-doctag,
        .hljs-regexp {
          color: ${colors.color2}; /* green */
        }

        /* Numbers */
        .hljs-number,
        .hljs-literal {
          color: ${colors.color16}; /* orange */
        }

        /* Comments */
        .hljs-comment,
        .hljs-quote {
          color: ${colors.color8}; /* lighter gray */
          font-style: italic;
        }

        /* Generics/Types */
        .hljs-title.class_,
        .hljs-type,
        .hljs-built_in {
          color: ${colors.color3}; /* light yellow */
        }

        /* Keywords */
        .hljs-variable,
        .hljs-keyword {
          color: ${colors.color5}; /* purple */
        }

        /* Functions */
        .hljs-function,
        .hljs-title.function_ {
          color: ${colors.color4}; /* blue */
        }

        /* Operators and punctuation */
        .hljs-operator,
        .hljs-punctuation {
          color: ${colors.fg1}; /* default text color */
        }

        /* Line numbers */
        .line-number {
          color: ${colors.color8} !important; /* darker gray */
        }

        /* Selection */
        .hljs ::selection {
          background-color: ${colors.bg2};
          color: ${colors.fg0};
        }
      `;

    // Remove any existing highlight.js style element
    const existingStyle = document.getElementById("hljs-theme-override");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add the new style element
    style.id = "hljs-theme-override";
    document.head.appendChild(style);
  }
</script>

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

    updateHighlightStyles();

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

  :global(.hljs) {
    background-color: transparent !important;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .tabs {
      flex-wrap: nowrap;
    }
  }
</style>
