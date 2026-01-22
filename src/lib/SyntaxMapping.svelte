<script lang="ts">
  import type {
    DiagnosticsMapping,
    StatuslineMapping,
    SyntaxToken,
    Theme,
  } from "../Types.svelte";
  import {
    darkTheme,
    lightTheme,
    darkMode,
    syntaxMapping,
    diagnosticsMapping,
    statuslineMapping,
    resetSyntaxDefaults,
  } from "../stores.svelte";
  import SyntaxMapper from "./SyntaxMapper.svelte";
  import Button from "@smui/button";
  import type { Writable } from "svelte/store";

  const coreTokens: SyntaxToken[] = [
    "comment",
    "keyword",
    "string",
    "number",
    "variable",
    "fn",
    "type",
    "class",
    "parameter",
    "operator",
    "builtin",
    "property",
  ];

  const extraTokens: SyntaxToken[] = ["namespace", "special", "macro"];

  const tokenDescriptions: Record<SyntaxToken, string> = {
    comment: "Comments and documentation",
    keyword: "Language keywords like if, for, class",
    string: "String literals",
    number: "Numeric literals",
    variable: "Variable names",
    fn: "Function names and calls",
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

  const diagnosticsTokens: (keyof DiagnosticsMapping)[] = [
    "error",
    "warning",
    "info",
    "hint",
    "ok",
  ];

  const diagnosticsDescriptions: Record<keyof DiagnosticsMapping, string> = {
    error: "Errors and failures",
    warning: "Warnings and lint alerts",
    info: "Informational messages",
    hint: "Hints and suggestions",
    ok: "Success and ok indicators",
  };

  const statuslineTokens: (keyof StatuslineMapping)[] = [
    "normal",
    "insert",
    "visual",
    "replace",
    "command",
    "terminal",
  ];

  const statuslineDescriptions: Record<keyof StatuslineMapping, string> = {
    normal: "Normal mode indicator",
    insert: "Insert mode indicator",
    visual: "Visual mode indicator",
    replace: "Replace mode indicator",
    command: "Command mode indicator",
    terminal: "Terminal mode indicator",
  };

  const syntaxStore = syntaxMapping as Writable<Record<string, keyof Theme>>;
  const diagnosticsStore = diagnosticsMapping as Writable<Record<string, keyof Theme>>;
  const statuslineStore = statuslineMapping as Writable<Record<string, keyof Theme>>;

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
  <div class="mapping-section">
    <h3 class="section-title">Core Syntax</h3>
    {#each coreTokens as token}
      <div class="mapping-row">
        <div class="token-info">
          <span class="token-name">{token}</span>
          <SyntaxMapper {token} mappingStore={syntaxStore} />
          <span class="token-description">
            {tokenDescriptions[token]}
          </span>
        </div>
      </div>
    {/each}

    <details class="mapping-details">
      <summary class="section-summary">Extras</summary>
      <div class="details-content">
        {#each extraTokens as token}
          <div class="mapping-row">
            <div class="token-info">
              <span class="token-name">{token}</span>
              <SyntaxMapper {token} mappingStore={syntaxStore} />
              <span class="token-description">
                {tokenDescriptions[token]}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </details>
  </div>

  <div class="mapping-section">
    <details class="mapping-details">
      <summary class="section-summary section-title">Diagnostics</summary>
      <div class="details-content">
        {#each diagnosticsTokens as token}
          <div class="mapping-row">
            <div class="token-info">
              <span class="token-name">{token}</span>
              <SyntaxMapper token={token} mappingStore={diagnosticsStore} />
              <span class="token-description">
                {diagnosticsDescriptions[token]}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </details>
  </div>

  <div class="mapping-section">
    <details class="mapping-details">
      <summary class="section-summary section-title">Statusline</summary>
      <div class="details-content">
        {#each statuslineTokens as token}
          <div class="mapping-row">
            <div class="token-info">
              <span class="token-name">{token}</span>
              <SyntaxMapper token={token} mappingStore={statuslineStore} />
              <span class="token-description">
                {statuslineDescriptions[token]}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </details>
  </div>

  <Button variant="raised" onclick={() => { resetSyntaxDefaults(); }}>
    Reset Mappings
  </Button>
</div>

<style>
  .syntax-mapping {
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 1rem;
  }

  .mapping-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .section-title {
    margin: 0;
    font-size: 1rem;
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

  .mapping-details {
    border-radius: 12px;
    padding: 0.5rem 0;
  }

  .section-summary {
    cursor: pointer;
    font-weight: 500;
  }

  .details-content {
    margin-top: 0.75rem;
  }
</style>
