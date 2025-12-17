import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { triggerHaptic } from "@/utils/haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useOnboardingState } from "@/hooks/use-onboarding-state";

interface Goal {
  id: string;
  icon: string;
  title: string;
  description: string;
  milestones: number;
  tasks: number;
}

const REHABILITATION_GOALS: Goal[] = [
  {
    id: "home_care",
    icon: "🏠",
    title: "Take Care of Myself at Home",
    description: "Move confidently around your home and manage daily activities independently",
    milestones: 4,
    tasks: 22,
  },
  {
    id: "communication",
    icon: "💬",
    title: "Talk with My Family and Friends",
    description: "Express your needs, have conversations, and connect with loved ones",
    milestones: 4,
    tasks: 23,
  },
  {
    id: "hand_activities",
    icon: "✋",
    title: "Use My Hands for Daily Activities",
    description: "Grasp, manipulate objects, and perform fine motor tasks",
    milestones: 4,
    tasks: 20,
  },
  {
    id: "memory_focus",
    icon: "🧠",
    title: "Remember and Stay Focused",
    description: "Improve attention, memory, problem-solving, and processing speed",
    milestones: 4,
    tasks: 21,
  },
  {
    id: "mobility",
    icon: "🚶",
    title: "Get Around on My Own",
    description: "Walk indoors and outdoors with confidence and independence",
    milestones: 4,
    tasks: 24,
  },
  {
    id: "emotional_wellbeing",
    icon: "😌",
    title: "Feel Good About My Day",
    description: "Build confidence, manage emotions, and strengthen social connections",
    milestones: 4,
    tasks: 19,
  },
  {
    id: "literacy",
    icon: "📝",
    title: "Read Messages and Write Notes",
    description: "Improve reading and writing skills for functional communication",
    milestones: 3,
    tasks: 18,
  },
  {
    id: "energy_stamina",
    icon: "💪",
    title: "Have Energy for What I Want to Do",
    description: "Build strength, endurance, and physical stamina",
    milestones: 4,
    tasks: 25,
  },
];

export default function GoalSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { updateUniversal } = useOnboardingState();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleGoalToggle = (goalId: string) => {
    triggerHaptic.impact();
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId);
      } else if (prev.length < 4) {
        return [...prev, goalId];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedGoals.length >= 2) {
      triggerHaptic.notification();
      updateUniversal({ selectedGoals });
      router.push("/onboarding/q4-stroke-type" as any);
    }
  };

  const canAddMore = selectedGoals.length < 4;
  const hasEnough = selectedGoals.length >= 2;

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
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            What do you want to achieve?
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
            Select 2-4 goals that matter most to you. You can always change these later.
          </ThemedText>
        </View>

        {/* Selection Counter */}
        <View style={styles.counterContainer}>
          <View
            style={[
              styles.counterBadge,
              {
                backgroundColor:
                  colorScheme === "dark"
                    ? "rgba(139, 127, 232, 0.2)"
                    : "rgba(139, 127, 232, 0.15)",
              },
            ]}
          >
            <ThemedText type="defaultSemiBold" style={styles.counterText}>
              {selectedGoals.length}
            </ThemedText>
          </View>
          <ThemedText
            style={{
              color:
                colorScheme === "dark" ? Colors.dark.textSecondary : Colors.light.textSecondary,
            }}
          >
            selected
          </ThemedText>
          {!hasEnough && (
            <ThemedText style={styles.warningText}>
              • Select at least 2 goals
            </ThemedText>
          )}
        </View>

        {/* Goals List */}
        <View style={styles.goalsList}>
          {REHABILITATION_GOALS.map((goal, index) => (
            <Animated.View
              key={goal.id}
              entering={FadeInDown.delay(index * 50).springify()}
            >
              <Pressable
                onPress={() => handleGoalToggle(goal.id)}
                disabled={!selectedGoals.includes(goal.id) && !canAddMore}
              >
                <GlassCard
                  style={[
                    styles.goalCard,
                    selectedGoals.includes(goal.id) && styles.goalCardSelected,
                    !selectedGoals.includes(goal.id) && !canAddMore && styles.goalCardDisabled,
                  ]}
                >
                  <View style={styles.goalContent}>
                    <View style={styles.goalHeader}>
                      <ThemedText style={styles.goalIcon}>{goal.icon}</ThemedText>
                      <View style={styles.goalTitleContainer}>
                        <ThemedText type="defaultSemiBold" style={styles.goalTitle}>
                          {goal.title}
                        </ThemedText>
                        <ThemedText
                          style={[
                            styles.goalDescription,
                            {
                              color:
                                colorScheme === "dark"
                                  ? Colors.dark.textSecondary
                                  : Colors.light.textSecondary,
                            },
                          ]}
                          numberOfLines={2}
                        >
                          {goal.description}
                        </ThemedText>
                      </View>
                      <View
                        style={[
                          styles.checkbox,
                          selectedGoals.includes(goal.id) && styles.checkboxSelected,
                        ]}
                      >
                        {selectedGoals.includes(goal.id) && (
                          <ThemedText style={styles.checkmark}>✓</ThemedText>
                        )}
                      </View>
                    </View>
                    <View style={styles.goalMeta}>
                      <ThemedText
                        style={{
                          color:
                            colorScheme === "dark"
                              ? Colors.dark.textSecondary
                              : Colors.light.textSecondary,
                          fontSize: 12,
                          lineHeight: 16,
                        }}
                      >
                        {goal.milestones} milestones • {goal.tasks} tasks
                      </ThemedText>
                    </View>
                  </View>
                </GlassCard>
              </Pressable>
            </Animated.View>
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
        <PrimaryButton
          label={`Continue with ${selectedGoals.length} goal${selectedGoals.length !== 1 ? "s" : ""}`}
          onPress={handleContinue}
          disabled={!hasEnough}
        />
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
    gap: Spacing.lg,
  },
  header: {
    gap: Spacing.sm,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    justifyContent: "center",
  },
  counterBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 14,
    lineHeight: 20,
  },
  warningText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#FF9500",
  },
  goalsList: {
    gap: Spacing.md,
  },
  goalCard: {
    padding: Spacing.md,
  },
  goalCardSelected: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  goalCardDisabled: {
    opacity: 0.5,
  },
  goalContent: {
    gap: Spacing.md,
  },
  goalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  goalIcon: {
    fontSize: 24,
    lineHeight: 28,
  },
  goalTitleContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  goalTitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  goalDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.textSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "bold",
  },
  goalMeta: {
    paddingLeft: 40,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
