"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui", prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
