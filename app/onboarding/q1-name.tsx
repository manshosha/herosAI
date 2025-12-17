import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

export default function Q1NameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");

  const handleNext = () => {
    if (name.trim()) {
      // TODO: Save to onboarding state
      router.push("/onboarding/q2-dob" as any);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.lg,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.lg,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={[Colors.light.tint, Colors.light.secondaryTeal]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressFill,
                {
                  width: "7%",
                },
              ]}
            />
          </View>
          <ThemedText
            style={[
              styles.progressText,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            Question 1 of 14
          </ThemedText>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText type="title">What's your name?</ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            This helps us personalize your rehabilitation experience
          </ThemedText>
        </View>

        {/* Input Container with Glass Effect */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors.light.surface,
                  color: Colors.light.text,
                  borderColor: Colors.light.border,
                },
              ]}
              placeholder="Enter your name"
              placeholderTextColor={Colors.light.textDisabled}
              value={name}
              onChangeText={setName}
              autoFocus
            />
            {name.length > 0 && (
              <View style={styles.inputIcon}>
                <ThemedText style={styles.checkmark}>✓</ThemedText>
              </View>
            )}
          </View>
        </View>

        {/* Helpful Text */}
        {name.length > 0 && (
          <View style={styles.helperContainer}>
            <ThemedText
              style={[
                styles.helperText,
                {
                  color: Colors.light.success,
                },
              ]}
            >
              Great! Let's continue with your profile.
            </ThemedText>
          </View>
        )}
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
        <PrimaryButton label="Next" onPress={handleNext} disabled={!name.trim()} />
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
  progressContainer: {
    gap: Spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(139, 127, 232, 0.15)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  questionContainer: {
    gap: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    gap: Spacing.md,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 56,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingRight: 48,
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1.5,
  },
  inputIcon: {
    position: "absolute",
    right: Spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 20,
    lineHeight: 24,
    color: Colors.light.success,
    fontWeight: "600",
  },
  helperContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: BorderRadius.medium,
    borderLeftWidth: 3,
    borderLeftColor: Colors.light.success,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
