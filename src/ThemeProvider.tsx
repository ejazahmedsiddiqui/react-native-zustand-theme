import React, { ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeStore } from './themeStore';

interface ThemeProviderProps {
    children: ReactNode;
    /** Custom loading fallback while AsyncStorage hydrates */
    fallback?: ReactNode;
}

export function ThemeProvider({ children, fallback }: ThemeProviderProps) {
    const hasHydrated = useThemeStore((s) => s._hasHydrated);

    if (!hasHydrated) {
        return fallback ? (
            <>{fallback}</>
        ) : (
            <View style={styles.fallback}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>{children}</>;
}

const styles = StyleSheet.create({
    fallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});