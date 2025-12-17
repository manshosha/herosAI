import { triggerHaptic } from "@/utils/haptics";
import { Pressable, StyleSheet, View } from "react-native";

import { GlassCard } from "@/components/ui/glass-card";
import { ThemedText } from "@/components/themed-text";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";

export type CheckboxProps = {
  label: string;
  icon?: string;
  checked: boolean;
  onPress: () => void;
};

export function Checkbox({ label, icon, checked, onPress }: CheckboxProps) {
  const colorScheme = useColorScheme();

  const handlePress = () => {
    triggerHaptic.impact();
    onPress();
  };

  const tintColor = colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [pressed && styles.pressed]}>
      <GlassCard
        style={[
          styles.card,
          checked && {
            borderColor: tintColor,
            borderWidth: 2,
          },
        ]}
      >
        <View style={styles.content}>
          {icon && (
            <ThemedText style={styles.icon}>{icon}</ThemedText>
          )}
          <ThemedText type="defaultSemiBold" style={styles.label}>
            {label}
          </ThemedText>
          <View
            style={[
              styles.checkbox,
              {
                borderColor: checked
                  ? tintColor
                  : colorScheme === "dark"
                    ? Colors.dark.border
                    : Colors.light.border,
                backgroundColor: checked ? tintColor : "transparent",
              },
            ]}
          >
            {checked && (
              <IconSymbol name="checkmark.circle.fill" size={16} color="#FFFFFF" />
            )}
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 80,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  icon: {
    fontSize: 32,
    lineHeight: 40,
  },
  label: {
    textAlign: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.small,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
