import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { MedicinesStories } from "@/components/ui/medicines-stories";
import { CelebrationPopup } from "@/components/ui/celebration-popup";
import { Colors, Spacing } from "@/constants/theme";
import { useOnboardingState } from "@/hooks/use-onboarding-state";

interface MedicineReminder {
  id: string;
  time: string;
  hour: number;
  name: string;
  dosage: string;
  icon: string;
  completed: boolean;
}

// Sample medicines data with time-based reminders
const SAMPLE_MEDICINES: MedicineReminder[] = [
  {
    id: "1",
    time: "8am",
    hour: 8,
    name: "Vitamin C",
    dosage: "2 pills",
    icon: "💊",
    completed: true,
  },
  {
    id: "2",
    time: "9am",
    hour: 9,
    name: "Maxgrip",
    dosage: "1 pill",
    icon: "💊",
    completed: false,
  },
  {
    id: "3",
    time: "2pm",
    hour: 14,
    name: "Wash your hands",
    dosage: "min 20 sec",
    icon: "💧",
    completed: true,
  },
  {
    id: "4",
    time: "3pm",
    hour: 15,
    name: "Wash your hands",
    dosage: "min 20 sec",
    icon: "💧",
    completed: false,
  },
  {
    id: "5",
    time: "6pm",
    hour: 18,
    name: "Evening Medication",
    dosage: "1 tablet",
    icon: "💊",
    completed: false,
  },
];

// Get today's date formatted
function getTodayDate(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", options);
  return `${date}\n${dayName}`;
}

export default function MedicinesDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { universal } = useOnboardingState();
  const [medicines, setMedicines] = useState<MedicineReminder[]>(SAMPLE_MEDICINES);
  const [completedCount, setCompletedCount] = useState(
    SAMPLE_MEDICINES.filter((m) => m.completed).length
  );
  const [showStories, setShowStories] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);

  // Stories data - first 3 medicines to take today
  const storiesToShow = [
    {
      id: "story-1",
      name: "Vitamin C",
      dosage: "500mg each",
      nextDose: "10:20 AM",
      icon: "💊",
      color: "#E74C3C",
    },
    {
      id: "story-2",
      name: "Gabapentin",
      dosage: "300 mg",
      nextDose: "3 pm",
      icon: "💊",
      color: "#F39C12",
    },
    {
      id: "story-3",
      name: "Aspirin",
      dosage: "100 mg",
      nextDose: "6 pm",
      icon: "💊",
      color: "#3498DB",
    },
  ];

  const handleMedicineToggle = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updatedMedicines = medicines.map((med) =>
      med.id === id ? { ...med, completed: !med.completed } : med
    );
    setMedicines(updatedMedicines);
    
    const newCompletedCount = medicines.find((m) => m.id === id)?.completed
      ? completedCount - 1
      : completedCount + 1;
    setCompletedCount(newCompletedCount);

    if (newCompletedCount === medicines.length && !hasShownCelebration) {
      setShowCelebration(true);
      setHasShownCelebration(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleStoriesComplete = () => {
    setShowStories(false);
  };

  // Show stories first, then medicines detail
  if (showStories) {
    return (
      <MedicinesStories
        medicines={storiesToShow}
        onComplete={handleStoriesComplete}
      />
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
              paddingTop: Spacing.md,
              paddingBottom: Spacing.lg,
            },
          ]}
        >
          <Pressable onPress={handleBack} style={styles.backButton}>
            <ThemedText style={styles.backIcon}>‹</ThemedText>
          </Pressable>
          <ThemedText type="title" style={styles.headerTitle}>
            Reminder
          </ThemedText>
          <View style={styles.headerRight}>
            <ThemedText style={styles.notificationIcon}>🔔</ThemedText>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Date Section */}
          <View
            style={[
              styles.dateSection,
              {
                paddingLeft: Math.max(insets.left, 20),
                paddingRight: Math.max(insets.right, 20),
              },
            ]}
          >
            <View style={styles.dateContent}>
              <View>
                <ThemedText type="title" style={styles.dateText}>
                  {getTodayDate().split("\n")[0]}
                </ThemedText>
                <ThemedText style={styles.dayText}>
                  {getTodayDate().split("\n")[1]}
                </ThemedText>
              </View>
              <Pressable style={styles.addButton}>
                <ThemedText style={styles.addButtonText}>+</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Medicines Timeline */}
          <View
            style={[
              styles.medicinesContainer,
              {
                paddingLeft: Math.max(insets.left, 20),
                paddingRight: Math.max(insets.right, 20),
              },
            ]}
          >
            {medicines.map((medicine, index) => (
              <Animated.View
                key={medicine.id}
                entering={FadeInDown.delay(index * 50).springify()}
              >
                <Pressable
                  onPress={() => handleMedicineToggle(medicine.id)}
                  style={({ pressed }) => [pressed && { opacity: 0.7 }]}
                >
                  <View style={styles.medicineRow}>
                    {/* Time */}
                    <View style={styles.timeColumn}>
                      <ThemedText style={styles.timeText}>
                        {medicine.time}
                      </ThemedText>
                      <View style={styles.timelineDot} />
                    </View>

                    {/* Medicine Card */}
                    <GlassCard style={styles.medicineCard}>
                      <View style={styles.medicineCardContent}>
                        <View style={styles.medicineIcon}>
                          <ThemedText style={styles.medicineIconText}>
                            {medicine.icon}
                          </ThemedText>
                        </View>
                        <View style={styles.medicineInfo}>
                          <ThemedText
                            type="defaultSemiBold"
                            style={styles.medicineName}
                          >
                            {medicine.name}
                          </ThemedText>
                          <ThemedText style={styles.medicineDosage}>
                            {medicine.dosage}
                          </ThemedText>
                        </View>
                      </View>
                    </GlassCard>

                    {/* Checkbox */}
                    <Pressable
                      onPress={() => handleMedicineToggle(medicine.id)}
                      style={styles.checkboxContainer}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          medicine.completed && styles.checkboxCompleted,
                        ]}
                      >
                        {medicine.completed && (
                          <ThemedText style={styles.checkmark}>✓</ThemedText>
                        )}
                      </View>
                    </Pressable>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
          </View>

          {/* Summary */}
          <View
            style={[
              styles.summaryContainer,
              {
                paddingLeft: Math.max(insets.left, 20),
                paddingRight: Math.max(insets.right, 20),
                paddingBottom: Math.max(insets.bottom, 20),
              },
            ]}
          >
            <GlassCard style={styles.summaryCard}>
              <ThemedText style={styles.summaryText}>
                {completedCount} of {medicines.length} medicines taken
              </ThemedText>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(completedCount / medicines.length) * 100}%`,
                    },
                  ]}
                />
              </View>
            </GlassCard>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Celebration Popup */}
      <CelebrationPopup
        visible={showCelebration}
        onDismiss={() => setShowCelebration(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 28,
    lineHeight: 32,
    color: Colors.light.text,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
  },
  headerRight: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    fontSize: 20,
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  dateSection: {
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  dateContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 165, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    lineHeight: 28,
    color: "#FFA500",
    fontWeight: "bold",
  },
  medicinesContainer: {
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  medicineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  timeColumn: {
    width: 50,
    alignItems: "center",
    gap: Spacing.sm,
  },
  timeText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: Colors.light.text,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FFA500",
  },
  medicineCard: {
    flex: 1,
    padding: Spacing.lg,
  },
  medicineCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  medicineIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(255, 165, 0, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  medicineIconText: {
    fontSize: 36,
    lineHeight: 44,
  },
  medicineInfo: {
    flex: 1,
    gap: Spacing.sm,
  },
  medicineName: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
  },
  medicineDosage: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    fontWeight: "600",
  },
  checkboxContainer: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "rgba(255, 165, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#52B788",
    borderColor: "#52B788",
  },
  checkmark: {
    fontSize: 24,
    lineHeight: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  summaryContainer: {
    paddingVertical: Spacing.lg,
  },
  summaryCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  summaryText: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "700",
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 165, 0, 0.1)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFA500",
    borderRadius: 3,
  },
});
