import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/hooks/use-auth";
import { useOnboardingState } from "@/hooks/use-onboarding-state";

const SETTINGS = [
  { icon: "house.fill", label: "Personal Information", route: "/settings/personal" },
  { icon: "house.fill", label: "Notifications", route: "/settings/notifications" },
  { icon: "house.fill", label: "Privacy", route: "/settings/privacy" },
  { icon: "house.fill", label: "Help & Support", route: "/settings/help" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { universal } = useOnboardingState();
  
  // Get medications from onboarding data - check both stroke and parkinsons answers
  // For now, we'll display a generic medications section
  const hasMedications = true; // Always show the section since medications were part of onboarding

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
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <ThemedText style={styles.avatarText}>
              {user?.name?.[0] || "U"}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.name}>
            {user?.name || "User"}
          </ThemedText>
          <ThemedText style={[styles.email, { color: Colors.light.textSecondary }]}>
            {user?.email || "user@example.com"}
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <GlassCard style={styles.statCard}>
            <ThemedText type="title" style={styles.statValue}>
              0
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: Colors.light.textSecondary }]}>
              Days Active
            </ThemedText>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <ThemedText type="title" style={styles.statValue}>
              0
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: Colors.light.textSecondary }]}>
              Tasks Done
            </ThemedText>
          </GlassCard>
        </View>



        <View style={styles.settingsContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Settings
          </ThemedText>
          <GlassCard style={styles.settingsCard}>
            {SETTINGS.map((setting, index) => (
              <Pressable
                key={index}
                style={[
                  styles.settingItem,
                  index < SETTINGS.length - 1 && styles.settingItemBorder,
                ]}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <IconSymbol name={setting.icon as any} size={20} color={Colors.light.tint} />
                  </View>
                  <ThemedText>{setting.label}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={20} color={Colors.light.textSecondary} />
              </Pressable>
            ))}
          </GlassCard>

          <Pressable style={styles.logoutButton} onPress={logout}>
            <ThemedText style={styles.logoutText}>Log Out</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { gap: Spacing.xl },
  profileHeader: { alignItems: "center", gap: Spacing.sm },
  avatar: { width: 80, height: 80, borderRadius: BorderRadius.round, backgroundColor: Colors.light.tint, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 32, lineHeight: 40, color: "#fff", fontWeight: "bold" },
  name: { fontSize: 24, lineHeight: 32 },
  email: { fontSize: 15, lineHeight: 22 },
  statsContainer: { flexDirection: "row", gap: Spacing.md },
  statCard: { flex: 1, padding: Spacing.lg, alignItems: "center", gap: Spacing.xs },
  statValue: { fontSize: 28, lineHeight: 36 },
  statLabel: { fontSize: 13, lineHeight: 18 },
  medicinesContainer: { gap: Spacing.md },
  medicinesCard: { padding: Spacing.sm },
  medicineItem: { flexDirection: "row", alignItems: "flex-start", paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm, gap: Spacing.md },
  medicineIcon: { width: 40, height: 40, borderRadius: BorderRadius.small, backgroundColor: Colors.light.surfaceSecondary, justifyContent: "center", alignItems: "center" },
  medicineIconText: { fontSize: 20 },
  medicineInfo: { flex: 1, gap: Spacing.xs },
  medicineName: { fontSize: 16, lineHeight: 24, fontWeight: "600" },
  medicineDetail: { fontSize: 13, lineHeight: 18 },
  emptyMedicinesCard: { padding: Spacing.lg, alignItems: "center" },
  emptyText: { fontSize: 14, lineHeight: 20 },
  settingsContainer: { gap: Spacing.md },
  sectionTitle: { fontSize: 20, lineHeight: 28 },
  settingsCard: { padding: Spacing.sm },
  settingItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: Spacing.md, paddingHorizontal: Spacing.sm },
  settingItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.light.borderLight },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  settingIcon: { width: 36, height: 36, borderRadius: BorderRadius.small, backgroundColor: Colors.light.surfaceSecondary, justifyContent: "center", alignItems: "center" },
  logoutButton: { marginTop: Spacing.lg, padding: Spacing.lg, backgroundColor: Colors.light.error + "15", borderRadius: BorderRadius.medium, alignItems: "center" },
  logoutText: { color: Colors.light.error, fontSize: 16, lineHeight: 24, fontWeight: "600" },
});
