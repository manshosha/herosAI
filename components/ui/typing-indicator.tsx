import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function TypingIndicator() {
  const colorScheme = useColorScheme();
  const dot1 = useSharedValue(1);
  const dot2 = useSharedValue(1);
  const dot3 = useSharedValue(1);

  useEffect(() => {
    // Staggered bounce animation for each dot
    dot1.value = withRepeat(
      withTiming(0.5, { duration: 400 }),
      -1,
      true,
    );

    dot2.value = withDelay(
      150,
      withRepeat(
        withTiming(0.5, { duration: 400 }),
        -1,
        true,
      ),
    );

    dot3.value = withDelay(
      300,
      withRepeat(
        withTiming(0.5, { duration: 400 }),
        -1,
        true,
      ),
    );
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1.value,
    transform: [{ scale: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2.value,
    transform: [{ scale: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3.value,
    transform: [{ scale: dot3.value }],
  }));

  const dotColor = colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { backgroundColor: dotColor }, dot1Style]} />
      <Animated.View style={[styles.dot, { backgroundColor: dotColor }, dot2Style]} />
      <Animated.View style={[styles.dot, { backgroundColor: dotColor }, dot3Style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.xs,
    padding: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
