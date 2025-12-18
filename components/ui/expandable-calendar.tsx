import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, LayoutAnimation, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { triggerHaptic } from "@/utils/haptics";

interface Task {
  id: string;
  week: number;
  day: number;
  completed?: boolean;
}

type DayStatus = "completed" | "in-progress" | "scheduled" | "none";

interface DayTaskInfo {
  status: DayStatus;
  totalTasks: number;
  completedTasks: number;
}

interface ExpandableCalendarProps {
  tasks: Task[];
  completedTaskIds?: Set<string>;
  currentDate?: Date;
  themeColor?: string;
  onDaySelect?: (day: number) => void;
}

// Status colors
const STATUS_COLORS = {
  completed: "#22C55E", // Green
  "in-progress": "#F97316", // Orange
  scheduled: "#9CA3AF", // Gray
  none: "transparent",
};

export function ExpandableCalendar({
  tasks,
  completedTaskIds = new Set(),
  currentDate = new Date(),
  themeColor = "#FF6B35",
  onDaySelect,
}: ExpandableCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(currentDate.getDate());

  // Get calendar data for current month
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Adjust for Monday start
    const adjustedStartDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    // Create array of days
    const days: (number | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return { days, month, year, daysInMonth };
  }, [currentDate]);

  // Get task info for each day
  const dayTaskInfo = useMemo(() => {
    const info = new Map<number, DayTaskInfo>();
    const today = new Date();
    const todayDate = today.getDate();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)

    // Group tasks by day
    const tasksByDay = new Map<number, Task[]>();

    tasks.forEach((task) => {
      // Calculate the actual date for this task
      const taskDate = new Date(currentWeekStart);
      taskDate.setDate(currentWeekStart.getDate() + (task.week - 1) * 7 + task.day - 1);
      
      // Only include if it's in the current month
      if (
        taskDate.getMonth() === calendarData.month &&
        taskDate.getFullYear() === calendarData.year
      ) {
        const dayNum = taskDate.getDate();
        if (!tasksByDay.has(dayNum)) {
          tasksByDay.set(dayNum, []);
        }
        tasksByDay.get(dayNum)!.push(task);
      }
    });

    // Calculate status for each day
    tasksByDay.forEach((dayTasks, dayNum) => {
      const totalTasks = dayTasks.length;
      const completedTasks = dayTasks.filter(t => completedTaskIds.has(t.id)).length;
      
      let status: DayStatus;
      if (completedTasks === totalTasks && totalTasks > 0) {
        status = "completed";
      } else if (completedTasks > 0) {
        status = "in-progress";
      } else if (dayNum <= todayDate) {
        // Past or current day with no completions - show as in-progress
        status = "in-progress";
      } else {
        // Future day - show as scheduled
        status = "scheduled";
      }

      info.set(dayNum, { status, totalTasks, completedTasks });
    });

    return info;
  }, [tasks, completedTaskIds, calendarData.month, calendarData.year]);

  const toggleExpanded = () => {
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      triggerHaptic.impact();
    }
    setIsExpanded(!isExpanded);
  };

  const handleDayPress = (day: number) => {
    if (Platform.OS !== "web") {
      triggerHaptic.impact();
    }
    setSelectedDay(day);
    onDaySelect?.(day);
  };

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  // Get current week for collapsed view (Monday-based)
  const currentWeek = useMemo(() => {
    const today = currentDate.getDate();
    const dayOfWeek = currentDate.getDay();
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = today - adjustedDayOfWeek;
    
    const week: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const day = weekStart + i;
      if (day >= 1 && day <= calendarData.daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
    }
    return week;
  }, [currentDate, calendarData.daysInMonth]);

  const renderDayCell = (day: number | null, index: number) => {
    if (day === null) {
      return <View key={index} style={styles.dayCell} />;
    }

    const isToday = day === currentDate.getDate();
    const isSelected = day === selectedDay;
    const taskInfo = dayTaskInfo.get(day);
    const hasTask = taskInfo && taskInfo.totalTasks > 0;
    const status = taskInfo?.status || "none";

    return (
      <Pressable
        key={index}
        style={styles.dayCell}
        onPress={() => handleDayPress(day)}
      >
        <View style={[
          styles.dayInner,
          isSelected && styles.selectedDayInner,
        ]}>
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              !isSelected && isToday && styles.todayText,
            ]}
          >
            {day}
          </Text>
          {hasTask && (
            <View style={styles.statusDotsContainer}>
              <View 
                style={[
                  styles.statusDot,
                  { backgroundColor: STATUS_COLORS[status] },
                  isSelected && styles.selectedStatusDot,
                ]} 
              />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={["#FFA500", "#FF8C00", "#FF7F00"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Pressable onPress={toggleExpanded} style={styles.pressableArea}>
        {/* Week Days Header */}
        <View style={styles.weekDaysRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {!isExpanded ? (
          // Collapsed view - show current week only
          <View style={styles.weekRow}>
            {currentWeek.map((day, index) => renderDayCell(day, index))}
          </View>
        ) : (
          // Expanded view - show full month
          <View style={styles.monthGrid}>
            {calendarData.days.map((day, index) => renderDayCell(day, index))}
          </View>
        )}

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: STATUS_COLORS.completed }]} />
            <Text style={styles.legendText}>Done</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: STATUS_COLORS["in-progress"] }]} />
            <Text style={styles.legendText}>In Progress</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: STATUS_COLORS.scheduled }]} />
            <Text style={styles.legendText}>Scheduled</Text>
          </View>
        </View>

        {/* Expand/Collapse Indicator */}
        <View style={styles.expandIndicator}>
          <View style={styles.expandBar} />
        </View>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },
  pressableArea: {
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  weekDaysRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
  },
  weekRow: {
    flexDirection: "row",
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%", // 100% / 7 days
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  dayInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  selectedDayInner: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  dayText: {
    fontSize: 17,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
  },
  selectedDayText: {
    color: "#FF8C00",
    fontWeight: "700",
  },
  todayText: {
    fontWeight: "700",
    color: "#fff",
  },
  statusDotsContainer: {
    position: "absolute",
    bottom: 4,
    flexDirection: "row",
    gap: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  selectedStatusDot: {
    bottom: 2,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  expandIndicator: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  expandBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});
