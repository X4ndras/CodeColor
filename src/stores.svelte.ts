import { writable } from "svelte/store";
import type { Theme } from "./Types.svelte";

export const colorStore = writable<Theme>({
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

  bg0: { value: "#1d2021", label: "bg0 darker" },
  bg1: { value: "#32302f", label: "bg1 brighter" },
  bg2: { value: "#3c3836", label: "bg2 brighter+" },

  fg0: { value: "#fbf1c7", label: "fg0 brighter" },
  fg1: { value: "#d5c4a1", label: "fg1 darker" },
  fg2: { value: "#bdae93", label: "fg2 darker+" },
});
