import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LikeButton } from "@/components/ui/like-button";
import { BlurView } from "expo-blur";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const POST_WIDTH = SCREEN_WIDTH;

export interface SocialPost {
  id: string;
  author: string;
  handle: string;
  avatar?: string;
  fallback?: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
}

interface SocialPostsProps {
  posts: SocialPost[];
  onPostPress?: (post: SocialPost) => void;
}

export function SocialPosts({
  posts,
  onPostPress,
}: SocialPostsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionTitleContainer}>
        <MaterialIcons name="star" size={20} color={Colors.light.text} style={styles.starIcon} />
        <ThemedText style={styles.sectionTitle}>Just for you</ThemedText>
      </View>
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onPress={() => onPostPress?.(post)}
          />
        ))}
      </View>
    </View>
  );
}

interface PostItemProps {
  post: SocialPost;
  onPress: () => void;
}

function PostItem({ post, onPress }: PostItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount(newLiked ? likesCount + 1 : Math.max(0, likesCount - 1));
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.postCard,
        pressed && styles.postPressed,
      ]}
    >
      {/* Post Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: post.image }}
          style={styles.postImage}
          resizeMode="cover"
        />

        {/* Profile Header - Overlaid on Image */}
        <View style={styles.profileHeaderOverlay}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {post.avatar ? (
                <Image
                  source={{ uri: post.avatar }}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <ThemedText style={styles.avatarFallbackText}>
                    {post.fallback || post.author.charAt(0).toUpperCase()}
                  </ThemedText>
                </View>
              )}
            </View>
            <View style={styles.profileInfoBlurContainer}>
              <BlurView intensity={20} style={styles.profileInfoBlur}>
                <View style={styles.profileInfoBlurOverlay} />
                <View style={styles.profileInfo}>
                  <ThemedText style={styles.authorName}>{post.author}</ThemedText>
                  <ThemedText style={styles.handle}>@{post.handle}</ThemedText>
                </View>
              </BlurView>
            </View>
          </View>
        </View>

        {/* Interaction Buttons - Overlaid on Image */}
        <View style={styles.interactionsContainer}>
          <View style={styles.interactionPillContainer}>
            <BlurView intensity={20} style={styles.interactionPillBlur}>
              <View style={styles.interactionPillBlurOverlay} />
              <View style={styles.interactionPill}>
                <LikeButton
                  onPress={handleLike}
                  liked={isLiked}
                  count={likesCount}
                  iconCount={20}
                  showCount={true}
                />
              </View>
            </BlurView>
          </View>

          <View style={styles.interactionPillContainer}>
            <BlurView intensity={20} style={styles.interactionPillBlur}>
              <View style={styles.interactionPillBlurOverlay} />
              <Pressable
                onPress={onPress}
                style={styles.interactionPill}
              >
                <MaterialIcons
                  name="comment"
                  size={18}
                  color="#FFFFFF"
                />
                <ThemedText style={styles.interactionCount}>
                  {formatCount(post.comments)}
                </ThemedText>
              </Pressable>
            </BlurView>
          </View>

          <View style={styles.interactionPillContainer}>
            <BlurView intensity={20} style={styles.interactionPillBlur}>
              <View style={styles.interactionPillBlurOverlay} />
              <Pressable
                onPress={onPress}
                style={styles.interactionPill}
              >
                <MaterialIcons
                  name="send"
                  size={18}
                  color="#FFFFFF"
                />
                <ThemedText style={styles.interactionCount}>
                  {formatCount(post.shares)}
                </ThemedText>
              </Pressable>
            </BlurView>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    backgroundColor: "transparent",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
  },
  starIcon: {
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  postsContainer: {
    gap: 0,
  },
  postCard: {
    width: POST_WIDTH,
    backgroundColor: "transparent",
    borderRadius: 0,
    overflow: "hidden",
    marginBottom: 0,
  },
  postPressed: {
    opacity: 0.95,
  },
  profileHeaderOverlay: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: "transparent",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.light.surfaceSecondary,
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
    backgroundColor: Colors.light.surfaceSecondary,
  },
  avatarFallbackText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  profileInfoBlurContainer: {
    borderRadius: BorderRadius.medium,
    overflow: "hidden",
  },
  profileInfoBlur: {
    borderRadius: BorderRadius.medium,
    overflow: "hidden",
  },
  profileInfoBlurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(201, 192, 173, 0.4)",
    borderRadius: BorderRadius.medium,
  },
  profileInfo: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383838",
    marginBottom: 2,
  },
  handle: {
    fontSize: 14,
    color: "#383838",
    opacity: 0.8,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  postImage: {
    width: "100%",
    height: 400,
    backgroundColor: Colors.light.surfaceSecondary,
  },
  interactionsContainer: {
    position: "absolute",
    bottom: Spacing.md,
    left: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  interactionPillContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  interactionPillBlur: {
    borderRadius: 20,
    overflow: "hidden",
  },
  interactionPillBlurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(56, 56, 56, 0.6)",
    borderRadius: 20,
  },
  interactionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  interactionCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

