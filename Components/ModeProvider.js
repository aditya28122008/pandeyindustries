"use client";
import { ThemeProvider } from "next-themes";

const ModeProvider = ({ children }) => {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>;
};

export default ModeProvider;
