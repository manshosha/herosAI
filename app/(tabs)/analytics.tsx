import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

const STATS = [
  { label: "Total Tasks", value: "24", change: "+12%" },
  { label: "Completion Rate", value: "75%", change: "+5%" },
  { label: "Streak Days", value: "0", change: "0%" },
];

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 20) + Spacing.md,
            paddingBottom: Math.max(insets.bottom, 20) + Spacing.xl,
            paddingHorizontal: Spacing.lg,
          },
        ]}
      >
        <ThemedText type="title" style={styles.title}>
          Analytics
        </ThemedText>

        <View style={styles.statsGrid}>
          {STATS.map((stat, index) => (
            <GlassCard key={index} style={styles.statCard}>
              <ThemedText style={[styles.statLabel, { color: Colors.light.textSecondary }]}>
                {stat.label}
              </ThemedText>
              <ThemedText type="title" style={styles.statValue}>
                {stat.value}
              </ThemedText>
              <ThemedText style={[styles.statChange, { color: Colors.light.success }]}>
                {stat.change}
              </ThemedText>
            </GlassCard>
          ))}
        </View>

        <GlassCard style={styles.chartCard}>
          <ThemedText type="subtitle">Weekly Progress</ThemedText>
          <View style={styles.chartPlaceholder}>
            <ThemedText style={{ color: Colors.light.textSecondary }}>
              Chart coming soon
            </ThemedText>
          </View>
        </GlassCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { gap: Spacing.xl },
  title: { fontSize: 32, lineHeight: 40 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.md },
  statCard: { flex: 1, minWidth: 100, padding: Spacing.lg, gap: Spacing.xs },
  statLabel: { fontSize: 13, lineHeight: 18 },
  statValue: { fontSize: 28, lineHeight: 36 },
  statChange: { fontSize: 14, lineHeight: 20, fontWeight: "600" },
  chartCard: { padding: Spacing.xl, gap: Spacing.lg },
  chartPlaceholder: { height: 200, justifyContent: "center", alignItems: "center", backgroundColor: Colors.light.surfaceSecondary, borderRadius: BorderRadius.medium },
});
