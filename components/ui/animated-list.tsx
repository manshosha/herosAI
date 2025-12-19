import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Spacing } from "@/constants/theme";

export interface AnimatedListProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedList = React.memo(
  ({ children, delay = 1000 }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <View style={styles.container}>
        {itemsToShow.map((item, idx) => (
          <AnimatedListItem key={`${(item as React.ReactElement).key || idx}`}>
            {item}
          </AnimatedListItem>
        ))}
      </View>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({
  children,
}: {
  children: React.ReactNode;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, {
      stiffness: 350,
      damping: 40,
    });
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.md,
  },
  item: {
    width: "100%",
  },
});

