import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { triggerHaptic } from "@/utils/haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { Colors, Spacing } from "@/constants/theme";
import { getMilestoneByIds } from "@/data/goals";
import type { Milestone, Task } from "@/data/goals";

export default function MilestoneDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { goalId, milestoneId } = useLocalSearchParams<{
    goalId: string;
    milestoneId: string;
  }>();
  const [milestone, setMilestone] = useState<Milestone | undefined>();

  useEffect(() => {
    if (goalId && milestoneId) {
      const foundMilestone = getMilestoneByIds(goalId, milestoneId);
      setMilestone(foundMilestone);
    }
  }, [goalId, milestoneId]);

  if (!milestone) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const handleTaskPress = (task: Task) => {
    triggerHaptic.impact();
    router.push({
      pathname: "/task-detail",
      params: {
        goalId,
        milestoneId,
        taskId: task.id,
      },
    } as any);
  };

  const getTaskIcon = (type: Task["type"]) => {
    switch (type) {
      case "ot_exercise":
        return "💪";
      case "speech_exercise":
        return "🗣️";
      case "cognitive_game":
        return "🧠";
      case "podcast":
        return "🎧";
      default:
        return "📋";
    }
  };

  const getTaskLabel = (type: Task["type"]) => {
    switch (type) {
      case "ot_exercise":
        return "OT Exercise";
      case "speech_exercise":
        return "Speech Exercise";
      case "cognitive_game":
        return "Cognitive Game";
      case "podcast":
        return "Podcast";
      default:
        return "Task";
    }
  };

  const renderTaskCard = ({ item, index }: { item: Task; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.taskItem}
    >
      <Pressable
        onPress={() => handleTaskPress(item)}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      >
        <GlassCard style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <ThemedText style={styles.taskIcon}>{getTaskIcon(item.type)}</ThemedText>
            <View style={styles.taskInfo}>
              <ThemedText type="defaultSemiBold" style={styles.taskTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.taskLabel}>
                {getTaskLabel(item.type)} • Week {item.week}, Day {item.day}
              </ThemedText>
            </View>
            <View style={styles.taskDuration}>
              <ThemedText style={styles.durationText}>{item.duration}</ThemedText>
              <ThemedText style={styles.durationLabel}>min</ThemedText>
            </View>
          </View>

          {item.description && (
            <ThemedText style={styles.taskDescription}>{item.description}</ThemedText>
          )}

          <View style={styles.taskFooter}>
            <ThemedText style={styles.startButton}>Start →</ThemedText>
          </View>
        </GlassCard>
      </Pressable>
    </Animated.View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingTop: Math.max(insets.top, 20),
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
            },
          ]}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
          >
            <ThemedText style={styles.backButton}>← Back</ThemedText>
          </Pressable>
        </View>

        {/* Milestone Title Section */}
        <View
          style={[
            styles.milestoneSection,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
            },
          ]}
        >
          <ThemedText type="title" style={styles.milestoneTitle}>
            {milestone.title}
          </ThemedText>
          <ThemedText style={styles.milestoneDescription}>
            {milestone.description}
          </ThemedText>

          {/* Milestone Stats */}
          <View style={styles.milestoneStats}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{milestone.tasks.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Tasks</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>
                {milestone.completionPercentage || 0}%
              </ThemedText>
              <ThemedText style={styles.statLabel}>Complete</ThemedText>
            </View>
          </View>
        </View>

        {/* Tasks List */}
        <View
          style={[
            styles.tasksSection,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Tasks to Complete
          </ThemedText>

          <FlatList
            data={milestone.tasks}
            renderItem={renderTaskCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.tasksList}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: Math.max(insets.bottom, 20) }} />
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingBottom: Spacing.md,
  },
  backButton: {
    color: Colors.light.tint,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  milestoneSection: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  milestoneTitle: {
    marginTop: Spacing.sm,
  },
  milestoneDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
  },
  milestoneStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    marginTop: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  tasksSection: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  tasksList: {
    gap: Spacing.md,
  },
  taskItem: {
    marginBottom: Spacing.md,
  },
  taskCard: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  taskIcon: {
    fontSize: 28,
    lineHeight: 32,
  },
  taskInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  taskTitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  taskLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textSecondary,
  },
  taskDuration: {
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    borderRadius: 8,
  },
  durationText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.light.tint,
  },
  durationLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.light.textSecondary,
  },
  taskDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
  taskFooter: {
    alignItems: "flex-end",
  },
  startButton: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: Colors.light.tint,
  },
});
