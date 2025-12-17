import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskCompletion {
  taskId: string;
  completedAt: string;
  duration: number; // in minutes
}

interface CompletionStats {
  totalCompleted: number;
  weekCompleted: number;
  streakDays: number;
  lastCompletedDate: string | null;
}

const COMPLETION_KEY = "task_completions";
const STATS_KEY = "completion_stats";

export function useTaskCompletion() {
  const [completions, setCompletions] = useState<TaskCompletion[]>([]);
  const [stats, setStats] = useState<CompletionStats>({
    totalCompleted: 0,
    weekCompleted: 0,
    streakDays: 0,
    lastCompletedDate: null,
  });
  const [loading, setLoading] = useState(true);

  // Load completions from storage
  useEffect(() => {
    loadCompletions();
  }, []);

  const loadCompletions = async () => {
    try {
      const stored = await AsyncStorage.getItem(COMPLETION_KEY);
      const storedStats = await AsyncStorage.getItem(STATS_KEY);

      if (stored) {
        setCompletions(JSON.parse(stored));
      }
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error("Failed to load completions:", error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = useCallback(
    async (taskId: string, duration: number) => {
      try {
        const now = new Date();
        const completion: TaskCompletion = {
          taskId,
          completedAt: now.toISOString(),
          duration,
        };

        const updated = [...completions, completion];
        await AsyncStorage.setItem(COMPLETION_KEY, JSON.stringify(updated));
        setCompletions(updated);

        // Update stats
        updateStats(updated);
      } catch (error) {
        console.error("Failed to complete task:", error);
      }
    },
    [completions]
  );

  const updateStats = async (allCompletions: TaskCompletion[]) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Count completions this week
    const weekCompleted = allCompletions.filter((c) => {
      const date = new Date(c.completedAt);
      return date >= weekAgo;
    }).length;

    // Calculate streak
    let streakDays = 0;
    let currentDate = new Date(today);
    for (let i = 0; i < 365; i++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const hasCompletion = allCompletions.some((c) => {
        const completionDate = new Date(c.completedAt)
          .toISOString()
          .split("T")[0];
        return completionDate === dateStr;
      });

      if (hasCompletion) {
        streakDays++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    const lastCompletion = allCompletions[allCompletions.length - 1];
    const lastCompletedDate = lastCompletion
      ? new Date(lastCompletion.completedAt).toISOString().split("T")[0]
      : null;

    const newStats: CompletionStats = {
      totalCompleted: allCompletions.length,
      weekCompleted,
      streakDays,
      lastCompletedDate,
    };

    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    setStats(newStats);
  };

  const isTaskCompleted = useCallback(
    (taskId: string) => {
      return completions.some((c) => c.taskId === taskId);
    },
    [completions]
  );

  const getTasksCompletedToday = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return completions.filter((c) => {
      const date = new Date(c.completedAt).toISOString().split("T")[0];
      return date === today;
    });
  }, [completions]);

  const clearAllCompletions = async () => {
    try {
      await AsyncStorage.removeItem(COMPLETION_KEY);
      await AsyncStorage.removeItem(STATS_KEY);
      setCompletions([]);
      setStats({
        totalCompleted: 0,
        weekCompleted: 0,
        streakDays: 0,
        lastCompletedDate: null,
      });
    } catch (error) {
      console.error("Failed to clear completions:", error);
    }
  };

  return {
    completions,
    stats,
    loading,
    completeTask,
    isTaskCompleted,
    getTasksCompletedToday,
    clearAllCompletions,
  };
}
