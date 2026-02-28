# react-native-zustand-theme

A lightweight, type-safe theming library for React Native, powered by [Zustand](https://github.com/pmndrs/zustand) and persisted via AsyncStorage. Ships with light/dark themes out of the box, full TypeScript support, and a simple hook-based API.

---

## Features

- 🌗 **Light & Dark mode** with system preference detection
- 💾 **Persistent** — theme choice survives app restarts via AsyncStorage
- ➕ **Extensible** — register your own custom theme resolver
- 🪝 **Hook-based API** — `useTheme()` is all you need in most cases
- ⚡ **Hydration gate** — `<ThemeProvider>` blocks render until AsyncStorage is ready
- 🔷 **Fully typed** — every token and color is strongly typed with `as const`

---

## Installation

```bash
npm install react-native-zustand-theme
```

### Peer Dependencies

Make sure these are installed in your project:

```bash
npm install zustand @react-native-async-storage/async-storage
```

| Peer Dependency | Version |
|---|---|
| `react` | `>=18.0.0` |
| `react-native` | `>=0.70.0` |
| `zustand` | `>=4.0.0` |
| `@react-native-async-storage/async-storage` | `>=1.0.0` |

---

## Quick Start

### 1. Wrap your app with `<ThemeProvider>`

```tsx
// app/_layout.tsx or App.tsx
import { ThemeProvider } from 'react-native-zustand-theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

### 2. Use the `useTheme` hook in any component

```tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-zustand-theme';

export default function MyScreen() {
  const { theme, toggleMode, isDark } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.textPrimary }}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <TouchableOpacity onPress={toggleMode}>
        <Text style={{ color: theme.colors.textSecondary }}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## API

### `<ThemeProvider>`

Wraps your app and blocks rendering until AsyncStorage has hydrated the persisted theme. Optionally accepts a custom fallback UI.

```tsx
import { ThemeProvider } from 'react-native-zustand-theme';
import { ActivityIndicator } from 'react-native';

<ThemeProvider fallback={<ActivityIndicator size="large" />}>
  <App />
</ThemeProvider>
```

| Prop | Type | Default                 | Description |
|---|---|-------------------------|---|
| `children` | `ReactNode` | N/A                     | Your app content |
| `fallback` | `ReactNode` | `<ActivityIndicator />` | Shown while AsyncStorage hydrates |

---

### `useTheme()`

The primary hook. Returns everything you need to style components and control the theme.

```ts
const { theme, mode, toggleMode, setMode, isDark } = useTheme();
```

| Return Value | Type | Description |
|---|---|---|
| `theme` | `Theme` | The full active theme object |
| `mode` | `'light' \| 'dark'` | Current theme mode string |
| `toggleMode` | `() => void` | Switches between light and dark |
| `setMode` | `(mode: ThemeMode) => void` | Set a specific mode explicitly |
| `isDark` | `boolean` | Convenience boolean for dark mode checks |

---

### `useThemeStore`

Direct access to the Zustand store if you need granular subscriptions. Prefer `useTheme()` for most use cases.

```ts
import { useThemeStore } from 'react-native-zustand-theme';

// Only use what you need. Avoids unnecessary re-renders
const toggleMode = useThemeStore((s) => s.toggleMode);
const hasHydrated = useThemeStore((s) => s._hasHydrated);
```

---

### `registerThemeResolver()`

Override the default light/dark theme with your own. Call this **once at app entry** before any component renders.

```ts
import { registerThemeResolver } from 'react-native-zustand-theme';
import { myLightTheme, myDarkTheme } from './myThemes';

registerThemeResolver((mode) =>
  mode === 'dark' ? myDarkTheme : myLightTheme
);
```

Your custom themes should extend `baseTokens` to stay compatible with the type system:

```ts
import { baseTokens } from 'react-native-zustand-theme';

export const myLightTheme = {
  ...baseTokens,
  colors: {
    background: '#fafafa',
    textPrimary: '#111111',
    accent: '#0057ff',
    // ...
  },
} as const;
```

---

## Theme Object

The `theme` object returned by `useTheme()` contains the following tokens:

### `theme.colors`

| Token | Light | Dark | Usage |
|---|---|---|---|
| `background` | `#ffffff` | `#191919` | Screen background |
| `surface` | `#f8f8f8` | `#222222` | Cards, sheets, modals |
| `card` | `#ffffff` | `#1f1f1f` | Individual card backgrounds |
| `border` | `#d1d1d1` | `#3a3a3a` | Dividers, input borders |
| `textPrimary` | `#000000` | `#f5f5f5` | Main body text |
| `textSecondary` | `#666666` | `#b3b3b3` | Supporting text |
| `textMuted` | `#999999` | `#9a9a9a` | Placeholder, captions |
| `accent` | `#26702A` | `#26702A` | Buttons, links, highlights |
| `accentText` | `#ffffff` | `#ffffff` | Text on accent backgrounds |
| `success` | `#2ecc71` | `#2ecc71` | Success states |
| `warning` | `#f39c12` | `#f5b041` | Warning states |
| `info` | `#3498db` | `#5dade2` | Info states |
| `danger` | `#e74c3c` | `#ec7063` | Error/destructive states |
| `inverted` | `#000` | `#fff` | Inverted text/icons |
| `boxShadow` | `rgba(0,0,0,0.25)` | `rgba(255,255,255,0.13)` | Shadow color values |

### `theme.spacing`

```ts
theme.spacing.xs  // 4
theme.spacing.sm  // 8
theme.spacing.md  // 16
theme.spacing.lg  // 20
theme.spacing.xl  // 24
```

### `theme.fontSize`

```ts
theme.fontSize.sm    // 12
theme.fontSize.md    // 14
theme.fontSize.lg    // 16
theme.fontSize.xl    // 18
theme.fontSize.xxl   // 22
theme.fontSize.xxxl  // 26
theme.fontSize.xxxxl // 32
```

### `theme.radius`

```ts
theme.radius.sm  // 6
theme.radius.md  // 12
theme.radius.lg  // 20
theme.radius.xl  // 24
```

### `theme.fontWeight`

```ts
theme.fontWeight.regular  // '400'
theme.fontWeight.medium   // '600'
theme.fontWeight.bold     // '700'
```

---

## StyleSheet Pattern

For performance, memoize your styles so they only recompute when the theme changes:

```tsx
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-zustand-theme';

export default function MyComponent() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <View style={styles.container} />;
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
});
```
---

## TypeScript

All exports are fully typed. Import types as needed:

```ts
import type {
  Theme,
  ThemeMode,
  ThemeState,
  LightTheme,
  DarkTheme,
  BaseTokens,
} from 'react-native-zustand-theme';
```

---

## Exports

| Export | Type | Description |
|---|---|---|
| `useTheme` | Hook | Primary hook — theme, mode, toggleMode, setMode, isDark |
| `useThemeStore` | Zustand store | Direct store access |
| `ThemeProvider` | Component | Hydration gate wrapper |
| `registerThemeResolver` | Function | Register a custom theme resolver |
| `lightTheme` | Object | Built-in light theme |
| `darkTheme` | Object | Built-in dark theme |
| `baseTokens` | Object | Spacing, radius, font tokens |

---

## License

MIT