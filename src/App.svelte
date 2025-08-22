<script lang="ts">
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Dialog, { Content, Title, Actions } from "@smui/dialog";
  import Button from "@smui/button";
  import Tab, { Icon, Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Sidebar from "./lib/Sidebar.svelte";
  import CodePreview from "./lib/CodePreview.svelte";
  import ExportPopup from "./lib/ExportPopup.svelte";
  import ColorPreview from "./lib/ColorPreview.svelte";
  import { onMount } from "svelte";
  import { colorStore, darkMode, syntaxMapping, resetAll } from "./stores.svelte";
  import { colorKeys } from "./Types.svelte";

  let showSidebar = $state(false);
  let active = $state("code");
  let confirmResetOpen = $state(false);

  function applyTheme() {
    const root = document.documentElement;

    // 1. Set all basic color variables from the store
    for (const { key, description, label } of colorKeys) {
      root.style.setProperty(`--${key}`, $colorStore[key]);
    }

    // 2. Set mode-specific CSS variables
    if ($darkMode) {
      root.style.setProperty("--mdc-theme-surface", $colorStore.bg1);
      root.style.setProperty("--mdc-theme-on-primary", $colorStore.fg0);
      root.style.setProperty("--mdc-theme-on-secondary", $colorStore.fg0);
      root.style.setProperty("--mdc-theme-on-surface", $colorStore.color15);
      // Always set the app background
      root.style.setProperty("--app-background", $colorStore.color0);
    } else {
      root.style.setProperty("--mdc-theme-surface", $colorStore.fg1);
      root.style.setProperty("--mdc-theme-on-primary", $colorStore.bg0);
      root.style.setProperty("--mdc-theme-on-secondary", $colorStore.bg0);
      root.style.setProperty("--mdc-theme-on-surface", $colorStore.color0);
      // Always set the app background
      root.style.setProperty("--app-background", $colorStore.color15);
    }

    // 3. Set primary SMUI theme variables
    root.style.setProperty(
      "--mdc-theme-primary",
      $colorStore[$syntaxMapping.keyword],
    );
    root.style.setProperty("--mdc-theme-secondary", $colorStore.color2);
    root.style.setProperty("--mdc-theme-error", $colorStore.color9);
  }

  $effect(() => {
    applyTheme();
  });

  onMount(() => {
    $darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme();
  });
</script>

<svelte:head>
  {#if $darkMode === undefined}
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
  {:else if $darkMode}
    <link rel="stylesheet" href="public/smui-light.css" media="print" />
    <link rel="stylesheet" href="public/smui-dark.css" media="screen" />
  {:else}
    <link rel="stylesheet" href="public/smui-light.css" />
  {/if}
</svelte:head>

<main>
  <div class="header">
    <h1>Code: Color</h1>
    <div class="header-controls">
      <div class="theme-switch">
        <span></span>
        <button
          class="toggle-sidebar"
          class:sidebar-shown={showSidebar}
          onclick={() => (showSidebar = !showSidebar)}
        >
          {showSidebar ? "✕" : "☰"}
        </button>
        <Switch
          checked={$darkMode}
          on:SMUISwitchChange={() => {
            $darkMode = !$darkMode;
          }}
        />
        <span>🌙</span>
      </div>
      <ExportPopup />
    </div>
  </div>

  <div class="layout">
    <Sidebar bind:showSidebar onRequestReset={() => (confirmResetOpen = true)} />
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

<Dialog bind:open={confirmResetOpen}>
  <Title>Reset theme?</Title>
  <Content>
    This will reset all colors, syntax mappings, and dark mode to defaults.
  </Content>
  <Actions>
    <Button onclick={() => (confirmResetOpen = false)}>Cancel</Button>
    <Button variant="raised" color="secondary" onclick={() => { resetAll(); confirmResetOpen = false; }}>Confirm Reset</Button>
  </Actions>
</Dialog>

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
  }

  .toggle-sidebar {
    position: fixed;
    top: 0.8rem;
    left: 1rem;
    z-index: 101;
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

    .toggle-sidebar {
      display: flex;
    }

    .layout {
      padding-left: 0;
    }
  }
</style>
