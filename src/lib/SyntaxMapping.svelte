<script lang="ts">
  import type { SyntaxToken } from "../Types.svelte";
  import { darkTheme, lightTheme, darkMode, syntaxMapping, resetSyntaxDefaults } from "../stores.svelte";
  import SyntaxMapper from "./SyntaxMapper.svelte";
  import Button from "@smui/button";
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
    namespace: "Namespace names",
    parameter: "Function parameters",
    operator: "Operators like +, =, =>",
    builtin: "Built-in objects and functions",
    property: "Object properties",
    special: "Special tokens",
    macro: "Macro names",
  };

  const syntaxTokens: SyntaxToken[] = Object.keys(
    $syntaxMapping,
  ) as SyntaxToken[];

  // Update the CodePreview component when syntax mapping changes
  $: {
    // Apply syntax mapping to CSS variables
    if (typeof document !== "undefined") {
      const active = $darkMode ? $darkTheme : $lightTheme;
      Object.entries($syntaxMapping).forEach(([token, colorKey]) => {
        document.documentElement.style.setProperty(
          `--${token}`,
          active[colorKey],
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
        <SyntaxMapper {token} />
        <span class="token-description">
          {tokenDescriptions[token]}
        </span>
      </div>
    </div>
  {/each}
  <Button variant="raised" onclick={() => { resetSyntaxDefaults(); }}>
    Reset Syntax
  </Button>
</div>

<style>
  .syntax-mapping {
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
  }

  .mapping-row {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--mdc-theme-on-surface);
    margin-bottom: 1.4rem;
  }

  .token-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
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
