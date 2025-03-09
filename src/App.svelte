<script lang="ts">
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Sidebar from "./lib/Sidebar.svelte";
  import CodePreview from "./lib/CodePreview.svelte";
  import ExportPopup from "./lib/ExportPopup.svelte";
  import ColorPreview from "./lib/ColorPreview.svelte";
  import { onMount } from "svelte";
  import { colorStore } from "./stores.svelte";

  let showSidebar = $state(false);
  let active = $state("code");
  let mounted = $state(false);
  let darkMode = $state(false);

  function applyTheme() {
    if (!mounted) return;

    const root = document.documentElement;

    root.style.setProperty("--color0", $colorStore.color0.value);
    root.style.setProperty("--color1", $colorStore.color1.value);
    root.style.setProperty("--color2", $colorStore.color2.value);
    root.style.setProperty("--color3", $colorStore.color3.value);
    root.style.setProperty("--color4", $colorStore.color4.value);
    root.style.setProperty("--color5", $colorStore.color5.value);
    root.style.setProperty("--color6", $colorStore.color6.value);
    root.style.setProperty("--color7", $colorStore.color7.value);

    root.style.setProperty("--color8", $colorStore.color8.value);
    root.style.setProperty("--color9", $colorStore.color9.value);
    root.style.setProperty("--color10", $colorStore.color10.value);
    root.style.setProperty("--color11", $colorStore.color11.value);
    root.style.setProperty("--color12", $colorStore.color12.value);
    root.style.setProperty("--color13", $colorStore.color13.value);
    root.style.setProperty("--color14", $colorStore.color14.value);
    root.style.setProperty("--color15", $colorStore.color15.value);

    root.style.setProperty("--color16", $colorStore.color16.value);
    root.style.setProperty("--color17", $colorStore.color17.value);
  }

  onMount(() => {
    darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleMode = () => (darkMode = !darkMode);
</script>

<svelte:head>
  {#if darkMode === undefined}
    <link
      rel="stylesheet"
      href="public/smui-light.css"
      media="(prefers-color-scheme: light)"
    />
    <link
      rel="stylesheet"
      href="public/smui-dark.css"
      media="screen and (prefers-color-scheme: dark)"
    />
  {:else if darkMode}
    <link rel="stylesheet" href="public/smui-light.css" media="print" />
    <link rel="stylesheet" href="public/smui-dark.css" media="screen" />
  {:else}
    <link rel="stylesheet" href="public/smui-light.css" />
  {/if}
</svelte:head>

<main>
  <div class="header">
    <h1>Code:Color</h1>
    <div class="header-controls">
      <div class="theme-switch">
        <span>🌞</span>
        <button
          class="toggle-sidebar"
          class:sidebar-shown={showSidebar}
          onclick={() => (showSidebar = !showSidebar)}
        >
          {showSidebar ? "✕" : "☰"}
        </button>
        <Switch checked={darkMode} onSMUISwitchChange={toggleMode} />
        <span>🌙</span>
      </div>
      <ExportPopup />
    </div>
  </div>

  <div class="layout">
    <Sidebar bind:showSidebar />
    <div class="preview-section">
      <div class="tabs-wrapper">
        <Card>
          <TabBar tabs={["code", "color"]} bind:active>
            {#snippet tab(tab)}
              <Tab {tab}>
                <Label>{tab}</Label>
              </Tab>
            {/snippet}
          </TabBar>
        </Card>
      </div>

      <Card>
        {#if active === "color"}
          <ColorPreview />
        {:else if active === "code"}
          <CodePreview />
        {/if}
      </Card>
    </div>
  </div>
</main>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    padding-left: calc(var(--sidebar-width) + 2rem);
    padding-right: 0.8rem;
    position: relative;
  }

  .tabs-wrapper {
    padding-bottom: 1rem;
  }

  .header-controls {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    gap: 1rem;
  }

  .theme-switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .layout {
    display: flex;
    gap: 2rem;
    max-width: 1400px;
    margin: 28px;
    position: relative;
    padding-left: var(--sidebar-width);
    min-height: 100vh;
  }

  h1 {
    text-align: center;
    color: var(--text-color);
    margin: 0;
    font-size: 1.5rem;
  }

  .toggle-sidebar {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 101;
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    transition: left 0.3s ease-in-out;
  }

  .sidebar-shown {
    left: calc(var(--sidebar-width) - 1rem);
  }

  .preview-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 16px !important;
  }

  @media (max-width: 1024px) {
    .header {
      padding-left: 4rem;
      padding-right: 1rem;
      margin-bottom: 0.8rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    .toggle-sidebar {
      display: flex;
    }

    .layout {
      padding-left: 0;
    }
  }
</style>
