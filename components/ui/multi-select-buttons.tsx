import { StyleSheet, View, Pressable } from "react-native";
import { triggerHaptic } from "@/utils/haptics";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

export interface SelectOption {
  id: string;
  label: string;
  description?: string;
}

interface MultiSelectButtonsProps {
  options: SelectOption[];
  selected: string;
  onSelect: (id: string) => void;
  columns?: number;
}

export function MultiSelectButtons({
  options,
  selected,
  onSelect,
  columns = 1,
}: MultiSelectButtonsProps) {
  const handleSelect = (id: string) => {
    triggerHaptic.impact();
    onSelect(id);
  };

  return (
    <View style={[styles.container, { flexDirection: columns > 1 ? "row" : "column" }]}>
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <Pressable
            key={option.id}
            onPress={() => handleSelect(option.id)}
            style={({ pressed }) => [
              styles.buttonWrapper,
              columns > 1 && { flex: 1 / columns },
              pressed && styles.buttonPressed,
            ]}
          >
            <View
              style={[
                styles.button,
                isSelected && {
                  backgroundColor: Colors.light.tint,
                  borderColor: Colors.light.tint,
                },
                !isSelected && {
                  backgroundColor: Colors.light.surface,
                  borderColor: Colors.light.border,
                },
              ]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={[
                  styles.label,
                  isSelected && { color: "#FFFFFF" },
                  !isSelected && { color: Colors.light.text },
                ]}
              >
                {option.label}
              </ThemedText>
              {option.description && (
                <ThemedText
                  style={[
                    styles.description,
                    isSelected && { color: "rgba(255, 255, 255, 0.8)" },
                    !isSelected && { color: Colors.light.textSecondary },
                  ]}
                >
                  {option.description}
                </ThemedText>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  buttonWrapper: {
    marginBottom: Spacing.md,
  },
  button: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    marginTop: Spacing.xs,
  },
});
