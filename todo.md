# HerosAI Rehabilitation App - TODO

## Zing.coach-Inspired UI Redesign
### Design System Updates
- [x] Update color palette to Zing-style (light backgrounds, purple gradients, subtle grays)
- [x] Enhance glassmorphism effects (subtle blur, light borders, shadows)
- [ ] Add premium icon set (high-quality, consistent style)
- [x] Update typography (cleaner, more readable)
- [ ] Add gradient overlays for hero sections
- [x] Update button styles (rounded, subtle shadows)
- [ ] Add badge/pill components for labels

### Component Redesign
- [ ] GlassCard - lighter, more subtle blur
- [ ] PrimaryButton - rounded, gradient option
- [ ] ChipButton - pill-shaped, light background
- [ ] ProgressRing - thinner stroke, gradient colors
- [ ] Task cards - rounded corners, image thumbnails, clean layout
- [ ] Navigation bar - cleaner icons, better spacing

### Screen Redesign
- [ ] Welcome screen - gradient background, cleaner layout
- [ ] Onboarding questions - lighter cards, better spacing
- [x] Today screen - hero workout card, horizontal task scrolling, activity streak
- [x] Journey screen - timeline with milestones, progress cards
- [x] Analytics screen - clean charts, stat cards, test cards with images
- [x] Coach screen - chat bubbles with better styling, coach avatar
- [x] Profile screen - stats grid, clean settings list

### Assets & Icons
- [x] Add high-quality exercise/activity icons
- [x] Add workout thumbnail images
- [x] Add coach avatar images
- [x] Add achievement/badge icons
- [x] Add streak flame icon
- [x] Create gradient overlay component
- [x] Create image card component with overlays
- [x] Create achievement badge component
- [x] Create streak indicator component
- [x] Create coach avatar component
- [x] Enhance welcome screen with animations and gradients
- [x] Enhance onboarding screens with improved design

## Task Management & Execution
- [x] Build task detail screen with exercise instructions
- [x] Integrate goal data into Today screen task recommendations
- [x] Display milestone progress on Journey screen
- [x] Add task completion tracking and progress updates
- [x] Create useTaskCompletion hook for AsyncStorage persistence

## 14-Question Onboarding Flow
### Universal Questions
- [x] Q1: Name (text input)
- [x] Q2: Date of Birth (date picker)
- [x] Q3: Condition Selection (Stroke or Parkinson's - branching point)

### Stroke-Specific Questions (Q4-Q14)
- [x] Q4: Stroke Type (Ischemic, Hemorrhagic, TIA, I don't know)
- [x] Q5: Mobility Level (walk without support, with cane/walker, need help, mostly seated)
- [x] Q6: Laterality/Hemiparesis (left side, right side, both sides, unsure)
- [x] Q7: Primary Goal (move independently, improve arm/hand, walk with confidence, balance, strength, not sure)
- [x] Q8: Fall Risk/Balance (often, occasionally, not really)
- [x] Q9: Speech/Communication Impact (speaking difficult, writing/reading difficult, communicate well, no change)
- [x] Q10: Upper Extremity Function (both arms well, one harder, both struggle, mostly don't use)
- [x] Q11: Music/Rhythm Preference (yes, maybe, no)
- [x] Q12: Reminders & Encouragement (yes please, maybe try without, no)
- [x] Q13: Medications (photo upload - optional)
- [x] Q14: Emotional Baseline (emoji scale)le)

### Parkinson's-Specific Questions (Q4-Q14)
- [ ] Q4: Parkinson's Stage/Severity
- [ ] Q5-Q14: Parkinson's-specific variants of stroke questions

## Data Models
- [x] Update UserProfile with all 14 answers
- [x] Create OnboardingState for tracking progress
- [ ] Create conditional branching logic based on condition type
- [ ] Map answers to recommended themes

## UI Components
- [x] DatePicker component
- [ ] PhotoUpload component for medications
- [x] EmojiScale component for emotional baseline
- [x] MultiSelectButtons for multiple choice questions

## Integration
- [x] Save onboarding answers to AsyncStorage
- [x] Map answers to personalized theme recommendations
- [x] Display results summary with theme assignments
- [ ] Update Today screen based on theme assignments

## Testing
- [ ] Test Stroke pathway with all variations
- [ ] Test Parkinson's pathway with all variations
- [ ] Verify theme mapping logic
- [ ] Test photo upload functionality
- [ ] Verify conditional branching

## Bug Fixes
- [x] Fix routing configuration for onboarding screens
- [x] Ensure all routes are registered in _layout.tsx
- [x] Fix navigation flow from index to onboarding


## Goal Selection Feature
- [x] Create interactive goal selection screen with 8 goals
- [x] Add multi-select checkboxes with 2-4 goal requirement
- [x] Display goal descriptions, milestones, and task counts
- [x] Show selected count and validation message
- [x] Update onboarding flow to include goal selection
- [x] Store selected goals in onboarding state
- [ ] Update summary screen to show selected goals


## Home Screen Redesign (Zing-Inspired)
- [x] Add purple gradient hero section with week calendar
- [x] Add personalized greeting with user name
- [x] Add featured rehabilitation session card
- [x] Add quick action buttons (Custom Workout, Saved Workouts)
- [x] Add daily tasks horizontal scrolling section
- [x] Add activity streak and stats display
- [x] Integrate with selected goals and milestones


## Welcome Screen
- [x] Create HerosAI welcome/landing screen with feature cards
- [x] Add animated gradient circle background
- [x] Implement "Get Started" button navigation
- [x] Update index.tsx to show welcome screen first
- [x] Add AsyncStorage check for welcome screen completion

## Goal Data Population
- [x] Create goal data with all 4 milestones for "Take Care of Myself at Home"
- [x] Add all OT exercises, podcasts, and cognitive games
- [x] Create goal detail screen showing milestones
- [x] Create milestone detail screen showing all tasks
- [ ] Build task detail screen with exercise instructions
- [ ] Integrate goal data into Today screen task recommendations
- [ ] Display milestone progress on Journey screen

## Theme-Based Personalization
- [x] Update Today screen to use recommended themes from onboarding
- [x] Filter tasks based on user's theme assignments
- [x] Personalize hero section colors based on primary theme
- [x] Display theme-specific goals and recommendations
- [x] Create useThemeGoals hook for theme-based task filtering

## Premium Icon Set
- [x] Generate OT (Occupational Therapy) icon
- [x] Generate PT (Physical Therapy) icon
- [x] Generate Podcast icon
- [x] Generate Meditation icon
- [x] Generate Game/Cognitive icon
- [x] Generate Speech & Language Therapy icon
- [x] Create icon mapping system
- [x] Update task components to use new icons
- [x] Create TaskIcon component with color-coded backgrounds
- [x] Integrate icons into Today screen task display

## Journey Screen Enhancements
- [x] Add activity type icons to milestone progress timeline
- [x] Implement task grouping by type (OT, PT, Speech, Podcast, Meditation, Game)
- [x] Update task list display with grouped sections
- [x] Add visual separators between task type groups
- [x] Display task count per type
- [x] Create groupTasksByType utility function
- [x] Integrate TaskIcon component into milestone display

## Grouped Exercise Modal
- [x] Create task group modal/sheet component
- [x] Build exercise list display with thumbnails and details
- [x] Add exercise category labels and duration display
- [x] Integrate modal into Journey screen with tap handlers
- [ ] Integrate modal into Today screen with tap handlers
- [x] Add "Start Exercise" button with navigation

## Today Screen Task Grouping
- [x] Refactor Today screen to display grouped exercises by type
- [x] Replace individual task list with task type group cards
- [x] Integrate TaskGroupModal into Today screen
- [x] Add tap handlers to group cards to open modal
- [x] Update Grouped Exercise Modal
- [x] Integrate modal into Today screen with tap handlers

## Navigation Updates
- [x] Hide task-detail page from bottom navigation bar
- [x] Restore Analytics tab visibility (was hidden by mistake)

## Populate All Activity Types
- [x] Add PT exercise tasks to goal milestones
- [x] Add cognitive game tasks to goal milestones
- [x] Add podcast tasks to goal milestones
- [x] Add meditation tasks to goal milestones

## Theme Mapping for All Activity Types
- [x] Update useThemeGoals to include all task types regardless of theme
- [x] Ensure OT, PT, Speech, Cognitive Games, Podcasts, and Meditation all appear

## Expandable Calendar
- [x] Create expandable calendar component with month view
- [x] Add activity dots to calendar days based on task schedule
- [x] Integrate expandable calendar into Today screen
- [x] Add tap handler to expand/collapse calendar

## Instagram Stories-Style Exercise Introduction
- [x] Generate story images for OT exercises
- [x] Generate story images for PT exercises
- [x] Generate story images for Podcast content
- [x] Generate story images for Meditation content
- [x] Generate story images for Cognitive games
- [x] Create Stories component with progress bar
- [x] Add swipe/tap navigation between story slides
- [x] Integrate Stories into task detail flow
- [x] Add "Start Exercise" button at end of stories

## Task Details Page Redesign
- [x] Generate body part focus icons (upper body, lower body, full body, hands, core, head/brain)
- [x] Update exercise data with body focus mappings
- [x] Add detailed step-by-step instructions to each exercise
- [x] Redesign task-detail screen with hero image section
- [x] Add body part indicator with icon
- [x] Add stats section (duration, sets, level)
- [x] Add "Correct Form" instructions section
- [x] Add "Start Exercise" button at bottom

## Calendar Styling Update
- [x] Update expandable calendar to use orange/coral gradient
- [x] Match calendar colors with app's hero section aesthetic

## Calendar Completion Status Dots
- [x] Add green dots for completed days
- [x] Add orange dots for in-progress days
- [x] Add gray dots for scheduled future days
- [x] Integrate task completion data into calendar
- [x] Add legend showing dot color meanings

## My Medicines Feature
- [x] Replace "custom workout" with "My Medicines" section on Profile screen
- [x] Create medicine list display with name, dosage, and frequency
- [x] Add ability to view medicines from onboarding data

## My Medicines Display Fix
- [x] Debug My Medicines section visibility on Profile screen
- [x] Ensure section displays correctly after onboarding completion
- [x] Verified section appears on Profile tab after onboarding completion

## Move My Medicines to Home Screen
- [x] Add My Medicines section to Today screen
- [x] Remove My Medicines from Profile screen
- [x] Position medicines section above task groups on Today screen
- [x] Simplify My Medications card to display only "My Medications" text
- [x] Add large medicine icon (💊) to My Medications card

## Medicines Detail Page
- [x] Create medicines detail page with Instagram story-style timeline
- [x] Display medicines with time-based reminders (morning, afternoon, evening, etc.)
- [x] Show medicine icons/images and dosage information
- [x] Add completion checkboxes for each medicine reminder
- [x] Make My Medications card tappable to navigate to medicines page
- [ ] Integrate onboarding medicines data into the page

## Medicines Stories Carousel
- [x] Create medicines stories carousel component with Instagram Stories UI
- [x] Display 3 pills as separate full-screen pages with pill illustrations
- [x] Show progress bars at top (like Instagram Stories)
- [x] Auto-advance each story after 8 seconds
- [x] Add "I took this" button popup at bottom of each story
- [x] Implement swipe/tap navigation between pills
- [x] Show pill name, dosage, and next dose time on each story
- [x] Display carousel before medicines-detail page on navigation

## Progress Bars Enhancement
- [x] Increase progress bar height for better visibility
- [x] Improve contrast between background and fill
- [x] Add shadow/elevation to progress bars
- [x] Increase padding/spacing around progress bars

## Swipe Gesture Navigation
- [x] Implement horizontal swipe detection in medicines stories
- [x] Swipe left to advance to next story
- [x] Swipe right to go back to previous story
- [x] Add visual feedback for swipe gestures

## Pill Pages Redesign
- [x] Redesign pill pages to match screenshot layout
- [x] Create card-based layout with light beige background
- [x] Position pill illustration at top center
- [x] Display medicine name in dark blue, larger font
- [x] Show dosage info (e.g., "2 pills", "500mg each")
- [x] Display time in dark blue
- [x] Style "I took this" button with orange background
- [x] Remove header and progress bars from story view

## Daily Activities Progress Bar
- [x] Add progress bar above "Today's Tasks" section
- [x] Display completion percentage of daily activities
- [x] Show completed vs total tasks count
- [x] Style with glass morphism design

## Homepage Layout Changes
- [x] Move "Hi there, user" greeting to single line
- [x] Remove "Good day so far?" subtitle
- [x] Remove descriptive text under featured session minutes

## Medicines Detail Page Accessibility
- [x] Increase time text font size for better visibility
- [x] Increase medicine name font size
- [x] Increase dosage information font size
- [x] Increase checkbox size for easier interaction
- [x] Improve contrast and spacing for visual impairment accessibility

## Medicines Detail Page Color Update
- [x] Change purple accents to orange in medicines detail page

## Celebration Popup for Completed Medications
- [x] Create confetti celebration popup component
- [x] Display "Good Job!" message when all medications taken
- [x] Add confetti animation background
- [x] Integrate popup into medicines detail page
- [x] Add haptic feedback and sound effects
- [x] Auto-dismiss popup after 3-4 seconds

## Achievement Sharing
- [x] Add "Share Achievement" button to celebration popup
- [x] Implement WhatsApp sharing functionality
- [x] Implement SMS sharing functionality
- [x] Create achievement message text
- [x] Update popup UI with share buttons

## Exercise Page Updates
- [x] Limit exercises to 3 on exercise page

## Home Screen Accessibility
- [x] Increase daily activities text size for visual impairment
- [x] Increase exercises text size for visual impairment
- [x] Improve contrast and spacing for better readability

## Daily Exercises Verification
- [x] Verify only 3 exercises/activities per day on home screen

## Activity Type Filtering
- [x] Display all activity types with maximum 3 exercises per type

## Task Type Icons
- [x] Add icons to OT exercises
- [x] Add icons to PT exercises
- [x] Add icons to speech exercises
- [x] Add icons to cognitive games
- [x] Add icons to podcasts
- [x] Add icons to meditation
- [x] Add icons to chat

## Journey Page Color Update
- [x] Replace purple elements with orange in Journey page

## Task Detail Page Redesign
- [ ] Create hero header with gradient background (orange)
- [ ] Add personalization text ("Special for [User]")
- [ ] Display duration prominently (28 min)
- [ ] Show muscle groups/focus areas
- [ ] Add Save, Music, Share buttons
- [ ] Create plan calibration section with progress indicator
- [ ] Add equipment needed section with icons
- [ ] Add "What You'll Do" section with expandable items
- [ ] Add Start Workout button (black/dark)
- [ ] Add Adapt Workout option
