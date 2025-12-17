import { useRouter } from "expo-router";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { TaskIcon } from "@/components/ui/task-icon";
import { TaskGroupModal } from "@/components/ui/task-group-modal";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { TAKE_CARE_OF_MYSELF_AT_HOME, Task } from "@/data/goals";
import { groupTasksByType, GroupedTasks } from "@/utils/task-grouping";

export default function JourneyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedTaskGroup, setSelectedTaskGroup] = useState<GroupedTasks | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Get goal data
  const goal = TAKE_CARE_OF_MYSELF_AT_HOME;
  const totalMilestones = goal.milestones.length;
  const completedMilestones = goal.milestones.filter(
    (m) => (m.completionPercentage || 0) > 0
  ).length;
  const progress = completedMilestones / totalMilestones;

  const handleViewGoal = () => {
    // Navigate to goal detail screen
    router.push({
      pathname: "/(tabs)/goal-detail",
      params: { goalId: goal.id },
    } as any);
  };

  const handleTaskGroupPress = (group: GroupedTasks) => {
    setSelectedTaskGroup(group);
    setModalVisible(true);
  };

  const handleStartTask = (task: Task) => {
    setModalVisible(false);
    // Navigate to task detail screen
    router.push({
      pathname: "/(tabs)/task-detail",
      params: { taskId: task.id },
    } as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.md,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.xl,
            paddingHorizontal: Spacing.lg,
          },
        ]}
      >
        <ThemedText type="title" style={styles.title}>
          Your Journey
        </ThemedText>

        {/* Overall Progress */}
        <View style={styles.overallProgressContainer}>
          <LinearGradient
            colors={["rgba(255, 165, 0, 0.1)", "rgba(255, 165, 0, 0.05)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.overallProgressGradient}
          >
            <View style={styles.overallProgressContent}>
              <View style={styles.overallProgressLeft}>
                <ThemedText
                  style={[
                    styles.overallProgressLabel,
                    { color: Colors.light.textSecondary },
                  ]}
                >
                  Overall Progress
                </ThemedText>
                <ThemedText type="title" style={styles.overallProgressPercent}>
                  {Math.round(progress * 100)}%
                </ThemedText>
                <ThemedText
                  style={[
                    styles.overallProgressSubtitle,
                    { color: Colors.light.textSecondary },
                  ]}
                >
                  {completedMilestones} of {totalMilestones} milestones
                </ThemedText>
              </View>
              <ProgressRing
                progress={progress}
                size={100}
                strokeWidth={8}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Goal Card */}
        <View style={styles.goalsContainer}>
          <GlassCard style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalIconContainer}>
                <LinearGradient
                  colors={["rgba(255, 165, 0, 0.2)", "rgba(255, 165, 0, 0.1)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.goalIconGradient}
                >
                  <ThemedText style={styles.goalEmoji}>{goal.icon}</ThemedText>
                </LinearGradient>
              </View>
              <View style={styles.goalHeaderRight}>
                <ThemedText type="defaultSemiBold" style={styles.goalTitle}>
                  {goal.title}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.goalProgress,
                    { color: Colors.light.textSecondary },
                  ]}
                >
                  {completedMilestones} of {totalMilestones} milestones
                </ThemedText>
              </View>
            </View>

            {/* Milestones List */}
            <View style={styles.milestonesContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={styles.milestonesTitle}
              >
                Milestones
              </ThemedText>
              {goal.milestones.map((milestone, index) => {
                const groupedTasks = groupTasksByType(milestone.tasks);
                return (
                <View key={milestone.id} style={styles.milestoneItem}>
                  <View style={styles.milestoneIndicator}>
                    <View
                      style={[
                        styles.milestoneCircle,
                        {
                          backgroundColor:
                            (milestone.completionPercentage || 0) > 0
                              ? Colors.light.success
                              : Colors.light.border,
                        },
                      ]}
                    >
                      {(milestone.completionPercentage || 0) > 0 && (
                        <ThemedText style={styles.milestoneCheckmark}>
                          ✓
                        </ThemedText>
                      )}
                    </View>
                    {index < goal.milestones.length - 1 && (
                      <View
                        style={[
                          styles.milestoneLine,
                          {
                            backgroundColor:
                              (milestone.completionPercentage || 0) > 0
                                ? Colors.light.success
                                : Colors.light.border,
                          },
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.milestoneContent}>
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.milestoneName}
                    >
                      {milestone.title}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.milestoneDescription,
                        { color: Colors.light.textSecondary },
                      ]}
                    >
                      {milestone.tasks.length} tasks
                    </ThemedText>

                    {/* Task Type Icons */}
                    {groupedTasks.length > 0 && (
                      <View style={styles.taskIconsContainer}>
                        {groupedTasks.map((group) => (
                          <Pressable
                            key={group.type}
                            onPress={() => handleTaskGroupPress(group)}
                            style={({ pressed }) => [
                              styles.taskTypeIconWrapper,
                              pressed && styles.taskTypeIconWrapperPressed,
                            ]}
                          >
                            <TaskIcon type={group.type as any} size={28} />
                            <ThemedText style={styles.taskTypeCount}>
                              {group.tasks.length}
                            </ThemedText>
                          </Pressable>
                        ))}
                      </View>
                    )}

                    {(milestone.completionPercentage || 0) > 0 && (
                      <View style={styles.milestoneProgressBar}>
                        <View
                          style={[
                            styles.milestoneProgressFill,
                            {
                              width: `${(milestone.completionPercentage || 0) * 100}%`,
                              backgroundColor: Colors.light.success,
                            },
                          ]}
                        />
                      </View>
                    )}
                  </View>
                </View>
                );
              })}
            </View>

            <Pressable
              onPress={handleViewGoal}
              style={({ pressed }) => [
                styles.viewButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <ThemedText
                style={[styles.viewButtonText, { color: Colors.light.tint }]}
              >
                View Full Goal
              </ThemedText>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={Colors.light.tint}
              />
            </Pressable>
          </GlassCard>
        </View>

        {/* Motivation Section */}
        <View style={styles.motivationContainer}>
          <ThemedText
            style={[
              styles.motivationText,
              { color: Colors.light.textSecondary },
            ]}
          >
            You're making great progress! Keep up the consistent effort and celebrate every milestone. 🎉
          </ThemedText>
        </View>
      </ScrollView>

      {/* Task Group Modal */}
      <TaskGroupModal
        visible={modalVisible}
        groupedTasks={selectedTaskGroup}
        onClose={() => setModalVisible(false)}
        onStartTask={handleStartTask}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { gap: Spacing.xl },
  title: { fontSize: 32, lineHeight: 40 },
  overallProgressContainer: {
    marginBottom: Spacing.md,
  },
  overallProgressGradient: {
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
  },
  overallProgressContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.lg,
  },
  overallProgressLeft: {
    flex: 1,
    gap: Spacing.xs,
  },
  overallProgressLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  overallProgressPercent: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "700",
  },
  overallProgressSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  goalsContainer: { gap: Spacing.lg },
  goalCard: { padding: Spacing.xl, gap: Spacing.lg },
  goalHeader: {
    flexDirection: "row",
    gap: Spacing.lg,
    alignItems: "flex-start",
  },
  goalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.medium,
    overflow: "hidden",
  },
  goalIconGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  goalEmoji: { fontSize: 32, lineHeight: 36 },
  goalHeaderRight: {
    flex: 1,
    gap: Spacing.xs,
  },
  goalTitle: { fontSize: 18, lineHeight: 26 },
  goalProgress: { fontSize: 14, lineHeight: 20 },
  milestonesContainer: {
    gap: Spacing.md,
  },
  milestonesTitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },
  milestoneItem: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  milestoneIndicator: {
    alignItems: "center",
    gap: 0,
  },
  milestoneCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.border,
  },
  milestoneCheckmark: {
    fontSize: 12,
    lineHeight: 16,
    color: "#fff",
    fontWeight: "600",
  },
  milestoneLine: {
    width: 2,
    height: 40,
    marginTop: 4,
  },
  milestoneContent: {
    flex: 1,
    gap: Spacing.xs,
    paddingTop: Spacing.xs,
  },
  milestoneName: {
    fontSize: 15,
    lineHeight: 22,
  },
  milestoneDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  milestoneProgressBar: {
    height: 4,
    backgroundColor: "rgba(139, 127, 232, 0.15)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: Spacing.xs,
  },
  milestoneProgressFill: {
    height: "100%",
    borderRadius: 2,
  },
  taskIconsContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    alignItems: "center",
  },
  taskTypeIconWrapper: {
    alignItems: "center",
    gap: 2,
  },
  taskTypeIconWrapperPressed: {
    opacity: 0.6,
  },
  taskTypeCount: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    color: Colors.light.textSecondary,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
  viewButtonText: { fontSize: 15, lineHeight: 22, fontWeight: "600" },
  motivationContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    backgroundColor: "rgba(255, 165, 0, 0.08)",
    borderRadius: BorderRadius.large,
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.tint,
  },
  motivationText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
