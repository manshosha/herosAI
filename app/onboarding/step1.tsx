import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { RadioButton } from "@/components/ui/radio-button";
import { Colors, Spacing } from "@/constants/theme";

const conditionTypes = [
  { id: "stroke", label: "Stroke Recovery" },
  { id: "injury", label: "Injury Rehabilitation" },
  { id: "surgery", label: "Post-Surgery Recovery" },
  { id: "neurological", label: "Neurological Condition" },
  { id: "other", label: "Other" },
];

export default function Step1Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [conditionType, setConditionType] = useState<string | null>(null);

  const handleNext = () => {
    if (name.trim() && conditionType) {
      // TODO: Save user profile data
      router.push("/onboarding/goal-selection" as any);
    }
  };

  const isValid = name.trim().length > 0 && conditionType;

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
                  width: "25%",
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
            1 of 2
          </ThemedText>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <ThemedText type="title">Let's Get Started</ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              {
                color: Colors.light.textSecondary,
              },
            ]}
          >
            Tell us a bit about yourself
          </ThemedText>
        </View>

        {/* Name Input */}
        <View style={styles.formGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            What's your name?
          </ThemedText>
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
          />
        </View>

        {/* Condition Type */}
        <View style={styles.formGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            What type of rehabilitation are you working on?
          </ThemedText>
          <View style={styles.optionsContainer}>
            {conditionTypes.map((option) => (
              <RadioButton
                key={option.id}
                label={option.label}
                selected={conditionType === option.id}
                onPress={() => setConditionType(option.id)}
              />
            ))}
          </View>
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
        <PrimaryButton label="Next" onPress={handleNext} disabled={!isValid} />
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
  titleContainer: {
    gap: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  formGroup: {
    gap: Spacing.md,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
