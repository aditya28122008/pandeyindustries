'use client'
import { useContext, useEffect } from "react";
import barContext from "@/context/LoadingBar/barContext";

const Services = () => {
  const barCon = useContext(barContext);
  const { setProgress } = barCon;
  useEffect(() => {
    setProgress(100)
  }, [])
  return (
    <div>
      I am services
    </div>
  )
}

export default Services
