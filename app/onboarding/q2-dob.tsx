import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { DatePicker } from "@/components/ui/date-picker";
import { Colors, Spacing } from "@/constants/theme";

export default function Q2DOBScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const handleNext = () => {
    if (dateOfBirth) {
      // TODO: Save to onboarding state
      router.push("/onboarding/q3-condition" as any);
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
            <View
              style={[
                styles.progressFill,
                {
                  width: "14%",
                  backgroundColor: Colors.light.tint,
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
            Question 2 of 14
          </ThemedText>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText type="title">When were you born?</ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            This helps us tailor exercises to your age and abilities
          </ThemedText>
        </View>

        {/* Date Picker */}
        <View style={styles.pickerContainer}>
          <DatePicker
            value={dateOfBirth}
            onChange={setDateOfBirth}
            label="Date of Birth"
          />
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
        <PrimaryButton label="Next" onPress={handleNext} disabled={!dateOfBirth} />
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
    height: 4,
    backgroundColor: "rgba(139, 127, 232, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    lineHeight: 20,
  },
  questionContainer: {
    gap: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  pickerContainer: {
    gap: Spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
