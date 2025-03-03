<script lang="ts">
  import { onMount } from "svelte";
  import Card from "@smui/card";
  import ColorPicker from "./ColorPicker.svelte";
  import type { theme } from "../Types.svelte";

  export let colors: theme;
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
      <ColorPicker label="Base Color" bind:value={colors.background} />
      <ColorPicker label="Color 0" bind:value={colors.color0} />
      <ColorPicker label="Color 1" bind:value={colors.color1} />
      <ColorPicker label="Color 2" bind:value={colors.color2} />
      <ColorPicker label="Color 3" bind:value={colors.color3} />
      <ColorPicker label="Color 4" bind:value={colors.color4} />
      <ColorPicker label="Color 5" bind:value={colors.color5} />
      <ColorPicker label="Color 6" bind:value={colors.color6} />
      <ColorPicker label="Surface" bind:value={colors.text} />
      <ColorPicker label="Color 7" bind:value={colors.color7} />
      <ColorPicker label="Color 8" bind:value={colors.color8} />
      <ColorPicker label="Color 9" bind:value={colors.color9} />
      <ColorPicker label="Color 10" bind:value={colors.color10} />
      <ColorPicker label="Color 11" bind:value={colors.color11} />
      <ColorPicker label="Color 12" bind:value={colors.color12} />
      <ColorPicker label="Color 13" bind:value={colors.color13} />
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
    z-index: 100;
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
