import React from "react";
import { View, StyleSheet, ViewStyle, Image } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Colors, BorderRadius, Spacing } from "@/constants/theme";

interface CoachAvatarProps {
  name?: string;
  variant?: "female" | "male";
  size?: "small" | "medium" | "large";
  showName?: boolean;
  style?: ViewStyle;
}

export function CoachAvatar({
  name = "Coach",
  variant = "female",
  size = "medium",
  showName = true,
  style,
}: CoachAvatarProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { avatarSize: 48, fontSize: 12, gap: Spacing.xs };
      case "medium":
        return { avatarSize: 80, fontSize: 14, gap: Spacing.sm };
      case "large":
        return { avatarSize: 120, fontSize: 16, gap: Spacing.md };
      default:
        return { avatarSize: 80, fontSize: 14, gap: Spacing.sm };
    }
  };

  const { avatarSize, fontSize, gap } = getSizeStyles();

  const getAvatarImage = () => {
    if (variant === "male") {
      return require("@/assets/images/coach-avatar-alt.png");
    }
    return require("@/assets/images/coach-avatar.png");
  };

  return (
    <View style={[styles.container, { gap }, style]}>
      <View
        style={[
          styles.avatarContainer,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
      >
        <Image
          source={getAvatarImage()}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            resizeMode: "cover",
          }}
        />
      </View>
      {showName && (
        <ThemedText
          type="defaultSemiBold"
          style={[
            styles.name,
            {
              fontSize,
              lineHeight: fontSize * 1.4,
            },
          ]}
        >
          {name}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderWidth: 2,
    borderColor: Colors.light.border,
    overflow: "hidden",
  },
  name: {
    color: Colors.light.text,
    fontWeight: "600",
  },
});
