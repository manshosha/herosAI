import { useMemo } from "react";
import { Theme, THEME_TO_GOALS } from "@/types/heros";
import { TAKE_CARE_OF_MYSELF_AT_HOME } from "@/data/goals";

interface ThemeTask {
  id: string;
  title: string;
  category: string;
  duration: number;
  type: "ot_exercise" | "pt_exercise" | "speech_exercise" | "cognitive_game" | "podcast" | "meditation" | "chat";
  taskId: string;
  milestoneId: string;
}

export function useThemeGoals(recommendedThemes: Theme[]) {
  // Get goal categories from recommended themes
  const goalCategories = useMemo(() => {
    const categories = new Set<string>();
    recommendedThemes.forEach((theme) => {
      const cats = THEME_TO_GOALS[theme] || [];
      cats.forEach((cat) => categories.add(cat));
    });
    return Array.from(categories);
  }, [recommendedThemes]);

  // Get tasks filtered by theme categories
  const themeTasks = useMemo(() => {
    const tasks: ThemeTask[] = [];

    // For now, we'll use the first goal as the source
    // In a full implementation, you'd have multiple goals mapped to categories
    for (const milestone of TAKE_CARE_OF_MYSELF_AT_HOME.milestones) {
      for (const task of milestone.tasks) {
        // Map task types to category - ensure all activity types are included
        let taskCategory = "home_care"; // default for OT and PT exercises

        if (task.type === "speech_exercise") {
          taskCategory = "communication";
        } else if (task.type === "cognitive_game") {
          taskCategory = "memory_focus";
        } else if (task.type === "podcast") {
          taskCategory = "emotional_wellbeing";
        } else if (task.type === "meditation") {
          taskCategory = "emotional_wellbeing";
        } else if (task.type === "pt_exercise" || task.type === "ot_exercise") {
          taskCategory = "home_care";
        }

        // Include ALL tasks to ensure variety - theme filtering is too restrictive
        // Users should see all activity types for a comprehensive rehabilitation program
        if (true) { // Always include all tasks
          tasks.push({
            id: task.id,
            title: task.title,
            category:
              task.type === "ot_exercise"
                ? "Exercise"
                : task.type === "speech_exercise"
                  ? "Speech"
                  : task.type === "cognitive_game"
                    ? "Game"
                    : "Audio",
            duration: task.duration,
            type: task.type as any, // Preserve original task type for grouping
            taskId: task.id,
            milestoneId: milestone.id,
          });
        }
      }
    }

    // Group tasks by type and limit to 3 per type
    const tasksByType: Record<string, ThemeTask[]> = {};
    tasks.forEach((task) => {
      if (!tasksByType[task.type]) {
        tasksByType[task.type] = [];
      }
      if (tasksByType[task.type].length < 3) {
        tasksByType[task.type].push(task);
      }
    });

    // Flatten back to array while preserving all types
    const limitedTasks = Object.values(tasksByType).flat();
    return limitedTasks;
  }, [goalCategories]);

  // Get primary theme for color scheme
  const primaryTheme = useMemo(() => {
    return recommendedThemes[0] || "theme_18_general";
  }, [recommendedThemes]);

  // Get theme color
  const themeColor = useMemo(() => {
    const themeColorMap: Record<Theme, string> = {
      theme_1_move_independently: "#FF6B35", // Orange
      theme_2_mobility_walking: "#FF6B35", // Orange
      theme_5_communication: "#4ECDC4", // Teal
      theme_6_hand_arm: "#45B7D1", // Blue
      theme_8_balance: "#F7DC6F", // Yellow
      theme_11_emotional: "#BB8FCE", // Purple
      theme_12_walking_confidence: "#FF6B35", // Orange
      theme_14_hand_arm_advanced: "#45B7D1", // Blue
      theme_15_strength_energy: "#FF6B35", // Orange
      // Default/general theme should also use the primary orange
      theme_18_general: "#FF6B35", // Orange (default)
    };

    return themeColorMap[primaryTheme] || "#FF6B35";
  }, [primaryTheme]);

  // Get theme name
  const themeName = useMemo(() => {
    const themeNameMap: Record<Theme, string> = {
      theme_1_move_independently: "Move Independently",
      theme_2_mobility_walking: "Mobility & Walking",
      theme_5_communication: "Communication",
      theme_6_hand_arm: "Hand & Arm Function",
      theme_8_balance: "Balance & Coordination",
      theme_11_emotional: "Emotional Wellbeing",
      theme_12_walking_confidence: "Walking Confidence",
      theme_14_hand_arm_advanced: "Advanced Hand & Arm",
      theme_15_strength_energy: "Strength & Energy",
      theme_18_general: "General Rehabilitation",
    };

    return themeNameMap[primaryTheme] || "Rehabilitation";
  }, [primaryTheme]);

  return {
    recommendedThemes,
    goalCategories,
    themeTasks,
    primaryTheme,
    themeColor,
    themeName,
  };
}
