import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="q1-name" />
      <Stack.Screen name="q2-dob" />
      <Stack.Screen name="q3-condition" />
      <Stack.Screen name="q4-stroke-type" />
      <Stack.Screen name="q4-parkinsons-severity" />
      <Stack.Screen name="q5-mobility" />
      <Stack.Screen name="q6-laterality" />
      <Stack.Screen name="q7-primary-goal" />
      <Stack.Screen name="q8-fall-risk" />
      <Stack.Screen name="q9-communication" />
      <Stack.Screen name="q10-upper-extremity" />
      <Stack.Screen name="q11-music" />
      <Stack.Screen name="q12-reminders" />
      <Stack.Screen name="q13-medications" />
      <Stack.Screen name="q14-emotional" />
      <Stack.Screen name="goal-selection" />
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="theme" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
