import { writable } from "svelte/store";
import type { Theme, SyntaxToken } from "./Types.svelte";

const LOCAL_KEY = 'codecolor-state-v1';

export const darkMode = writable<boolean>(false);

export const syntaxMapping = writable<Record<SyntaxToken, keyof Theme>>({
  comment: "color8", // Dark gray
  keyword: "color5", // Magenta
  string: "color2", // Green
  number: "color11", // Bright Yellow
  variable: "color1", // Red
  function: "color4", // Blue
  type: "color9", // Yellow
  class: "color3", // Yellow
  parameter: "color11", // Bright Yellow
  operator: "color15", // White (fg)
  builtin: "color6", // Cyan
  property: "color1", // Red
});

// firefly
export const colorStore = writable<Theme>({
  // Base colors (0-7)
  color0: "#1c1a1c", // Background
  color1: "#A64B3A", // Red
  color2: "#91b794", // Green
  color3: "#D48B1D", // Yellow
  color4: "#625C70", // Blue
  color5: "#CC666B", // Magenta/Purple
  color6: "#79999d", // Cyan
  color7: "#b9bfca", // Light Gray

  // Bright colors (8-15)
  color8: "#5c6370", // Dark Gray
  color9: "#BD5644", // Bright Red
  color10: "#B5E5B9", // Bright Green
  color11: "#F1D6AB", // Bright Yellow/Orange
  color12: "#888198", // Bright Blue
  color13: "#E0A3A6", // Bright Magenta/Purple
  color14: "#A1CCD1", // Bright Cyan
  color15: "#E3DEDE", // White Text

  // Special colors
  color16: "#d19a66", // Orange
  color17: "#e5c07b", // Bright Orange

  // Background variants
  bg0: "#21252b", // Darker background
  bg1: "#2c313a", // Lighter background
  bg2: "#353b45", // Selection background

  // Foreground variants
  fg0: "#dcdfe4", // Brighter foreground
  fg1: "#9da5b4", // Default foreground
  fg2: "#978787", // Muted foreground
});

// persistence
type PersistedState = {
  darkMode: boolean;
  syntaxMapping: Record<SyntaxToken, keyof Theme>;
  colors: Theme;
};

function loadPersisted(): PersistedState | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function persist(state: PersistedState) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch {}
}

// Apply persisted on init
const initial = typeof window !== 'undefined' ? loadPersisted() : null;
if (initial) {
  darkMode.set(initial.darkMode);
  syntaxMapping.set(initial.syntaxMapping);
  colorStore.set(initial.colors);
}

// Subscribe and persist changes
let currentState: PersistedState = {
  darkMode: false,
  syntaxMapping: {
    comment: "color8",
    keyword: "color5",
    string: "color2",
    number: "color11",
    variable: "color1",
    function: "color4",
    type: "color9",
    class: "color3",
    parameter: "color11",
    operator: "color15",
    builtin: "color6",
    property: "color1",
  },
  colors: {
    color0: "#1c1a1c",
    color1: "#A64B3A",
    color2: "#91b794",
    color3: "#D48B1D",
    color4: "#625C70",
    color5: "#CC666B",
    color6: "#79999d",
    color7: "#b9bfca",
    color8: "#5c6370",
    color9: "#BD5644",
    color10: "#B5E5B9",
    color11: "#F1D6AB",
    color12: "#888198",
    color13: "#E0A3A6",
    color14: "#A1CCD1",
    color15: "#E3DEDE",
    color16: "#d19a66",
    color17: "#e5c07b",
    bg0: "#21252b",
    bg1: "#2c313a",
    bg2: "#353b45",
    fg0: "#dcdfe4",
    fg1: "#9da5b4",
    fg2: "#978787",
  },
};

if (initial) currentState = initial;

darkMode.subscribe((v) => {
  currentState.darkMode = v;
  persist(currentState);
});
syntaxMapping.subscribe((v) => {
  currentState.syntaxMapping = v as any;
  persist(currentState);
});
colorStore.subscribe((v) => {
  currentState.colors = v;
  persist(currentState);
});

export function resetAll() {
  localStorage.removeItem(LOCAL_KEY);
  // Reset to defaults by reassigning initial literal values
  darkMode.set(false);
  syntaxMapping.set({
    comment: "color8",
    keyword: "color5",
    string: "color2",
    number: "color11",
    variable: "color1",
    function: "color4",
    type: "color9",
    class: "color3",
    parameter: "color11",
    operator: "color15",
    builtin: "color6",
    property: "color1",
  });
  colorStore.set({
    color0: "#1c1a1c",
    color1: "#A64B3A",
    color2: "#91b794",
    color3: "#D48B1D",
    color4: "#625C70",
    color5: "#CC666B",
    color6: "#79999d",
    color7: "#b9bfca",
    color8: "#5c6370",
    color9: "#BD5644",
    color10: "#B5E5B9",
    color11: "#F1D6AB",
    color12: "#888198",
    color13: "#E0A3A6",
    color14: "#A1CCD1",
    color15: "#E3DEDE",
    color16: "#d19a66",
    color17: "#e5c07b",
    bg0: "#21252b",
    bg1: "#2c313a",
    bg2: "#353b45",
    fg0: "#dcdfe4",
    fg1: "#9da5b4",
    fg2: "#978787",
  });
}
/*
// one dark pro
export const colorStore = writable<Theme>({
  // Base colors (0-7)
  color0: "#282c34", // Background
  color1: "#e06c75", // Red
  color2: "#98c379", // Green
  color3: "#e5c07b", // Yellow
  color4: "#61afef", // Blue
  color5: "#c678dd", // Magenta/Purple
  color6: "#56b6c2", // Cyan
  color7: "#b9bfca", // Light Gray

  // Bright colors (8-15)
  color8: "#5c6370", // Dark Gray
  color9: "#be5046", // Bright Red
  color10: "#7bc275", // Bright Green
  color11: "#d19a66", // Bright Yellow/Orange
  color12: "#528bff", // Bright Blue
  color13: "#b267e6", // Bright Magenta/Purple
  color14: "#41a6b5", // Bright Cyan
  color15: "#abb2bf", // White Text

  // Special colors
  color16: "#d19a66", // Orange
  color17: "#e5c07b", // Bright Orange

  // Background variants
  bg0: "#21252b", // Darker background
  bg1: "#2c313a", // Lighter background
  bg2: "#353b45", // Selection background

  // Foreground variants
  fg0: "#dcdfe4", // Brighter foreground
  fg1: "#9da5b4", // Default foreground
  fg2: "#7f848e", // Muted foreground
});

//GruvBox
export const colorStore = writable<Theme>({
  color0: "#282828",
  color1: "#cc241d",
  color2: "#98971a",
  color3: "#d79921",
  color4: "#458588",
  color5: "#b16286",
  color6: "#689d6a",
  color7: "#a89984",

  color8: "#928374",
  color9: "#fb4934",
  color10: "#b8bb26",
  color11: "#fabd2f",
  color12: "#83a598",
  color13: "#d3869b",
  color14: "#8ec07c",
  color15: "#ebdbb2",

  color16: "#d65d0e",
  color17: "#fe8019",

  bg0: "#1d2021",
  bg1: "#32302f",
  bg2: "#3c3836",

  fg0: "#fbf1c7",
  fg1: "#d5c4a1",
  fg2: "#bdae93",
});
 */
