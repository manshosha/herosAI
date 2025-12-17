import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TaskIcon } from "@/components/ui/task-icon";
import { TaskGroupModal } from "@/components/ui/task-group-modal";
import { ExpandableCalendar } from "@/components/ui/expandable-calendar";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { useThemeGoals } from "@/hooks/use-theme-goals";
import { useTaskCompletion } from "@/hooks/use-task-completion";
import { TAKE_CARE_OF_MYSELF_AT_HOME, Task as GoalTask } from "@/data/goals";
import { groupTasksByType, GroupedTasks } from "@/utils/task-grouping";

interface Task {
  id: string;
  title: string;
  category: string;
  duration: number;
  image?: string;
  type: "exercise" | "podcast" | "game" | "chat";
}

const DAILY_TASKS: Task[] = [
  {
    id: "1",
    title: "Test Your Fitness",
    category: "Exercise",
    duration: 10,
    type: "exercise",
  },
  {
    id: "2",
    title: "Scan Your Body",
    category: "Assessment",
    duration: 3,
    type: "exercise",
  },
  {
    id: "3",
    title: "Breathing Exercise",
    category: "Wellness",
    duration: 5,
    type: "exercise",
  },
];

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEK_DATES = [17, 18, 19, 20, 21, 22, 23];

// Utility function to adjust color brightness
function adjustColorBrightness(color: string, percent: number): string {
  // Remove # if present
  const hex = color.replace("#", "");
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Adjust brightness
  const newR = Math.round(Math.max(0, Math.min(255, r + r * percent)));
  const newG = Math.round(Math.max(0, Math.min(255, g + g * percent)));
  const newB = Math.round(Math.max(0, Math.min(255, b + b * percent)));
  // Convert back to hex
  return (
    "#" +
    [newR, newG, newB]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export default function TodayScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { universal, getRecommendedThemes } = useOnboardingState();
  const recommendedThemes = getRecommendedThemes();
  const { themeTasks, themeColor, themeName } = useThemeGoals(recommendedThemes);
  const { completions } = useTaskCompletion();
  const [todayIndex, setTodayIndex] = useState(3); // Wednesday is today
  const [streakDays, setStreakDays] = useState(0);
  const [selectedTaskGroup, setSelectedTaskGroup] = useState<GroupedTasks | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Initialize streak from storage
    setStreakDays(0);
  }, []);

  // Use theme-based tasks if available, otherwise use default
  const displayTasks: any[] = themeTasks.length > 0 ? themeTasks : DAILY_TASKS;

  // Group tasks by type for display
  const groupedDisplayTasks = groupTasksByType(displayTasks.filter((t: any) => t.type && t.type !== "chat"));

  const handleTaskGroupPress = (group: GroupedTasks) => {
    setSelectedTaskGroup(group);
    setModalVisible(true);
  };

  const handleStartTask = (task: GoalTask) => {
    setModalVisible(false);
    // Navigate to task detail screen
    router.push({
      pathname: "/(tabs)/task-detail",
      params: { taskId: task.id },
    } as any);
  };

  const handleTaskPress = (task: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to task detail screen
    if (task.taskId && task.taskId !== "coach-chat") {
      router.push({
        pathname: "/(tabs)/task-detail",
        params: { taskId: task.taskId, milestoneId: task.milestoneId },
      });
    }
  };

  const renderTaskCard = ({ item }: { item: Task }) => (
    <Pressable
      onPress={() => handleTaskPress(item)}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
    >
      <GlassCard
        style={[
          styles.taskCard,
          {
            borderWidth: 2,
            borderColor: Colors.light.tint,
          },
        ]}
      >
        <View style={styles.taskContent}>
          <TaskIcon type={(item.type as any) || "ot_exercise"} size={40} />
          <View style={styles.taskInfo}>
            <ThemedText type="defaultSemiBold" style={styles.taskTitle}>
              {item.title}
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: Colors.light.textSecondary,
              }}
            >
              {item.duration} min
            </ThemedText>
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme-Based Gradient Hero Section */}
        <LinearGradient
          colors={[themeColor, adjustColorBrightness(themeColor, -0.25)]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.heroSection,
            {
              paddingTop: Math.max(insets.top, 20) + Spacing.md,
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
              paddingBottom: Spacing.xl,
            },
          ]}
        >
          {/* Top Bar: Week and Streak */}
          <View style={styles.topBar}>
            <Pressable style={styles.weekButton}>
              <View style={styles.weekButtonContent}>
                <ThemedText style={styles.weekButtonText}>Week 1</ThemedText>
                <ThemedText style={styles.weekButtonArrow}>›</ThemedText>
              </View>
            </Pressable>

            <View style={styles.streakBadge}>
              <ThemedText style={styles.streakIcon}>🔥</ThemedText>
              <ThemedText style={styles.streakText}>{streakDays}</ThemedText>
            </View>
          </View>

          {/* Expandable Calendar */}
          <ExpandableCalendar
            tasks={TAKE_CARE_OF_MYSELF_AT_HOME.milestones.flatMap((m) => m.tasks)}
            completedTaskIds={new Set(completions.map(c => c.taskId))}
            currentDate={new Date()}
            themeColor={themeColor}
          />

          {/* Personalized Greeting */}
          <View style={styles.greetingContainer}>
            <ThemedText style={styles.greeting}>
              Hi there, <ThemedText type="defaultSemiBold" style={styles.greeting}>{universal?.name || "User"}!</ThemedText>
            </ThemedText>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Featured Session */}
          <View style={styles.featuredContainer}>
            <View style={styles.specialBadge}>
              <ThemedText style={styles.specialBadgeText}>
                ✨ {themeName} Program
              </ThemedText>
            </View>

            <ThemedText style={styles.sessionDuration}>
              {displayTasks.reduce((sum, t) => sum + t.duration, 0)} min
            </ThemedText>

            {/* Horizontal Task Scroll */}
            <View style={styles.taskScrollContainer}>
              <FlatList
                data={displayTasks.slice(0, 4)}
                renderItem={({ item, index }) => (
                  <Animated.View
                    entering={FadeInDown.delay(index * 50).springify()}
                    style={styles.taskScrollItem}
                  >
                    <Pressable
                      onPress={() => handleTaskPress(item)}
                      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                    >
                      <View
                        style={[
                          styles.taskScrollCard,
                          {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                        ]}
                      >
                        <ThemedText style={styles.taskScrollIcon}>
                          {item.type === "chat"
                            ? "💬"
                            : item.type === "podcast"
                              ? "🎧"
                              : "💪"}
                        </ThemedText>
                      </View>
                    </Pressable>
                  </Animated.View>
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                style={styles.taskScroll}
              />
              <Pressable style={styles.taskScrollMore}>
                <ThemedText style={styles.taskScrollMoreText}>→</ThemedText>
              </Pressable>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <Pressable
          onPress={() => router.push("/medicines-detail")}
          style={({ pressed }) => [pressed && { opacity: 0.7 }]}
        >
          <View
            style={[
              styles.quickActionsContainer,
              {
                paddingLeft: Math.max(insets.left, 20),
                paddingRight: Math.max(insets.right, 20),
              },
            ]}
          >
            <GlassCard style={styles.medicinesCard}>
              <View style={styles.medicineCardContent}>
                <ThemedText style={styles.medicineIconLarge}>💊</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.medicineLabel}>
                  My Medications
                </ThemedText>
              </View>
            </GlassCard>
          </View>
        </Pressable>

        {/* Daily Tasks Section */}
        <View
          style={[
            styles.dailyTasksSection,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
            },
          ]}
        >
          {/* Daily Activities Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarHeader}>
              <ThemedText style={styles.progressBarLabel}>
                Daily Activities
              </ThemedText>
              <ThemedText style={styles.progressBarPercentage}>
                {Math.round((completions.length / DAILY_TASKS.length) * 100)}%
              </ThemedText>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${(completions.length / DAILY_TASKS.length) * 100}%`,
                  },
                ]}
              />
            </View>
            <View style={styles.progressBarStats}>
              <ThemedText style={styles.progressBarStat}>
                {completions.length} of {DAILY_TASKS.length} completed
              </ThemedText>
            </View>
          </View>

          <ThemedText type="title" style={styles.sectionTitle}>
            Today's Tasks
          </ThemedText>

          <View style={styles.tasksList}>
            {/* Chat Task */}
            {displayTasks.find((t: any) => t.type === "chat") && (
              <Animated.View entering={FadeInDown.delay(0).springify()}>
                {renderTaskCard({ item: displayTasks.find((t: any) => t.type === "chat") })}
              </Animated.View>
            )}

            {/* Grouped Exercise Tasks */}
            {groupedDisplayTasks.map((group, index) => (
              <Animated.View
                key={group.type}
                entering={FadeInDown.delay((index + 1) * 50).springify()}
              >
                <Pressable
                  onPress={() => handleTaskGroupPress(group)}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                >
                  <GlassCard style={styles.groupCard}>
                    <View style={styles.groupCardContent}>
                      <View style={styles.groupIconSection}>
                        <TaskIcon type={group.type as any} size={44} />
                      </View>
                      <View style={styles.groupInfoSection}>
                        <ThemedText type="defaultSemiBold" style={styles.groupTitle}>
                          {group.label}
                        </ThemedText>
                        <ThemedText
                          style={{
                            fontSize: 16,
                            lineHeight: 24,
                            color: Colors.light.textSecondary,
                          }}
                        >
                          {group.tasks.length} exercises
                        </ThemedText>
                      </View>
                      <View style={styles.groupArrow}>
                        <ThemedText style={styles.arrowText}>›</ThemedText>
                      </View>
                    </View>
                  </GlassCard>
                </Pressable>
              </Animated.View>
            ))}
          </View>
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    gap: Spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
  },
  weekButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  weekButtonText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  weekButtonArrow: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 24,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  streakIcon: {
    fontSize: 16,
    lineHeight: 20,
  },
  streakText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  weekCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  dayCell: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.xs,
  },
  dayCellToday: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderRadius: 12,
  },
  dayLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    lineHeight: 16,
  },
  dayLabelToday: {
    color: "#fff",
  },
  dateLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  dateLabelToday: {
    color: "#fff",
  },
  todayIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  todayIcon: {
    fontSize: 12,
    lineHeight: 16,
  },
  greetingContainer: {
    gap: Spacing.xs,
  },
  greeting: {
    color: "#fff",
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "bold",
  },
  greetingSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  featuredContainer: {
    gap: Spacing.md,
  },
  specialBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  specialBadgeText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  sessionDuration: {
    color: "#fff",
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "bold",
  },
  sessionCategory: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    lineHeight: 20,
  },
  taskScrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  taskScroll: {
    flex: 1,
  },
  taskScrollItem: {
    marginRight: Spacing.sm,
  },
  taskScrollCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  taskScrollIcon: {
    fontSize: 32,
    lineHeight: 40,
  },
  taskScrollMore: {
    width: 60,
    height: 80,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  taskScrollMoreText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 32,
  },
  medicinesSection: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  medicinesCard: {
    padding: Spacing.md,
  },
  medicineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  medicineIcon: {
    fontSize: 32,
    lineHeight: 40,
  },
  medicineInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  medicineLabel: {
    fontSize: 15,
    lineHeight: 22,
  },
  medicineCardContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  medicineIconLarge: {
    fontSize: 56,
    lineHeight: 64,
  },
  medicineSubtext: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textSecondary,
  },
  quickActionsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  quickActionButton: {
    flex: 1,
  },
  quickActionCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: "center",
    gap: Spacing.sm,
  },
  quickActionIcon: {
    fontSize: 24,
    lineHeight: 28,
  },
  quickActionLabel: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  dailyTasksSection: {
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  progressBarContainer: {
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: "rgba(124, 58, 237, 0.08)",
    borderRadius: 16,
    marginBottom: Spacing.md,
  },
  progressBarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBarLabel: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: Colors.light.text,
  },
  progressBarPercentage: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#7C3AED",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "rgba(124, 58, 237, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#7C3AED",
    borderRadius: 4,
  },
  progressBarStats: {
    marginTop: Spacing.xs,
  },
  progressBarStat: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.textSecondary,
  },
  sectionTitle: {
    marginTop: Spacing.lg,
  },
  tasksList: {
    gap: Spacing.md,
  },
  taskCard: {
    padding: Spacing.md,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  taskIcon: {
    fontSize: 24,
    lineHeight: 28,
  },
  taskInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  taskTitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  groupCard: {
    padding: Spacing.md,
  },
  groupCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  groupIconSection: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(124, 58, 237, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  groupInfoSection: {
    flex: 1,
    gap: Spacing.xs,
  },
  groupTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
  },
  groupArrow: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  arrowText: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.light.textSecondary,
  },
});
