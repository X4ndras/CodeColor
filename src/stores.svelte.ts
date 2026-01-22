import { writable } from "svelte/store";
import type {
  DiagnosticsMapping,
  StatuslineMapping,
  Theme,
  SyntaxToken,
} from "./Types.svelte";

const LOCAL_KEY = 'codecolor-state-v2';

export const darkMode = writable<boolean>(false);

const defaultSyntax: Record<SyntaxToken, keyof Theme> = {
  comment: "color8", // Dark gray
  keyword: "color5", // Magenta
  string: "color2", // Green
  number: "color11", // Bright Yellow
  variable: "color1", // Red
  fn: "color4", // Blue
  type: "color9", // Yellow
  class: "color3", // Yellow
  namespace: "color3", // Bright Yellow
  parameter: "color11", // Bright Yellow
  operator: "color15", // White (fg)
  builtin: "color6", // Cyan
  property: "color1", // Red
  special: "color12", // Violet/Blue accent
  macro: "color9", // Violet/Blue accent
};

const defaultDiagnostics: DiagnosticsMapping = {
  error: "color9", // Bright red
  warning: "color17", // Bright orange/yellow
  info: "color4", // Blue
  hint: "color6", // Cyan
  ok: "color2", // Green
};

const defaultStatusline: StatuslineMapping = {
  normal: "color5", // Magenta
  insert: "color3", // Yellow
  visual: "color4", // Blue
  replace: "color1", // Red
  command: "color6", // Cyan
  terminal: "color2", // Green
};

export const syntaxMapping = writable<Record<SyntaxToken, keyof Theme>>({
  ...defaultSyntax,
});

export const diagnosticsMapping = writable<DiagnosticsMapping>({
  ...defaultDiagnostics,
});

export const statuslineMapping = writable<StatuslineMapping>({
  ...defaultStatusline,
});

// firefly
// Defaults: Dark (Firefly)
const defaultDark: Theme = {
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
};

// Defaults: Light (Solarized Light)
// Reference: base3 #fdf6e3 (background), base2 #eee8d5 (cards),
// base1 #93a1a1, base0 #839496, base00 #657b83, base01 #586e75,
// yellow #b58900, orange #cb4b16, red #dc322f, magenta #d33682,
// violet #6c71c4, blue #268bd2, cyan #2aa198, green #859900
const defaultLight: Theme = {
  // Base colors
  color0: "#fdf6e3", // Background (Solarized base3)
  color1: "#dc322f", // Red
  color2: "#859900", // Green
  color3: "#b58900", // Yellow
  color4: "#268bd2", // Blue
  color5: "#d33682", // Magenta
  color6: "#2aa198", // Cyan
  color7: "#93a1a1", // Light Gray (base1)

  // Bright colors
  color8: "#586e75", // Dark Gray (base01)
  color9: "#cb4b16", // Orange / Bright Red
  color10: "#8ea600", // Bright Green (approximation)
  color11: "#b58900", // Bright Yellow/Orange
  color12: "#6c71c4", // Bright Blue/Violet
  color13: "#d33682", // Bright Magenta
  color14: "#2aa198", // Bright Cyan
  color15: "#657b83", // Text (base00)

  // Special
  color16: "#cb4b16", // Orange
  color17: "#b58900", // Bright Orange

  // Background variants
  bg0: "#fdf6e3", // Code preview background (base3)
  bg1: "#eee8d5", // Card background (base2)
  bg2: "#e6dfc8", // Slightly darker overlay (approx)

  // Foreground variants
  fg0: "#657b83", // Primary text (base00)
  fg1: "#586e75", // Secondary text (base01)
  fg2: "#93a1a1", // Muted text (base1)
};

export const darkTheme = writable<Theme>({ ...defaultDark });
export const lightTheme = writable<Theme>({ ...defaultLight });

// persistence
type PersistedState = {
  darkMode: boolean;
  syntaxMapping: Record<SyntaxToken, keyof Theme>;
  diagnosticsMapping: DiagnosticsMapping;
  statuslineMapping: StatuslineMapping;
  darkColors: Theme;
  lightColors: Theme;
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
  // Merge persisted mapping with defaults to add any new keys (e.g., 'special')
  syntaxMapping.set({ ...defaultSyntax, ...initial.syntaxMapping });
  diagnosticsMapping.set({
    ...defaultDiagnostics,
    ...(initial.diagnosticsMapping ?? {}),
  });
  statuslineMapping.set({
    ...defaultStatusline,
    ...(initial.statuslineMapping ?? {}),
  });
  darkTheme.set(initial.darkColors);
  lightTheme.set(initial.lightColors);
}

// Subscribe and persist changes
let currentState: PersistedState = {
  darkMode: false,
  syntaxMapping: { ...defaultSyntax },
  diagnosticsMapping: { ...defaultDiagnostics },
  statuslineMapping: { ...defaultStatusline },
  darkColors: { ...defaultDark },
  lightColors: { ...defaultLight },
};

if (initial) {
  currentState = {
    ...currentState,
    ...initial,
    syntaxMapping: { ...defaultSyntax, ...initial.syntaxMapping },
    diagnosticsMapping: {
      ...defaultDiagnostics,
      ...(initial.diagnosticsMapping ?? {}),
    },
    statuslineMapping: {
      ...defaultStatusline,
      ...(initial.statuslineMapping ?? {}),
    },
  };
}

darkMode.subscribe((v) => {
  currentState.darkMode = v;
  persist(currentState);
});
syntaxMapping.subscribe((v) => {
  currentState.syntaxMapping = v as any;
  persist(currentState);
});

diagnosticsMapping.subscribe((v) => {
  currentState.diagnosticsMapping = v;
  persist(currentState);
});

statuslineMapping.subscribe((v) => {
  currentState.statuslineMapping = v;
  persist(currentState);
});
darkTheme.subscribe((v) => {
  currentState.darkColors = v;
  persist(currentState);
});
lightTheme.subscribe((v) => {
  currentState.lightColors = v;
  persist(currentState);
});

export function resetAll() {
  localStorage.removeItem(LOCAL_KEY);
  // Reset to defaults
  darkMode.set(false);
  syntaxMapping.set({ ...defaultSyntax });
  diagnosticsMapping.set({ ...defaultDiagnostics });
  statuslineMapping.set({ ...defaultStatusline });
  darkTheme.set({ ...defaultDark });
  lightTheme.set({ ...defaultLight });
}

export function resetCurrentTheme(isDark: boolean) {
  if (isDark) {
    darkTheme.set({ ...defaultDark });
  } else {
    lightTheme.set({ ...defaultLight });
  }
}

export function resetSyntaxDefaults() {
  syntaxMapping.set({ ...defaultSyntax });
  diagnosticsMapping.set({ ...defaultDiagnostics });
  statuslineMapping.set({ ...defaultStatusline });
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
