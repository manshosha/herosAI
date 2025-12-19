import { useRouter } from "expo-router";
import { StyleSheet, View, Pressable, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";

export default function MoodCheckInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: Math.max(insets.bottom, 24),
            paddingHorizontal: Spacing.lg,
          },
        ]}
      >
        {/* Top drag handle */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        {/* Header meta + close */}
        <View style={styles.headerRow}>
          <ThemedText style={styles.headerMeta}>
            18 december • Mood check-in
          </ThemedText>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <ThemedText style={styles.closeIcon}>✕</ThemedText>
          </Pressable>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <ThemedText style={styles.title}>
            How are you{"\n"}feeling today?
          </ThemedText>

          <View style={styles.illustration}>
            <ThemedText style={styles.illustrationEmoji}>🔋</ThemedText>
          </View>

          <Pressable
            onPress={() => router.push("/mood-level")}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <ThemedText style={styles.primaryButtonText}>I'm ready</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3F0",
  },
  safeArea: {
    flex: 1,
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  handle: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  headerMeta: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
  closeIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: Colors.light.text,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Spacing.xl,
    gap: Spacing.xl,
  },
  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    textAlign: "center",
    color: "#2E3A59",
  },
  illustration: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#E3F1EA",
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationEmoji: {
    fontSize: 80,
    lineHeight: 88,
  },
  primaryButton: {
    marginTop: Spacing.xl,
    alignSelf: "stretch",
    marginHorizontal: 16,
    paddingVertical: Spacing.md * 1.2,
    borderRadius: 20,
    backgroundColor: "#F2AE4B",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
});

