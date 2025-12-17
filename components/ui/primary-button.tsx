import { Pressable, StyleSheet, PressableProps, ActivityIndicator } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { triggerHaptic } from "@/utils/haptics";

export type PrimaryButtonProps = PressableProps & {
  label: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
};

export function PrimaryButton({
  label,
  loading = false,
  variant = "primary",
  onPress,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme();

  const handlePress = (event: any) => {
    if (!disabled && !loading) {
      triggerHaptic.impact();
      onPress?.(event);
    }
  };

  const getBackgroundColor = () => {
    if (disabled || loading) {
      return colorScheme === "dark" ? Colors.dark.textDisabled : Colors.light.textDisabled;
    }
    switch (variant) {
      case "primary":
        return colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;
      case "secondary":
        return "transparent";
      case "tertiary":
        return "transparent";
      default:
        return colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;
    }
  };

  const getTextColor = () => {
    if (disabled || loading) {
      return colorScheme === "dark" ? Colors.dark.textDisabled : Colors.light.textDisabled;
    }
    switch (variant) {
      case "primary":
        return "#FFFFFF";
      case "secondary":
      case "tertiary":
        return colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;
      default:
        return "#FFFFFF";
    }
  };

  const getBorderColor = () => {
    if (variant === "secondary") {
      return colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;
    }
    return "transparent";
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "secondary" ? 2 : 0,
        },
        pressed && !disabled && !loading && styles.pressed,
        (disabled || loading) && styles.disabled,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText style={[styles.label, { color: getTextColor() }]}>{label}</ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.medium,
    minHeight: 48,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
});
