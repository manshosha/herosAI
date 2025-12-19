import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TaskIcon } from "@/components/ui/task-icon";
import { TaskGroupModal } from "@/components/ui/task-group-modal";
import { ExpandableCalendar } from "@/components/ui/expandable-calendar";
import { StoriesCarousel, Story } from "@/components/ui/stories-carousel";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
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

// Sample stories data - includes action items (medications, mood check-in) and regular stories
const SAMPLE_STORIES: Story[] = [
  {
    id: "medications",
    author: "My Medications",
    emoji: "💊",
    title: "My Medications",
    isAction: true,
    route: "/medicines-detail",
  },
  {
    id: "mood-checkin",
    author: "Mood Check In",
    emoji: "😊",
    title: "Mood Check In",
    isAction: true,
    route: "/mood-checkin",
  },
  {
    id: "1",
    author: "Community",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop&crop=face",
    fallback: "CM",
    preview: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=533&fit=crop",
    title: "Community Support",
  },
  {
    id: "2",
    author: "Fitness Trainer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    fallback: "FT",
    preview: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=533&fit=crop",
    title: "Daily Exercise",
  },
  {
    id: "3",
    author: "Nutrition Guide",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    fallback: "NG",
    preview: "https://images.unsplash.com/photo-1490645935967-10de6ba1701f?w=300&h=533&fit=crop",
    title: "Healthy Eating",
  },
  {
    id: "4",
    author: "Mindfulness",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    fallback: "MF",
    preview: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=533&fit=crop",
    title: "Breathing Tips",
  },
  {
    id: "5",
    author: "Progress Tracker",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    fallback: "PT",
    preview: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=533&fit=crop",
    title: "Your Journey",
  },
];

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
  const { completions, completeTask, isTaskCompleted } = useTaskCompletion();
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

  // Task Notification Component for AnimatedList
  const TaskNotification = ({
    group,
    onPress,
  }: {
    group: GroupedTasks | { type: string; label: string; tasks: any[] };
    onPress: () => void;
  }) => {
    const getTaskIcon = (type: string) => {
      const iconMap: Record<string, { emoji: string; color: string }> = {
        ot_exercise: { emoji: "🏋️", color: "#FF6B35" },
        pt_exercise: { emoji: "💪", color: "#45B7D1" },
        speech_exercise: { emoji: "🗣️", color: "#E74C3C" },
        cognitive_game: { emoji: "🧠", color: "#F7DC6F" },
        podcast: { emoji: "🎧", color: "#9B59B6" },
        meditation: { emoji: "🧘", color: "#52B788" },
        chat: { emoji: "💬", color: "#3498DB" },
      };
      return iconMap[type] || { emoji: "📋", color: Colors.light.tint };
    };

    // Check if all tasks in group are completed
    const allTasksCompleted = group.tasks.every((task: any) =>
      isTaskCompleted(task.id || task.taskId)
    );
    const anyTaskCompleted = group.tasks.some((task: any) =>
      isTaskCompleted(task.id || task.taskId)
    );

    const taskIcon = getTaskIcon(group.type);
    const exerciseText = group.tasks.length === 1 ? "exercise" : "exercises";
    const isChat = group.type === "chat";

    // Animation values
    const translateX = useSharedValue(0);
    const checkmarkProgress = useSharedValue(allTasksCompleted ? 1 : 0);
    const opacity = useSharedValue(allTasksCompleted ? 0.3 : 1);
    const strikethroughWidth = useSharedValue(allTasksCompleted ? 1 : 0);

    // Update animations when completion state changes
    React.useEffect(() => {
      if (allTasksCompleted) {
        checkmarkProgress.value = withSpring(1);
        opacity.value = withTiming(0.3, { duration: 300 });
        strikethroughWidth.value = withTiming(1, { duration: 300 });
      } else {
        checkmarkProgress.value = withSpring(0);
        opacity.value = withTiming(1, { duration: 300 });
        strikethroughWidth.value = withTiming(0, { duration: 300 });
      }
    }, [allTasksCompleted]);

    // Swipe gesture
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        translateX.value = e.translationX;
      })
      .onEnd((e) => {
        if (e.translationX > 50) {
          // Swipe right to complete
          if (!allTasksCompleted) {
            // Complete all tasks in group
            group.tasks.forEach((task: any) => {
              const taskId = task.id || task.taskId;
              if (taskId && !isTaskCompleted(taskId)) {
                completeTask(taskId, task.duration || 0);
              }
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        }
        translateX.value = withSpring(0);
      });

    const animatedContainerStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    const animatedStrikethroughStyle = useAnimatedStyle(() => ({
      width: `${strikethroughWidth.value * 100}%`,
    }));

    const animatedCheckmarkStyle = useAnimatedStyle(() => ({
      opacity: checkmarkProgress.value,
      transform: [{ scale: checkmarkProgress.value }],
    }));

    const handleComplete = () => {
      if (!allTasksCompleted) {
        group.tasks.forEach((task: any) => {
          const taskId = task.id || task.taskId;
          if (taskId && !isTaskCompleted(taskId)) {
            completeTask(taskId, task.duration || 0);
          }
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    };

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.taskNotification, animatedContainerStyle]}>
          <Pressable
            onPress={onPress}
            style={styles.taskNotificationPressable}
          >
            <View style={styles.taskNotificationContent}>
              {/* Checkbox */}
              <Pressable
                onPress={handleComplete}
                style={styles.taskCheckboxContainer}
              >
                <Animated.View
                  style={[
                    styles.taskCheckbox,
                    allTasksCompleted && styles.taskCheckboxCompleted,
                    animatedCheckmarkStyle,
                  ]}
                >
                  {allTasksCompleted && (
                    <Animated.View style={animatedCheckmarkStyle}>
                      <ThemedText style={styles.checkmark}>✓</ThemedText>
                    </Animated.View>
                  )}
                </Animated.View>
              </Pressable>

              <View
                style={[
                  styles.taskNotificationIcon,
                  { backgroundColor: taskIcon.color },
                ]}
              >
                <ThemedText style={styles.taskNotificationEmoji}>
                  {taskIcon.emoji}
                </ThemedText>
              </View>
              <View style={styles.taskNotificationText}>
                <View style={styles.taskNotificationHeader}>
                  <Animated.View style={[styles.taskTitleContainer, animatedTextStyle]}>
                    <ThemedText type="defaultSemiBold" style={styles.taskNotificationName}>
                      {group.label}
                    </ThemedText>
                    <Animated.View
                      style={[styles.strikethrough, animatedStrikethroughStyle]}
                    />
                  </Animated.View>
                  {!isChat && (
                    <>
                      <ThemedText style={styles.taskNotificationDot}>·</ThemedText>
                      <ThemedText style={styles.taskNotificationTime}>
                        {group.tasks.length} {exerciseText}
                      </ThemedText>
                    </>
                  )}
                </View>
                <ThemedText style={styles.taskNotificationDescription}>
                  {isChat ? "Start a conversation" : "Tap to view exercises"}
                </ThemedText>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stories Carousel - At the top */}
        <View
          style={[
            styles.storiesTopContainer,
            {
              paddingTop: Math.max(insets.top, 20) + Spacing.md,
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
              paddingBottom: Spacing.md,
            },
          ]}
        >
          <StoriesCarousel
            stories={SAMPLE_STORIES}
            onStoryPress={(story) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              // Navigate if route is provided (for action items)
              if (story.route) {
                router.push(story.route as any);
              }
            }}
          />
        </View>

        {/* Theme-Based Gradient Hero Section */}
        <LinearGradient
          colors={[themeColor, adjustColorBrightness(themeColor, -0.25)]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.heroSection,
            {
              paddingTop: Spacing.md,
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

          <View style={styles.tasksListContainer}>
            {/* Chat Task if exists */}
            {displayTasks.find((t: any) => t.type === "chat") && (
              <AnimatedListItem key="chat">
                <TaskNotification
                  group={{
                    type: "chat",
                    label: "Community",
                    tasks: [displayTasks.find((t: any) => t.type === "chat")],
                  }}
                  onPress={() => {
                    const chatTask = displayTasks.find((t: any) => t.type === "chat");
                    if (chatTask) handleTaskPress(chatTask);
                  }}
                />
              </AnimatedListItem>
            )}
            {/* Grouped Exercise Tasks */}
            {groupedDisplayTasks.map((group) => (
              <AnimatedListItem key={group.type}>
                <TaskNotification
                  group={group}
                  onPress={() => handleTaskGroupPress(group)}
                />
              </AnimatedListItem>
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
  storiesTopContainer: {
    backgroundColor: Colors.light.background,
    marginBottom: Spacing.sm,
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
    borderWidth: 5,
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
    color: Colors.light.tint,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "rgba(255, 90, 31, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
    borderColor: "rgba(255, 140, 102, 0.05)",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.light.tint,
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
  tasksListContainer: {
    marginTop: Spacing.md,
    minHeight: 400,
    alignItems: "flex-start",
  },
  taskNotification: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "flex-start",
    borderRadius: BorderRadius.large,
    backgroundColor: Colors.light.background,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskNotificationPressable: {
    width: "100%",
  },
  taskNotificationPressed: {
    transform: [{ scale: 1.02 }],
    opacity: 0.9,
  },
  taskNotificationContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  taskCheckboxContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  taskCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  taskCheckboxCompleted: {
    backgroundColor: Colors.light.success,
    borderColor: Colors.light.success,
  },
  checkmark: {
    fontSize: 10,
    lineHeight: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  taskTitleContainer: {
    position: "relative",
  },
  strikethrough: {
    position: "absolute",
    left: 0,
    top: "50%",
    height: 2,
    backgroundColor: Colors.light.text,
    marginTop: -1,
  },
  taskNotificationIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  taskNotificationEmoji: {
    fontSize: 20,
    lineHeight: 24,
  },
  taskNotificationText: {
    flex: 1,
    gap: Spacing.xs / 2,
  },
  taskNotificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  taskNotificationName: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.text,
  },
  taskNotificationDot: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  taskNotificationTime: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
  taskNotificationDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
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
