<script lang="ts">
  import { onMount } from "svelte";
  import Card from "@smui/card";
  import Tab, { Label } from "@smui/tab";
  import ColorPicker from "./ColorPicker.svelte";
  import SyntaxMapping from "./SyntaxMapping.svelte";
  import { colorKeys } from "../Types.svelte";
  import { colorStore } from "../stores.svelte";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";

  export let showSidebar: boolean;
  let activeTab = "colors"; // Default to colors tab
  let confirmResetOpen = false;
  export let onRequestReset: () => void;

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
      <div class="tab-container">
        <TabBar tabs={["colors", "syntax"]} bind:active={activeTab}>
          {#snippet tab(tab)}
            <Tab {tab}>
              <Label>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Label>
            </Tab>
          {/snippet}
        </TabBar>
      </div>

      {#if activeTab === "colors"}
        <div class="color-pickers">
          {#each colorKeys as { key, description, label }}
            <ColorPicker
              label={`${label} ${description}`}
              bind:value={$colorStore[key]}
            />
          {/each}
          <div class="reset-wrapper">
            <Button variant="raised" onclick={() => onRequestReset?.()}>
              Reset Theme
            </Button>
          </div>
        </div>
      {:else if activeTab === "syntax"}
        <SyntaxMapping />
      {/if}
    </Card>
  </div>
</div>

<style>
  .card-container {
    margin-bottom: 2rem;
  }

  .tab-container {
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--bg1);
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
    -ms-overflow-style: none; /* Internet Explorer 10+ */
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
