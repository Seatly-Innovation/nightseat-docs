"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
      <div 
        className="absolute top-0 w-[200vw] h-[600px] opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 100% at 50% 0%, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 100% at 50% 0%, black 10%, transparent 80%)'
        }}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"
      />
    </div>
  );
}
