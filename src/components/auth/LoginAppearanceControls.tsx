import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Languages,
  Moon,
  Palette,
  PanelsTopLeft,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  AccentTheme,
  InterfaceLocale,
  LoginPosition,
  UiPreferences,
} from "@/hooks/use-ui-preferences";

interface AppearanceCopy {
  toolbar: string;
  position: string;
  positions: Record<LoginPosition, string>;
  language: string;
  languages: Record<InterfaceLocale, string>;
  theme: string;
  themes: Record<AccentTheme, string>;
  darkMode: string;
  lightMode: string;
}

interface LoginAppearanceControlsProps {
  preferences: UiPreferences;
  copy: AppearanceCopy;
  onPreferenceChange: <Key extends keyof UiPreferences>(
    key: Key,
    value: UiPreferences[Key]
  ) => void;
}

const POSITION_OPTIONS = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
] as const;

const LANGUAGE_OPTIONS = ["zh-CN", "en-US"] as const;
const THEME_OPTIONS = ["violet", "blue", "teal", "orange"] as const;

export function LoginAppearanceControls({
  preferences,
  copy,
  onPreferenceChange,
}: LoginAppearanceControlsProps) {
  const ThemeModeIcon = preferences.darkMode ? Sun : Moon;
  const themeModeLabel = preferences.darkMode ? copy.lightMode : copy.darkMode;

  return (
    <div
      className="flex items-center gap-0.5 rounded-md border bg-header p-0.5 text-header-foreground shadow-sm"
      role="toolbar"
      aria-label={copy.toolbar}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={copy.position} title={copy.position}>
            <PanelsTopLeft />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{copy.position}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={preferences.position}
              onValueChange={(value) =>
                onPreferenceChange("position", value as LoginPosition)
              }
            >
              {POSITION_OPTIONS.map(({ value, icon: Icon }) => (
                <DropdownMenuRadioItem key={value} value={value}>
                  <Icon />
                  {copy.positions[value]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={copy.language} title={copy.language}>
            <Languages />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{copy.language}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={preferences.locale}
              onValueChange={(value) =>
                onPreferenceChange("locale", value as InterfaceLocale)
              }
            >
              {LANGUAGE_OPTIONS.map((locale) => (
                <DropdownMenuRadioItem key={locale} value={locale}>
                  {copy.languages[locale]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={copy.theme} title={copy.theme}>
            <Palette />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{copy.theme}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={preferences.accentTheme}
              onValueChange={(value) =>
                onPreferenceChange("accentTheme", value as AccentTheme)
              }
            >
              {THEME_OPTIONS.map((theme) => (
                <DropdownMenuRadioItem key={theme} value={theme}>
                  {copy.themes[theme]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        type="button"
        aria-label={themeModeLabel}
        title={themeModeLabel}
        onClick={() => onPreferenceChange("darkMode", !preferences.darkMode)}
      >
        <ThemeModeIcon />
      </Button>
    </div>
  );
}
