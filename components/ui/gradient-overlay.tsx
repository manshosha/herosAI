import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue } from "react-native";

interface GradientOverlayProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  type?: "purple" | "blue" | "teal" | "mixed";
  intensity?: "light" | "medium" | "strong";
}

export function GradientOverlay({
  children,
  style,
  type = "purple",
  intensity = "medium",
}: GradientOverlayProps) {
  const getGradientColors = (): [ColorValue, ColorValue] => {
    const intensityMap = {
      light: 0.3,
      medium: 0.5,
      strong: 0.7,
    };
    const alpha = intensityMap[intensity];

    switch (type) {
      case "purple":
        return [
          `rgba(124, 58, 237, ${alpha * 0.8})` as ColorValue,
          `rgba(167, 139, 250, ${alpha * 0.4})` as ColorValue,
        ];
      case "blue":
        return [
          `rgba(59, 130, 246, ${alpha * 0.8})` as ColorValue,
          `rgba(147, 197, 253, ${alpha * 0.4})` as ColorValue,
        ];
      case "teal":
        return [
          `rgba(20, 184, 166, ${alpha * 0.8})` as ColorValue,
          `rgba(153, 246, 228, ${alpha * 0.4})` as ColorValue,
        ];
      case "mixed":
        return [
          `rgba(124, 58, 237, ${alpha * 0.6})` as ColorValue,
          `rgba(20, 184, 166, ${alpha * 0.4})` as ColorValue,
        ];
      default:
        return [
          `rgba(124, 58, 237, ${alpha * 0.8})` as ColorValue,
          `rgba(167, 139, 250, ${alpha * 0.4})` as ColorValue,
        ];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
