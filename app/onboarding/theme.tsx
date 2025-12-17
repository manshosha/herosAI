import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const themeOptions = [
  {
    id: "mindfulness",
    label: "Mindfulness",
    colors: ["#8B7FE8", "#B8A8F9"],
    icon: "🧘‍♀️",
  },
  {
    id: "vitality",
    label: "Vitality",
    colors: ["#6EC5B8", "#8FD9CC"],
    icon: "🌱",
  },
  {
    id: "balance",
    label: "Balance",
    colors: ["#A8D5E2", "#C4E5F0"],
    icon: "⚖️",
  },
  {
    id: "strength",
    label: "Strength",
    colors: ["#FF9A6C", "#FFB894"],
    icon: "💪",
  },
];

export default function ThemeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (themeId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(themeId);
  };

  const handleComplete = () => {
    if (selected) {
      router.push("/onboarding/summary" as any);
    }
  };

  const tintColor = colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

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
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: "100%",
                  backgroundColor: tintColor,
                },
              ]}
            />
          </View>
          <ThemedText
            style={[
              styles.progressText,
              {
                color:
                  colorScheme === "dark" ? Colors.dark.textSecondary : Colors.light.textSecondary,
              },
            ]}
          >
            4 of 4
          </ThemedText>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <ThemedText type="subtitle" style={styles.question}>
            Pick your journey theme
          </ThemedText>
        </View>

        {/* Theme Cards */}
        <View style={styles.themesContainer}>
          {themeOptions.map((theme) => (
            <Pressable
              key={theme.id}
              onPress={() => handleSelect(theme.id)}
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <View
                style={[
                  styles.themeCard,
                  selected === theme.id && {
                    borderColor: tintColor,
                    borderWidth: 3,
                  },
                ]}
              >
                <LinearGradient
                  colors={theme.colors as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradient}
                >
                  <View style={styles.themeContent}>
                    <ThemedText style={styles.themeIcon}>{theme.icon}</ThemedText>
                    <ThemedText type="subtitle" style={styles.themeLabel}>
                      {theme.label}
                    </ThemedText>
                  </View>
                </LinearGradient>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
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
        <PrimaryButton label="Complete Setup" onPress={handleComplete} disabled={!selected} />
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
    marginTop: Spacing.md,
  },
  question: {
    marginBottom: Spacing.sm,
  },
  themesContainer: {
    gap: Spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
  themeCard: {
    height: 200,
    borderRadius: BorderRadius.large,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  gradient: {
    flex: 1,
  },
  themeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  themeIcon: {
    fontSize: 48,
    lineHeight: 56,
  },
  themeLabel: {
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(139, 127, 232, 0.1)",
  },
});
