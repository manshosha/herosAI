import { useRouter } from "expo-router";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlassCard } from "@/components/ui/glass-card";
import { RadioButton } from "@/components/ui/radio-button";
import { Colors, Spacing } from "@/constants/theme";
import { useOnboardingState } from "@/hooks/use-onboarding-state";

const OPTIONS = [
  {
    "value": "yes",
    "label": "Yes, I love it!",
    "description": "Music motivates me"
  },
  {
    "value": "maybe",
    "label": "Maybe, I'll try",
    "description": "Open to trying"
  },
  {
    "value": "no",
    "label": "No, not really",
    "description": "Prefer without music"
  }
];

export default function Q11MusicScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { strokeAnswers, updateStrokeAnswers } = useOnboardingState();

  const handleSelect = (value: string) => {
    updateStrokeAnswers({ musicPreference: value as any });
  };

  const handleContinue = () => {
    router.push("/onboarding/q12-reminders" as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.lg,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.xl,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          },
        ]}
      >
        <View style={styles.progressContainer}>
          <ThemedText style={[styles.progressText, { color: Colors.light.textSecondary }]}>
            Question 11 of 14
          </ThemedText>
        </View>

        <View style={styles.questionContainer}>
          <ThemedText type="title" style={styles.question}>
            Do you enjoy music or rhythm?
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: Colors.light.textSecondary }]}>
            Music can enhance rehabilitation exercises
          </ThemedText>
        </View>

        <View style={styles.optionsContainer}>
          {OPTIONS.map((option) => (
            <GlassCard
              key={option.value}
              style={[
                styles.optionCard,
                strokeAnswers.musicPreference === option.value && {
                  borderColor: Colors.light.tint,
                  borderWidth: 2,
                },
              ]}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionText}>
                  <ThemedText type="defaultSemiBold">{option.label}</ThemedText>
                  <ThemedText style={[styles.optionDescription, { color: Colors.light.textSecondary }]}>
                    {option.description}
                  </ThemedText>
                </View>
                <RadioButton label="" selected={strokeAnswers.musicPreference === option.value} onPress={() => handleSelect(option.value)} />
              </View>
            </GlassCard>
          ))}
        </View>
      </ScrollView>

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
        <PrimaryButton label="Continue" onPress={handleContinue} disabled={!strokeAnswers.musicPreference} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { gap: Spacing.xl },
  progressContainer: { alignItems: "center" },
  progressText: { fontSize: 14, lineHeight: 20 },
  questionContainer: { gap: Spacing.sm },
  question: { fontSize: 28, lineHeight: 36 },
  subtitle: { fontSize: 16, lineHeight: 24 },
  optionsContainer: { gap: Spacing.md },
  optionCard: { paddingVertical: Spacing.lg },
  optionContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: Spacing.md },
  optionText: { flex: 1, gap: Spacing.xs },
  optionDescription: { fontSize: 14, lineHeight: 20 },
  buttonContainer: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.borderLight },
});
