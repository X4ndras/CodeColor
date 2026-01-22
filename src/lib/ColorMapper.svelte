<script lang="ts">
  import { colorKeys } from "../Types.svelte";
  import { darkTheme, lightTheme, darkMode, resetCurrentTheme } from "../stores.svelte";
  import Button from '@smui/button';
  import ColorPicker from './ColorPicker.svelte';

  // Get background color for contrast checking (color0 is the main background)
  $: bgColor = ($darkMode ? $darkTheme : $lightTheme).color0;

  function handleColorChange(key: string, newColor: string) {
    if ($darkMode) {
      $darkTheme = { ...$darkTheme, [key]: newColor };
    } else {
      $lightTheme = { ...$lightTheme, [key]: newColor };
    }
  }
</script>

<div class="color-pickers">
  {#each colorKeys as { key, description, label }}
    {#key key}
      <div class="color-picker-row">
        <ColorPicker
          value={($darkMode ? $darkTheme : $lightTheme)[key]}
          label={`${label} - ${description}`}
          onChange={(color) => handleColorChange(key, color)}
          backgroundColorForContrast={key !== 'color0' && key !== 'bg0' && key !== 'bg1' && key !== 'bg2' ? bgColor : null}
        />
        <div class="color-label">
          <span class="label-name">{label}</span>
          <span class="label-description">{description}</span>
        </div>
      </div>
    {/key}
  {/each}
  <Button variant="raised" onclick={() => { resetCurrentTheme($darkMode); }}>
    Reset Colors
  </Button>
</div>

<style>
  .color-pickers {
    padding: 0rem 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .color-picker-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .color-label {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    flex: 1;
    min-width: 0;
  }

  .label-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--fg0, #dcdfe4);
  }

  .label-description {
    font-size: 0.7rem;
    color: var(--fg2, #7f848e);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1024px) {
    .color-pickers {
      gap: 0.5rem;
    }

    .color-picker-row {
      gap: 0.5rem;
    }

    .label-name {
      font-size: 0.75rem;
    }

    .label-description {
      font-size: 0.65rem;
    }
  }
</style>
