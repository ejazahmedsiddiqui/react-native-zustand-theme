import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { lightTheme, LightTheme } from './lightTheme';
import { darkTheme, DarkTheme } from './darkTheme';

export type ThemeMode = 'light' | 'dark';
export type Theme = LightTheme | DarkTheme;

export interface ThemeState {
    mode: ThemeMode;
    theme: Theme;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}

const systemScheme = (Appearance.getColorScheme() ?? 'light') as ThemeMode;

// Allow consumers to register custom theme resolvers
let customResolver: ((mode: ThemeMode) => Theme) | null = null;

export function registerThemeResolver(resolver: (mode: ThemeMode) => Theme) {
    customResolver = resolver;
}

function resolveTheme(mode: ThemeMode): Theme {
    if (customResolver) return customResolver(mode);
    return mode === 'dark' ? darkTheme : lightTheme;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            mode: systemScheme,
            theme: resolveTheme(systemScheme),
            _hasHydrated: false,

            setHasHydrated: (state) => set({ _hasHydrated: state }),

            toggleMode: () => {
                const next: ThemeMode = get().mode === 'dark' ? 'light' : 'dark';
                set({ mode: next, theme: resolveTheme(next) });
            },

            setMode: (mode: ThemeMode) => {
                set({ mode, theme: resolveTheme(mode) });
            },
        }),
        {
            name: 'rn-theme-kit-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ mode: state.mode }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.theme = resolveTheme(state.mode);
                    state.setHasHydrated(true);
                }
            },
        }
    )
);