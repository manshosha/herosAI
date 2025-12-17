import { StyleSheet, View, Pressable } from "react-native";
import { triggerHaptic } from "@/utils/haptics";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

export interface EmojiOption {
  id: string;
  emoji: string;
  label: string;
}

interface EmojiScaleProps {
  options: EmojiOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export function EmojiScale({ options, selected, onSelect }: EmojiScaleProps) {
  const handleSelect = (id: string) => {
    triggerHaptic.impact();
    onSelect(id);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <Pressable
            key={option.id}
            onPress={() => handleSelect(option.id)}
            style={({ pressed }) => [
              styles.optionWrapper,
              pressed && styles.optionPressed,
            ]}
          >
            <View
              style={[
                styles.option,
                isSelected && {
                  backgroundColor: Colors.light.tint,
                  borderColor: Colors.light.tint,
                  transform: [{ scale: 1.15 }],
                },
                !isSelected && {
                  backgroundColor: Colors.light.surface,
                  borderColor: Colors.light.border,
                },
              ]}
            >
              <ThemedText style={styles.emoji}>{option.emoji}</ThemedText>
            </View>
            <ThemedText
              style={[
                styles.label,
                isSelected && { color: Colors.light.tint, fontWeight: "600" },
                !isSelected && { color: Colors.light.textSecondary },
              ]}
            >
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  optionWrapper: {
    alignItems: "center",
    gap: Spacing.xs,
    flex: 1,
  },
  optionPressed: {
    opacity: 0.7,
  },
  option: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 32,
    lineHeight: 40,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
});
