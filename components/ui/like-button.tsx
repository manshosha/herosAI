import React, { useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing } from "@/constants/theme";

interface HeartIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({ size = 16, color = "#000", filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" fill={filled ? color : "none"}>
    <Path
      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={filled ? 0 : 2}
    />
  </Svg>
);

interface AnimatedHeartProps {
  index: number;
  onAnimationComplete: () => void;
}

const AnimatedHeart: React.FC<AnimatedHeartProps> = ({ index, onAnimationComplete }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  const randomNumber = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

  React.useEffect(() => {
    const randomX = randomNumber(-80, 80);
    const randomY = randomNumber(-100, -20);
    const randomScale = randomNumber(10, 15) / 10;

    opacity.value = withSequence(
      withTiming(1, { duration: 0 }),
      withTiming(0, { duration: 700 })
    );
    translateX.value = withTiming(randomX, { duration: 700 });
    translateY.value = withTiming(randomY, { duration: 700 });
    scale.value = withSequence(
      withTiming(randomScale, { duration: 350 }),
      withTiming(0, { duration: 350 })
    );

    const timer = setTimeout(() => {
      runOnJS(onAnimationComplete)();
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.animatedHeart, animatedStyle]}>
      <HeartIcon size={16} color="#FF6B35" filled />
    </Animated.View>
  );
};

interface LikeButtonProps {
  onPress?: () => void;
  liked?: boolean;
  count?: number;
  iconCount?: number;
  style?: ViewStyle;
  showCount?: boolean;
}

export function LikeButton({
  onPress,
  liked: controlledLiked,
  count: controlledCount,
  iconCount = 20,
  style,
  showCount = true,
}: LikeButtonProps) {
  const [internalLiked, setInternalLiked] = useState(false);
  const [internalCount, setInternalCount] = useState(controlledCount || 0);
  const [animatingHearts, setAnimatingHearts] = useState<number[]>([]);
  const [heartKey, setHeartKey] = useState(0);

  const liked = controlledLiked !== undefined ? controlledLiked : internalLiked;
  const count = controlledCount !== undefined ? controlledCount : internalCount;

  const handlePress = () => {
    if (controlledLiked === undefined) {
      setInternalLiked(!internalLiked);
      if (!internalLiked) {
        setInternalCount((prev) => prev + 1);
        // Trigger heart animations
        const newHearts = Array.from({ length: iconCount }, (_, i) => heartKey + i);
        setAnimatingHearts(newHearts);
        setHeartKey((prev) => prev + iconCount);
      } else {
        setInternalCount((prev) => Math.max(0, prev - 1));
      }
    } else {
      // Controlled mode - just call onPress
      if (!liked && onPress) {
        const newHearts = Array.from({ length: iconCount }, (_, i) => heartKey + i);
        setAnimatingHearts(newHearts);
        setHeartKey((prev) => prev + iconCount);
      }
    }
    onPress?.();
  };

  const handleHeartComplete = (heartId: number) => {
    setAnimatingHearts((prev) => prev.filter((id) => id !== heartId));
  };

  const formatCount = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.buttonWrapper}>
        <Pressable onPress={handlePress} style={styles.button}>
          <HeartIcon
            size={18}
            color={liked ? "#FF6B35" : "#FFFFFF"}
            filled={liked}
          />
          {showCount && (
            <ThemedText style={[styles.count, liked && styles.countLiked]}>
              {formatCount(count)}
            </ThemedText>
          )}
        </Pressable>
        {/* Animated hearts - positioned relative to button */}
        {animatingHearts.map((heartId) => (
          <AnimatedHeart
            key={heartId}
            index={heartId}
            onAnimationComplete={() => handleHeartComplete(heartId)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  buttonWrapper: {
    position: "relative",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    padding: 0,
    margin: 0,
  },
  count: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  countLiked: {
    color: "#FFFFFF",
  },
  animatedHeart: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

