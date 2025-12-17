import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOnboardingState } from "@/hooks/use-onboarding-state";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing } from "@/constants/theme";

export default function SummaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const confettiRef = useRef<any>(null);
  const onboardingState = useOnboardingState();

  useEffect(() => {
    // Trigger confetti on mount
    if (confettiRef.current) {
      confettiRef.current.start();
    }
  }, []);

  const handleStart = async () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Save onboarding data
      await AsyncStorage.setItem("@onboarding_data", JSON.stringify(onboardingState.universal));
      await AsyncStorage.setItem("@welcome_screen_seen", "true");
      await AsyncStorage.setItem("@onboarding_completed", "true");
      
      setTimeout(() => {
        router.replace("/(tabs)/" as any);
      }, 500);
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ConfettiCannon
        ref={confettiRef}
        count={100}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut={true}
        explosionSpeed={350}
        fallSpeed={2500}
        colors={[
          Colors.light.tint,
          Colors.light.secondary,
          Colors.light.tertiary,
          "#FF9A6C",
          "#FFD700",
        ]}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.xl,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.lg,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <ThemedText style={styles.emoji}>🎉</ThemedText>
          <ThemedText type="title" style={styles.title}>
            Your journey begins!
          </ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            You're all set to start your wellness journey
          </ThemedText>
        </View>

        {/* Summary Card */}
        <GlassCard style={styles.summaryCard}>
          <View style={styles.summarySection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Your Rehabilitation Goals
            </ThemedText>
            <View style={styles.goalsList}>
              <View style={styles.goalItem}>
                <ThemedText style={styles.goalIcon}>🏠</ThemedText>
                <ThemedText>Home Care Independence</ThemedText>
              </View>
              <View style={styles.goalItem}>
                <ThemedText style={styles.goalIcon}>💬</ThemedText>
                <ThemedText>Communication Skills</ThemedText>
              </View>
              <View style={styles.goalItem}>
                <ThemedText style={styles.goalIcon}>💪</ThemedText>
                <ThemedText>Strength & Endurance</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.summarySection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Daily Tasks
            </ThemedText>
            <ThemedText
              style={{
                color: Colors.light.textSecondary,
              }}
            >
              Exercises, games, and podcasts tailored to your goals
            </ThemedText>
          </View>

          <View style={styles.divider} />

          <View style={styles.summarySection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Your Progress
            </ThemedText>
            <ThemedText
              style={{
                color: Colors.light.textSecondary,
              }}
            >
              Track milestones and celebrate achievements
            </ThemedText>
          </View>
        </GlassCard>

        {/* Motivational Message */}
        <View style={styles.messageContainer}>
          <ThemedText
            style={[
              styles.message,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            Your rehabilitation journey starts now. Let's work together toward your goals, one milestone at a time.
          </ThemedText>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: Math.max(insets.bottom, 20),
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        <PrimaryButton label="Start My Journey" onPress={handleStart} />
      </View>
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
  content: {
    gap: Spacing.xl,
  },
  titleContainer: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  emoji: {
    fontSize: 64,
    lineHeight: 72,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  summaryCard: {
    gap: Spacing.lg,
  },
  summarySection: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
  goalsList: {
    gap: Spacing.sm,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  goalIcon: {
    fontSize: 20,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(139, 127, 232, 0.2)",
  },
  themePreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  themeColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  messageContainer: {
    paddingHorizontal: Spacing.md,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
