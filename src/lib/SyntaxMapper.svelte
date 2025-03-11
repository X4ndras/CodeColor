<script lang="ts">
  import Select, { Option } from "@smui/select";
  import { colorStore } from "../stores.svelte";
  import { colorKeys } from "../Types.svelte";

  let value = $state("");
</script>

<div class="color-selector">
  <Select class="shaped-outlined" variant="outlined" bind:value>
    {#each colorKeys as { key, description, label }}
      <Option value={label}>
        <div class="color-option">
          <div
            class="color-preview"
            style="background-color: {$colorStore[key]};"
          ></div>
          {key}
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
    border-radius: 28px 0 0 28px;
    width: 28px;
  }

  *
    :global(
      .shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing
    ) {
    border-radius: 0 28px 28px 0;
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
    border: 1px solid #ddd;
  }
</style>
