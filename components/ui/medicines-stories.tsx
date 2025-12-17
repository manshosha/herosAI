import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  Dimensions,
  PanResponder,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";
import { triggerHaptic } from "@/utils/haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  nextDose: string;
  icon: string;
  color: string;
}

interface MedicinesStoriesProps {
  medicines: Medicine[];
  onComplete: () => void;
}

const STORY_DURATION = 8000; // 8 seconds

export function MedicinesStories({
  medicines,
  onComplete,
}: MedicinesStoriesProps) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressValues = medicines.map(() => useSharedValue(0));
  const [panResponder] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(dx) > threshold) {
          if (dx > 0) {
            // Swiped right - go to previous
            handlePrev();
          } else {
            // Swiped left - go to next
            handleNext();
          }
        }
      },
    })
  );

  // Auto-advance story every 8 seconds
  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => {
      if (currentIndex < medicines.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete();
      }
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, paused, medicines.length, onComplete]);

  // Animate progress bar
  useEffect(() => {
    progressValues[currentIndex].value = 0;
    progressValues[currentIndex].value = withTiming(1, {
      duration: STORY_DURATION,
    });
  }, [currentIndex]);

  const handleNext = () => {
    triggerHaptic.impact();
    if (currentIndex < medicines.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    triggerHaptic.impact();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTookThis = () => {
    triggerHaptic.notification();
    handleNext();
  };

  const currentMedicine = medicines[currentIndex];

  return (
    <ThemedView style={styles.container} {...panResponder.panHandlers}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Progress Bars */}
        <View
          style={[
            styles.progressContainer,
            {
              paddingLeft: Math.max(insets.left, 12),
              paddingRight: Math.max(insets.right, 12),
            },
          ]}
        >
          {medicines.map((_, index) => (
            <View key={index} style={styles.progressBar}>
              <ProgressBarSegment
                progress={progressValues[index]}
                isActive={index === currentIndex}
              />
            </View>
          ))}
        </View>

        {/* Story Content - Centered Card */}
        <Pressable
          onPress={() => setPaused(!paused)}
          style={styles.storyContent}
        >
          <Animated.View
            entering={FadeInDown.springify()}
            style={styles.cardContainer}
          >
            {/* Card Background */}
            <View style={styles.card}>
              {/* Pill Illustration */}
              <View style={styles.pillSection}>
                <View
                  style={[
                    styles.pill,
                    {
                      backgroundColor: currentMedicine.color,
                    },
                  ]}
                >
                  <ThemedText style={styles.pillIcon}>
                    {currentMedicine.icon}
                  </ThemedText>
                </View>
              </View>

              {/* Medicine Info Section */}
              <View style={styles.infoSection}>
                <ThemedText style={styles.medicineName}>
                  {currentMedicine.name}
                </ThemedText>
                <ThemedText style={styles.dosage}>
                  {currentMedicine.dosage}
                </ThemedText>
                <ThemedText style={styles.nextDose}>
                  {currentMedicine.nextDose}
                </ThemedText>
              </View>

              {/* "I took this" Button */}
              <Pressable
                onPress={handleTookThis}
                style={({ pressed }) => [
                  styles.tookThisButton,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <ThemedText style={styles.tookThisText}>I took this</ThemedText>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>

        {/* Navigation Areas */}
        {/* Back/Previous Area */}
        <Pressable
          onPress={handlePrev}
          disabled={currentIndex === 0}
          style={[styles.navArea, { left: 0, opacity: currentIndex === 0 ? 0.3 : 1 }]}
        />

        {/* Next Area */}
        <Pressable
          onPress={handleNext}
          style={[styles.navArea, { right: 0 }]}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

function ProgressBarSegment({
  progress,
  isActive,
}: {
  progress: any;
  isActive: boolean;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.progressBarBackground}>
      <Animated.View
        style={[styles.progressBarFill, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  progressContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  progressBar: {
    flex: 1,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  storyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 320,
  },
  card: {
    backgroundColor: "#F5F1E8",
    borderRadius: 32,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    gap: Spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  pillSection: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.md,
  },
  pill: {
    width: 100,
    height: 160,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  pillIcon: {
    fontSize: 70,
    lineHeight: 78,
  },
  infoSection: {
    alignItems: "center",
    gap: Spacing.xs,
    marginVertical: Spacing.md,
  },
  medicineName: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
  },
  dosage: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "#003366",
    textAlign: "center",
  },
  nextDose: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
    color: "#003366",
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  tookThisButton: {
    backgroundColor: "#F5A623",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    width: "100%",
    marginTop: Spacing.md,
  },
  tookThisText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#003366",
  },
  navArea: {
    position: "absolute",
    top: 0,
    width: "20%",
    height: "100%",
  },
});
