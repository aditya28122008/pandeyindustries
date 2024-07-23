'use client'
import { useContext, useEffect } from "react";
import barContext from "@/context/LoadingBar/barContext";
import React from 'react'

const About = () => {
  const barCon = useContext(barContext);
  const { setProgress } = barCon;
  useEffect(() => {
    setProgress(100)
  }, [])
  return (
    <div className='text-black text-xl dark:text-white'>
      I am about
    </div>
  )
}

export default About
