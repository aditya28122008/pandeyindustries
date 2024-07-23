'use client'
import { useState } from "react";
import barContext from "./barContext";
const BarState = ({ children }) => {
  const [progress, setProgress] = useState(0);
  return (
    <barContext.Provider value={{ progress, setProgress }}>
      {children}
    </barContext.Provider>
  );
};

export default BarState;
