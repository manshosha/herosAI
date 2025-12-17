/**
 * HerosAI Rehabilitation Framework Types
 * Includes 14-question onboarding flow with conditional branching
 */

export type TaskType = "ot_exercise" | "speech_exercise" | "cognitive_game" | "podcast";

export type GoalCategory =
  | "home_care"
  | "communication"
  | "hand_activities"
  | "memory_focus"
  | "mobility"
  | "emotional_wellbeing"
  | "literacy"
  | "energy_stamina";

export type ConditionType = "stroke" | "parkinsons";

export type StrokeType = "ischemic" | "hemorrhagic" | "tia" | "unknown";

export type MobilityLevel = "walk_without_support" | "with_cane_walker" | "need_help" | "mostly_seated";

export type Laterality = "left_side" | "right_side" | "both_sides" | "unsure";

export type PrimaryGoal = "move_independently" | "improve_arm_hand" | "walk_confidence" | "balance_coordination" | "strength_energy" | "not_sure";

export type FallRisk = "often" | "occasionally" | "not_really";

export type CommunicationImpact = "speaking_difficult" | "writing_reading_difficult" | "communicate_well" | "no_change";

export type UpperExtremityFunction = "both_arms_well" | "one_harder" | "both_struggle" | "mostly_dont_use";

export type MusicPreference = "yes" | "maybe" | "no";

export type RemindersPreference = "yes_please" | "maybe_try_without" | "no";

export type EmotionalBaseline = "happy" | "mostly_good" | "neutral" | "bit_low" | "depressed";

export type Theme =
  | "theme_1_move_independently"
  | "theme_2_mobility_walking"
  | "theme_5_communication"
  | "theme_6_hand_arm"
  | "theme_8_balance"
  | "theme_11_emotional"
  | "theme_12_walking_confidence"
  | "theme_14_hand_arm_advanced"
  | "theme_15_strength_energy"
  | "theme_18_general";

// Stroke-Specific Onboarding Answers
export interface StrokeOnboardingAnswers {
  strokeType: StrokeType;
  mobilityLevel: MobilityLevel;
  laterality: Laterality;
  primaryGoal: PrimaryGoal;
  fallRisk: FallRisk;
  communicationImpact: CommunicationImpact;
  upperExtremityFunction: UpperExtremityFunction;
  musicPreference: MusicPreference;
  remindersPreference: RemindersPreference;
  medicationsPhotoUrl?: string;
  emotionalBaseline: EmotionalBaseline;
}

// Parkinson's-Specific Onboarding Answers
export interface ParkinsonsOnboardingAnswers {
  severity: "mild" | "moderate" | "severe";
  tremor: boolean;
  rigidity: boolean;
  bradykinesia: boolean;
  postureBalance: boolean;
  mobilityLevel: MobilityLevel;
  primaryGoal: PrimaryGoal;
  fallRisk: FallRisk;
  communicationImpact: CommunicationImpact;
  musicPreference: MusicPreference;
  remindersPreference: RemindersPreference;
  medicationsPhotoUrl?: string;
  emotionalBaseline: EmotionalBaseline;
}

// Universal Onboarding Answers (All Users)
export interface UniversalOnboardingAnswers {
  name: string;
  dateOfBirth: Date;
  condition: ConditionType;
  selectedGoals?: string[]; // Array of goal IDs selected by user
}

// Complete Onboarding Profile
export interface OnboardingProfile extends UniversalOnboardingAnswers {
  conditionSpecific: StrokeOnboardingAnswers | ParkinsonsOnboardingAnswers;
  recommendedThemes: Theme[];
  completedDate: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  duration: number; // in minutes
  difficulty: "easy" | "medium" | "hard";
  instructions?: string;
  mediaUrl?: string; // video, audio, or game URL
  completed: boolean;
  completedDate?: Date;
  scheduledDate: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  goalId: string;
  order: number;
  tasks: Task[];
  progress: number; // 0-100
  completed: boolean;
  completedDate?: Date;
}

export interface Goal {
  id: string;
  category: GoalCategory;
  title: string;
  emoji: string;
  description: string;
  milestones: Milestone[];
  progress: number; // 0-100
  completed: boolean;
  completedDate?: Date;
  selected: boolean;
}

export interface UserProfile {
  id: string;
  onboarding: OnboardingProfile;
  selectedGoals: Goal[];
  createdDate: Date;
  lastUpdated: Date;
}

export interface DailyTask {
  task: Task;
  milestone: Milestone;
  goal: Goal;
}

// Goal Category Definitions
export const GOAL_CATEGORIES: Record<GoalCategory, { title: string; emoji: string; description: string }> = {
  home_care: {
    title: "Take Care of Myself at Home",
    emoji: "🏠",
    description: "Safe movement, personal care, kitchen tasks, household participation",
  },
  communication: {
    title: "Talk with Family and Friends",
    emoji: "💬",
    description: "Essential communication, conversational speech, clear articulation",
  },
  hand_activities: {
    title: "Use My Hands for Daily Activities",
    emoji: "✋",
    description: "Grasp & release, fine motor control, functional reaching",
  },
  memory_focus: {
    title: "Remember and Stay Focused",
    emoji: "🧠",
    description: "Attention & focus, memory skills, problem solving",
  },
  mobility: {
    title: "Get Around on My Own",
    emoji: "🚶",
    description: "Standing stability, walking indoors, outdoor mobility",
  },
  emotional_wellbeing: {
    title: "Feel Good About My Day",
    emoji: "😌",
    description: "Relaxation skills, emotional expression, confidence",
  },
  literacy: {
    title: "Read Messages and Write Notes",
    emoji: "📝",
    description: "Basic reading, writing skills, functional literacy",
  },
  energy_stamina: {
    title: "Have Energy for What I Want to Do",
    emoji: "💪",
    description: "Core strength, upper body, lower body, endurance",
  },
};

// Milestone Templates for Each Goal
export const MILESTONE_TEMPLATES: Record<GoalCategory, string[]> = {
  home_care: [
    "Safe movement around house",
    "Personal care independence",
    "Kitchen and meal tasks",
    "Household participation",
  ],
  communication: [
    "Essential communication",
    "Conversational speech",
    "Clear articulation",
    "Functional communication",
  ],
  hand_activities: [
    "Basic grasp & release",
    "Fine motor control",
    "Functional reaching",
    "Two-handed activities",
  ],
  memory_focus: [
    "Attention & focus",
    "Memory skills",
    "Problem solving",
    "Processing speed",
  ],
  mobility: [
    "Standing stability",
    "Walking indoors",
    "Outdoor mobility",
    "Endurance & distance",
  ],
  emotional_wellbeing: [
    "Relaxation skills",
    "Emotional expression",
    "Building confidence",
    "Social connection",
  ],
  literacy: [
    "Basic reading",
    "Writing skills",
    "Functional literacy",
    "Communication through text",
  ],
  energy_stamina: [
    "Core strength",
    "Upper body strength",
    "Lower body strength",
    "Endurance & stamina",
  ],
};

// Theme to Goals Mapping
export const THEME_TO_GOALS: Record<Theme, GoalCategory[]> = {
  theme_1_move_independently: ["mobility", "home_care"],
  theme_2_mobility_walking: ["mobility"],
  theme_5_communication: ["communication"],
  theme_6_hand_arm: ["hand_activities"],
  theme_8_balance: ["mobility"],
  theme_11_emotional: ["emotional_wellbeing"],
  theme_12_walking_confidence: ["mobility"],
  theme_14_hand_arm_advanced: ["hand_activities"],
  theme_15_strength_energy: ["energy_stamina"],
  theme_18_general: ["memory_focus", "literacy"],
};
