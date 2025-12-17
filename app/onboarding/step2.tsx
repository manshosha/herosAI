import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { RadioButton } from "@/components/ui/radio-button";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const timeOptions = [
  { id: "5-10", label: "5-10 minutes", description: "Quick daily check-ins" },
  { id: "10-20", label: "10-20 minutes", description: "Short focused sessions" },
  { id: "20-30", label: "20-30 minutes", description: "Balanced practice time" },
  { id: "30+", label: "30+ minutes", description: "Deep dive sessions" },
];

export default function Step2Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (selected) {
      router.push("/onboarding/goals" as any);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.lg,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.lg,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: "50%",
                  backgroundColor:
                    colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
                },
              ]}
            />
          </View>
          <ThemedText
            style={[
              styles.progressText,
              {
                color:
                  colorScheme === "dark" ? Colors.dark.textSecondary : Colors.light.textSecondary,
              },
            ]}
          >
            2 of 4
          </ThemedText>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText type="subtitle" style={styles.question}>
            How much time can you dedicate daily?
          </ThemedText>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {timeOptions.map((option) => (
            <RadioButton
              key={option.id}
              label={option.label}
              description={option.description}
              selected={selected === option.id}
              onPress={() => setSelected(option.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: Math.max(insets.bottom, 20),
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        <PrimaryButton label="Next" onPress={handleNext} disabled={!selected} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    gap: Spacing.xl,
  },
  progressContainer: {
    gap: Spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(139, 127, 232, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    lineHeight: 20,
  },
  questionContainer: {
    marginTop: Spacing.md,
  },
  question: {
    marginBottom: Spacing.sm,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
