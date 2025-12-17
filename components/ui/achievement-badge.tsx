import React from "react";
import { View, StyleSheet, ViewStyle, Image } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Colors, BorderRadius, Spacing } from "@/constants/theme";

interface AchievementBadgeProps {
  type: "gold" | "silver" | "bronze";
  title: string;
  description?: string;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
}

export function AchievementBadge({
  type,
  title,
  description,
  style,
  size = "medium",
}: AchievementBadgeProps) {
  const getBadgeImage = () => {
    switch (type) {
      case "gold":
        return require("@/assets/images/badge-gold.png");
      case "silver":
        return require("@/assets/images/badge-silver.png");
      case "bronze":
        return require("@/assets/images/badge-bronze.png");
      default:
        return require("@/assets/images/badge-gold.png");
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { badgeSize: 60, titleSize: 12, descSize: 10 };
      case "medium":
        return { badgeSize: 80, titleSize: 14, descSize: 12 };
      case "large":
        return { badgeSize: 120, titleSize: 16, descSize: 14 };
      default:
        return { badgeSize: 80, titleSize: 14, descSize: 12 };
    }
  };

  const { badgeSize, titleSize, descSize } = getSizeStyles();

  return (
    <View style={[styles.container, style]}>
      <Image
        source={getBadgeImage()}
        style={[
          styles.badge,
          {
            width: badgeSize,
            height: badgeSize,
          },
        ]}
      />
      <View style={styles.content}>
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.title,
            {
              fontSize: titleSize,
              lineHeight: titleSize * 1.4,
            },
          ]}
        >
          {title}
        </ThemedText>
        {description && (
          <ThemedText
            style={[
              styles.description,
              {
                fontSize: descSize,
                lineHeight: descSize * 1.4,
                color: Colors.light.textSecondary,
              },
            ]}
          >
            {description}
          </ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: Spacing.md,
  },
  badge: {
    resizeMode: "contain",
  },
  content: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});
