/**
 * Zing.coach-inspired Design System
 * Clean, glassmorphic aesthetic with light backgrounds and premium styling
 */

import { Platform } from "react-native";

// Primary brand color - orange gradient (replaces previous purple)
const primaryPurple = "#FF6B35"; // Orange-600
const primaryPurpleLight = "#FFB089"; // Lighter orange
const primaryPurpleDark = "#C8501F"; // Darker orange

// Secondary accent - blue/teal
const secondaryBlue = "#3B82F6"; // Blue-500
const secondaryTeal = "#14B8A6"; // Teal-500

// Neutral colors
const white = "#FFFFFF";
const lightGray = "#F3F4F6"; // Gray-100
const mediumGray = "#E5E7EB"; // Gray-200
const darkGray = "#9CA3AF"; // Gray-400
const textPrimary = "#111827"; // Gray-900
const textSecondary = "#6B7280"; // Gray-500
const textDisabled = "#D1D5DB"; // Gray-300

// Success/Error colors
const successGreen = "#10B981"; // Green-500
const errorRed = "#EF4444"; // Red-500
const warningYellow = "#F59E0B"; // Amber-500

export const Colors = {
  light: {
    // Text colors
    text: textPrimary,
    textSecondary: textSecondary,
    textDisabled: textDisabled,

    // Background colors
    background: white,
    backgroundSecondary: lightGray,

    // Surface colors (for cards, modals, etc.)
    surface: white,
    surfaceSecondary: lightGray,

    // Brand colors
    tint: primaryPurple,
    tintLight: primaryPurpleLight,
    tintDark: primaryPurpleDark,
    secondary: secondaryBlue,
    secondaryTeal: secondaryTeal,
    tertiary: secondaryTeal,

    // Border colors
    border: mediumGray,
    borderLight: lightGray,

    // Tab bar
    tabIconDefault: darkGray,
    tabIconSelected: primaryPurple,

    // Status colors
    success: successGreen,
    error: errorRed,
    warning: warningYellow,

    // Glass morphism
    glassBackground: "rgba(255, 255, 255, 0.7)",
    glassBorder: "rgba(255, 255, 255, 0.3)",
    glassShadow: "rgba(0, 0, 0, 0.05)",

    // Icon colors
    icon: darkGray,
    iconActive: primaryPurple,
  },
  dark: {
    // Keep light mode only for now, as Zing uses light theme
    text: textPrimary,
    textSecondary: textSecondary,
    textDisabled: textDisabled,
    background: white,
    backgroundSecondary: lightGray,
    surface: white,
    surfaceSecondary: lightGray,
    tint: primaryPurple,
    tintLight: primaryPurpleLight,
    tintDark: primaryPurpleDark,
    secondary: secondaryBlue,
    secondaryTeal: secondaryTeal,
    tertiary: secondaryTeal,
    border: mediumGray,
    borderLight: lightGray,
    tabIconDefault: darkGray,
    tabIconSelected: primaryPurple,
    success: successGreen,
    error: errorRed,
    warning: warningYellow,
    glassBackground: "rgba(255, 255, 255, 0.7)",
    glassBorder: "rgba(255, 255, 255, 0.3)",
    glassShadow: "rgba(0, 0, 0, 0.05)",
    icon: darkGray,
    iconActive: primaryPurple,
  },
};

// Spacing scale (8pt grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border radius
export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  xxlarge: 24,
  round: 999,
};

// Typography
export const Typography = {
  // Display (large titles)
  display: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "700" as const,
  },
  // Title (screen titles)
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
  },
  // Heading (section headings)
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
  },
  // Subheading
  subheading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },
  // Body (default text)
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  // Body semibold
  bodySemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600" as const,
  },
  // Caption (small text)
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  // Small (tiny text)
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as const,
  },
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
