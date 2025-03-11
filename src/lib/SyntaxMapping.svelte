<script lang="ts">
  import type { SyntaxToken, Theme } from "../Types.svelte";
  import { colorStore, syntaxMapping } from "../stores.svelte";
  import Card from "@smui/card";
  import Select, { Option } from "@smui/select";
  import SyntaxMapper from "./SyntaxMapper.svelte";

  // Create descriptions for each token to help users understand what they're mapping
  const tokenDescriptions: Record<SyntaxToken, string> = {
    comment: "Comments and documentation",
    keyword: "Language keywords like if, for, class",
    string: "String literals",
    number: "Numeric literals",
    variable: "Variable names",
    function: "Function names and calls",
    type: "Types and interfaces",
    class: "Class names and definitions",
    parameter: "Function parameters",
    operator: "Operators like +, =, =>",
    builtin: "Built-in objects and functions",
    property: "Object properties",
  };

  const syntaxTokens: SyntaxToken[] = Object.keys(
    $syntaxMapping,
  ) as SyntaxToken[];

  // Update the CodePreview component when syntax mapping changes
  $: {
    // Apply syntax mapping to CSS variables
    if (typeof document !== "undefined") {
      Object.entries($syntaxMapping).forEach(([token, colorKey]) => {
        document.documentElement.style.setProperty(
          `--${token}`,
          $colorStore[colorKey],
        );
      });
    }
  }
</script>

<div class="syntax-mapping">
  {#each syntaxTokens as token}
    <div class="mapping-row">
      <div class="token-info">
        <span class="token-name">{token}</span>
        <span class="token-description">{tokenDescriptions[token]}</span>
      </div>
      <SyntaxMapper {token} />
    </div>
  {/each}
</div>

<style>
  .syntax-mapping {
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
  }

  .mapping-row {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--bg1);
  }

  .token-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .token-name {
    font-weight: 500;
    text-transform: capitalize;
  }

  .token-description {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .help-text {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .preview-section {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: var(--bg0);
    border-radius: 4px;
  }

  .preview-section h3 {
    margin-top: 0;
    font-size: 1rem;
  }

  .code-preview {
    font-family: monospace;
    white-space: pre-wrap;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: var(--bg1);
  }
</style>
