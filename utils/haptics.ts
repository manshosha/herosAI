import { Platform } from 'react-native';

const loadHaptics = () => {
  if (Platform.OS !== 'web') {
    return require('expo-haptics');
  }
  return null;
};

export const triggerHaptic = {
  impact: (style?: any) => {
    if (Platform.OS !== 'web') {
      const Haptics = loadHaptics();
      if (Haptics) {
        Haptics.impactAsync(style || Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  },
  notification: (type?: any) => {
    if (Platform.OS !== 'web') {
      const Haptics = loadHaptics();
      if (Haptics) {
        Haptics.notificationAsync(type || Haptics.NotificationFeedbackType.Success);
      }
    }
  },
  selection: () => {
    if (Platform.OS !== 'web') {
      const Haptics = loadHaptics();
      if (Haptics) {
        Haptics.selectionAsync();
      }
    }
  },
};
