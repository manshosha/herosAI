import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Modal,
  StatusBar,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-text";
import { Task } from "@/data/goals";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const STORY_DURATION = 5000; // 5 seconds per story

// Story content mapping based on task type
const STORY_IMAGES: Record<string, any[]> = {
  ot_exercise: [
    require("@/assets/images/story-ot-1.png"),
    require("@/assets/images/story-ot-2.png"),
  ],
  pt_exercise: [
    require("@/assets/images/story-pt-1.png"),
    require("@/assets/images/story-pt-2.png"),
  ],
  podcast: [require("@/assets/images/story-podcast-1.png")],
  meditation: [require("@/assets/images/story-meditation-1.png")],
  game: [require("@/assets/images/story-game-1.png")],
  speech_exercise: [require("@/assets/images/story-ot-1.png")], // Fallback
};

// Story content for each task type
const STORY_CONTENT: Record<
  string,
  { title: string; subtitle: string; description: string }[]
> = {
  ot_exercise: [
    {
      title: "Ready to Practice?",
      subtitle: "Occupational Therapy",
      description:
        "This exercise helps improve your daily living skills and hand coordination.",
    },
    {
      title: "Let's Begin!",
      subtitle: "Focus on Control",
      description:
        "Take your time with each movement. Quality matters more than speed.",
    },
  ],
  pt_exercise: [
    {
      title: "Time to Move!",
      subtitle: "Physical Therapy",
      description:
        "This exercise strengthens your muscles and improves balance.",
    },
    {
      title: "Stay Steady",
      subtitle: "Safety First",
      description:
        "Hold onto a sturdy surface if needed. Listen to your body.",
    },
  ],
  podcast: [
    {
      title: "Time to Listen",
      subtitle: "Wellness Podcast",
      description:
        "Relax and learn valuable insights for your recovery journey.",
    },
  ],
  meditation: [
    {
      title: "Find Your Calm",
      subtitle: "Guided Meditation",
      description:
        "Take a moment to breathe deeply and center yourself.",
    },
  ],
  game: [
    {
      title: "Brain Training",
      subtitle: "Cognitive Exercise",
      description:
        "Challenge your mind with this fun cognitive rehabilitation game.",
    },
  ],
  speech_exercise: [
    {
      title: "Voice Practice",
      subtitle: "Speech Therapy",
      description:
        "Strengthen your communication skills with guided exercises.",
    },
  ],
};

interface ExerciseStoriesProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
  onStartExercise: () => void;
}

export function ExerciseStories({
  visible,
  onClose,
  task,
  onStartExercise,
}: ExerciseStoriesProps) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const taskType = task.type || "ot_exercise";
  const images = STORY_IMAGES[taskType] || STORY_IMAGES.ot_exercise;
  const content = STORY_CONTENT[taskType] || STORY_CONTENT.ot_exercise;
  const totalStories = Math.max(images.length, content.length);

  // Reset when modal opens
  useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      progress.value = 0;
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [visible]);

  // Start progress timer
  const startTimer = () => {
    stopTimer();
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: STORY_DURATION,
      easing: Easing.linear,
    });

    timerRef.current = setTimeout(() => {
      goToNext();
    }, STORY_DURATION);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goToNext = () => {
    if (currentIndex < totalStories - 1) {
      setCurrentIndex((prev) => prev + 1);
      progress.value = 0;
      startTimer();
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    } else {
      // End of stories - show start button
      stopTimer();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      progress.value = 0;
      startTimer();
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleTap = (x: number) => {
    const isLeftSide = x < SCREEN_WIDTH / 3;
    if (isLeftSide) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  const handleClose = () => {
    stopTimer();
    onClose();
  };

  const handleStartExercise = () => {
    stopTimer();
    onStartExercise();
  };

  // Swipe gesture
  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationY > 100) {
        runOnJS(handleClose)();
      }
    });

  // Progress bar animation
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const currentContent = content[Math.min(currentIndex, content.length - 1)];
  const currentImage = images[Math.min(currentIndex, images.length - 1)];
  const isLastStory = currentIndex === totalStories - 1;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <StatusBar barStyle="light-content" />
      <GestureDetector gesture={swipeGesture}>
        <View style={styles.container}>
          {/* Background Image */}
          <Image
            source={currentImage}
            style={styles.backgroundImage}
            contentFit="cover"
          />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent", "rgba(0,0,0,0.8)"]}
            locations={[0, 0.3, 1]}
            style={styles.gradient}
          />

          {/* Progress Bars */}
          <View style={[styles.progressContainer, { top: insets.top + 10 }]}>
            {Array.from({ length: totalStories }).map((_, index) => (
              <View key={index} style={styles.progressBarBg}>
                {index < currentIndex ? (
                  <View style={[styles.progressBarFill, { width: "100%" }]} />
                ) : index === currentIndex ? (
                  <Animated.View style={[styles.progressBarFill, progressStyle]} />
                ) : null}
              </View>
            ))}
          </View>

          {/* Close Button */}
          <Pressable
            style={[styles.closeButton, { top: insets.top + 40 }]}
            onPress={handleClose}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>

          {/* Tap Areas */}
          <Pressable
            style={styles.tapArea}
            onPress={(e) => handleTap(e.nativeEvent.locationX)}
          />

          {/* Content */}
          <View style={[styles.contentContainer, { paddingBottom: insets.bottom + 100 }]}>
            <ThemedText style={styles.subtitle}>{currentContent.subtitle}</ThemedText>
            <ThemedText style={styles.title}>{currentContent.title}</ThemedText>
            <ThemedText style={styles.description}>
              {currentContent.description}
            </ThemedText>

            {/* Task Info */}
            <View style={styles.taskInfo}>
              <ThemedText style={styles.taskName}>{task.title}</ThemedText>
              <ThemedText style={styles.taskDuration}>{task.duration} min</ThemedText>
            </View>
          </View>

          {/* Start Button (shown on last story) */}
          {isLastStory && (
            <View style={[styles.startButtonContainer, { bottom: insets.bottom + 20 }]}>
              <Pressable style={styles.startButton} onPress={handleStartExercise}>
                <ThemedText style={styles.startButtonText}>
                  Start {taskType.includes("exercise") ? "Exercise" : "Activity"}
                </ThemedText>
              </Pressable>
            </View>
          )}

          {/* Navigation Hint */}
          {!isLastStory && (
            <View style={[styles.hintContainer, { bottom: insets.bottom + 30 }]}>
              <ThemedText style={styles.hintText}>Tap to continue</ThemedText>
            </View>
          )}
        </View>
      </GestureDetector>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  progressContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    gap: 4,
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    zIndex: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  tapArea: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    zIndex: 15,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    lineHeight: 42,
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 24,
    marginBottom: 24,
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  taskDuration: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B5CF6",
  },
  startButtonContainer: {
    position: "absolute",
    left: 24,
    right: 24,
    zIndex: 20,
  },
  startButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  hintContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 15,
  },
  hintText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
});
