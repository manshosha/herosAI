import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { ConditionType } from "@/types/heros";
import { useOnboardingState } from "@/hooks/use-onboarding-state";

const conditions: Array<{ id: ConditionType; label: string; emoji: string; description: string }> = [
  {
    id: "stroke",
    label: "Stroke Recovery",
    emoji: "🧠",
    description: "Recovering from a stroke or TIA",
  },
  {
    id: "parkinsons",
    label: "Parkinson's Disease",
    emoji: "🎯",
    description: "Managing Parkinson's symptoms",
  },
];

export default function Q3ConditionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<ConditionType | null>(null);
  const { updateUniversal } = useOnboardingState();

  const handleSelect = (condition: ConditionType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(condition);
    updateUniversal({ condition });
  };

  const handleNext = () => {
    if (selected) {
      // Navigate to goal selection
      router.push("/onboarding/goal-selection" as any);
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
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: "21%",
                  backgroundColor: Colors.light.tint,
                },
              ]}
            />
          </View>
          <ThemedText
            style={[
              styles.progressText,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            Question 3 of 14
          </ThemedText>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText type="title">What condition are you managing?</ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            This helps us personalize your rehabilitation plan
          </ThemedText>
        </View>

        {/* Condition Cards */}
        <View style={styles.cardsContainer}>
          {conditions.map((condition) => {
            const isSelected = selected === condition.id;
            return (
              <Pressable
                key={condition.id}
                onPress={() => handleSelect(condition.id)}
                style={({ pressed }) => [
                  styles.cardWrapper,
                  pressed && styles.cardPressed,
                ]}
              >
                <GlassCard
                  style={[
                    styles.card,
                    isSelected && {
                      borderColor: Colors.light.tint,
                      borderWidth: 2,
                    },
                  ]}
                >
                  <ThemedText style={styles.emoji}>{condition.emoji}</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.label}>
                    {condition.label}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.description,
                      {
                        color: Colors.light.textSecondary,
                      },
                    ]}
                  >
                    {condition.description}
                  </ThemedText>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                    </View>
                  )}
                </GlassCard>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Button */}
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
    gap: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardsContainer: {
    gap: Spacing.md,
  },
  cardWrapper: {
    flex: 1,
  },
  cardPressed: {
    opacity: 0.7,
  },
  card: {
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    position: "relative",
  },
  emoji: {
    fontSize: 40,
    lineHeight: 48,
  },
  label: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  checkmark: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
