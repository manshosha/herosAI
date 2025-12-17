import { useState, useCallback } from "react";
import { Goal, Milestone, Task, GoalCategory, GOAL_CATEGORIES, MILESTONE_TEMPLATES } from "@/types/heros";

export function useRehabilitationData() {
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [userProfile, setUserProfile] = useState({
    name: "",
    age: undefined as number | undefined,
    conditionType: "",
  });

  // Create initial goals from categories
  const createGoal = useCallback((category: GoalCategory): Goal => {
    const categoryInfo = GOAL_CATEGORIES[category];
    const milestoneTemplates = MILESTONE_TEMPLATES[category];

    const milestones: Milestone[] = milestoneTemplates.map((title, index) => ({
      id: `${category}-milestone-${index}`,
      title,
      description: `Work on ${title.toLowerCase()}`,
      goalId: category,
      order: index,
      tasks: [],
      progress: 0,
      completed: false,
    }));

    return {
      id: category,
      category,
      title: categoryInfo.title,
      emoji: categoryInfo.emoji,
      description: categoryInfo.description,
      milestones,
      progress: 0,
      completed: false,
      completedDate: undefined,
      selected: false,
    };
  }, []);

  // Toggle goal selection
  const toggleGoal = useCallback((category: GoalCategory) => {
    setSelectedGoals((prev) => {
      const exists = prev.find((g) => g.category === category);
      if (exists) {
        return prev.filter((g) => g.category !== category);
      } else {
        return [...prev, { ...createGoal(category), selected: true }];
      }
    });
  }, [createGoal]);

  // Update milestone progress
  const updateMilestoneProgress = useCallback(
    (goalId: string, milestoneId: string, progress: number) => {
      setSelectedGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === goalId) {
            const updatedMilestones = goal.milestones.map((milestone) => {
              if (milestone.id === milestoneId) {
                return { ...milestone, progress: Math.min(100, Math.max(0, progress)) };
              }
              return milestone;
            });
            const newProgress = Math.round(
              updatedMilestones.reduce((sum, m) => sum + m.progress, 0) / updatedMilestones.length
            );
            return { ...goal, milestones: updatedMilestones, progress: newProgress };
          }
          return goal;
        })
      );
    },
    []
  );

  // Complete task
  const completeTask = useCallback((goalId: string, milestoneId: string, taskId: string) => {
    setSelectedGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) => {
            if (milestone.id === milestoneId) {
              const updatedTasks = milestone.tasks.map((task) => {
                if (task.id === taskId) {
                  return { ...task, completed: true, completedDate: new Date() };
                }
                return task;
              });
              const completedCount = updatedTasks.filter((t) => t.completed).length;
              const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
              return { ...milestone, tasks: updatedTasks, progress: newProgress };
            }
            return milestone;
          });
          const newProgress = Math.round(
            updatedMilestones.reduce((sum, m) => sum + m.progress, 0) / updatedMilestones.length
          );
          return { ...goal, milestones: updatedMilestones, progress: newProgress };
        }
        return goal;
      })
    );
  }, []);

  // Get today's tasks
  const getTodaysTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks: Array<{ task: Task; goalId: string; milestoneId: string }> = [];
    selectedGoals.forEach((goal) => {
      goal.milestones.forEach((milestone) => {
        milestone.tasks.forEach((task) => {
          const taskDate = new Date(task.scheduledDate);
          taskDate.setHours(0, 0, 0, 0);
          if (taskDate.getTime() === today.getTime()) {
            tasks.push({ task, goalId: goal.id, milestoneId: milestone.id });
          }
        });
      });
    });

    return tasks;
  }, [selectedGoals]);

  return {
    selectedGoals,
    setSelectedGoals,
    userProfile,
    setUserProfile,
    createGoal,
    toggleGoal,
    updateMilestoneProgress,
    completeTask,
    getTodaysTasks,
  };
}
