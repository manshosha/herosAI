import { useRouter } from "expo-router";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const orbScale = useSharedValue(1);

  // Breathing animation for the orb
  useEffect(() => {
    orbScale.value = withRepeat(
      withTiming(1.05, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const orbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
  }));

  const handleGetStarted = () => {
    router.push("/onboarding/q1-name" as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.xl,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.xl,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        {/* Hero Section with Animated Gradient Circle */}
        <View style={styles.orbContainer}>
          <Animated.View style={[orbAnimatedStyle]}>
            <LinearGradient
              colors={[Colors.light.tintLight, Colors.light.tint, Colors.light.secondaryTeal]}
              style={styles.orb}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>
        </View>

        {/* Welcome Content */}
        <View style={styles.contentContainer}>
          <ThemedText type="title" style={styles.title}>
            Welcome to HerosAI
          </ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            Your personalized rehabilitation companion
          </ThemedText>
        </View>

        {/* Benefits Cards with Icons */}
        <View style={styles.benefitsContainer}>
          <GlassCard style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <LinearGradient
                colors={["rgba(124, 58, 237, 0.2)", "rgba(167, 139, 250, 0.1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.benefitIconBackground}
              >
                <ThemedText style={styles.benefitEmoji}>🎯</ThemedText>
              </LinearGradient>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.benefitTitle}>
              Personalized Goals
            </ThemedText>
            <ThemedText
              style={[
                styles.benefitText,
                {
                  color: Colors.light.textSecondary,
                },
              ]}
            >
              Choose from 8 rehabilitation goals tailored to your needs
            </ThemedText>
          </GlassCard>

          <GlassCard style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <LinearGradient
                colors={["rgba(59, 130, 246, 0.2)", "rgba(147, 197, 253, 0.1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.benefitIconBackground}
              >
                <ThemedText style={styles.benefitEmoji}>📋</ThemedText>
              </LinearGradient>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.benefitTitle}>
              Structured Milestones
            </ThemedText>
            <ThemedText
              style={[
                styles.benefitText,
                {
                  color: Colors.light.textSecondary,
                },
              ]}
            >
              Clear progress markers with specific tasks and exercises
            </ThemedText>
          </GlassCard>

          <GlassCard style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <LinearGradient
                colors={["rgba(20, 184, 166, 0.2)", "rgba(153, 246, 228, 0.1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.benefitIconBackground}
              >
                <ThemedText style={styles.benefitEmoji}>✅</ThemedText>
              </LinearGradient>
            </View>
            <ThemedText type="defaultSemiBold" style={styles.benefitTitle}>
              Daily Tasks
            </ThemedText>
            <ThemedText
              style={[
                styles.benefitText,
                {
                  color: Colors.light.textSecondary,
                },
              ]}
            >
              Exercises, podcasts, and games designed for your recovery
            </ThemedText>
          </GlassCard>
        </View>

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <ThemedText
            style={[
              styles.ctaText,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            Let's start your rehabilitation journey and achieve your goals together.
          </ThemedText>
        </View>
      </ScrollView>

      {/* Button */}
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
        <PrimaryButton label="Get Started" onPress={handleGetStarted} />
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
  orbContainer: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  orb: {
    width: 160,
    height: 160,
    borderRadius: 80,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  contentContainer: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  benefitsContainer: {
    gap: Spacing.md,
  },
  benefitCard: {
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  benefitIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.large,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  benefitIconBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  benefitEmoji: {
    fontSize: 32,
    lineHeight: 40,
  },
  benefitTitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  benefitText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  ctaContainer: {
    paddingHorizontal: Spacing.md,
  },
  ctaText: {
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
