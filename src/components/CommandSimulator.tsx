"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const commands = [
  { text: "clone https://github.com/Seatly-Innovation/Nightseat-Innovation.git", delay: 1000, type: "input" },
  { text: "Cloning into 'Nightseat-Innovation'...", delay: 200, type: "output", color: "text-slate-400" },
  { text: "Resolving deltas: 100% (24/24), done.", delay: 600, type: "output", color: "text-slate-400" },
  { text: "cd Nightseat-Innovation && ./run-local.sh", delay: 800, type: "input" },
  { text: "🚀 Bootstrapping NightSeat Ecosystem...", delay: 400, type: "output", color: "text-emerald-400 font-bold" },
  { text: "✓ Generated .env files for Core API", delay: 300, type: "output", color: "text-emerald-500" },
  { text: "✓ Generated .env files for User App", delay: 300, type: "output", color: "text-emerald-500" },
  { text: "✓ Generated .env files for Admin App", delay: 300, type: "output", color: "text-emerald-500" },
  { text: "Starting Docker containers...", delay: 500, type: "output", color: "text-slate-300" },
  { text: "✓ MongoDB is running on port 27017", delay: 700, type: "output", color: "text-emerald-500" },
  { text: "✓ Redis is running on port 6379", delay: 300, type: "output", color: "text-emerald-500" },
  { text: "Build complete. All systems are LIVE.", delay: 500, type: "output", color: "text-sky-400 font-bold" },
];

export default function CommandSimulator() {
  const [lines, setLines] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentIndex >= commands.length) return;

    const cmd = commands[currentIndex];
    
    if (cmd.type === "input") {
      setIsTyping(true);
      let charIndex = 0;
      setTypingText("");
      
      const typeInterval = setInterval(() => {
        if (charIndex < cmd.text.length) {
          setTypingText(cmd.text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setLines(prev => [...prev, cmd]);
          setTypingText("");
          setTimeout(() => setCurrentIndex(prev => prev + 1), cmd.delay);
        }
      }, 50); // Typing speed
      
      return () => clearInterval(typeInterval);
    } else {
      setTimeout(() => {
        setLines(prev => [...prev, cmd]);
        setCurrentIndex(prev => prev + 1);
      }, cmd.delay);
    }
  }, [currentIndex]);

  const resetSimulation = () => {
    setLines([]);
    setCurrentIndex(0);
    setTypingText("");
    setIsTyping(false);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#0d1117] border border-slate-800 shadow-2xl relative group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700 group-hover:bg-green-500 transition-colors"></div>
        </div>
        <div className="text-[11px] font-mono text-slate-500 font-bold tracking-widest text-center flex-1">Terminal</div>
        <button 
          onClick={resetSimulation}
          className="text-[10px] text-slate-500 hover:text-white uppercase tracking-wider font-bold"
        >
          Restart
        </button>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[300px] max-h-[400px] overflow-y-auto w-full custom-scrollbar">
        {lines.map((line, i) => (
          <div key={i} className="mb-1.5 flex">
            {line.type === "input" ? (
              <>
                <span className="text-fuchsia-500 mr-2 font-bold select-none">~</span>
                <span className="text-white">{line.text}</span>
              </>
            ) : (
              <span className={`w-full ${line.color}`}>{line.text}</span>
            )}
          </div>
        ))}
        
        {isTyping && currentIndex < commands.length && (
          <div className="mb-1.5 flex">
             <span className="text-fuchsia-500 mr-2 font-bold select-none">~</span>
             <span className="text-white">{typingText}</span>
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ repeat: Infinity, duration: 0.8 }}
               className="inline-block w-2.5 h-4 bg-slate-400 ml-1 translate-y-1"
             />
          </div>
        )}
        
        {!isTyping && currentIndex >= commands.length && (
          <div className="mb-1.5 flex">
            <span className="text-fuchsia-500 mr-2 font-bold select-none">~</span>
            <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ repeat: Infinity, duration: 0.8 }}
               className="inline-block w-2.5 h-4 bg-slate-400 translate-y-1"
             />
          </div>
        )}
      </div>
    </div>
  );
}
