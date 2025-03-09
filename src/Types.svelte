<script lang="ts" context="module">
  export interface ThemeColor {
    value: string;
    label: string;
  }

  export interface Theme {
    /* ANSI Colors 0 to 7 (Standard Colors) */
    color0: ThemeColor; // Black (bg)
    color1: ThemeColor; // Red
    color2: ThemeColor; // Green
    color3: ThemeColor; // Yellow
    color4: ThemeColor; // Blue
    color5: ThemeColor; // Magenta
    color6: ThemeColor; // Cyan
    color7: ThemeColor; // Light Gray / shade of fg (darker) -> gray

    /* ANSI Colors 8 to 15 (Bright Colors) */
    color8: ThemeColor; // Dark gray / shade of bg (ligther) -> gray
    color9: ThemeColor; // Bright Red
    color10: ThemeColor; // Bright Green
    color11: ThemeColor; // Bright Yellow
    color12: ThemeColor; // Bright Blue
    color13: ThemeColor; // Bright Magenta
    color14: ThemeColor; // Bright Cyan
    color15: ThemeColor; // White (fg)

    color16: ThemeColor; // Orange
    color17: ThemeColor; // Bright Orange

    // contrast alternatives (shades of fg / bg)
    bg0: ThemeColor; // bh0_h darker bg (not covered)
    // bg color itself color0
    bg1: ThemeColor; // bh0_s lighter bg (surface)
    bg2: ThemeColor; // bg1 (overlay)
    //bg2: ThemeColor; //

    fg0: ThemeColor; // fg0 lighter fg
    // fg color itself color15
    fg1: ThemeColor; // darker fg (subtle)
    fg2: ThemeColor; // (muted)
  }

  export interface ColorKey {
    key: keyof Theme;
    description: string;
    label: string;
  }

  export const colorKeys: ColorKey[] = [
    { key: "color0" as keyof Theme, description: "(bg)", label: "Color 0" },
    { key: "color1" as keyof Theme, description: "", label: "Color 1" },
    { key: "color2" as keyof Theme, description: "", label: "Color 2" },
    { key: "color3" as keyof Theme, description: "", label: "Color 3" },
    { key: "color4" as keyof Theme, description: "", label: "Color 4" },
    { key: "color5" as keyof Theme, description: "", label: "Color 5" },
    { key: "color6" as keyof Theme, description: "", label: "Color 6" },
    {
      key: "color7" as keyof Theme,
      description: "(light grey)",
      label: "Color 7",
    },
    {
      key: "color8" as keyof Theme,
      description: "(dark grey)",
      label: "Color 8",
    },
    { key: "color9" as keyof Theme, description: "", label: "Color 9" },
    { key: "color10" as keyof Theme, description: "", label: "Color 10" },
    { key: "color11" as keyof Theme, description: "", label: "Color 11" },
    { key: "color12" as keyof Theme, description: "", label: "Color 12" },
    { key: "color13" as keyof Theme, description: "", label: "Color 13" },
    { key: "color14" as keyof Theme, description: "", label: "Color 14" },
    { key: "color15" as keyof Theme, description: "(fg)", label: "Color 15" },

    // special
    { key: "color16" as keyof Theme, description: "", label: "Color 16" },
    { key: "color17" as keyof Theme, description: "", label: "Color 17" },
    {
      key: "bg0" as keyof Theme,
      description: "(bg darker)",
      label: "Color 18",
    },
    {
      key: "bg1" as keyof Theme,
      description: "(bg brighter)",
      label: "Color 19",
    },
    {
      key: "bg2" as keyof Theme,
      description: "(bg brighter+)",
      label: "Color 20",
    },
    {
      key: "fg0" as keyof Theme,
      description: "(fg brighter)",
      label: "Color 20",
    },
    {
      key: "fg1" as keyof Theme,
      description: "(fg darker)",
      label: "Color 20",
    },
    {
      key: "fg2" as keyof Theme,
      description: "(fg darker+)",
      label: "Color 20",
    },
  ];
</script>
