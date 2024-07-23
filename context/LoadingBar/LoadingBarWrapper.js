import React from "react";
import BarState from "./BarState";

const LoadingBarWrapper = ({ children }) => {
  return (
    <>
      <BarState>{children}</BarState>
    </>
  );
};

export default LoadingBarWrapper;
