import { useThemeStore } from './themeStore';
import type { Theme, ThemeMode } from './themeStore';

export function useTheme(): {
    theme: Theme;
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
    isDark: boolean;
} {
    const theme = useThemeStore((s) => s.theme);
    const mode = useThemeStore((s) => s.mode);
    const toggleMode = useThemeStore((s) => s.toggleMode);
    const setMode = useThemeStore((s) => s.setMode);

    return { theme, mode, toggleMode, setMode, isDark: mode === 'dark' };
}