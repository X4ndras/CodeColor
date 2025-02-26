<script lang="ts">
  import Textfield from '@smui/textfield';
  
  export let label: string;
  export let value: string = '#000000';
  
  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    value = input.value;
  }
</script>

<div class="color-picker">
  <div class="color-input">
    <div class="color-preview" style="background-color: {value}"></div>
    <Textfield
      class="text-field"
      label={label}
      type="text"
      bind:value
    />
    <input
      type="color"
      {value}
      on:input={handleInput}
    />
  </div>
</div>

<style>
  .color-picker {
    width: 100%;
  }
  
  .color-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :global(.text-field) {
    flex: 1;
  }
  
  .color-preview {
    width: 2rem;
    height: 2rem;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }
  
  input[type="color"] {
    width: 2.5rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .color-input {
      gap: 0.25rem;
    }

    .color-preview {
      width: 1.5rem;
      height: 1.5rem;
    }

    input[type="color"] {
      width: 2rem;
      height: 1.5rem;
    }
  }
</style>