<script lang="ts">
  import { onMount } from "svelte";
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Tab, { Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Sidebar from "./lib/Sidebar.svelte";
  import CodePreview from "./lib/CodePreview.svelte";
  import ExportPopup from "./lib/ExportPopup.svelte";
  import type { theme } from "./Types.svelte";
  import ColorPreview from "./lib/ColorPreview.svelte";

  let darkMode = $state(true);
  let showSidebar = $state(false);
  let mounted = $state(false);
  let active = $state("code");

  let colors: theme = $state({
    color0: { value: "#282828", label: "Color 0 (bg)" },
    color1: { value: "#cc241d", label: "Color 1" },
    color2: { value: "#98971a", label: "Color 2" },
    color3: { value: "#d79921", label: "Color 3" },
    color4: { value: "#458588", label: "Color 4" },
    color5: { value: "#b16286", label: "Color 5" },
    color6: { value: "#689d6a", label: "Color 6" },
    color7: { value: "#a89984", label: "Color 7" },

    color8: { value: "#928374", label: "Color 8" },
    color9: { value: "#fb4934", label: "Color 9" },
    color10: { value: "#b8bb26", label: "Color 10" },
    color11: { value: "#fabd2f", label: "Color 11" },
    color12: { value: "#83a598", label: "Color 12" },
    color13: { value: "#d3869b", label: "Color 13" },
    color14: { value: "#8ec07c", label: "Color 14" },
    color15: { value: "#ebdbb2", label: "Color 15 (fg)" },

    color16: { value: "#d65d0e", label: "Color 16" },
    color17: { value: "#fe8019", label: "Color 17" },
  });

  onMount(() => {
    // Read from localStorage on component mount
    const storedDark = localStorage.getItem("darkMode");
    if (storedDark !== null) {
      darkMode = storedDark === "true";
    }
    mounted = true;
    applyTheme();
  });

  function applyTheme() {
    if (!mounted) return;

    const theme = darkMode ? "dark" : "light";

    // Apply theme classes
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme;

    document.body.className = theme;

    // Apply user colors to root
    const root = document.documentElement;

    root.style.setProperty("--bg-color", colors.color0.value);
    root.style.setProperty("--text-color", colors.color15.value);

    root.style.setProperty("--color0", colors.color0.value);
    root.style.setProperty("--color1", colors.color1.value);
    root.style.setProperty("--color2", colors.color2.value);
    root.style.setProperty("--color3", colors.color3.value);
    root.style.setProperty("--color4", colors.color4.value);
    root.style.setProperty("--color5", colors.color5.value);
    root.style.setProperty("--color6", colors.color6.value);
    root.style.setProperty("--color7", colors.color7.value);

    root.style.setProperty("--color8", colors.color8.value);
    root.style.setProperty("--color9", colors.color9.value);
    root.style.setProperty("--color10", colors.color10.value);
    root.style.setProperty("--color11", colors.color11.value);
    root.style.setProperty("--color12", colors.color12.value);
    root.style.setProperty("--color13", colors.color13.value);
    root.style.setProperty("--color14", colors.color14.value);
    root.style.setProperty("--color15", colors.color15.value);

    root.style.setProperty("--color16", colors.color16.value);
    root.style.setProperty("--color17", colors.color17.value);
  }

  function toggleTheme() {
    console.log(`Toggle Theme called`);
    darkMode = !darkMode;
    const theme = darkMode ? "dark" : "light";

    // Apply theme directly to document
    localStorage.setItem("darkMode", darkMode.toString());
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme;
    document.body.className = theme;
    console.log("Theme switched to:", theme, darkMode);
  }
</script>

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
        <Switch
          onSMUISwitchChange={() => toggleTheme}
          bind:checked={darkMode}
        />
        <span>🌙</span>
      </div>
      <ExportPopup bind:colors />
    </div>
  </div>

  <div class="layout">
    <Sidebar bind:colors bind:showSidebar />

    <div class="preview-section">
      <TabBar tabs={["code", "color"]} bind:active>
        {#snippet tab(tab)}
          <Tab {tab}>
            <Label>{tab}</Label>
          </Tab>
        {/snippet}
      </TabBar>

      {#if active === "color"}
        <Card class="full-height">
          <ColorPreview bind:colors />
        </Card>
      {:else if active === "code"}
        <Card class="full-height">
          <CodePreview bind:colors />
        </Card>
      {/if}
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
  }

  .preview-section {
    flex: 1;
    display: flex;
    flex-direction: column;
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
