import { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GlassCard } from "@/components/ui/glass-card";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";

const MESSAGES = [
  { id: "1", text: "Hi! I'm your AI wellness coach. How can I help you today?", isCoach: true },
];

export default function CoachScreen() {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: message, isCoach: false }]);
    setMessage("");
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: Math.max(insets.top, 20) + Spacing.md,
              paddingBottom: Spacing.md,
              paddingHorizontal: Spacing.lg,
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.coachAvatar}>
              <ThemedText style={styles.coachAvatarText}>🤖</ThemedText>
            </View>
            <View>
              <ThemedText type="subtitle">AI Coach</ThemedText>
              <ThemedText style={[styles.status, { color: Colors.light.success }]}>
                ● Online
              </ThemedText>
            </View>
          </View>

          <View style={styles.messagesContainer}>
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.isCoach ? styles.coachBubble : styles.userBubble,
                ]}
              >
                <ThemedText style={[styles.messageText, !msg.isCoach && { color: "#fff" }]}>
                  {msg.text}
                </ThemedText>
              </View>
            ))}
          </View>
        </ScrollView>

        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: Math.max(insets.bottom, 20),
              paddingHorizontal: Spacing.lg,
            },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              placeholderTextColor={Colors.light.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <Pressable style={styles.sendButton} onPress={handleSend}>
              <IconSymbol name="paperplane.fill" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollView: { flex: 1 },
  content: { gap: Spacing.xl },
  header: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  coachAvatar: { width: 56, height: 56, borderRadius: BorderRadius.round, backgroundColor: Colors.light.surfaceSecondary, justifyContent: "center", alignItems: "center" },
  coachAvatarText: { fontSize: 28, lineHeight: 32 },
  status: { fontSize: 13, lineHeight: 18 },
  messagesContainer: { gap: Spacing.md, marginTop: Spacing.lg },
  messageBubble: { maxWidth: "80%", padding: Spacing.md, borderRadius: BorderRadius.medium },
  coachBubble: { alignSelf: "flex-start", backgroundColor: Colors.light.surface },
  userBubble: { alignSelf: "flex-end", backgroundColor: Colors.light.tint },
  messageText: { fontSize: 15, lineHeight: 22 },
  inputContainer: { paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.light.borderLight },
  inputWrapper: { flexDirection: "row", alignItems: "flex-end", gap: Spacing.sm, backgroundColor: Colors.light.surface, borderRadius: BorderRadius.medium, padding: Spacing.sm },
  input: { flex: 1, fontSize: 15, lineHeight: 22, color: Colors.light.text, maxHeight: 100, paddingHorizontal: Spacing.sm },
  sendButton: { width: 40, height: 40, borderRadius: BorderRadius.round, backgroundColor: Colors.light.tint, justifyContent: "center", alignItems: "center" },
});
