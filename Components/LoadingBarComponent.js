"use client";
import { useTheme } from "next-themes";
import React from "react";

const LoadingBarComponent = ({ children }) => {
  const { resolvedTheme } = useTheme();
  return <div className={resolvedTheme}>{children}</div>;
};

export default LoadingBarComponent;
