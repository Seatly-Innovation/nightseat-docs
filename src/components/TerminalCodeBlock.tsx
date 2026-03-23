"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal, Code2 } from "lucide-react";

type Tab = "curl" | "ts" | "go";

const codeSnippets: Record<Tab, { lang: string; title: string, code: string }> = {
  curl: {
    lang: "Bash",
    title: "cURL",
    code: `curl -X POST https://api.nightseat.app/v1/bookings \\
  -H "Authorization: Bearer sec_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "venue_id": "vnu_0987",
    "table_id": "tbl_A12",
    "guests": 4,
    "date": "2026-12-31T20:00:00Z"
  }'`
  },
  ts: {
    lang: "TypeScript",
    title: "Next.js",
    code: `import { NightSeat } from '@nightseat/node';

const client = new NightSeat('sec_live_xxx');

const booking = await client.bookings.create({
  venueId: 'vnu_0987',
  tableId: 'tbl_A12',
  guests: 4,
  date: new Date('2026-12-31T20:00:00Z')
});

console.log(booking.paymentIntentId);`
  },
  go: {
    lang: "Go",
    title: "Go Fiber",
    code: `import "github.com/nightseat/go-sdk"

client := nightseat.NewClient("sec_live_xxx")

booking, err := client.Bookings.Create(context.Background(), &nightseat.BookingParams{
    VenueID: "vnu_0987",
    TableID: "tbl_A12",
    Guests:  4,
    Date:    "2026-12-31T20:00:00Z",
})

if err != nil {
    log.Fatal(err)
}`
  }
};

export default function TerminalCodeBlock() {
  const [activeTab, setActiveTab] = useState<Tab>("ts");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden bg-[#0d1117] border border-slate-800 shadow-2xl w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-slate-700"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700"></div>
        </div>
        
        <div className="flex gap-2">
          {(Object.keys(codeSnippets) as Tab[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`text-[13px] font-mono px-3 py-1 rounded-md transition-colors ${
                activeTab === key 
                ? 'bg-slate-800 text-slate-200' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {codeSnippets[key].title}
            </button>
          ))}
        </div>

        <button 
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-6 overflow-x-auto relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="text-[14px] leading-relaxed font-mono text-slate-300"
          >
            <code>
              {codeSnippets[activeTab].code.split('\\n').map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 text-slate-700 select-none opacity-50">{i + 1}</span>
                  <span className="table-cell whitespace-pre">{line}</span>
                </div>
              ))}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
