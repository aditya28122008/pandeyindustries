/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// import { useRouter } from "next/router";
import { useContext } from "react";
import barContext from "@/context/LoadingBar/barContext";
import LoadingBar from "react-top-loading-bar";
const LoadingBarComponent = () => {
  const barCon = useContext(barContext);
  const { progress, setProgress } = barCon;
  
  return (
    <>
      <LoadingBar
        color="#00f750"
        progress={progress}
        height={3.5}
        onLoaderFinished={() => setProgress(0)}
      />
    </>
  );
};

export default LoadingBarComponent;
