import { Task } from "@/data/goals";

export type TaskType = "ot_exercise" | "pt_exercise" | "speech_exercise" | "cognitive_game" | "podcast" | "meditation";

export interface GroupedTasks {
  type: TaskType;
  label: string;
  icon: string;
  color: string;
  tasks: Task[];
}

const TASK_TYPE_INFO: Record<TaskType, { label: string; icon: string; color: string }> = {
  ot_exercise: {
    label: "Occupational Therapy",
    icon: "🎯",
    color: "#FF6B35",
  },
  pt_exercise: {
    label: "Physical Therapy",
    icon: "💪",
    color: "#45B7D1",
  },
  speech_exercise: {
    label: "Speech & Language",
    icon: "🗣️",
    color: "#E74C3C",
  },
  cognitive_game: {
    label: "Cognitive Games",
    icon: "🧠",
    color: "#F7DC6F",
  },
  podcast: {
    label: "Podcasts",
    icon: "🎧",
    color: "#9B59B6",
  },
  meditation: {
    label: "Meditation",
    icon: "🧘",
    color: "#52B788",
  },
};

export function groupTasksByType(tasks: Task[]): GroupedTasks[] {
  const grouped: Record<TaskType, Task[]> = {
    ot_exercise: [],
    pt_exercise: [],
    speech_exercise: [],
    cognitive_game: [],
    podcast: [],
    meditation: [],
  };

  // Group tasks by type
  tasks.forEach((task) => {
    const type = (task.type as TaskType) || "ot_exercise";
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(task);
  });

  // Convert to array format, filtering out empty groups
  const result: GroupedTasks[] = [];
  const typeOrder: TaskType[] = ["ot_exercise", "pt_exercise", "speech_exercise", "cognitive_game", "podcast", "meditation"];

  typeOrder.forEach((type) => {
    if (grouped[type].length > 0) {
      const info = TASK_TYPE_INFO[type];
      result.push({
        type,
        label: info.label,
        icon: info.icon,
        color: info.color,
        tasks: grouped[type],
      });
    }
  });

  return result;
}

export function getTaskTypeInfo(type: TaskType) {
  return TASK_TYPE_INFO[type] || TASK_TYPE_INFO.ot_exercise;
}
