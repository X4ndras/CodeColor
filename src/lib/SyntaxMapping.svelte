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
        <span><SyntaxMapper /></span>
        <span class="token-description">{tokenDescriptions[token]}</span>
      </div>
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
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--bg1);
  }

  .token-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .token-name {
    font-weight: 500;
    text-transform: capitalize;
  }

  .token-description {
    font-size: 0.8rem;
    opacity: 0.8;
  }
</style>
