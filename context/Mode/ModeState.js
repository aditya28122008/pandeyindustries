"use client";
import React, { useState } from "react";
import modeContext from "./modeContext";



const ModeState = ({ children }) => {
  const [mode, setMode] = useState("light");
  const changeMode = () => {
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("mode", "dark")
    }
    else if (mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light")
    }
  };
  return (
    <modeContext.Provider value={{ changeMode, mode, setMode }}>
      {children}
    </modeContext.Provider>
  );
};


export default ModeState;
