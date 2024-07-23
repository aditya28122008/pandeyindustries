import React from "react";
import ModeState from "./ModeState";



const ModeWrapper = ({ children }) => {
  return (
    <>
      <ModeState>{children}</ModeState>
    </>
  );
};

export default ModeWrapper;
