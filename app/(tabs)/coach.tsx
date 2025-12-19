import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { StoriesCarousel, Story } from "@/components/ui/stories-carousel";
import { SocialPosts, SocialPost } from "@/components/ui/social-posts";
import { Colors, Spacing } from "@/constants/theme";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

// Community stories data
const COMMUNITY_STORIES: Story[] = [
  {
    id: "1",
    author: "Community",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop&crop=face",
    fallback: "CM",
    preview: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=533&fit=crop",
    title: "Community Support",
  },
  {
    id: "2",
    author: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    fallback: "SM",
    preview: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=533&fit=crop",
    title: "Wellness Journey",
  },
  {
    id: "3",
    author: "Mike R.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    fallback: "MR",
    preview: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=533&fit=crop",
    title: "Daily Progress",
  },
  {
    id: "4",
    author: "Emma W.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    fallback: "EW",
    preview: "https://images.unsplash.com/photo-1490645935967-10de6ba1701f?w=300&h=533&fit=crop",
    title: "Healthy Habits",
  },
];

// Sample social media posts
const COMMUNITY_POSTS: SocialPost[] = [
  {
    id: "1",
    author: "Savannah Nguyen",
    handle: "savannah_nguyen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    fallback: "SN",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",
    likes: 120000,
    comments: 96000,
    shares: 36000,
  },
  {
    id: "2",
    author: "Brooklyn Simmons",
    handle: "brooklyn.sim007",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    fallback: "BS",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop",
    likes: 85000,
    comments: 42000,
    shares: 18000,
  },
  {
    id: "3",
    author: "Robert Fox",
    handle: "robert_fox",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    fallback: "RF",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba1701f?w=600&h=800&fit=crop",
    likes: 95000,
    comments: 55000,
    shares: 22000,
  },
];

export default function CoachScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stories Carousel - At the top */}
        <View
          style={[
            styles.storiesContainer,
            {
              paddingTop: Math.max(insets.top, 20) + Spacing.md,
              paddingLeft: Math.max(insets.left, 20),
              paddingRight: Math.max(insets.right, 20),
              paddingBottom: Spacing.md,
            },
          ]}
        >
          <StoriesCarousel
            stories={COMMUNITY_STORIES}
            onStoryPress={(story) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              // Navigate if route is provided (for action items)
              if (story.route) {
                router.push(story.route as any);
              }
            }}
          />
        </View>

        {/* Social Media Posts */}
        <SocialPosts
          posts={COMMUNITY_POSTS}
          onPostPress={(post) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Handle post press if needed
          }}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3efe7" },
  scrollView: { flex: 1, backgroundColor: "#f3efe7" },
  scrollContent: { flexGrow: 1, paddingBottom: Spacing.xl, backgroundColor: "#f3efe7" },
  storiesContainer: {
    backgroundColor: "#f3efe7",
    marginBottom: Spacing.sm,
  },
});
