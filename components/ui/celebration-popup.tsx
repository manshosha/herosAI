import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Pressable, Share, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { triggerHaptic } from "@/utils/haptics";
import * as Linking from "expo-linking";

import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing } from "@/constants/theme";

interface CelebrationPopupProps {
  visible: boolean;
  onDismiss: () => void;
}

const ACHIEVEMENT_MESSAGE =
  "🎉 I just completed all my medications for today! Feeling great with my wellness journey on HerosAI! 💪";

// Confetti particle component
const Confetti = ({ delay }: { delay: number }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Animate confetti falling
    translateY.value = withTiming(600, {
      duration: 2000 + delay * 100,
      easing: Easing.linear,
    });

    opacity.value = withTiming(0, {
      duration: 2000 + delay * 100,
      easing: Easing.linear,
    });

    rotate.value = withTiming(360 * (Math.random() > 0.5 ? 1 : -1), {
      duration: 2000 + delay * 100,
      easing: Easing.linear,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const colors = ["#FFA500", "#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomLeft = Math.random() * 100;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: `${randomLeft}%`,
          top: -20,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: randomColor,
        },
        animatedStyle,
      ]}
    />
  );
};

export function CelebrationPopup({
  visible,
  onDismiss,
}: CelebrationPopupProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (visible) {
      // Trigger haptic feedback
      triggerHaptic.notification();

      // Animate popup entrance
      scale.value = withSpring(1, {
        damping: 8,
        mass: 1,
        stiffness: 100,
      });
      opacity.value = withTiming(1, { duration: 300 });

      // Don't auto-dismiss if share options are shown
      if (!showShareOptions) {
        const timer = setTimeout(() => {
          scale.value = withTiming(0, { duration: 300 });
          opacity.value = withTiming(0, { duration: 300 });
          setTimeout(onDismiss, 300);
        }, 3500);

        return () => clearTimeout(timer);
      }
    } else {
      scale.value = 0;
      opacity.value = 0;
      setShowShareOptions(false);
    }
  }, [visible, showShareOptions]);

  const popupStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleShareWhatsApp = async () => {
    try {
      const encodedMessage = encodeURIComponent(ACHIEVEMENT_MESSAGE);
      const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        setTimeout(() => {
          scale.value = withTiming(0, { duration: 300 });
          opacity.value = withTiming(0, { duration: 300 });
          setTimeout(onDismiss, 300);
        }, 500);
      } else {
        // Fallback to Share API
        await Share.share({
          message: ACHIEVEMENT_MESSAGE,
          title: "My Achievement",
        });
      }
    } catch (error) {
      console.error("Error sharing to WhatsApp:", error);
    }
  };

  const handleShareSMS = async () => {
    try {
      const encodedMessage = encodeURIComponent(ACHIEVEMENT_MESSAGE);
      const smsUrl = `sms:?body=${encodedMessage}`;

      const canOpen = await Linking.canOpenURL(smsUrl);
      if (canOpen) {
        await Linking.openURL(smsUrl);
        setTimeout(() => {
          scale.value = withTiming(0, { duration: 300 });
          opacity.value = withTiming(0, { duration: 300 });
          setTimeout(onDismiss, 300);
        }, 500);
      } else {
        // Fallback to Share API
        await Share.share({
          message: ACHIEVEMENT_MESSAGE,
          title: "My Achievement",
        });
      }
    } catch (error) {
      console.error("Error sharing via SMS:", error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: ACHIEVEMENT_MESSAGE,
        title: "My Achievement",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleClose = () => {
    scale.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    setTimeout(onDismiss, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Confetti background */}
        <View style={styles.confettiContainer}>
          {Array.from({ length: 30 }).map((_, i) => (
            <Confetti key={i} delay={i} />
          ))}
        </View>

        {/* Celebration popup */}
        <Animated.View style={[styles.popup, popupStyle]}>
          {/* Close button */}
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <ThemedText style={styles.closeIcon}>✕</ThemedText>
          </Pressable>

          {/* Trophy icon */}
          <View style={styles.iconContainer}>
            <ThemedText style={styles.trophyEmoji}>🏆</ThemedText>
          </View>

          <ThemedText style={styles.title}>Good Job!</ThemedText>
          <ThemedText style={styles.subtitle}>
            All medications taken for today
          </ThemedText>

          {/* Share button */}
          <Pressable
            onPress={() => setShowShareOptions(!showShareOptions)}
            style={({ pressed }) => [
              styles.shareButton,
              pressed && styles.shareButtonPressed,
            ]}
          >
            <ThemedText style={styles.shareButtonIcon}>↗</ThemedText>
            <ThemedText style={styles.shareButtonText}>
              Share Achievement
            </ThemedText>
          </Pressable>

          {/* Share options */}
          {showShareOptions && (
            <View style={styles.shareOptionsContainer}>
              <Pressable
                onPress={handleShareWhatsApp}
                style={({ pressed }) => [
                  styles.shareOption,
                  styles.whatsappButton,
                  pressed && styles.shareOptionPressed,
                ]}
              >
                <ThemedText style={styles.shareOptionText}>
                  💬 WhatsApp
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={handleShareSMS}
                style={({ pressed }) => [
                  styles.shareOption,
                  styles.smsButton,
                  pressed && styles.shareOptionPressed,
                ]}
              >
                <ThemedText style={styles.shareOptionText}>
                  📱 SMS
                </ThemedText>
              </Pressable>
            </View>
          )}

          {/* Continue button */}
          {!showShareOptions && (
            <Pressable
              onPress={handleClose}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <ThemedText style={styles.buttonText}>Continue</ThemedText>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  confettiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: Spacing.xl,
    alignItems: "center",
    gap: Spacing.md,
    minWidth: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 24,
    lineHeight: 28,
    color: Colors.light.textSecondary,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.md,
  },
  trophyEmoji: {
    fontSize: 48,
    lineHeight: 56,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  shareButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: "rgba(100, 200, 255, 0.2)",
    borderRadius: 12,
    minWidth: 200,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  shareButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  shareButtonIcon: {
    fontSize: 18,
    lineHeight: 22,
  },
  shareButtonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#0066CC",
  },
  shareOptionsContainer: {
    width: "100%",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  shareOption: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  smsButton: {
    backgroundColor: "#007AFF",
  },
  shareOptionPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  shareOptionText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#fff",
  },
  button: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: "#FFA500",
    borderRadius: 12,
    minWidth: 160,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#fff",
  },
});
