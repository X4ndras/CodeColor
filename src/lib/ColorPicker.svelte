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
    <input
      type="color"
      {value}
      on:input={handleInput}
    />
    <div class="textfield">
      <Textfield 
      label="{label}"
      type="text" 
      bind:value />
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
