"use client";
import modeContext from "@/context/Mode/modeContext";
import { useContext } from "react";

const ModeProvider = ({ children }) => {
  const modeCon = useContext(modeContext);
  const { mode } = modeCon;

  return <div className={`${mode}`}>{children}</div>;
};

export default ModeProvider;
