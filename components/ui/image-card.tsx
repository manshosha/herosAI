import React from "react";
import { View, StyleSheet, ViewStyle, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/themed-text";
import { Colors, BorderRadius, Spacing } from "@/constants/theme";
import { ColorValue } from "react-native";

interface ImageCardProps {
  imageSource: string | number;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  onPress?: () => void;
  overlayIntensity?: "light" | "medium" | "strong";
  height?: number;
}

export function ImageCard({
  imageSource,
  title,
  subtitle,
  style,
  onPress,
  overlayIntensity = "medium",
  height = 200,
}: ImageCardProps) {
  const intensityMap = {
    light: 0.3,
    medium: 0.5,
    strong: 0.7,
  };
  const alpha = intensityMap[overlayIntensity];

  const overlayColors: [ColorValue, ColorValue] = [
    `rgba(0, 0, 0, ${alpha * 0.4})` as ColorValue,
    `rgba(0, 0, 0, ${alpha * 0.2})` as ColorValue,
  ];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { height },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Image
        source={typeof imageSource === "string" ? { uri: imageSource } : imageSource}
        style={[styles.image, { height }]}
      />
      <LinearGradient
        colors={overlayColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.title, { color: Colors.light.background }]}
          >
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              style={[styles.subtitle, { color: Colors.light.backgroundSecondary }]}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.large,
    overflow: "hidden",
    backgroundColor: Colors.light.backgroundSecondary,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: Spacing.lg,
  },
  content: {
    gap: Spacing.xs,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.8,
  },
});
