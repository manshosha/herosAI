import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, PressableProps } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type ChipButtonProps = PressableProps & {
  label: string;
  icon?: string;
  selected?: boolean;
};

export function ChipButton({ label, icon, selected = false, onPress, ...props }: ChipButtonProps) {
  const colorScheme = useColorScheme();

  const handlePress = (event: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(event);
  };

  const backgroundColor = selected
    ? colorScheme === "dark"
      ? Colors.dark.tint
      : Colors.light.tint
    : colorScheme === "dark"
      ? Colors.dark.surface
      : Colors.light.surface;

  const textColor = selected
    ? "#FFFFFF"
    : colorScheme === "dark"
      ? Colors.dark.text
      : Colors.light.text;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
      {...props}
    >
      {icon && <ThemedText style={[styles.icon, { color: textColor }]}>{icon}</ThemedText>}
      <ThemedText style={[styles.label, { color: textColor }]}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    minHeight: 44,
    gap: Spacing.xs,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  icon: {
    fontSize: 18,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
});
