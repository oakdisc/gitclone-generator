"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Logo from "./components/Logo";
import Footer from "./components/Footer";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Logo />
        {children}
        <Footer />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
