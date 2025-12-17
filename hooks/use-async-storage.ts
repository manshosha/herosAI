import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load value from AsyncStorage on mount
  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored !== null) {
          setValue(JSON.parse(stored));
        }
      } catch (err) {
        console.error(`Error loading ${key} from AsyncStorage:`, err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key]);

  // Save value to AsyncStorage
  const save = useCallback(
    async (newValue: T) => {
      try {
        setValue(newValue);
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
      } catch (err) {
        console.error(`Error saving ${key} to AsyncStorage:`, err);
        setError(err as Error);
      }
    },
    [key]
  );

  // Remove value from AsyncStorage
  const remove = useCallback(async () => {
    try {
      setValue(defaultValue);
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from AsyncStorage:`, err);
      setError(err as Error);
    }
  }, [key, defaultValue]);

  return { value, save, remove, loading, error };
}
