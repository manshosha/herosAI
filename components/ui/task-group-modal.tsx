import React, { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { Task } from "@/data/goals";
import { GroupedTasks } from "@/utils/task-grouping";
import { TaskIcon } from "./task-icon";
import { ExerciseStories } from "./exercise-stories";

interface TaskGroupModalProps {
  visible: boolean;
  groupedTasks: GroupedTasks | null;
  onClose: () => void;
  onStartTask: (task: Task) => void;
}

export function TaskGroupModal({
  visible,
  groupedTasks,
  onClose,
  onStartTask,
}: TaskGroupModalProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showStories, setShowStories] = useState(false);

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setShowStories(true);
  };

  const handleStoriesClose = () => {
    setShowStories(false);
    setSelectedTask(null);
  };

  const handleStartExercise = () => {
    setShowStories(false);
    if (selectedTask) {
      onStartTask(selectedTask);
    }
  };

  if (!groupedTasks) return null;

  const getTaskCategoryLabel = (type: string): string => {
    const labels: Record<string, string> = {
      ot_exercise: "Occupational Therapy",
      pt_exercise: "Physical Therapy",
      speech_exercise: "Speech & Language",
      cognitive_game: "Cognitive Training",
      podcast: "Wellness Podcast",
      meditation: "Mindfulness",
    };
    return labels[type] || "Exercise";
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeIcon}>✕</ThemedText>
          </Pressable>
          <View style={styles.headerContent}>
            <TaskIcon type={groupedTasks.type as any} size={36} />
            <View style={styles.headerText}>
              <ThemedText type="title" style={styles.headerTitle}>
                {getTaskCategoryLabel(groupedTasks.type)}
              </ThemedText>
              <ThemedText
                style={[
                  styles.headerSubtitle,
                  { color: Colors.light.textSecondary },
                ]}
              >
                {groupedTasks.tasks.length} exercises
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Exercises List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.exercisesContainer}>
            {groupedTasks.tasks.map((task, index) => (
              <Pressable
                key={task.id}
                onPress={() => handleTaskPress(task)}
                style={({ pressed }) => [
                  styles.exerciseCard,
                  pressed && styles.exerciseCardPressed,
                ]}
              >
                <LinearGradient
                  colors={["rgba(124, 58, 237, 0.08)", "rgba(167, 139, 250, 0.04)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.exerciseGradient}
                >
                  {/* Exercise Thumbnail */}
                  <View style={styles.thumbnailContainer}>
                    <Image
                      source={require("@/assets/images/exercise-thumb-1.png")}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Exercise Info */}
                  <View style={styles.exerciseInfo}>
                    <ThemedText
                      type="defaultSemiBold"
                      style={styles.exerciseTitle}
                    >
                      {task.title}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.exerciseCategory,
                        { color: Colors.light.textSecondary },
                      ]}
                    >
                      {getTaskCategoryLabel(task.type)}
                    </ThemedText>
                    {task.description && (
                      <ThemedText
                        style={[
                          styles.exerciseDescription,
                          { color: Colors.light.textSecondary },
                        ]}
                        numberOfLines={2}
                      >
                        {task.description}
                      </ThemedText>
                    )}
                  </View>

                  {/* Duration */}
                  <View style={styles.durationBadge}>
                    <ThemedText style={styles.durationText}>
                      {task.duration}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.durationUnit,
                        { color: Colors.light.textSecondary },
                      ]}
                    >
                      min
                    </ThemedText>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Exercise Stories Modal */}
      {selectedTask && (
        <ExerciseStories
          visible={showStories}
          onClose={handleStoriesClose}
          task={selectedTask}
          onStartExercise={handleStartExercise}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    gap: Spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.light.text,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  headerText: {
    flex: 1,
    gap: Spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  headerSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  exercisesContainer: {
    gap: Spacing.md,
  },
  exerciseCard: {
    borderRadius: BorderRadius.large,
    overflow: "hidden",
  },
  exerciseCardPressed: {
    opacity: 0.7,
  },
  exerciseGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.md,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: "rgba(124, 58, 237, 0.1)",
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.medium,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  exerciseInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  exerciseTitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  exerciseCategory: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  exerciseDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  durationBadge: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingHorizontal: Spacing.sm,
  },
  durationText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.light.success,
  },
  durationUnit: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "500",
  },
});
