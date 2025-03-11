<script lang="ts">
  import { onMount } from "svelte";
  import Card from "@smui/card";
  import ColorPicker from "./ColorPicker.svelte";
  import { colorKeys } from "../Types.svelte";
  import { colorStore } from "../stores.svelte";

  export let showSidebar: boolean;

  function handleResize() {
    if (window.innerWidth >= 1024) {
      showSidebar = true;
    }
  }

  onMount(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<div class="sidebar" class:sidebar-hidden={!showSidebar}>
  <div class="card-container">
  <Card>
    <div class="color-pickers">
      {#each colorKeys as { key, description, label }}
        {#if $colorStore && $colorStore[key]}
          <ColorPicker
            label={`${label} ${description}`}
            bind:value={$colorStore[key]}
          />
        {:else}
          <!-- Fallback if color is not defined -->
          <p>Error: {key} not found</p>
        {/if}
      {/each}
    </div>
  </Card>
  </div>
</div>

<style>
  .card-container {
    margin-bottom: 2rem;
  }
  .sidebar {
    width: var(--sidebar-width);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    transition: transform 0.3s ease;
    z-index: 2;
    transform: translateX(0);
    height: 100vh;
  }

  .sidebar::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .sidebar-hidden {
    transform: translateX(-100%);
  }

  .color-pickers {
    margin-bottom: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 1024px) {
    .sidebar {
      transform: translateX(0) !important;
    }
  }
</style>
