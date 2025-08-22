<script lang="ts">
  import Textfield from '@smui/textfield';
  
  export let label: string;
  export let value: string = '#000000';
  
  let textValue: string = value;
  let lastValidValue: string = value;
  let updatingFromText = false;

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

  function handleColorInput(event: Event) {
    const input = event.target as HTMLInputElement;
    value = input.value;
    lastValidValue = value;
    textValue = value;
  }

  function handleTextBlur() {
    if (!isValidHex(textValue)) {
      textValue = lastValidValue;
    } else {
      value = normalizeHex(textValue);
      lastValidValue = value;
      textValue = value;
    }
  }

  // Update bound value live when the text input becomes a valid hex.
  $: if (!updatingFromText && isValidHex(textValue)) {
    const normalized = normalizeHex(textValue);
    // (rest of code continues...)
    if (normalized !== lastValidValue) {
      updatingFromText = true;
      value = normalized;
      lastValidValue = normalized;
      setTimeout(() => (updatingFromText = false), 0);
    }
  }
</script>

<div class="color-picker">
  <div class="color-input">
    <input
      type="color"
      value={lastValidValue}
      on:input={handleColorInput}
    />
    <div class="textfield">
      <Textfield 
      label={label}
      type="text" 
      bind:value={textValue} />
    </div>
  </div>
</div>

<style>
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
