import { useCallback, useEffect, useState } from "react";

export type LoginPosition = "left" | "center" | "right";
export type InterfaceLocale = "zh-CN" | "en-US";
export type AccentTheme = "blue" | "violet" | "teal" | "orange";

export interface UiPreferences {
  position: LoginPosition;
  locale: InterfaceLocale;
  accentTheme: AccentTheme;
  darkMode: boolean;
}

interface StoredUiPreferences extends UiPreferences {
  version: 1;
}

const STORAGE_KEY = "admin-ui-preferences:v1";

export const DEFAULT_UI_PREFERENCES: UiPreferences = {
  position: "center",
  locale: "zh-CN",
  accentTheme: "blue",
  darkMode: false,
};

const LOGIN_POSITIONS = new Set<LoginPosition>(["left", "center", "right"]);
const INTERFACE_LOCALES = new Set<InterfaceLocale>(["zh-CN", "en-US"]);
const ACCENT_THEMES = new Set<AccentTheme>(["blue", "violet", "teal", "orange"]);

function isStoredUiPreferences(value: unknown): value is StoredUiPreferences {
  if (!value || typeof value !== "object") {
    return false;
  }

  const preferences = value as Partial<StoredUiPreferences>;

  return (
    preferences.version === 1 &&
    LOGIN_POSITIONS.has(preferences.position as LoginPosition) &&
    INTERFACE_LOCALES.has(preferences.locale as InterfaceLocale) &&
    ACCENT_THEMES.has(preferences.accentTheme as AccentTheme) &&
    typeof preferences.darkMode === "boolean"
  );
}

export function readUiPreferences(): UiPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_UI_PREFERENCES;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return DEFAULT_UI_PREFERENCES;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isStoredUiPreferences(parsedValue)) {
      return DEFAULT_UI_PREFERENCES;
    }

    return {
      position: parsedValue.position,
      locale: parsedValue.locale,
      accentTheme: parsedValue.accentTheme,
      darkMode: parsedValue.darkMode,
    };
  } catch {
    return DEFAULT_UI_PREFERENCES;
  }
}

export function applyUiPreferences(preferences: UiPreferences) {
  const root = document.documentElement;

  root.classList.toggle("dark", preferences.darkMode);
  root.dataset.accent = preferences.accentTheme;
  root.lang = preferences.locale;
}

export function initializeUiPreferences() {
  if (typeof document !== "undefined") {
    applyUiPreferences(readUiPreferences());
  }
}

export function useUiPreferences() {
  const [preferences, setPreferences] = useState<UiPreferences>(readUiPreferences);

  useEffect(() => {
    const storedPreferences: StoredUiPreferences = {
      version: 1,
      ...preferences,
    };

    applyUiPreferences(preferences);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedPreferences));
    } catch {
      // The visual preference still applies for the current session when storage is unavailable.
    }
  }, [preferences]);

  const updatePreference = useCallback(
    <Key extends keyof UiPreferences>(key: Key, value: UiPreferences[Key]) => {
      setPreferences((currentPreferences) => ({
        ...currentPreferences,
        [key]: value,
      }));
    },
    []
  );

  return { preferences, updatePreference };
}
