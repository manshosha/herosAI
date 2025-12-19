import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const STORY_WIDTH = 200;
const STORY_HEIGHT = 300;

export interface Story {
  id: string;
  author: string;
  avatar?: string;
  fallback?: string;
  preview?: string;
  title?: string;
  route?: string; // For navigation
  emoji?: string; // For action items like medications/mood check-in
  isAction?: boolean; // Flag to indicate this is an action item
}

interface StoriesCarouselProps {
  stories: Story[];
  onStoryPress?: (story: Story) => void;
}

export function StoriesCarousel({
  stories,
  onStoryPress,
}: StoriesCarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleStoryPress = (story: Story) => {
    onStoryPress?.(story);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={STORY_WIDTH + Spacing.md}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            story={story}
            onPress={() => handleStoryPress(story)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface StoryItemProps {
  story: Story;
  onPress: () => void;
}

function StoryItem({ story, onPress }: StoryItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Render action item (medications, mood check-in, etc.)
  if (story.isAction && story.emoji) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.storyContainer,
          pressed && styles.storyPressed,
        ]}
      >
        <View style={[styles.story, styles.actionStory]}>
          {/* Gradient Background for Action Items */}
          <LinearGradient
            colors={["rgba(255, 107, 53, 0.15)", "rgba(255, 107, 53, 0.05)"]}
            style={styles.actionGradient}
          />

          {/* Emoji Icon */}
          <View style={styles.actionIconContainer}>
            <ThemedText style={styles.actionEmoji}>{story.emoji}</ThemedText>
          </View>

          {/* Action Title */}
          <View style={styles.actionTitleContainer}>
            <ThemedText style={styles.actionTitleText} numberOfLines={2}>
              {story.title || story.author}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    );
  }

  // Render regular story with image
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.storyContainer,
        pressed && styles.storyPressed,
      ]}
    >
      <View style={styles.story}>
        {/* Story Image */}
        {story.preview && (
          <Image
            source={{ uri: story.preview }}
            style={styles.storyImage}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Top Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          style={styles.topOverlay}
        />

        {/* Bottom Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)"]}
          style={styles.bottomOverlay}
        />

        {/* Story Title (Top) */}
        {story.title && (
          <View style={styles.titleContainer}>
            <ThemedText style={styles.titleText} numberOfLines={1}>
              {story.title}
            </ThemedText>
          </View>
        )}

        {/* Story Author (Bottom) */}
        <View style={styles.authorContainer}>
          <View style={styles.authorContent}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {story.avatar ? (
                <Image
                  source={{ uri: story.avatar }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <ThemedText style={styles.avatarFallbackText}>
                    {story.fallback || story.author.charAt(0).toUpperCase()}
                  </ThemedText>
                </View>
              )}
            </View>

            {/* Author Name */}
            <ThemedText style={styles.authorName} numberOfLines={1}>
              {story.author}
            </ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  storyContainer: {
    marginRight: Spacing.md,
  },
  storyPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  story: {
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
    borderRadius: BorderRadius.large,
    overflow: "hidden",
    backgroundColor: Colors.light.background,
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  titleContainer: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  authorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    zIndex: 10,
  },
  authorContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  avatarFallbackText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  authorName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Action item styles
  actionStory: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  actionGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  actionIconContainer: {
    marginBottom: Spacing.md,
  },
  actionEmoji: {
    fontSize: 64,
    lineHeight: 72,
  },
  actionTitleContainer: {
    paddingHorizontal: Spacing.md,
    alignItems: "center",
  },
  actionTitleText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },
});

