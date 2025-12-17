# Wellness Journey App - Mobile Interface Design

## Design Philosophy
This app follows Apple Human Interface Guidelines (HIG) to feel like a native iOS app. The design prioritizes:
- **One-handed usage** in portrait orientation (9:16)
- **Thumb-friendly navigation** with bottom tab bar
- **Calming, wellness-focused aesthetics** with glass morphism
- **Clear visual hierarchy** with consistent spacing and typography
- **Smooth, delightful animations** for engagement

## Color Palette

### Light Mode
- **Primary**: `#8B7FE8` (Soft Purple) - Main accent, buttons, active states
- **Secondary**: `#6EC5B8` (Calm Teal) - Progress indicators, success states
- **Tertiary**: `#A8D5E2` (Light Blue) - Info cards, backgrounds
- **Background**: `#F8F9FE` (Off-white with purple tint)
- **Surface**: `#FFFFFF` (Pure white for cards)
- **Text Primary**: `#1A1A2E` (Deep navy)
- **Text Secondary**: `#6B7280` (Medium gray)
- **Text Disabled**: `#9CA3AF` (Light gray)

### Dark Mode
- **Primary**: `#9B8FF9` (Bright Purple) - Main accent
- **Secondary**: `#7DD3C0` (Bright Teal)
- **Tertiary**: `#B8E0ED` (Bright Blue)
- **Background**: `#0F0F1E` (Deep navy)
- **Surface**: `#1A1A2E` (Elevated navy)
- **Text Primary**: `#F8F9FE` (Off-white)
- **Text Secondary**: `#9CA3AF` (Medium gray)
- **Text Disabled**: `#6B7280` (Dark gray)

## Typography Scale
- **Title**: 32pt / 40pt line height / Bold
- **Subtitle**: 24pt / 32pt line height / Semibold
- **Heading**: 20pt / 28pt line height / Semibold
- **Body**: 16pt / 24pt line height / Regular
- **Body Semibold**: 16pt / 24pt line height / Semibold
- **Caption**: 14pt / 20pt line height / Regular
- **Small**: 12pt / 16pt line height / Regular

## Spacing System (8pt Grid)
- **xs**: 4pt
- **sm**: 8pt
- **md**: 16pt
- **lg**: 24pt
- **xl**: 32pt
- **2xl**: 48pt

## Border Radius
- **Small**: 8pt (chips, small buttons)
- **Medium**: 12pt (buttons, input fields)
- **Large**: 16pt (cards)
- **XLarge**: 24pt (modals, sheets)
- **Full**: 9999pt (circular elements)

## Screen List & Layout

### 1. Onboarding Flow (Stack Navigation)

#### 1.1 Welcome Screen (`/onboarding/welcome`)
**Content:**
- Animated orb visualization (breathing animation with gradient)
- App logo and name
- Tagline: "Your personal wellness companion"
- "Get Started" button (bottom, thumb-friendly)

**Layout:**
- Centered orb (200x200pt)
- Title below orb
- Button at bottom with safe area padding

#### 1.2 Questionnaire Step 1 (`/onboarding/step1`)
**Content:**
- Progress indicator (1/4)
- Question: "What's your primary wellness focus?"
- Radio button options:
  - Mental Health
  - Physical Fitness
  - Sleep Quality
  - Stress Management
- "Next" button (disabled until selection)

**Layout:**
- Top: Progress bar (4pt height)
- Question title (24pt)
- Radio options (56pt height each, glass card style)
- Bottom: "Next" button

#### 1.3 Questionnaire Step 2 (`/onboarding/step2`)
**Content:**
- Progress indicator (2/4)
- Question: "How much time can you dedicate daily?"
- Radio options:
  - 5-10 minutes
  - 10-20 minutes
  - 20-30 minutes
  - 30+ minutes

#### 1.4 Goal Selection (`/onboarding/goals`)
**Content:**
- Progress indicator (3/4)
- Title: "Choose your goals"
- Subtitle: "Select 2-4 goals to focus on"
- Multi-select cards with icons:
  - Reduce Stress 🧘
  - Improve Sleep 😴
  - Build Strength 💪
  - Increase Energy ⚡
  - Better Focus 🎯
  - Healthy Eating 🥗
- "Continue" button

**Layout:**
- 2-column grid
- Cards: 160x160pt with icon, label, checkbox

#### 1.5 Theme Selection (`/onboarding/theme`)
**Content:**
- Progress indicator (4/4)
- Title: "Pick your journey theme"
- Visual theme cards:
  - Mindfulness (purple gradient)
  - Vitality (green gradient)
  - Balance (blue gradient)
  - Strength (orange gradient)
- "Complete Setup" button

**Layout:**
- Single column, large cards (full width, 200pt height)
- Each card shows preview colors and icon

#### 1.6 Journey Summary (`/onboarding/summary`)
**Content:**
- Confetti animation on mount
- Title: "Your journey begins!"
- Summary card showing:
  - Selected goals with icons
  - Time commitment
  - Theme color preview
- "Start My Journey" button

### 2. Main App (Tab Navigation)

#### 2.1 Today Tab (`/(tabs)/index`)
**Content:**
- Header: "Today" + date + streak counter
- Daily quote card (glass morphism)
- Progress ring (circular, shows daily completion %)
- Quick action chips:
  - Log Activity
  - Start Meditation
  - Track Mood
  - View Insights
- Activity cards (scrollable):
  - Morning Routine (with checkbox)
  - Hydration Tracker (8 glasses)
  - Movement Goal (steps/minutes)
  - Evening Wind Down
- "View All Activities" link

**Layout:**
- Scroll view with sticky header
- Progress ring: 160x160pt, centered
- Quick actions: horizontal scroll, 80pt height
- Activity cards: full width, 120pt height each

#### 2.2 Journey Tab (`/(tabs)/journey`)
**Content:**
- Header: "Your Journey"
- Journey timeline (vertical):
  - Week 1: Foundation ✓
  - Week 2: Building Habits (current)
  - Week 3: Deepening Practice (locked)
  - Week 4: Integration (locked)
- Milestone cards:
  - 7-day streak badge
  - 50 activities completed
  - First meditation session
- Upcoming challenges section

**Layout:**
- Timeline with connecting lines
- Milestone cards: 2-column grid
- Each milestone: icon, title, date, progress

#### 2.3 Analytics Tab (`/(tabs)/analytics`)
**Content:**
- Header: "Analytics" + time range selector (Week/Month/Year)
- Key metrics cards:
  - Total activities: 42
  - Current streak: 12 days
  - Avg completion: 87%
- Charts:
  - Activity completion over time (line chart)
  - Goal progress (horizontal bar chart)
  - Mood trends (area chart)
- Insights card: "You're most active on Tuesdays!"

**Layout:**
- Metrics: 3-column grid (square cards)
- Charts: full width, 240pt height each
- Spacing between sections: 24pt

#### 2.4 AI Coach Tab (`/(tabs)/coach`)
**Content:**
- Header: "AI Wellness Coach"
- Chat interface:
  - Message bubbles (user: right, coach: left)
  - Typing indicator (animated dots)
  - Suggested prompts chips:
    - "How can I improve my sleep?"
    - "Create a morning routine"
    - "I'm feeling stressed"
- Input bar (bottom):
  - Text input field
  - Send button (icon)

**Layout:**
- Chat messages: reverse scroll view
- User messages: purple bubble, right-aligned
- Coach messages: glass card, left-aligned
- Input bar: fixed at bottom with safe area

#### 2.5 Profile Tab (`/(tabs)/profile`)
**Content:**
- Header: User avatar + name
- Stats summary:
  - Member since
  - Total days active
  - Achievements earned
- Settings sections:
  - Account (email, password)
  - Preferences (theme, notifications)
  - Goals (edit selected goals)
  - Data & Privacy
  - Help & Support
- "Sign Out" button

**Layout:**
- Avatar: 80pt circle, centered
- Stats: 3-column grid
- Settings: list with chevron right icons
- Each row: 56pt height

### 3. Bottom Tab Bar
**Tabs (left to right):**
1. Today (house.fill icon)
2. Journey (map.fill icon)
3. Analytics (chart.bar.fill icon)
4. Coach (message.fill icon)
5. Profile (person.fill icon)

**Specifications:**
- Height: 49pt + safe area bottom
- Active tint: Primary color
- Inactive tint: Text secondary
- Background: Surface with blur effect
- Icons: 28pt size

## Glass Morphism Style
All cards use glass morphism effect:
- Background: Semi-transparent white (light) / semi-transparent dark (dark mode)
- Backdrop blur: 20pt
- Border: 1pt solid rgba(255, 255, 255, 0.2) (light) / rgba(255, 255, 255, 0.1) (dark)
- Shadow: 0 8pt 32pt rgba(0, 0, 0, 0.1)

## Animations

### 1. Welcome Orb
- Scale: 1.0 → 1.2 → 1.0 (4s loop)
- Opacity: 0.7 → 1.0 → 0.7
- Gradient rotation: 0deg → 360deg (8s loop)

### 2. Page Transitions
- Slide from right (push)
- Slide to right (pop)
- Duration: 300ms
- Easing: ease-in-out

### 3. Confetti
- Trigger: Milestone completion, onboarding complete
- Duration: 3s
- Particles: 50-100
- Colors: Primary, secondary, tertiary

### 4. Progress Ring
- Animated stroke: 0 → target value
- Duration: 1s
- Easing: ease-out

### 5. Typing Indicator
- 3 dots bouncing
- Stagger: 150ms
- Loop: infinite

## User Flows

### Flow 1: First-Time User Onboarding
1. Open app → Welcome screen
2. Tap "Get Started" → Step 1 questionnaire
3. Select focus area → Step 2 questionnaire
4. Select time commitment → Goal selection
5. Select 2-4 goals → Theme selection
6. Select theme → Journey summary
7. Tap "Start My Journey" → Today tab (confetti plays)

### Flow 2: Daily Check-In
1. Open app → Today tab
2. View daily quote and progress ring
3. Tap "Log Activity" → Activity modal
4. Select activity and duration → Save
5. Progress ring updates with animation
6. Return to Today tab

### Flow 3: Chat with AI Coach
1. Tap Coach tab → Chat interface
2. Tap suggested prompt OR type message
3. Send message → Typing indicator appears
4. Coach response appears with animation
5. Continue conversation

### Flow 4: View Progress
1. Tap Analytics tab → Charts load
2. Tap time range selector → Charts update
3. Scroll to view all metrics
4. Tap insight card → Detailed view

### Flow 5: Edit Goals
1. Tap Profile tab → Settings list
2. Tap "Goals" → Goal selection screen
3. Toggle goals on/off
4. Tap "Save" → Return to profile

## Component Library

### Buttons
- **Primary**: Solid primary color, white text, 48pt height
- **Secondary**: Outline with primary color, primary text
- **Tertiary**: Text only, primary color
- **Icon**: Circular, 44pt size, icon centered

### Cards
- **Glass Card**: Glass morphism effect, 16pt radius
- **Activity Card**: Glass card + icon + title + progress + action button
- **Metric Card**: Glass card + large number + label + trend indicator
- **Milestone Card**: Glass card + badge icon + title + date

### Progress Indicators
- **Circular Ring**: Animated stroke, percentage in center
- **Linear Bar**: Horizontal, rounded ends, gradient fill
- **Step Indicator**: Dots with connecting lines, current step highlighted

### Input Fields
- **Text Input**: Glass card style, 48pt height, 12pt radius
- **Radio Button**: Circle outline, filled when selected
- **Checkbox**: Square outline, checkmark when selected
- **Toggle Switch**: iOS style, primary color when on

### Icons
- **Size**: 24pt (default), 28pt (tabs), 20pt (small)
- **Style**: Filled for active states, outline for inactive
- **Source**: Lucide icons (or SF Symbols on iOS)

## Accessibility
- Minimum touch target: 44x44pt
- Color contrast: WCAG AA compliant
- Text scaling: Support dynamic type
- VoiceOver: All interactive elements labeled
- Haptic feedback: On button taps and milestone achievements

## Technical Implementation Notes
- Use React Native Reanimated for all animations
- Use Expo Blur for glass morphism effects
- Use React Native SVG for progress rings and charts
- Use AsyncStorage for local data persistence
- Use react-native-confetti-cannon for confetti animations
- Use Expo Haptics for tactile feedback
- Implement dark mode with CSS variables in theme.ts
