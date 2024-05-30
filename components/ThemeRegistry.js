"use client";

import { ThemeProvider, createTheme } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import colors from 'tailwindcss/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.orange[500],
        }
    },
});

export default function ThemeRegistry({ children }) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                    {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}