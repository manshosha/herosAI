import { BlurView } from "expo-blur";
import { StyleSheet, View, ViewProps, Platform } from "react-native";

import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type GlassCardProps = ViewProps & {
  intensity?: number;
  tint?: "light" | "dark" | "default";
};

export function GlassCard({ style, intensity = 20, tint, children, ...props }: GlassCardProps) {
  const colorScheme = useColorScheme();
  const effectiveTint = tint || colorScheme || "light";

  // On web, use a semi-transparent background instead of blur
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              effectiveTint === "dark"
                ? Colors.dark.glassBackground
                : Colors.light.glassBackground,
            borderColor:
              effectiveTint === "dark" ? Colors.dark.glassBorder : Colors.light.glassBorder,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  // On native, use BlurView for glass morphism effect
  return (
    <BlurView
      intensity={intensity}
      tint={effectiveTint}
      style={[
        styles.card,
        {
          borderColor: effectiveTint === "dark" ? Colors.dark.border : Colors.light.border,
          overflow: "hidden",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    padding: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 32,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
});
