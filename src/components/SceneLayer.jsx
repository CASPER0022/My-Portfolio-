import React from 'react'
import { motion, useTransform } from 'framer-motion'

export default function SceneLayer({ children, scrollYProgress, enterRange, exitRange, zIndex = 1, isActive = true, disableFilter = false }) {
  // Determine the full mapping array depending on whether the scene has an enter, exit, or both
  let input = []
  let opacityOutput = []
  let scaleOutput = []
  let blurOutput = []

  if (enterRange && exitRange) {
    input = [enterRange[0], enterRange[1], exitRange[0], exitRange[1]]
    opacityOutput = [0, 1, 1, 0]
    scaleOutput = [0.85, 1, 1, 1.15]
    blurOutput = ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]
  } else if (enterRange) { // Only enters (last scene)
    input = [enterRange[0], enterRange[1]]
    opacityOutput = [0, 1]
    scaleOutput = [0.85, 1]
    blurOutput = ["blur(20px)", "blur(0px)"]
  } else if (exitRange) { // Only exits (first scene)
    input = [exitRange[0], exitRange[1]]
    opacityOutput = [1, 0]
    scaleOutput = [1, 1.15]
    blurOutput = ["blur(0px)", "blur(20px)"]
  } else {
    // Default fallback
    input = [0, 1]
    opacityOutput = [1, 1]
    scaleOutput = [1, 1]
    blurOutput = ["blur(0px)", "blur(0px)"]
  }

  const opacity = useTransform(scrollYProgress, input, opacityOutput)
  const scale = useTransform(scrollYProgress, input, scaleOutput)
  const filter = useTransform(scrollYProgress, input, blurOutput)

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
      style={{
        opacity,
        scale,
        ...(disableFilter ? {} : { filter }),
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex,
        transformOrigin: 'center center'
      }}
    >
      {children}
    </motion.div>
  )
}
