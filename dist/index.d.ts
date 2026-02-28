import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import React, { ReactNode } from 'react';

declare const lightTheme: {
    readonly colors: {
        readonly background: "#ffffff";
        readonly surface: "#f8f8f8";
        readonly card: "#ffffff";
        readonly border: "#d1d1d1";
        readonly inverted: "#000";
        readonly invertedMuted: "#333333";
        readonly invertedExtraMuted: "#ededed";
        readonly boxShadow: "rgba(0, 0, 0, 0.25)";
        readonly textPrimary: "#000000";
        readonly textSecondary: "#666666";
        readonly textMuted: "#999999";
        readonly accent: "#26702A";
        readonly accentText: "#ffffff";
        readonly success: "#2ecc71";
        readonly warning: "#f39c12";
        readonly info: "#3498db";
        readonly danger: "#e74c3c";
    };
    readonly radius: {
        readonly sm: 6;
        readonly md: 12;
        readonly lg: 20;
        readonly xl: 24;
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 16;
        readonly lg: 20;
        readonly xl: 24;
    };
    readonly fontSize: {
        readonly sm: 12;
        readonly md: 14;
        readonly lg: 16;
        readonly xl: 18;
        readonly xxl: 22;
        readonly xxxl: 26;
        readonly xxxxl: 32;
    };
    readonly fontWeight: {
        readonly regular: "400";
        readonly medium: "600";
        readonly bold: "700";
    };
};
type LightTheme = typeof lightTheme;

declare const darkTheme: {
    readonly colors: {
        readonly background: "#191919";
        readonly surface: "#222222";
        readonly card: "#1f1f1f";
        readonly border: "#3a3a3a";
        readonly inverted: "#fff";
        readonly invertedMuted: "#333333";
        readonly invertedExtraMuted: "#2e2e2e";
        readonly boxShadow: "rgba(255,255,255,0.13)";
        readonly textPrimary: "#f5f5f5";
        readonly textSecondary: "#b3b3b3";
        readonly textMuted: "#9a9a9a";
        readonly accent: "#26702A";
        readonly accentText: "#ffffff";
        readonly success: "#2ecc71";
        readonly warning: "#f5b041";
        readonly info: "#5dade2";
        readonly danger: "#ec7063";
    };
    readonly radius: {
        readonly sm: 6;
        readonly md: 12;
        readonly lg: 20;
        readonly xl: 24;
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 16;
        readonly lg: 20;
        readonly xl: 24;
    };
    readonly fontSize: {
        readonly sm: 12;
        readonly md: 14;
        readonly lg: 16;
        readonly xl: 18;
        readonly xxl: 22;
        readonly xxxl: 26;
        readonly xxxxl: 32;
    };
    readonly fontWeight: {
        readonly regular: "400";
        readonly medium: "600";
        readonly bold: "700";
    };
};
type DarkTheme = typeof darkTheme;

declare const baseTokens: {
    readonly radius: {
        readonly sm: 6;
        readonly md: 12;
        readonly lg: 20;
        readonly xl: 24;
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 16;
        readonly lg: 20;
        readonly xl: 24;
    };
    readonly fontSize: {
        readonly sm: 12;
        readonly md: 14;
        readonly lg: 16;
        readonly xl: 18;
        readonly xxl: 22;
        readonly xxxl: 26;
        readonly xxxxl: 32;
    };
    readonly fontWeight: {
        readonly regular: "400";
        readonly medium: "600";
        readonly bold: "700";
    };
};
type BaseTokens = typeof baseTokens;

type ThemeMode = 'light' | 'dark';
type Theme = LightTheme | DarkTheme;
interface ThemeState {
    mode: ThemeMode;
    theme: Theme;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}
declare function registerThemeResolver(resolver: (mode: ThemeMode) => Theme): void;
declare const useThemeStore: zustand.UseBoundStore<Omit<zustand.StoreApi<ThemeState>, "setState" | "persist"> & {
    setState(partial: ThemeState | Partial<ThemeState> | ((state: ThemeState) => ThemeState | Partial<ThemeState>), replace?: false | undefined): unknown;
    setState(state: ThemeState | ((state: ThemeState) => ThemeState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<ThemeState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ThemeState) => void) => () => void;
        onFinishHydration: (fn: (state: ThemeState) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<ThemeState, unknown, unknown>>;
    };
}>;

declare function useTheme(): {
    theme: Theme;
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
    isDark: boolean;
};

interface ThemeProviderProps {
    children: ReactNode;
    /** Custom loading fallback while AsyncStorage hydrates */
    fallback?: ReactNode;
}
declare function ThemeProvider({ children, fallback }: ThemeProviderProps): React.JSX.Element;

export { type BaseTokens, type DarkTheme, type LightTheme, type Theme, type ThemeMode, ThemeProvider, type ThemeState, baseTokens, darkTheme, lightTheme, registerThemeResolver, useTheme, useThemeStore };
