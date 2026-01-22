<script lang="ts" context="module">
  export interface Theme {
    /* ANSI Colors 0 to 7 (Standard Colors) */
    color0: string; // Black (bg)
    color1: string; // Red
    color2: string; // Green
    color3: string; // Yellow
    color4: string; // Blue
    color5: string; // Magenta
    color6: string; // Cyan
    color7: string; // Light Gray / shade of fg (darker) -> gray

    /* ANSI Colors 8 to 15 (Bright Colors) */
    color8: string; // Dark gray / shade of bg (ligther) -> gray
    color9: string; // Bright Red
    color10: string; // Bright Green
    color11: string; // Bright Yellow
    color12: string; // Bright Blue
    color13: string; // Bright Magenta
    color14: string; // Bright Cyan
    color15: string; // White (fg)

    color16: string; // Orange
    color17: string; // Bright Orange

    // contrast alternatives (shades of fg / bg)
    bg0: string; // bh0_h darker bg (not covered)
    // bg color itself color0
    bg1: string; // bh0_s lighter bg (surface)
    bg2: string; // bg1 (overlay)
    //bg2: ThemeColor; //

    fg0: string; // fg0 lighter fg
    // fg color itself color15
    fg1: string; // darker fg (subtle)
    fg2: string; // (muted)
  }

  export interface ColorKey {
    key: keyof Theme;
    description: string;
    label: string;
  }

  export const colorKeys: ColorKey[] = [
    {
      key: "color0" as keyof Theme,
      description: "(black bg)",
      label: "Color 0",
    },
    {
      key: "color1" as keyof Theme,
      description: "(base red)",
      label: "Color 1",
    },
    {
      key: "color2" as keyof Theme,
      description: "(base green)",
      label: "Color 2",
    },
    {
      key: "color3" as keyof Theme,
      description: "(base yellow)",
      label: "Color 3",
    },
    {
      key: "color4" as keyof Theme,
      description: "(base blue)",
      label: "Color 4",
    },
    {
      key: "color5" as keyof Theme,
      description: "(base magenta)",
      label: "Color 5",
    },
    {
      key: "color6" as keyof Theme,
      description: "(base cyan)",
      label: "Color 6",
    },
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
    {
      key: "color9" as keyof Theme,
      description: "(light red)",
      label: "Color 9",
    },
    {
      key: "color10" as keyof Theme,
      description: "(light green)",
      label: "Color 10",
    },
    {
      key: "color11" as keyof Theme,
      description: "(light yellow)",
      label: "Color 11",
    },
    {
      key: "color12" as keyof Theme,
      description: "(light blue)",
      label: "Color 12",
    },
    {
      key: "color13" as keyof Theme,
      description: "(light magenta)",
      label: "Color 13",
    },
    {
      key: "color14" as keyof Theme,
      description: "(light cyan)",
      label: "Color 14",
    },
    {
      key: "color15" as keyof Theme,
      description: "(white fg)",
      label: "Color 15",
    },

    // special
    {
      key: "color16" as keyof Theme,
      description: "(base orange)",
      label: "Color 16",
    },
    {
      key: "color17" as keyof Theme,
      description: "(light orange)",
      label: "Color 17",
    },
    {
      key: "bg0" as keyof Theme,
      description: "(bg0 darker)",
      label: "Color 18",
    },
    {
      key: "bg1" as keyof Theme,
      description: "(bg1 brighter)",
      label: "Color 19",
    },
    {
      key: "bg2" as keyof Theme,
      description: "(bg2 brighter+)",
      label: "Color 20",
    },
    {
      key: "fg0" as keyof Theme,
      description: "(fg0 brighter)",
      label: "Color 20",
    },
    {
      key: "fg1" as keyof Theme,
      description: "(fg1 darker)",
      label: "Color 20",
    },
    {
      key: "fg2" as keyof Theme,
      description: "(fg2 darker+)",
      label: "Color 20",
    },
  ];

  export type SyntaxToken = keyof SyntaxMapping

  export interface ColorConfig {
    colors: Theme;
    mappings: SyntaxMapping;
  }

  export interface SyntaxMapping {
    comment: string;
    keyword: string;
    string: string;
    number: string;
    variable: string;
    fn: string;
    type: string;
    class: string;
    namespace: string;
    parameter: string;
    operator: string;
    builtin: string;
    property: string;
    special: string;
    macro: string;
  }
</script>
