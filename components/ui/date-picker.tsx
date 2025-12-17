import { useState } from "react";
import { StyleSheet, View, Pressable, Modal, ScrollView } from "react-native";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import { PrimaryButton } from "./primary-button";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  label?: string;
}

export function DatePicker({ value, onChange, label = "Select Date" }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(value?.getMonth() ?? new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(value?.getDate() ?? 1);
  const [selectedYear, setSelectedYear] = useState(value?.getFullYear() ?? new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const days = Array.from({ length: daysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  const handleConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(new Date(selectedYear, selectedMonth, selectedDay));
    setShowPicker(false);
  };

  const displayDate = value
    ? `${months[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`
    : "Select date";

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setShowPicker(true);
        }}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: Colors.light.surface,
            borderColor: Colors.light.border,
          },
          pressed && styles.buttonPressed,
        ]}
      >
        <ThemedText style={styles.buttonText}>{displayDate}</ThemedText>
      </Pressable>

      <Modal visible={showPicker} transparent animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              {label}
            </ThemedText>

            <View style={styles.pickerContainer}>
              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <ThemedText type="defaultSemiBold" style={styles.pickerLabel}>
                  Month
                </ThemedText>
                <ScrollView
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {months.map((month, index) => (
                    <Pressable
                      key={month}
                      onPress={() => setSelectedMonth(index)}
                      style={[
                        styles.pickerItem,
                        selectedMonth === index && styles.pickerItemSelected,
                      ]}
                    >
                      <ThemedText
                        style={[
                          selectedMonth === index && { color: Colors.light.tint },
                        ]}
                      >
                        {month}
                      </ThemedText>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Day Picker */}
              <View style={styles.pickerColumn}>
                <ThemedText type="defaultSemiBold" style={styles.pickerLabel}>
                  Day
                </ThemedText>
                <ScrollView
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {days.map((day) => (
                    <Pressable
                      key={day}
                      onPress={() => setSelectedDay(day)}
                      style={[
                        styles.pickerItem,
                        selectedDay === day && styles.pickerItemSelected,
                      ]}
                    >
                      <ThemedText
                        style={[
                          selectedDay === day && { color: Colors.light.tint },
                        ]}
                      >
                        {day}
                      </ThemedText>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <ThemedText type="defaultSemiBold" style={styles.pickerLabel}>
                  Year
                </ThemedText>
                <ScrollView
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {years.map((year) => (
                    <Pressable
                      key={year}
                      onPress={() => setSelectedYear(year)}
                      style={[
                        styles.pickerItem,
                        selectedYear === year && styles.pickerItemSelected,
                      ]}
                    >
                      <ThemedText
                        style={[
                          selectedYear === year && { color: Colors.light.tint },
                        ]}
                      >
                        {year}
                      </ThemedText>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.buttonGroup}>
              <Pressable
                onPress={() => setShowPicker(false)}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.cancelButtonPressed,
                ]}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </Pressable>
              <PrimaryButton label="Confirm" onPress={handleConfirm} />
            </View>
          </View>
        </ThemedView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderTopLeftRadius: BorderRadius.large,
    borderTopRightRadius: BorderRadius.large,
  },
  modalTitle: {
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    height: 200,
  },
  pickerColumn: {
    flex: 1,
    gap: Spacing.sm,
  },
  pickerLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  pickerScroll: {
    flex: 1,
  },
  pickerItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: "center",
  },
  pickerItemSelected: {
    backgroundColor: "rgba(139, 127, 232, 0.1)",
    borderRadius: BorderRadius.small,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.light.border,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonPressed: {
    opacity: 0.7,
  },
  cancelButtonText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    fontWeight: "600",
  },
});
