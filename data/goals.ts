export type BodyFocus = "upper" | "lower" | "hands" | "core" | "brain" | "full_body";

export interface Task {
  id: string;
  title: string;
  type: "ot_exercise" | "pt_exercise" | "speech_exercise" | "cognitive_game" | "podcast" | "meditation";
  description: string;
  duration: number; // in minutes
  week: number;
  day: number;
  instructions?: string;
  videoUrl?: string;
  audioUrl?: string;
  bodyFocus?: BodyFocus;
  steps?: string[];
  sets?: number;
  reps?: number;
  level?: "beginner" | "intermediate" | "advanced";
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  completionPercentage?: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  milestones: Milestone[];
  taskCount: number;
  milestoneCount: number;
}

// Goal 1: Take Care of Myself at Home
export const TAKE_CARE_OF_MYSELF_AT_HOME: Goal = {
  id: "goal-1",
  title: "Take Care of Myself at Home",
  description: "Move confidently around your home and manage daily routines on your own.",
  icon: "🏠",
  color: "#FF6B35",
  milestoneCount: 4,
  taskCount: 30,
  milestones: [
    {
      id: "milestone-1-1",
      title: "Safe Movement Around the House",
      description: "Walk safely between rooms, use stairs with support, balance while standing.",
      completionPercentage: 0,
      tasks: [
        {
          id: "task-1-1-1",
          title: "Seated Marching",
          type: "ot_exercise",
          description: "Lift your knees up and down while sitting to improve leg strength and coordination.",
          duration: 10,
          week: 1,
          day: 4,
          bodyFocus: "lower",
          level: "beginner",
          sets: 2,
          reps: 20,
          steps: [
            "Sit upright in a sturdy chair with feet flat on the floor",
            "Lift your right knee up toward your chest, keeping your back straight",
            "Lower your right foot back to the floor with control",
            "Repeat with your left knee",
            "Continue alternating legs for 20 repetitions on each side"
          ],
        },
        {
          id: "task-1-1-2",
          title: "Heel Raises Holding Chair",
          type: "ot_exercise",
          description: "Stand and raise your heels while holding a chair for balance.",
          duration: 8,
          week: 1,
          day: 5,
          bodyFocus: "lower",
          level: "beginner",
          sets: 3,
          reps: 15,
          steps: [
            "Stand facing a sturdy chair with both hands on the back for support",
            "Keep your feet hip-width apart and your posture tall",
            "Slowly rise up onto your toes, lifting your heels off the ground",
            "Hold at the top for 2 seconds, feeling the calf muscles engage",
            "Lower your heels back down with control",
            "Repeat 15 times for each set"
          ],
        },
        {
          id: "task-1-1-3",
          title: "Sit-to-Stand Practice",
          type: "ot_exercise",
          description: "Practice standing up from a chair safely and with control.",
          duration: 12,
          week: 1,
          day: 6,
          bodyFocus: "lower",
          level: "beginner",
          sets: 2,
          reps: 10,
          steps: [
            "Sit at the edge of a firm, stable chair with feet flat on the floor",
            "Place your hands on your thighs or armrests for support",
            "Lean your trunk forward, bringing your nose over your toes",
            "Push through your legs to stand up, keeping your back straight",
            "Stand fully upright and pause for a moment",
            "Slowly lower yourself back down to sitting with control",
            "Repeat 10 times per set"
          ],
        },
        {
          id: "task-1-1-4",
          title: "Standing Balance Hold",
          type: "ot_exercise",
          description: "Build confidence standing with minimal support.",
          duration: 10,
          week: 2,
          day: 3,
          bodyFocus: "core",
          level: "beginner",
          sets: 3,
          reps: 1,
          steps: [
            "Stand next to a sturdy table or counter for safety",
            "Place just your fingertips lightly on the surface",
            "Stand tall with feet hip-width apart",
            "Focus on a point in front of you to help with balance",
            "Hold this position steady for 30 seconds",
            "Rest for 15 seconds between sets",
            "As you improve, try reducing finger contact"
          ],
        },
        {
          id: "task-1-1-5",
          title: "Understanding Balance and Fall Prevention",
          type: "podcast",
          description: "Learn about balance, falls, and how to stay safe at home.",
          duration: 15,
          week: 1,
          day: 1,
          bodyFocus: "brain",
          level: "beginner",
        },
        {
          id: "task-1-1-6",
          title: "Spatial Awareness Game",
          type: "cognitive_game",
          description: "Train your spatial awareness with interactive games.",
          duration: 10,
          week: 2,
          day: 1,
          bodyFocus: "brain",
          level: "beginner",
        },
        {
          id: "task-1-1-7",
          title: "Leg Strengthening Exercises",
          type: "pt_exercise",
          description: "Physical therapy exercises to build leg strength and stability.",
          duration: 15,
          week: 1,
          day: 2,
          bodyFocus: "lower",
          level: "beginner",
          sets: 2,
          reps: 10,
          steps: [
            "Ankle Pumps: Sit with legs extended, point toes up and down 10 times",
            "Knee Extensions: Sit in chair, straighten one leg, hold 3 seconds, lower slowly",
            "Hip Marches: Sit tall, lift one knee toward chest, lower with control",
            "Complete 10 repetitions of each exercise",
            "Rest 30 seconds between sets",
            "Repeat for 2 full sets"
          ],
        },
        {
          id: "task-1-1-8",
          title: "Morning Mindfulness",
          type: "meditation",
          description: "Start your day with a calming mindfulness practice.",
          duration: 10,
          week: 1,
          day: 1,
          bodyFocus: "brain",
          level: "beginner",
          steps: [
            "Find a comfortable seated position",
            "Close your eyes and take 3 deep breaths",
            "Focus on the sensation of breathing",
            "When your mind wanders, gently return to your breath",
            "Continue for 10 minutes"
          ],
        },
      ],
    },
    {
      id: "milestone-1-2",
      title: "Personal Care Independence",
      description: "Wash, groom, and dress yourself with minimal help.",
      completionPercentage: 0,
      tasks: [
        {
          id: "task-1-2-1",
          title: "Hand Opening & Closing",
          type: "ot_exercise",
          description: "Strengthen your hands and improve grip control.",
          duration: 8,
          week: 1,
          day: 1,
          bodyFocus: "hands",
          level: "beginner",
          sets: 3,
          reps: 20,
          steps: [
            "Rest your forearm on a table with palm facing up",
            "Make a tight fist, squeezing all fingers together",
            "Hold the fist for 2 seconds",
            "Open your hand wide, spreading all fingers apart",
            "Hold the open position for 2 seconds",
            "Repeat 20 times per set"
          ],
        },
        {
          id: "task-1-2-2",
          title: "Shoulder Rolls",
          type: "ot_exercise",
          description: "Improve shoulder mobility and reduce tension.",
          duration: 8,
          week: 1,
          day: 1,
          bodyFocus: "upper",
          level: "beginner",
          sets: 2,
          reps: 10,
          steps: [
            "Sit or stand with good posture, arms relaxed at sides",
            "Lift your shoulders up toward your ears",
            "Roll them backward in a circular motion",
            "Complete 10 backward rolls",
            "Then roll shoulders forward 10 times",
            "Keep movements slow and controlled"
          ],
        },
        {
          id: "task-1-2-3",
          title: "Morning Routine Practice",
          type: "ot_exercise",
          description: "Practice daily personal care activities step by step.",
          duration: 15,
          week: 2,
          day: 7,
          bodyFocus: "hands",
          level: "intermediate",
          steps: [
            "Gather all items you need before starting",
            "Practice washing your face with both hands",
            "Brush your teeth using your affected hand if possible",
            "Comb or brush your hair, reaching all areas",
            "Take your time with each activity",
            "Focus on smooth, controlled movements"
          ],
        },
        {
          id: "task-1-2-4",
          title: "Button Board Practice",
          type: "ot_exercise",
          description: "Improve fine motor skills needed for dressing.",
          duration: 10,
          week: 2,
          day: 2,
          bodyFocus: "hands",
          level: "intermediate",
          sets: 1,
          reps: 10,
          steps: [
            "Start with the largest buttons on the board",
            "Use your thumb and index finger to grip the button",
            "Push the button through the buttonhole",
            "Practice unbuttoning by reversing the motion",
            "Progress to smaller buttons as you improve",
            "Try using your affected hand as much as possible"
          ],
        },
        {
          id: "task-1-2-5",
          title: "Building Morning Routines After Stroke",
          type: "podcast",
          description: "Tips and strategies for managing personal care tasks.",
          duration: 12,
          week: 2,
          day: 1,
        },
        {
          id: "task-1-2-6",
          title: "Sequencing Activities Game",
          type: "cognitive_game",
          description: "Practice putting daily activities in the correct order.",
          duration: 10,
          week: 2,
          day: 4,
        },
        {
          id: "task-1-2-7",
          title: "Upper Body Strengthening",
          type: "pt_exercise",
          description: "Physical therapy for shoulder and arm strength.",
          duration: 12,
          week: 1,
          day: 3,
          instructions:
            "Perform shoulder flexion, arm raises, and elbow bends. 10 repetitions each, 2 sets.",
        },
        {
          id: "task-1-2-8",
          title: "Body Scan Meditation",
          type: "meditation",
          description: "Relax and connect with your body through guided meditation.",
          duration: 12,
          week: 2,
          day: 3,
        },
      ],
    },
    {
      id: "milestone-1-3",
      title: "Kitchen & Meal Tasks",
      description: "Prepare simple meals, use utensils, and eat independently.",
      completionPercentage: 0,
      tasks: [
        {
          id: "task-1-3-1",
          title: "Cup Lift Practice",
          type: "ot_exercise",
          description: "Build strength and control for holding and lifting cups.",
          duration: 8,
          week: 1,
          day: 4,
          instructions:
            "Hold a light cup with both hands. Lift it to mouth level, hold for 2 seconds, lower. Repeat 15 times.",
        },
        {
          id: "task-1-3-2",
          title: "Object Transfer",
          type: "ot_exercise",
          description: "Practice moving objects from one place to another.",
          duration: 10,
          week: 1,
          day: 6,
          instructions:
            "Place small objects on a table. Transfer them from one side to the other using both hands. Repeat 20 transfers.",
        },
        {
          id: "task-1-3-3",
          title: "Simulated Meal Prep",
          type: "ot_exercise",
          description: "Practice preparing a simple meal with guidance.",
          duration: 20,
          week: 2,
          day: 5,
          instructions:
            "Prepare a simple meal like a sandwich or salad. Focus on using both hands and maintaining balance.",
        },
        {
          id: "task-1-3-4",
          title: "Carry & Place Light Items",
          type: "ot_exercise",
          description: "Build confidence carrying items around the kitchen.",
          duration: 10,
          week: 2,
          day: 3,
          instructions:
            "Carry light items (like a plate or cup) from one spot to another. Focus on stability and control.",
        },
        {
          id: "task-1-3-5",
          title: "Nutrition and Energy for Recovery",
          type: "podcast",
          description: "Learn about nutrition to support your rehabilitation.",
          duration: 14,
          week: 3,
          day: 1,
        },
        {
          id: "task-1-3-6",
          title: "Recipe Sequencing",
          type: "cognitive_game",
          description: "Practice putting recipe steps in the correct order.",
          duration: 12,
          week: 3,
          day: 2,
        },
        {
          id: "task-1-3-7",
          title: "Core Stability Exercises",
          type: "pt_exercise",
          description: "Physical therapy for core strength and posture.",
          duration: 15,
          week: 2,
          day: 2,
          instructions:
            "Perform seated trunk rotations, pelvic tilts, and abdominal bracing. 10 repetitions each, 2 sets.",
        },
        {
          id: "task-1-3-8",
          title: "Mindful Eating Meditation",
          type: "meditation",
          description: "Practice mindfulness during meals for better awareness.",
          duration: 8,
          week: 2,
          day: 6,
        },
      ],
    },
    {
      id: "milestone-1-4",
      title: "Household Participation",
      description: "Tidy, organize, and contribute to household tasks.",
      completionPercentage: 0,
      tasks: [
        {
          id: "task-1-4-1",
          title: "Bilateral Hand Use",
          type: "ot_exercise",
          description: "Use both hands together to improve coordination.",
          duration: 10,
          week: 1,
          day: 7,
          instructions:
            "Clap your hands together 20 times. Then try to do fine motor tasks with both hands, like folding a towel.",
        },
        {
          id: "task-1-4-2",
          title: "Carry, Place & Tidy",
          type: "ot_exercise",
          description: "Practice tidying up household items.",
          duration: 15,
          week: 2,
          day: 7,
          instructions:
            "Pick up items around a room and place them in their proper spots. Focus on balance and coordination.",
        },
        {
          id: "task-1-4-3",
          title: "Standing Reach Supported",
          type: "ot_exercise",
          description: "Practice reaching while maintaining balance.",
          duration: 10,
          week: 1,
          day: 7,
          instructions:
            "Stand with one hand on a counter. Reach forward and to the side with the other hand. Repeat 10 times each direction.",
        },
        {
          id: "task-1-4-4",
          title: "Pacing Yourself Through the Day",
          type: "podcast",
          description: "Learn strategies for managing energy and pacing activities.",
          duration: 13,
          week: 3,
          day: 3,
        },
        {
          id: "task-1-4-5",
          title: "Balance and Coordination Training",
          type: "pt_exercise",
          description: "Physical therapy exercises to improve balance and prevent falls.",
          duration: 15,
          week: 2,
          day: 4,
          instructions:
            "Perform single-leg stands, tandem walking, and weight shifts. 10 repetitions each, 2 sets.",
        },
        {
          id: "task-1-4-6",
          title: "Evening Relaxation",
          type: "meditation",
          description: "Wind down with a calming evening meditation practice.",
          duration: 10,
          week: 2,
          day: 7,
        },
        {
          id: "task-1-4-7",
          title: "Memory Challenge Game",
          type: "cognitive_game",
          description: "Improve memory and recall with interactive challenges.",
          duration: 12,
          week: 3,
          day: 4,
        },
      ],
    },
  ],
};

// All goals data
export const ALL_GOALS: Goal[] = [
  TAKE_CARE_OF_MYSELF_AT_HOME,
  // Additional goals will be added here
];

// Goal lookup by ID
export const getGoalById = (goalId: string): Goal | undefined => {
  return ALL_GOALS.find((goal) => goal.id === goalId);
};

// Get milestone by goal ID and milestone ID
export const getMilestoneByIds = (
  goalId: string,
  milestoneId: string
): Milestone | undefined => {
  const goal = getGoalById(goalId);
  return goal?.milestones.find((m) => m.id === milestoneId);
};

// Get task by IDs
export const getTaskByIds = (
  goalId: string,
  milestoneId: string,
  taskId: string
): Task | undefined => {
  const milestone = getMilestoneByIds(goalId, milestoneId);
  return milestone?.tasks.find((t) => t.id === taskId);
};
