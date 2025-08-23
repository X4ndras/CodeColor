<script lang="ts">
  import Textfield from '@smui/textfield';
  import { colorKeys } from "../Types.svelte";
  import { darkTheme, lightTheme, darkMode, resetCurrentTheme } from "../stores.svelte";
  import Button from '@smui/button';

  function isValidHex(input: string): boolean {
    const s = input.trim();
    if (!s) return false;
    const withHash = s.startsWith('#') ? s : `#${s}`;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(withHash);
  }

  function normalizeHex(input: string): string {
    const s = input.trim();
    const withHash = s.startsWith('#') ? s : `#${s}`;
    if (/^#([0-9a-fA-F]{3})$/.test(withHash)) {
      const r = withHash[1];
      const g = withHash[2];
      const b = withHash[3];
      return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
    }
    return withHash.toLowerCase();
  }

  function isCompleteHex(input: string): boolean {
    const s = input.trim().replace(/^#/, '');
    return s.length === 3 || s.length === 6;
  }

  let textByKey: Record<string, string> = {};
  let editingKey: string | null = null;

  // Keep local text in sync with active theme unless currently editing that key
  $: {
    const theme = $darkMode ? $darkTheme : $lightTheme;
    for (const { key } of colorKeys) {
      const next = theme[key];
      if (editingKey !== key && textByKey[key] !== next) {
        textByKey[key] = next;
      }
    }
  }
</script>

<div class="color-pickers">
  {#each colorKeys as { key, description, label }}
    {#key key}
      <div class="color-picker">
        <div class="color-input">
          <!-- Color input updates the active theme store directly -->
          <input
            type="color"
            value={($darkMode ? $darkTheme : $lightTheme)[key]}
            on:input={(event) => {
              const input = event.currentTarget as HTMLInputElement;
              const val = input.value;
              if ($darkMode) {
                $darkTheme = { ...$darkTheme, [key]: val };
              } else {
                $lightTheme = { ...$lightTheme, [key]: val };
              }
            }}
          />
          <div class="textfield">
            <Textfield 
              label={`${label} ${description}`}
              type="text"
              value={textByKey[key]}
              input$onfocus={() => { editingKey = key; }}
              input$onblur={() => { editingKey = null; const raw = textByKey[key]; if (isValidHex(raw)) { const normalized = normalizeHex(raw); if ($darkMode) { $darkTheme = { ...$darkTheme, [key]: normalized }; } else { $lightTheme = { ...$lightTheme, [key]: normalized }; } textByKey[key] = normalized; } else { textByKey[key] = ($darkMode ? $darkTheme : $lightTheme)[key]; } }}
              input$oninput={(event) => {
                const input = event.currentTarget as HTMLInputElement;
                textByKey[key] = input.value;
                // Only update store when a complete hex is present to avoid fighting the user
                if (isCompleteHex(input.value) && isValidHex(input.value)) {
                  const normalized = normalizeHex(input.value);
                  if ($darkMode) {
                    $darkTheme = { ...$darkTheme, [key]: normalized };
                  } else {
                    $lightTheme = { ...$lightTheme, [key]: normalized };
                  }
                }
              }}
            />
          </div>
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
    gap: 1rem;
  }
  .color-picker {
    width: 100%;
  }

  .textfield {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .color-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.text-field) {
    flex: 1;
  }
  
  input[type="color"] {
    all: unset;
    width: 2.5rem;
    height: 2.8rem;
    padding: 0;
    border: none;
    border-radius: 0px;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .color-input {
      gap: 0.25rem;
    }

    input[type="color"] {
      width: 2.0rem;
      height: 2.3rem;
    }
  }
</style>
