<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { colorStore, syntaxMapping } from "../stores.svelte";
  import { colorKeys } from "../Types.svelte";
  import type { SyntaxToken, Theme } from "../Types.svelte";

  // Accept the syntax token as a prop
  export let token: SyntaxToken;

  // Get the current mapping for this token from the syntaxMapping store
  $: selectedColor = $syntaxMapping[token];

  // This will update the mapping when the dropdown changes
  function updateMapping(newColorKey: string) {
    $syntaxMapping[token] = newColorKey as keyof Theme;
  }
</script>

<div class="color-selector">
  <div class="current-color">
    <div
      class="color-preview current"
      style="background-color: {$colorStore[selectedColor]};"
    ></div>
  </div>

  <Select
    class="shaped-outlined"
    variant="outlined"
    value={selectedColor}
    onSMUISelectChange={({ detail }) =>
      updateMapping(detail.value as SyntaxToken)}
  >
    {#each colorKeys as { key, description, label }}
      <Option value={key}>
        <div class="color-option">
          <div
            class="color-preview"
            style="background-color: {$colorStore[key]};"
          ></div>
          <span>{key}</span>
        </div>
      </Option>
    {/each}
  </Select>
</div>

<style>
  *
    :global(
      .shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading
    ) {
    border-radius: 16px 0 0 16px;
    width: 16px;
  }

  *
    :global(
      .shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing
    ) {
    border-radius: 0 16px 16px 0;
  }

  .color-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .color-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .color-preview {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 2px;
    border: 1px solid var(--bg1);
  }

  .color-preview.current {
    width: 2rem;
    height: 2rem;
  }

  .current-color {
    display: flex;
    align-items: center;
  }
</style>
