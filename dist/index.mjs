import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';

// src/tokens.ts
var baseTokens = {
  radius: {
    sm: 6,
    md: 12,
    lg: 20,
    xl: 24
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24
  },
  fontSize: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 26,
    xxxxl: 32
  },
  fontWeight: {
    regular: "400",
    medium: "600",
    bold: "700"
  }
};

// src/lightTheme.ts
var lightTheme = {
  ...baseTokens,
  colors: {
    background: "#ffffff",
    surface: "#f8f8f8",
    card: "#ffffff",
    border: "#d1d1d1",
    inverted: "#000",
    invertedMuted: "#333333",
    invertedExtraMuted: "#ededed",
    boxShadow: "rgba(0, 0, 0, 0.25)",
    textPrimary: "#000000",
    textSecondary: "#666666",
    textMuted: "#999999",
    accent: "#26702A",
    accentText: "#ffffff",
    success: "#2ecc71",
    warning: "#f39c12",
    info: "#3498db",
    danger: "#e74c3c"
  }
};

// src/darkTheme.ts
var darkTheme = {
  ...baseTokens,
  colors: {
    background: "#191919",
    surface: "#222222",
    card: "#1f1f1f",
    border: "#3a3a3a",
    inverted: "#fff",
    invertedMuted: "#333333",
    invertedExtraMuted: "#2e2e2e",
    boxShadow: "rgba(255,255,255,0.13)",
    textPrimary: "#f5f5f5",
    textSecondary: "#b3b3b3",
    textMuted: "#9a9a9a",
    accent: "#26702A",
    accentText: "#ffffff",
    success: "#2ecc71",
    warning: "#f5b041",
    info: "#5dade2",
    danger: "#ec7063"
  }
};
var _a;
var systemScheme = (_a = Appearance.getColorScheme()) != null ? _a : "light";
var customResolver = null;
function registerThemeResolver(resolver) {
  customResolver = resolver;
}
function resolveTheme(mode) {
  if (customResolver) return customResolver(mode);
  return mode === "dark" ? darkTheme : lightTheme;
}
var useThemeStore = create()(
  persist(
    (set, get) => ({
      mode: systemScheme,
      theme: resolveTheme(systemScheme),
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      toggleMode: () => {
        const next = get().mode === "dark" ? "light" : "dark";
        set({ mode: next, theme: resolveTheme(next) });
      },
      setMode: (mode) => {
        set({ mode, theme: resolveTheme(mode) });
      }
    }),
    {
      name: "rn-theme-kit-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.theme = resolveTheme(state.mode);
          state.setHasHydrated(true);
        }
      }
    }
  )
);

// src/useTheme.ts
function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const mode = useThemeStore((s) => s.mode);
  const toggleMode = useThemeStore((s) => s.toggleMode);
  const setMode = useThemeStore((s) => s.setMode);
  return { theme, mode, toggleMode, setMode, isDark: mode === "dark" };
}
function ThemeProvider({ children, fallback }) {
  const hasHydrated = useThemeStore((s) => s._hasHydrated);
  if (!hasHydrated) {
    return fallback ? /* @__PURE__ */ React.createElement(React.Fragment, null, fallback) : /* @__PURE__ */ React.createElement(View, { style: styles.fallback }, /* @__PURE__ */ React.createElement(ActivityIndicator, { size: "large" }));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
var styles = StyleSheet.create({
  fallback: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export { ThemeProvider, baseTokens, darkTheme, lightTheme, registerThemeResolver, useTheme, useThemeStore };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map