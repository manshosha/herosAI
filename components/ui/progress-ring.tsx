import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type ProgressRingProps = {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
};

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 12,
  showPercentage = true,
}: ProgressRingProps) {
  const colorScheme = useColorScheme();
  const animatedProgress = useSharedValue(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - animatedProgress.value * circumference;
    return {
      strokeDashoffset,
    };
  });

  const progressColor = colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint;
  const backgroundColor = colorScheme === "dark" ? Colors.dark.border : Colors.light.border;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <AnimatedCircle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {showPercentage && (
        <View style={styles.percentageContainer}>
          <ThemedText type="subtitle">{Math.round(progress * 100)}%</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
