<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '@smui/card';
  import Switch from '@smui/switch';
  import ColorPicker from './lib/ColorPicker.svelte';
  import CodePreview from './lib/CodePreview.svelte';
  import TerminalPreview from './lib/TerminalPreview.svelte';

  onMount(() => {
    const storedDark = localStorage.getItem('darkMode');
    if (storedDark !== null) {
      darkMode = storedDark === 'true';
    }
  });

  let darkMode = true;
  let showSidebar = true;

  let colors = {
    base: '#FFFFFF',
    color0: '#000000',
    color1: '#FF0000',
    color2: '#00FF00',
    color3: '#FFFF00',
    color4: '#0000FF',
    color5: '#FF00FF',
    color6: '#00FFFF',
    surface: '#1E1E1E',
    color7: '#C0C0C0',
    color8: '#808080',
    color9: '#FF8080',
    color10: '#80FF80',
    color11: '#FFFF80',
    color12: '#8080FF',
    color13: '#FF80FF'
  };

  // Persist dark mode changes
  $: localStorage.setItem('darkMode', `${darkMode}`);

  // Update document classes so CSS custom properties work
  $: {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    //document.documentElement.classList.toggle('dark', darkMode);
    //document.documentElement.classList.toggle('light', !darkMode);
  }
</script>

<main class="theme-{darkMode ? 'dark' : 'light'}">
  <div class="header">
    <h1>Neovim Theme Creator</h1>
    <div class="theme-switch">
      <span>🌞</span>
      <button class="toggle-sidebar" on:click={() => showSidebar = !showSidebar}>
        {showSidebar ? '✕' : '☰'}
      </button>
      <Switch bind:checked={darkMode} />
      <span>🌙</span>
    </div>
  </div>

  <div class="layout">
    <div class="sidebar" class:sidebar-hidden={!showSidebar}>
      <Card>
        <div class="color-pickers">
          <ColorPicker label="Base Color" bind:value={colors.base} />
          <ColorPicker label="Color 0" bind:value={colors.color0} />
          <ColorPicker label="Color 1" bind:value={colors.color1} />
          <ColorPicker label="Color 2" bind:value={colors.color2} />
          <ColorPicker label="Color 3" bind:value={colors.color3} />
          <ColorPicker label="Color 4" bind:value={colors.color4} />
          <ColorPicker label="Color 5" bind:value={colors.color5} />
          <ColorPicker label="Color 6" bind:value={colors.color6} />
          <ColorPicker label="Surface" bind:value={colors.surface} />
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

    <div class="preview-section">
      <Card>
        <div class="preview">
          <h2>Terminal Preview</h2>
          <TerminalPreview {colors} />
        </div>
      </Card>

      <Card>
        <div class="preview">
          <h2>Code Preview</h2>
          <CodePreview {colors} />
        </div>
      </Card>
    </div>
  </div>
</main>

<style>
  :global(:root) {
    --text-color: #213547;
    --bg-color: #ffffff;
    --border-color: #ccc;
    --card-bg: #ffffff;
    --sidebar-width: 320px;
  }

  :global([data-theme="dark"]) {
    --text-color: #ffffff;
    --bg-color: #1a1a1a;
    --border-color: #444;
    --card-bg: #2d2d2d;
  }

  :global(body) {
    margin: 0;
    padding: 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
  }

  :global(.mdc-card) {
    background-color: var(--card-bg) !important;
    color: var(--text-color) !important;
    border-radius: 16px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    padding-right: var(--sidebar-width);
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
  margin: 0 auto;
  position: relative;
  padding-left: var(--sidebar-width);
}

  h1 {
    text-align: center;
    color: var(--text-color);
    margin: 0;
    font-size: 1.5rem;
  }

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
  }

  .sidebar-hidden {
    transform: translateX(-100%);
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
}

  .preview-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .color-pickers {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    :global(body) {
      padding: 0.5rem;
    }

    .header {
      padding-right: 0;
      margin-bottom: 0.5rem;
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

    .sidebar {
      width: 100%;
      max-width: 320px;
    }

    .layout {
      padding-left: 0;
    }
  }

</style>

