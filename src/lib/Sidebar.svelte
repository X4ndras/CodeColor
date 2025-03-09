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
  <Card>
    <div class="color-pickers">
      {#each colorKeys as { key, description, label }}
        {#if $colorStore && $colorStore[key]}
          <ColorPicker
            label={$colorStore[key].label}
            bind:value={$colorStore[key].value}
          />
        {:else}
          <!-- Fallback if color is not defined -->
          <p>Error: {key} not found</p>
        {/if}
      {/each}
    </div>
  </Card>
</div>

<style>
  .sidebar {
    width: var(--sidebar-width);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: var(--bg-color);
    padding: 1rem;
    overflow-y: auto;
    transition: transform 0.3s ease;
    z-index: 2;
    transform: translateX(0);
    height: 100vh;
  }

  .sidebar-hidden {
    transform: translateX(-100%);
  }

  .color-pickers {
    margin-bottom: 2rem;
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
