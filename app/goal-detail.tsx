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
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing } from "@/constants/theme";
import { getGoalById } from "@/data/goals";
import type { Goal, Milestone } from "@/data/goals";

export default function GoalDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { goalId } = useLocalSearchParams<{ goalId: string }>();
  const [goal, setGoal] = useState<Goal | undefined>();

  useEffect(() => {
    if (goalId) {
      const foundGoal = getGoalById(goalId);
      setGoal(foundGoal);
    }
  }, [goalId]);

  if (!goal) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const handleMilestonePress = (milestone: Milestone) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: "/milestone-detail",
      params: {
        goalId: goal.id,
        milestoneId: milestone.id,
      },
    } as any);
  };

  const renderMilestoneCard = ({ item, index }: { item: Milestone; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
      style={styles.milestoneItem}
    >
      <Pressable
        onPress={() => handleMilestonePress(item)}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      >
        <GlassCard style={styles.milestoneCard}>
          <View style={styles.milestoneHeader}>
            <View style={styles.milestoneNumber}>
              <ThemedText style={styles.milestoneNumberText}>
                {index + 1}
              </ThemedText>
            </View>
            <View style={styles.milestoneInfo}>
              <ThemedText type="defaultSemiBold" style={styles.milestoneTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.milestoneDescription}>
                {item.description}
              </ThemedText>
            </View>
          </View>

          <View style={styles.milestoneFooter}>
            <ThemedText style={styles.taskCount}>
              {item.tasks.length} tasks
            </ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.completionPercentage || 0}%`,
                  },
                ]}
              />
            </View>
            <ThemedText style={styles.progressText}>
              {item.completionPercentage || 0}%
            </ThemedText>
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

        {/* Goal Title Section */}
        <View
          style={[
            styles.goalSection,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
            },
          ]}
        >
          <ThemedText style={styles.goalIcon}>{goal.icon}</ThemedText>
          <ThemedText type="title" style={styles.goalTitle}>
            {goal.title}
          </ThemedText>
          <ThemedText style={styles.goalDescription}>
            {goal.description}
          </ThemedText>

          {/* Goal Stats */}
          <View style={styles.goalStats}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>
                {goal.milestoneCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Milestones</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>
                {goal.taskCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Tasks</ThemedText>
            </View>
          </View>
        </View>

        {/* Milestones List */}
        <View
          style={[
            styles.milestonesSection,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
            },
          ]}
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Milestones
          </ThemedText>

          <FlatList
            data={goal.milestones}
            renderItem={renderMilestoneCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.milestonesList}
          />
        </View>

        {/* Start Goal Button */}
        <View
          style={[
            styles.buttonContainer,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
              paddingBottom: Math.max(insets.bottom, 20),
            },
          ]}
        >
          <PrimaryButton
            label="Start This Goal"
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              // Add goal to user's selected goals
            }}
          />
        </View>
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
  goalSection: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  goalIcon: {
    fontSize: 48,
    lineHeight: 56,
  },
  goalTitle: {
    marginTop: Spacing.sm,
  },
  goalDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
  },
  goalStats: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  statCard: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    alignItems: "center",
    gap: Spacing.xs,
  },
  statNumber: {
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
  milestonesSection: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  milestonesList: {
    gap: Spacing.md,
  },
  milestoneItem: {
    marginBottom: Spacing.md,
  },
  milestoneCard: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  milestoneHeader: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  milestoneNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  milestoneNumberText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
  },
  milestoneInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  milestoneTitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  milestoneDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
  milestoneFooter: {
    gap: Spacing.sm,
  },
  taskCount: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.light.tint,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textSecondary,
    textAlign: "right",
  },
  buttonContainer: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
});
