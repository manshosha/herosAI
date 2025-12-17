import { triggerHaptic } from "@/utils/haptics";
import { Pressable, StyleSheet, View } from "react-native";

import { GlassCard } from "@/components/ui/glass-card";
import { ThemedText } from "@/components/themed-text";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type RadioButtonProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export function RadioButton({ label, description, selected, onPress }: RadioButtonProps) {
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
          selected && {
            borderColor: tintColor,
            borderWidth: 2,
          },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <ThemedText type="defaultSemiBold">{label}</ThemedText>
            {description && (
              <ThemedText
                style={[
                  styles.description,
                  {
                    color:
                      colorScheme === "dark" ? Colors.dark.textSecondary : Colors.light.textSecondary,
                  },
                ]}
              >
                {description}
              </ThemedText>
            )}
          </View>
          <View
            style={[
              styles.radio,
              {
                borderColor: selected
                  ? tintColor
                  : colorScheme === "dark"
                    ? Colors.dark.border
                    : Colors.light.border,
              },
            ]}
          >
            {selected && (
              <View
                style={[
                  styles.radioInner,
                  {
                    backgroundColor: tintColor,
                  },
                ]}
              />
            )}
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 56,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  textContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.round,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.round,
  },
});
