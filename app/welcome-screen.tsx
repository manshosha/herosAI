import { useRouter } from "expo-router";
import { StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing } from "@/constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/onboarding/welcome" as any);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Background Gradient Circle */}
      <Animated.View entering={FadeIn.duration(1000)} style={styles.backgroundCircle}>
        <LinearGradient
          colors={["#7C3AED", "#A78BFA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCircle}
        />
      </Animated.View>

      {/* Content */}
      <View
        style={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20),
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        {/* Header Section */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.headerSection}
        >
          <ThemedText type="title" style={styles.title}>
            Welcome to HerosAI
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Your personalized rehabilitation companion
          </ThemedText>
        </Animated.View>

        {/* Features Section */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles.featuresSection}
        >
          {/* Feature 1: Personalized Goals */}
          <GlassCard style={styles.featureCard}>
            <View style={styles.featureContent}>
              <ThemedText style={styles.featureIcon}>🎯</ThemedText>
              <View style={styles.featureText}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  Personalized Goals
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Choose from 8 rehabilitation goals tailored to your needs
                </ThemedText>
              </View>
            </View>
          </GlassCard>

          {/* Feature 2: Structured Milestones */}
          <GlassCard style={styles.featureCard}>
            <View style={styles.featureContent}>
              <ThemedText style={styles.featureIcon}>📋</ThemedText>
              <View style={styles.featureText}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  Structured Milestones
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Clear progress markers with specific tasks and exercises
                </ThemedText>
              </View>
            </View>
          </GlassCard>

          {/* Feature 3: Task Tracking */}
          <GlassCard style={styles.featureCard}>
            <View style={styles.featureContent}>
              <ThemedText style={styles.featureIcon}>✅</ThemedText>
              <View style={styles.featureText}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  Task Tracking
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  OT exercises, speech therapy, games, and wellness content
                </ThemedText>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          style={styles.buttonContainer}
        >
          <PrimaryButton label="Get Started" onPress={handleGetStarted} />
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  backgroundCircle: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    zIndex: 0,
  },
  gradientCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 150,
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    zIndex: 1,
  },
  headerSection: {
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.textSecondary,
  },
  featuresSection: {
    gap: Spacing.md,
    flex: 1,
    justifyContent: "center",
    marginVertical: Spacing.xl,
  },
  featureCard: {
    padding: Spacing.md,
  },
  featureContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  featureIcon: {
    fontSize: 32,
    lineHeight: 40,
    marginTop: Spacing.xs,
  },
  featureText: {
    flex: 1,
    gap: Spacing.xs,
  },
  featureTitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
  buttonContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
});
