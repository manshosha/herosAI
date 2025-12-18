import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";
import { SESSION_TOKEN_KEY, USER_INFO_KEY } from "@/constants/oauth";

export type User = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  lastSignedIn: Date;
};

// --- SESSION TOKEN MANAGEMENT ---
// Keeps your original logic: Web uses Cookies (handled by browser), Native uses Storage.

export async function getSessionToken(): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      // On web, we rely on HTTP cookies automatically sent with requests.
      // We do NOT look in storage.
      return null;
    }

    // For Native (simulated in Bolt), we read from storage.
    const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("[Auth] Failed to get session token:", error);
    return null;
  }
}

export async function setSessionToken(token: string): Promise<void> {
  try {
    if (Platform.OS === "web") {
       // On web, the backend likely sets a cookie. We do nothing here.
      return;
    }

    await AsyncStorage.setItem(SESSION_TOKEN_KEY, token);
  } catch (error) {
    console.error("[Auth] Failed to set session token:", error);
    throw error;
  }
}

export async function removeSessionToken(): Promise<void> {
  try {
    if (Platform.OS === "web") {
      return;
    }
    await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
  } catch (error) {
    console.error("[Auth] Failed to remove session token:", error);
  }
}

// --- USER INFO MANAGEMENT ---
// Changed to use AsyncStorage everywhere. It works on Web (via localStorage)
// and Native (via file storage), preventing crashes.

export async function getUserInfo(): Promise<User | null> {
  try {
    const info = await AsyncStorage.getItem(USER_INFO_KEY);

    if (!info) {
      return null;
    }
    return JSON.parse(info);
  } catch (error) {
    console.error("[Auth] Failed to get user info:", error);
    return null;
  }
}

export async function setUserInfo(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("[Auth] Failed to set user info:", error);
  }
}

export async function clearUserInfo(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_INFO_KEY);
  } catch (error) {
    console.error("[Auth] Failed to clear user info:", error);
  }
}