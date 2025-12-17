import React from "react";
import { View, StyleSheet, ViewStyle, Image } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Colors, BorderRadius, Spacing } from "@/constants/theme";

interface StreakIndicatorProps {
  count: number;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
}

export function StreakIndicator({
  count,
  style,
  size = "medium",
  showLabel = true,
}: StreakIndicatorProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { flameSize: 24, countSize: 14, containerSize: 40 };
      case "medium":
        return { flameSize: 32, countSize: 18, containerSize: 56 };
      case "large":
        return { flameSize: 48, countSize: 24, containerSize: 80 };
      default:
        return { flameSize: 32, countSize: 18, containerSize: 56 };
    }
  };

  const { flameSize, countSize, containerSize } = getSizeStyles();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.streakBox,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/streak-flame.png")}
          style={{
            width: flameSize,
            height: flameSize,
            resizeMode: "contain",
          }}
        />
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.count,
            {
              fontSize: countSize,
              lineHeight: countSize * 1.2,
            },
          ]}
        >
          {count}
        </ThemedText>
      </View>
      {showLabel && (
        <ThemedText
          style={[
            styles.label,
            {
              color: Colors.light.textSecondary,
              fontSize: size === "small" ? 12 : size === "medium" ? 14 : 16,
            },
          ]}
        >
          Day Streak
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  streakBox: {
    backgroundColor: "rgba(255, 107, 53, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 107, 53, 0.3)",
  },
  count: {
    color: Colors.light.tint,
    fontWeight: "700",
    marginTop: Spacing.xs,
  },
  label: {
    fontWeight: "500",
  },
});
