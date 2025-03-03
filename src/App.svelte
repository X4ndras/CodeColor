<script lang="ts">
  import { onMount } from "svelte";
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Sidebar from "./lib/Sidebar.svelte";
  import CodePreview from "./lib/CodePreview.svelte";
  import TerminalPreview from "./lib/TerminalPreview.svelte";
  import ExportPopup from "./lib/ExportPopup.svelte";
  import type { theme } from "./Types.svelte";

  let darkMode = true;
  let showSidebar = false;
  let mounted = false;

  let colors: theme = {
    /* Base Background Color (usually default background) */
    background: "#1E1E1E",

    /* Base Foreground Color (usually text color) */
    text: "#FFFFFF",

    /* ANSI Colors 0 to 7 (Standard Colors) */
    color0: "#000000", // Black
    color1: "#FF0000", // Red
    color2: "#00FF00", // Green
    color3: "#FFFF00", // Yellow
    color4: "#0000FF", // Blue
    color5: "#FF00FF", // Magenta
    color6: "#00FFFF", // Cyan
    color7: "#C0C0C0", // White (actually light gray)

    /* ANSI Colors 8 to 15 (Bright Colors) */
    color8: "#808080", // Bright Black (actually dark gray)
    color9: "#FF8080", // Bright Red
    color10: "#80FF80", // Bright Green
    color11: "#FFFF80", // Bright Yellow
    color12: "#8080FF", // Bright Blue
    color13: "#FF80FF", // Bright Magenta
    color14: "#00FFFF", // Bright Cyan
    color15: "#FFFFFF", // Bright White
  };

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
    root.style.setProperty("--base", colors.text);
    root.style.setProperty("--surface", colors.background);
    root.style.setProperty("--color0", colors.color0);
    root.style.setProperty("--color1", colors.color1);
    root.style.setProperty("--color2", colors.color2);
    root.style.setProperty("--color3", colors.color3);
    root.style.setProperty("--color4", colors.color4);
    root.style.setProperty("--color5", colors.color5);
    root.style.setProperty("--color6", colors.color6);
    root.style.setProperty("--color7", colors.color7);
    root.style.setProperty("--color8", colors.color8);
    root.style.setProperty("--color9", colors.color9);
    root.style.setProperty("--color10", colors.color10);
    root.style.setProperty("--color11", colors.color11);
    root.style.setProperty("--color12", colors.color12);
    root.style.setProperty("--color13", colors.color13);
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

  // Watch for darkMode changes
  $: if (mounted) {
    localStorage.setItem("darkMode", darkMode.toString());
    applyTheme();
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
          on:click={() => (showSidebar = !showSidebar)}
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
      <Card>
        <div class="preview">
          <h2>Terminal Preview</h2>
          <TerminalPreview bind:colors />
        </div>
      </Card>

      <Card>
        <div class="preview">
          <h2>Code Preview</h2>
          <CodePreview bind:colors />
        </div>
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
    gap: 2rem;
  }

  .preview {
    padding: 1rem;
  }

  h2 {
    margin-top: 0;
    color: var(--text-color);
    margin-bottom: 1rem;
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

    .preview {
      padding: 0.5rem;
    }

    .toggle-sidebar {
      display: flex;
    }

    .layout {
      padding-left: 0;
    }
  }
</style>
