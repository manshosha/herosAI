import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  OnboardingProfile,
  UniversalOnboardingAnswers,
  StrokeOnboardingAnswers,
  ParkinsonsOnboardingAnswers,
  ConditionType,
  Theme,
  THEME_TO_GOALS,
} from "@/types/heros";

const STORAGE_KEYS = {
  UNIVERSAL: "@onboarding_universal",
  STROKE: "@onboarding_stroke",
  PARKINSONS: "@onboarding_parkinsons",
  COMPLETED: "@onboarding_completed",
  PROFILE: "@onboarding_profile",
};

export function useOnboardingState() {
  const [currentStep, setCurrentStep] = useState(1);
  const [universal, setUniversal] = useState<Partial<UniversalOnboardingAnswers>>({});
  const [strokeAnswers, setStrokeAnswers] = useState<Partial<StrokeOnboardingAnswers>>({});
  const [parkinsonsAnswers, setParkinsonsAnswers] = useState<Partial<ParkinsonsOnboardingAnswers>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load persisted data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedUniversal, storedStroke, storedParkinsons, storedCompleted] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.UNIVERSAL),
          AsyncStorage.getItem(STORAGE_KEYS.STROKE),
          AsyncStorage.getItem(STORAGE_KEYS.PARKINSONS),
          AsyncStorage.getItem(STORAGE_KEYS.COMPLETED),
        ]);

        if (storedUniversal) setUniversal(JSON.parse(storedUniversal));
        if (storedStroke) setStrokeAnswers(JSON.parse(storedStroke));
        if (storedParkinsons) setParkinsonsAnswers(JSON.parse(storedParkinsons));
        if (storedCompleted) setIsCompleted(JSON.parse(storedCompleted));
      } catch (error) {
        console.error("Error loading onboarding data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateUniversal = useCallback((data: Partial<UniversalOnboardingAnswers>) => {
    setUniversal((prev) => {
      const updated = { ...prev, ...data };
      AsyncStorage.setItem(STORAGE_KEYS.UNIVERSAL, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateStrokeAnswers = useCallback((data: Partial<StrokeOnboardingAnswers>) => {
    setStrokeAnswers((prev) => {
      const updated = { ...prev, ...data };
      AsyncStorage.setItem(STORAGE_KEYS.STROKE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateParkinsonsAnswers = useCallback((data: Partial<ParkinsonsOnboardingAnswers>) => {
    setParkinsonsAnswers((prev) => {
      const updated = { ...prev, ...data };
      AsyncStorage.setItem(STORAGE_KEYS.PARKINSONS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getRecommendedThemes = useCallback((): Theme[] => {
    const themes: Theme[] = [];

    if (universal.condition === "stroke" && strokeAnswers) {
      const { primaryGoal, mobilityLevel, fallRisk, communicationImpact, upperExtremityFunction } = strokeAnswers;

      // Primary goal mapping
      if (primaryGoal === "move_independently") {
        themes.push("theme_1_move_independently");
      } else if (primaryGoal === "walk_confidence") {
        themes.push("theme_2_mobility_walking", "theme_12_walking_confidence");
      } else if (primaryGoal === "improve_arm_hand") {
        themes.push("theme_6_hand_arm", "theme_14_hand_arm_advanced");
      } else if (primaryGoal === "balance_coordination") {
        themes.push("theme_8_balance");
      } else if (primaryGoal === "strength_energy") {
        themes.push("theme_15_strength_energy");
      } else {
        themes.push("theme_18_general");
      }

      // Mobility level prioritization
      if (mobilityLevel === "mostly_seated" && !themes.includes("theme_2_mobility_walking")) {
        themes.push("theme_2_mobility_walking");
      }

      // Fall risk
      if (fallRisk === "often" && !themes.includes("theme_8_balance")) {
        themes.push("theme_8_balance");
      }

      // Communication impact
      if (communicationImpact === "speaking_difficult" || communicationImpact === "writing_reading_difficult") {
        if (!themes.includes("theme_5_communication")) {
          themes.push("theme_5_communication");
        }
      }

      // Upper extremity function
      if (upperExtremityFunction === "one_harder" || upperExtremityFunction === "both_struggle") {
        if (!themes.includes("theme_6_hand_arm")) {
          themes.push("theme_6_hand_arm");
        }
      }
    } else if (universal.condition === "parkinsons" && parkinsonsAnswers) {
      // Similar logic for Parkinson's
      const { primaryGoal, mobilityLevel, postureBalance } = parkinsonsAnswers;

      if (primaryGoal === "move_independently") {
        themes.push("theme_1_move_independently");
      } else if (primaryGoal === "walk_confidence") {
        themes.push("theme_2_mobility_walking");
      } else if (primaryGoal === "improve_arm_hand") {
        themes.push("theme_6_hand_arm");
      } else if (primaryGoal === "balance_coordination") {
        themes.push("theme_8_balance");
      } else if (primaryGoal === "strength_energy") {
        themes.push("theme_15_strength_energy");
      } else {
        themes.push("theme_18_general");
      }

      if (postureBalance) {
        if (!themes.includes("theme_8_balance")) {
          themes.push("theme_8_balance");
        }
      }
    }

    // Remove duplicates
    return Array.from(new Set(themes));
  }, [universal.condition, strokeAnswers, parkinsonsAnswers]);

  const completeOnboarding = useCallback(async (): Promise<OnboardingProfile | null> => {
    if (!universal.name || !universal.dateOfBirth || !universal.condition) {
      return null;
    }

    const themes = getRecommendedThemes();

    const profile: OnboardingProfile = {
      name: universal.name,
      dateOfBirth: universal.dateOfBirth,
      condition: universal.condition,
      conditionSpecific:
        universal.condition === "stroke"
          ? (strokeAnswers as StrokeOnboardingAnswers)
          : (parkinsonsAnswers as ParkinsonsOnboardingAnswers),
      recommendedThemes: themes,
      completedDate: new Date(),
    };

    // Save profile and mark as completed
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(true));
    setIsCompleted(true);

    return profile;
  }, [universal, strokeAnswers, parkinsonsAnswers, getRecommendedThemes]);

  const resetOnboarding = useCallback(async () => {
    setUniversal({});
    setStrokeAnswers({});
    setParkinsonsAnswers({});
    setIsCompleted(false);
    setCurrentStep(1);

    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.UNIVERSAL),
      AsyncStorage.removeItem(STORAGE_KEYS.STROKE),
      AsyncStorage.removeItem(STORAGE_KEYS.PARKINSONS),
      AsyncStorage.removeItem(STORAGE_KEYS.COMPLETED),
      AsyncStorage.removeItem(STORAGE_KEYS.PROFILE),
    ]);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    currentStep,
    universal,
    strokeAnswers,
    parkinsonsAnswers,
    isCompleted,
    loading,
    updateUniversal,
    updateStrokeAnswers,
    updateParkinsonsAnswers,
    nextStep,
    previousStep,
    getRecommendedThemes,
    completeOnboarding,
    resetOnboarding,
  };
}
