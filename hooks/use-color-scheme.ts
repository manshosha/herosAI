/**
 * Force light mode for the entire app
 * Returns "light" regardless of system settings
 */
export function useColorScheme(): "light" | "dark" {
  return "light";
}
