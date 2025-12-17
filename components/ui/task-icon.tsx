import React from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

export type TaskIconType =
  | "ot_exercise"
  | "pt_exercise"
  | "speech_exercise"
  | "cognitive_game"
  | "podcast"
  | "meditation"
  | "chat";

interface TaskIconProps {
  type: TaskIconType;
  size?: number;
  style?: ViewStyle;
}

const ICON_MAP: Record<TaskIconType, any> = {
  ot_exercise: require("@/assets/images/icon-ot.png"),
  pt_exercise: require("@/assets/images/icon-pt.png"),
  speech_exercise: require("@/assets/images/icon-speech.png"),
  cognitive_game: require("@/assets/images/icon-game.png"),
  podcast: require("@/assets/images/icon-podcast.png"),
  meditation: require("@/assets/images/icon-meditation.png"),
  chat: null, // Will use emoji instead
};

const ICON_COLORS: Record<TaskIconType, string> = {
  ot_exercise: "#FF6B35", // Orange
  pt_exercise: "#45B7D1", // Blue
  speech_exercise: "#E74C3C", // Red
  cognitive_game: "#F7DC6F", // Yellow
  podcast: "#9B59B6", // Purple
  meditation: "#52B788", // Green
  chat: "#3498DB", // Light Blue
};

export function TaskIcon({ type, size = 32, style }: TaskIconProps) {
  const icon = ICON_MAP[type];
  const color = ICON_COLORS[type];

  // Use emoji for chat type
  if (type === "chat") {
    return (
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            backgroundColor: `${color}15`, // 15% opacity
            borderRadius: size / 2,
          },
          style,
        ]}
      >
        <Text style={{ fontSize: size * 0.6, lineHeight: size }}>💬</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: `${color}15`, // 15% opacity
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Image
        source={icon}
        style={{
          width: size * 0.6,
          height: size * 0.6,
          tintColor: color,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
