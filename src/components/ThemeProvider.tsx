"use client";

/**
 * ThemeProvider — simplified pass-through.
 * Dark mode removed for scientific credibility (light-only theme).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
