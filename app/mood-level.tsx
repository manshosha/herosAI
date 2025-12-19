import { useRouter } from "expo-router";
import { Image, StyleSheet, View, Pressable, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";

export default function MoodLevelScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSelectLevel = () => {
    router.replace("/(tabs)");
  };

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

        {/* Header with close */}
        <View style={styles.headerRow}>
          <ThemedText style={styles.headerMeta}>
            18 december • Mood check-in
          </ThemedText>
          <Pressable onPress={() => router.replace("/(tabs)")} hitSlop={8}>
            <ThemedText style={styles.closeIcon}>✕</ThemedText>
          </Pressable>
        </View>

        {/* Story-like battery scale */}
        <View style={styles.content}>
          <View style={styles.card}>
            {/* Very low */}
            <View style={styles.row}>
              <ThemedText style={styles.faceIcon}>😞</ThemedText>
              <View style={styles.batteryTrack}>
                <View style={[styles.batteryFill, styles.level1]} />
              </View>
            </View>
            {/* Low */}
            <View style={styles.row}>
              <ThemedText style={styles.faceIcon}>😕</ThemedText>
              <View style={styles.batteryTrack}>
                <View style={[styles.batteryFill, styles.level2]} />
              </View>
            </View>
            {/* Okay */}
            <View style={styles.row}>
              <ThemedText style={styles.faceIcon}>😐</ThemedText>
              <View style={styles.batteryTrack}>
                <View style={[styles.batteryFill, styles.level3]} />
              </View>
            </View>
            {/* Good */}
            <View style={styles.row}>
              <ThemedText style={styles.faceIcon}>🙂</ThemedText>
              <View style={styles.batteryTrack}>
                <View style={[styles.batteryFill, styles.level4]} />
              </View>
            </View>
            {/* Full */}
            <View style={styles.row}>
              <ThemedText style={styles.faceIcon}>😄</ThemedText>
              <View style={styles.batteryTrack}>
                <View style={[styles.batteryFill, styles.level5]} />
              </View>
            </View>
          </View>

          <Pressable
            onPress={handleSelectLevel}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.9 },
            ]}
          >
            <ThemedText style={styles.primaryButtonText}>
              Save today&apos;s mood
            </ThemedText>
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
    justifyContent: "space-between",
    paddingTop: Spacing.lg,
    gap: Spacing.lg,
  },
  card: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  batteryTrack: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.12)",
    backgroundColor: "#F8F8F8",
    overflow: "hidden",
    marginLeft: Spacing.lg,
  },
  batteryFill: {
    height: "100%",
    borderRadius: 10,
  },
  level1: {
    width: "15%",
    backgroundColor: "#F46A4E",
  },
  level2: {
    width: "35%",
    backgroundColor: "#F9A826",
  },
  level3: {
    width: "55%",
    backgroundColor: "#F2D94E",
  },
  level4: {
    width: "75%",
    backgroundColor: "#7ACB6F",
  },
  level5: {
    width: "100%",
    backgroundColor: "#32B262",
  },
  faceIcon: {
    fontSize: 40,
  },
  primaryButton: {
    alignSelf: "stretch",
    marginTop: Spacing.lg,
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


