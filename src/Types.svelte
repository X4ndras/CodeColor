<script lang="ts" context="module">
  export interface theme {
    /* Base Background Color (usually default background) */
    background: string,
    
    /* Base Foreground Color (usually text color) */
    text: string,

    /* ANSI Colors 0 to 7 (Standard Colors) */
    color0: string,  // Black
    color1: string,  // Red
    color2: string,  // Green
    color3: string,  // Yellow
    color4: string,  // Blue
    color5: string,  // Magenta
    color6: string,  // Cyan
    color7: string,  // White (actually light gray)

    /* ANSI Colors 8 to 15 (Bright Colors) */
    color8: string,  // Bright Black (actually dark gray)
    color9: string,  // Bright Red
    color10: string, // Bright Green
    color11: string, // Bright Yellow
    color12: string, // Bright Blue
    color13: string, // Bright Magenta
    color14: string, // Bright Cyan
    color15: string  // Bright White

  }
</script>
