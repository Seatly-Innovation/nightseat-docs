"use client";

import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({ text, disabled = false, speed = 3, className = "" }: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <motion.div
      className={`text-transparent bg-clip-text inline-block ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
      animate={{
        backgroundPosition: disabled ? "0% 50%" : ["100% 50%", "0% 50%"],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: speed,
        ease: "linear",
      }}
    >
      {text}
    </motion.div>
  );
}
