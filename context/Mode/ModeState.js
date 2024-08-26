"use client";
import React, { useState } from "react";
import modeContext from "./modeContext";
import { useTheme } from "next-themes";

const ModeState = ({ children }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const changeMode = () => {
    console.log("working");
    if (resolvedTheme === "light") {
      setMode("dark");
      setTheme("dark");
    } else if (resolvedTheme === "dark") {
      setMode("light");
      setTheme("light");
    }
  };
  return (
    <modeContext.Provider value={{ changeMode }}>
      {children}
    </modeContext.Provider>
  );
};

export default ModeState;
