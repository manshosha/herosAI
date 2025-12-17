import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const goalOptions = [
  { id: "stress", label: "Reduce Stress", icon: "🧘" },
  { id: "sleep", label: "Improve Sleep", icon: "😴" },
  { id: "strength", label: "Build Strength", icon: "💪" },
  { id: "energy", label: "Increase Energy", icon: "⚡" },
  { id: "focus", label: "Better Focus", icon: "🎯" },
  { id: "eating", label: "Healthy Eating", icon: "🥗" },
];

export default function GoalsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId],
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length >= 2) {
      router.push("/onboarding/theme" as any);
    }
  };

  const isValid = selectedGoals.length >= 2 && selectedGoals.length <= 4;

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
                  width: "75%",
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
            3 of 4
          </ThemedText>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText type="subtitle" style={styles.question}>
            Choose your goals
          </ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color:
                  colorScheme === "dark" ? Colors.dark.textSecondary : Colors.light.textSecondary,
              },
            ]}
          >
            Select 2-4 goals to focus on
          </ThemedText>
        </View>

        {/* Options Grid */}
        <View style={styles.gridContainer}>
          {goalOptions.map((goal) => (
            <View key={goal.id} style={styles.gridItem}>
              <Checkbox
                label={goal.label}
                icon={goal.icon}
                checked={selectedGoals.includes(goal.id)}
                onPress={() => toggleGoal(goal.id)}
              />
            </View>
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
        <PrimaryButton label="Continue" onPress={handleContinue} disabled={!isValid} />
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
    gap: Spacing.xs,
  },
  question: {
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  gridItem: {
    width: "48%",
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
