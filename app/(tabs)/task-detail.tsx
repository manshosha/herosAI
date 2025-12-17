import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View, ScrollView, Pressable, Dimensions, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { TAKE_CARE_OF_MYSELF_AT_HOME, BodyFocus } from "@/data/goals";
import { useTaskCompletion } from "@/hooks/use-task-completion";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HERO_HEIGHT = 280;

// Body focus images mapping
const BODY_FOCUS_IMAGES: Record<BodyFocus, any> = {
  upper: require("@/assets/images/body-upper.png"),
  lower: require("@/assets/images/body-lower.png"),
  hands: require("@/assets/images/body-hands.png"),
  core: require("@/assets/images/body-core.png"),
  brain: require("@/assets/images/body-brain.png"),
  full_body: require("@/assets/images/body-upper.png"),
};

// Hero images for task types
const TASK_TYPE_HERO_IMAGES: Record<string, any> = {
  ot_exercise: require("@/assets/images/story-ot-1.png"),
  pt_exercise: require("@/assets/images/story-pt-1.png"),
  speech_exercise: require("@/assets/images/story-ot-2.png"),
  cognitive_game: require("@/assets/images/story-game-1.png"),
  podcast: require("@/assets/images/story-podcast-1.png"),
  meditation: require("@/assets/images/story-meditation-1.png"),
};

const BODY_FOCUS_LABELS: Record<BodyFocus, string> = {
  upper: "Upper Body",
  lower: "Lower Body",
  hands: "Hands & Fingers",
  core: "Core & Balance",
  brain: "Brain & Mind",
  full_body: "Full Body",
};

export default function TaskDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { taskId, milestoneId } = useLocalSearchParams();
  const [isCompleted, setIsCompleted] = useState(false);

  // Find the task from goals data
  let task = null;
  for (const milestone of TAKE_CARE_OF_MYSELF_AT_HOME.milestones) {
    const foundTask = milestone.tasks.find((t) => t.id === taskId);
    if (foundTask) {
      task = foundTask;
      break;
    }
  }

  if (!task) {
    return (
      <ThemedView style={styles.container}>
        <View style={[styles.container, styles.errorContainer]}>
          <ThemedText type="title">Task not found</ThemedText>
          <PrimaryButton label="Go Back" onPress={() => router.back()} />
        </View>
      </ThemedView>
    );
  }

  const getTaskTypeLabel = () => {
    switch (task.type) {
      case "ot_exercise":
        return "Occupational Therapy";
      case "pt_exercise":
        return "Physical Therapy";
      case "speech_exercise":
        return "Speech Therapy";
      case "cognitive_game":
        return "Cognitive Exercise";
      case "podcast":
        return "Wellness Podcast";
      case "meditation":
        return "Meditation";
      default:
        return "Exercise";
    }
  };

  const { completeTask } = useTaskCompletion();

  const handleComplete = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await completeTask(task.id, task.duration);
      setIsCompleted(true);
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const bodyFocus = task.bodyFocus || "full_body";
  const heroImage = TASK_TYPE_HERO_IMAGES[task.type] || TASK_TYPE_HERO_IMAGES.ot_exercise;
  const bodyFocusImage = BODY_FOCUS_IMAGES[bodyFocus];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {/* Hero Image Section */}
        <View style={styles.heroContainer}>
          <Image
            source={heroImage}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
            style={styles.heroGradient}
          />
          
          {/* Header Buttons */}
          <View style={[styles.headerButtons, { paddingTop: Math.max(insets.top, 20) }]}>
            <Pressable 
              onPress={() => router.back()} 
              style={styles.headerButton}
            >
              <ThemedText style={styles.headerButtonText}>←</ThemedText>
            </Pressable>
            <ThemedText style={styles.headerTitle}>Exercise Details</ThemedText>
            <Pressable style={styles.headerButton}>
              <ThemedText style={styles.headerButtonText}>↻</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Body Focus & Title Row */}
          <View style={styles.titleRow}>
            <View style={styles.bodyFocusContainer}>
              <Image
                source={bodyFocusImage}
                style={styles.bodyFocusImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.titleInfo}>
              <ThemedText type="title" style={styles.taskTitle}>
                {task.title}
              </ThemedText>
              <ThemedText style={styles.taskSubtitle}>
                {task.sets ? `${task.sets} sets` : "1 round"} • {BODY_FOCUS_LABELS[bodyFocus]}
              </ThemedText>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{task.duration}</ThemedText>
              <ThemedText style={styles.statLabel}>min</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{task.reps || 0}</ThemedText>
              <ThemedText style={styles.statLabel}>reps</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>
                {task.level === "beginner" ? 1 : task.level === "intermediate" ? 2 : 3}
              </ThemedText>
              <ThemedText style={styles.statLabel}>level</ThemedText>
            </View>
          </View>

          {/* Type Badge */}
          <Pressable style={styles.addRoundButton}>
            <ThemedText style={styles.addRoundIcon}>+</ThemedText>
            <ThemedText style={styles.addRoundText}>Add Round</ThemedText>
          </Pressable>

          {/* Correct Form Section */}
          <View style={styles.formSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Correct Form
            </ThemedText>
            
            {task.steps && task.steps.length > 0 ? (
              <View style={styles.stepsList}>
                {task.steps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.stepNumber}>
                      <ThemedText style={styles.stepNumberText}>{index + 1}.</ThemedText>
                    </View>
                    <ThemedText style={styles.stepText}>{step}</ThemedText>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.stepsList}>
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <ThemedText style={styles.stepNumberText}>1.</ThemedText>
                  </View>
                  <ThemedText style={styles.stepText}>
                    {task.description}
                  </ThemedText>
                </View>
                {task.instructions && (
                  <View style={styles.stepItem}>
                    <View style={styles.stepNumber}>
                      <ThemedText style={styles.stepNumberText}>2.</ThemedText>
                    </View>
                    <ThemedText style={styles.stepText}>
                      {task.instructions}
                    </ThemedText>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Tips for Success
            </ThemedText>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipIcon}>💡</ThemedText>
                <ThemedText style={styles.tipText}>
                  Start slowly and gradually increase intensity
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipIcon}>⚠️</ThemedText>
                <ThemedText style={styles.tipText}>
                  Stop if you experience pain or discomfort
                </ThemedText>
              </View>
              <View style={styles.tipItem}>
                <ThemedText style={styles.tipIcon}>🌬️</ThemedText>
                <ThemedText style={styles.tipText}>
                  Breathe steadily throughout the exercise
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Spacer for button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Start Button */}
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
        <Pressable
          style={[
            styles.startButton,
            isCompleted && styles.startButtonCompleted,
          ]}
          onPress={handleComplete}
          disabled={isCompleted}
        >
          <ThemedText style={styles.startButtonText}>
            {isCompleted ? "✓ Completed!" : "Start"}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  heroContainer: {
    height: HERO_HEIGHT,
    width: SCREEN_WIDTH,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: HERO_HEIGHT,
  },
  headerButtons: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButtonText: {
    fontSize: 20,
    lineHeight: 24,
    color: "#1a1a1a",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "600",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  contentCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  bodyFocusContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f5f7fa",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyFocusImage: {
    width: 70,
    height: 70,
  },
  titleInfo: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  taskSubtitle: {
    fontSize: 15,
    lineHeight: 20,
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#f5f7fa",
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  statLabel: {
    fontSize: 14,
    lineHeight: 18,
    color: "#888",
  },
  addRoundButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  addRoundIcon: {
    fontSize: 18,
    lineHeight: 22,
    color: "#007AFF",
    fontWeight: "600",
  },
  addRoundText: {
    fontSize: 16,
    lineHeight: 20,
    color: "#007AFF",
    fontWeight: "600",
  },
  formSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: Spacing.md,
  },
  stepsList: {
    gap: Spacing.md,
  },
  stepItem: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  stepNumber: {
    width: 24,
  },
  stepNumberText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  tipsSection: {
    marginBottom: Spacing.xl,
  },
  tipsList: {
    gap: Spacing.md,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  tipIcon: {
    fontSize: 16,
    lineHeight: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  startButton: {
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonCompleted: {
    backgroundColor: "#34C759",
  },
  startButtonText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "600",
    color: "#fff",
  },
});
