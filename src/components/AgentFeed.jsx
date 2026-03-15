import { useState, useEffect, useRef } from 'react';
import { Bot, Shield, Brain, Network, Activity } from 'lucide-react';

const AGENTS = {
  seer: { name: 'The Seer', icon: Brain, color: 'text-neon-purple', bg: 'bg-neon-purple/20' },
  sentinel: { name: 'The Sentinel', icon: Shield, color: 'text-neon-red', bg: 'bg-neon-red/20' },
  trader: { name: 'The Trader', icon: Activity, color: 'text-neon-emerald', bg: 'bg-neon-emerald/20' },
  weaver: { name: 'The Weaver', icon: Network, color: 'text-neon-cyan', bg: 'bg-neon-cyan/20' },
};

const INITIAL_LOGS = [
  { agent: 'seer', text: 'Analyzing social sentiment... High activity detected in Asian markets concerning Quantum protocols.', time: '14:24:00' },
  { agent: 'sentinel', text: 'Monitoring mempool for anomalous gas spikes. Network secure.', time: '14:24:12' },
  { agent: 'trader', text: 'Standing by for execution parameters. Volatility index at 3.4%.', time: '14:24:15' },
];

export function AgentFeed() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Simulate incoming AI discussion
    const interval = setInterval(() => {
      const agents = Object.keys(AGENTS);
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const msgs = [
        "Re-evaluating predictive models based on new tick data.",
        "Adjusting UI contrast... user biometrics indicate eye strain.",
        "Ready to execute micro-arbitrage on L2 layers.",
        "Detected 0.05% deviation in expected block times.",
        "Quantum heuristic scenario #842 diverging from baseline."
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLogs((prev) => [...prev, { agent: randomAgent, text: randomMsg, time: timeString }]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-panel h-full flex flex-col p-4 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-[var(--glass-border)] pb-2 relative z-10">
        <Bot className="w-5 h-5 text-neon-cyan text-glow" />
        <h3 className="text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
          THE HIVE MIND
        </h3>
        <span className="ml-auto w-2 h-2 rounded-full bg-neon-emerald animate-pulse shadow-[0_0_8px_#00ff66]"></span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2 relative z-10 scroll-smooth">
        {logs.map((log, index) => {
          const AgentIcon = AGENTS[log.agent].icon;
          return (
            <div key={index} className="flex items-start gap-3 text-sm animate-fade-in">
              <div className={`p-1.5 rounded-md ${AGENTS[log.agent].bg}`}>
                <AgentIcon className={`w-4 h-4 ${AGENTS[log.agent].color}`} />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-semibold ${AGENTS[log.agent].color}`}>{AGENTS[log.agent].name}</span>
                  <span className="text-xs text-gray-500 font-mono">{log.time}</span>
                </div>
                <p className="text-gray-300 mt-0.5 leading-snug">{log.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Decorative gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--glass-bg)] to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
