import { useEffect } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasSeenWelcome = await AsyncStorage.getItem("@welcome_screen_seen");
        const hasCompletedOnboarding = await AsyncStorage.getItem("@onboarding_completed");
        
        // First time: show welcome screen
        if (hasSeenWelcome !== "true") {
          router.replace("/welcome-screen" as any);
        }
        // Second time: show onboarding
        else if (hasCompletedOnboarding !== "true") {
          router.replace("/onboarding/welcome" as any);
        }
        // Already completed: show main app
        else {
          router.replace("/(tabs)/" as any);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        // Default to welcome screen if there's an error
        router.replace("/welcome-screen" as any);
      }
    };

    // Delay navigation to ensure root layout is mounted
    const timer = setTimeout(checkOnboarding, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
