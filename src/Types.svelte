<script lang="ts" context="module">
  export interface ThemeColor {
    value: string;
    label: string;
  }

  export interface theme {
    /* ANSI Colors 0 to 7 (Standard Colors) */
    color0: ThemeColor; // Black (bg)
    color1: ThemeColor; // Red
    color2: ThemeColor; // Green
    color3: ThemeColor; // Yellow
    color4: ThemeColor; // Blue
    color5: ThemeColor; // Magenta
    color6: ThemeColor; // Cyan
    color7: ThemeColor; // White (actually light gray)

    /* ANSI Colors 8 to 15 (Bright Colors) */
    color8: ThemeColor; // Bright Black (actually dark gray)
    color9: ThemeColor; // Bright Red
    color10: ThemeColor; // Bright Green
    color11: ThemeColor; // Bright Yellow
    color12: ThemeColor; // Bright Blue
    color13: ThemeColor; // Bright Magenta
    color14: ThemeColor; // Bright Cyan
    color15: ThemeColor; // Bright White (fg)

    color16: ThemeColor; // Orange
    color17: ThemeColor; // Bright Orange
  }

  export interface ColorKey {
    key: keyof theme;
    description: string;
    label: string;
  }

  export const colorKeys: ColorKey[] = [
    { key: "color0" as keyof theme, description: "(bg)", label: "Color 0" },
    { key: "color1" as keyof theme, description: "", label: "Color 1" },
    { key: "color2" as keyof theme, description: "", label: "Color 2" },
    { key: "color3" as keyof theme, description: "", label: "Color 3" },
    { key: "color4" as keyof theme, description: "", label: "Color 4" },
    { key: "color5" as keyof theme, description: "", label: "Color 5" },
    { key: "color6" as keyof theme, description: "", label: "Color 6" },
    { key: "color7" as keyof theme, description: "", label: "Color 7" },
    { key: "color8" as keyof theme, description: "", label: "Color 8" },
    { key: "color9" as keyof theme, description: "", label: "Color 9" },
    { key: "color10" as keyof theme, description: "", label: "Color 10" },
    { key: "color11" as keyof theme, description: "", label: "Color 11" },
    { key: "color12" as keyof theme, description: "", label: "Color 12" },
    { key: "color13" as keyof theme, description: "", label: "Color 13" },
    { key: "color14" as keyof theme, description: "", label: "Color 14" },
    { key: "color15" as keyof theme, description: "(fg)", label: "Color 15" },
    { key: "color16" as keyof theme, description: "", label: "Color 16" },
    { key: "color17" as keyof theme, description: "", label: "Color 17" },
  ];
</script>
