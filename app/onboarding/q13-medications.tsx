import { useRouter } from "expo-router";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Colors, Spacing } from "@/constants/theme";
import { useOnboardingState } from "@/hooks/use-onboarding-state";

export default function Q13MedicationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    router.push("/onboarding/q14-emotional" as any);
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
            Question 13 of 14
          </ThemedText>
        </View>

        <View style={styles.questionContainer}>
          <ThemedText type="title" style={styles.question}>
            Medication Tracking
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: Colors.light.textSecondary }]}>
            You can add your medications later in the Profile section if needed
          </ThemedText>
        </View>

        <GlassCard style={styles.infoCard}>
          <ThemedText style={{ color: Colors.light.textSecondary, fontSize: 15, lineHeight: 22 }}>
            💊 Track your medications to help coordinate exercise timing and physician reports
          </ThemedText>
        </GlassCard>
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
        <PrimaryButton label="Continue" onPress={handleContinue} />
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
  infoCard: { padding: Spacing.lg },
  buttonContainer: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.borderLight },
});
