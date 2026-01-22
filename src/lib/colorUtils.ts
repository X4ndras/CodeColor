import tinycolor from 'tinycolor2';

// ============================================
// Type Definitions
// ============================================

export type ColorMode = 'hex' | 'rgb' | 'hsl' | 'cmyk';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorHarmony {
  name: string;
  colors: string[];
  description: string;
}

export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
  level: 'Fail' | 'AA Large' | 'AA' | 'AAA';
}

// ============================================
// CMYK Conversion Functions
// ============================================

/**
 * Convert RGB to CMYK
 * CMYK values are returned as percentages (0-100)
 */
export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  // Normalize RGB values to 0-1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Calculate K (black key)
  const k = 1 - Math.max(rNorm, gNorm, bNorm);

  // Handle pure black case
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  // Calculate CMY
  const c = ((1 - rNorm - k) / (1 - k)) * 100;
  const m = ((1 - gNorm - k) / (1 - k)) * 100;
  const y = ((1 - bNorm - k) / (1 - k)) * 100;

  return {
    c: Math.round(c),
    m: Math.round(m),
    y: Math.round(y),
    k: Math.round(k * 100),
  };
}

/**
 * Convert CMYK to RGB
 * CMYK values should be percentages (0-100)
 */
export function cmykToRgb(c: number, m: number, y: number, k: number): RGB {
  // Normalize to 0-1
  const cNorm = c / 100;
  const mNorm = m / 100;
  const yNorm = y / 100;
  const kNorm = k / 100;

  const r = Math.round(255 * (1 - cNorm) * (1 - kNorm));
  const g = Math.round(255 * (1 - mNorm) * (1 - kNorm));
  const b = Math.round(255 * (1 - yNorm) * (1 - kNorm));

  return { r, g, b };
}

/**
 * Convert hex color to CMYK
 */
export function hexToCmyk(hex: string): CMYK {
  const color = tinycolor(hex);
  const rgb = color.toRgb();
  return rgbToCmyk(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert CMYK to hex string
 */
export function cmykToHex(c: number, m: number, y: number, k: number): string {
  const rgb = cmykToRgb(c, m, y, k);
  return tinycolor(rgb).toHexString();
}

// ============================================
// Color Format Utilities
// ============================================

/**
 * Format color in specified mode
 */
export function formatColor(hex: string, mode: ColorMode): string {
  const color = tinycolor(hex);
  
  switch (mode) {
    case 'hex':
      return color.toHexString();
    case 'rgb': {
      const rgb = color.toRgb();
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case 'hsl': {
      const hsl = color.toHsl();
      return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
    }
    case 'cmyk': {
      const cmyk = hexToCmyk(hex);
      return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    }
  }
}

/**
 * Parse color from any supported format to hex
 */
export function parseToHex(input: string): string | null {
  // Try parsing as CMYK first (tinycolor doesn't support it)
  const cmykMatch = input.match(/cmyk\s*\(\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/i);
  if (cmykMatch) {
    const [, c, m, y, k] = cmykMatch.map(Number);
    return cmykToHex(c, m, y, k);
  }

  // Let tinycolor handle the rest
  const color = tinycolor(input);
  if (color.isValid()) {
    return color.toHexString();
  }

  return null;
}

/**
 * Get color components for a specific mode
 */
export function getColorComponents(hex: string, mode: ColorMode): Record<string, number> {
  const color = tinycolor(hex);

  switch (mode) {
    case 'hex':
      return {};
    case 'rgb': {
      const rgb = color.toRgb();
      return { r: rgb.r, g: rgb.g, b: rgb.b };
    }
    case 'hsl': {
      const hsl = color.toHsl();
      return { 
        h: Math.round(hsl.h), 
        s: Math.round(hsl.s * 100), 
        l: Math.round(hsl.l * 100) 
      };
    }
    case 'cmyk': {
      const cmyk = hexToCmyk(hex);
      return { c: cmyk.c, m: cmyk.m, y: cmyk.y, k: cmyk.k };
    }
  }
}

// ============================================
// Color Harmony Functions
// ============================================

/**
 * Rotate hue by specified degrees
 */
function rotateHue(hex: string, degrees: number): string {
  const color = tinycolor(hex);
  return color.spin(degrees).toHexString();
}

/**
 * Get complementary color (180 degrees opposite)
 */
export function getComplementary(hex: string): ColorHarmony {
  return {
    name: 'Complementary',
    description: 'Opposite on the color wheel (180°)',
    colors: [hex, rotateHue(hex, 180)],
  };
}

/**
 * Get analogous colors (adjacent on color wheel)
 */
export function getAnalogous(hex: string, angle: number = 30): ColorHarmony {
  return {
    name: 'Analogous',
    description: `Adjacent colors (±${angle}°)`,
    colors: [
      rotateHue(hex, -angle),
      hex,
      rotateHue(hex, angle),
    ],
  };
}

/**
 * Get triadic colors (evenly spaced, 120 degrees apart)
 */
export function getTriadic(hex: string): ColorHarmony {
  return {
    name: 'Triadic',
    description: 'Three evenly spaced colors (120° apart)',
    colors: [hex, rotateHue(hex, 120), rotateHue(hex, 240)],
  };
}

/**
 * Get tetradic/square colors (four evenly spaced, 90 degrees apart)
 */
export function getTetradic(hex: string): ColorHarmony {
  return {
    name: 'Tetradic',
    description: 'Four evenly spaced colors (90° apart)',
    colors: [hex, rotateHue(hex, 90), rotateHue(hex, 180), rotateHue(hex, 270)],
  };
}

/**
 * Get split-complementary colors
 */
export function getSplitComplementary(hex: string): ColorHarmony {
  return {
    name: 'Split-Complementary',
    description: 'Base + colors adjacent to its complement',
    colors: [hex, rotateHue(hex, 150), rotateHue(hex, 210)],
  };
}

/**
 * Get all color harmonies for a given color
 */
export function getAllHarmonies(hex: string): ColorHarmony[] {
  return [
    getComplementary(hex),
    getAnalogous(hex),
    getTriadic(hex),
    getSplitComplementary(hex),
    getTetradic(hex),
  ];
}

// ============================================
// WCAG Contrast Functions
// ============================================

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 specification
 */
export function getRelativeLuminance(hex: string): number {
  const color = tinycolor(hex);
  const rgb = color.toRgb();

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(foreground: string, background: string): number {
  const lum1 = getRelativeLuminance(foreground);
  const lum2 = getRelativeLuminance(background);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG compliance and return detailed result
 */
export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatio(foreground, background);

  // WCAG 2.1 thresholds
  const aaLarge = ratio >= 3;      // AA for large text (18pt+ or 14pt+ bold)
  const aa = ratio >= 4.5;          // AA for normal text
  const aaaLarge = ratio >= 4.5;    // AAA for large text
  const aaa = ratio >= 7;           // AAA for normal text

  let level: ContrastResult['level'] = 'Fail';
  if (aaa) level = 'AAA';
  else if (aa) level = 'AA';
  else if (aaLarge) level = 'AA Large';

  return {
    ratio: Math.round(ratio * 100) / 100,
    aa,
    aaLarge,
    aaa,
    aaaLarge,
    level,
  };
}

/**
 * Get a suggested color that meets contrast requirements
 * Adjusts lightness to meet the target ratio
 */
export function suggestAccessibleColor(
  foreground: string, 
  background: string, 
  targetRatio: number = 4.5
): string {
  const color = tinycolor(foreground);
  const hsl = color.toHsl();
  const bgLuminance = getRelativeLuminance(background);

  // Try adjusting lightness in steps
  for (let l = 0; l <= 100; l++) {
    const testColor = tinycolor({ h: hsl.h, s: hsl.s, l: l / 100 });
    const testHex = testColor.toHexString();
    const ratio = getContrastRatio(testHex, background);

    if (ratio >= targetRatio) {
      // If background is dark, we want lighter text (and vice versa)
      if (bgLuminance < 0.5 && l >= hsl.l * 100) {
        return testHex;
      } else if (bgLuminance >= 0.5 && l <= hsl.l * 100) {
        return testHex;
      }
    }
  }

  // Fallback: return the most contrasting option (black or white)
  return bgLuminance < 0.5 ? '#ffffff' : '#000000';
}

// ============================================
// Shade Generation
// ============================================

/**
 * Generate shades of a color (lighter and darker variants)
 */
export function generateShades(hex: string, count: number = 9): string[] {
  const color = tinycolor(hex);
  const hsl = color.toHsl();
  const shades: string[] = [];

  const step = 1 / (count + 1);

  for (let i = 1; i <= count; i++) {
    const lightness = step * i;
    shades.push(
      tinycolor({ h: hsl.h, s: hsl.s, l: lightness }).toHexString()
    );
  }

  return shades;
}

/**
 * Generate tints (lighter variants) of a color
 */
export function generateTints(hex: string, count: number = 5): string[] {
  const color = tinycolor(hex);
  const tints: string[] = [];

  for (let i = 1; i <= count; i++) {
    const amount = (i / (count + 1)) * 100;
    tints.push(tinycolor.mix(color, '#ffffff', amount).toHexString());
  }

  return tints;
}

/**
 * Generate shades (darker variants) of a color
 */
export function generateDarkShades(hex: string, count: number = 5): string[] {
  const color = tinycolor(hex);
  const shades: string[] = [];

  for (let i = 1; i <= count; i++) {
    const amount = (i / (count + 1)) * 100;
    shades.push(tinycolor.mix(color, '#000000', amount).toHexString());
  }

  return shades;
}
