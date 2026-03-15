import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, BadgeCheck } from 'lucide-react';

const AGENT_ORDER = [
  { key: 'seer', name: 'The Seer', color: '#b026ff' },
  { key: 'sentinel', name: 'The Sentinel', color: '#ff3366' },
  { key: 'trader', name: 'The Trader', color: '#00ff66' },
];

const STRATEGIES = [
  {
    title: 'Low Risk Weekend Hold',
    action: 'Rebalance: 60% NXC → stablecoin pairs, 40% BTC.',
    confidence: '91%',
    risk: 'LOW'
  },
  {
    title: 'Momentum Breakout Detected',
    action: 'Buy 15 NXC at market, set stop-loss at $4.30.',
    confidence: '78%',
    risk: 'MEDIUM'
  },
  {
    title: 'Arbitrage Opportunity',
    action: 'L2 bridge opportunity detected. Execute micro-arb.',
    confidence: '96%',
    risk: 'VERY LOW'
  },
];

export function NexaAutoP() {
  const [step, setStep] = useState(0); // 0: initial, 1: seer, 2: sentinel, 3: trader, 4: result
  const [discussion, setDiscussion] = useState([]);
  const [strategy, setStrategy] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const discussionScripts = [
    { agent: 'seer', text: 'Sentiment trending bullish. Twitter +NXC volume up 340% in last 6h. Recommend aggressive accumulation window.' },
    { agent: 'sentinel', text: 'User risk profile: LOW. Flagging aggressive accumulation. Counter-proposal: gradual DCA over 48h with 5% gas buffer.' },
    { agent: 'trader', text: 'Consensus achieved. Executing low-risk plan. Projected gain: +8.2% by weekend close. Confidence: 91%.' },
  ];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setDiscussion([]);
    setStrategy(null);
    setStep(1);

    discussionScripts.forEach((msg, i) => {
      setTimeout(() => {
        setDiscussion((prev) => [...prev, msg]);
        setStep(i + 2);
        if (i === discussionScripts.length - 1) {
          setTimeout(() => {
            setStrategy(STRATEGIES[0]);
            setStep(4);
            setIsRunning(false);
          }, 1200);
        }
      }, (i + 1) * 1800);
    });
  };

  return (
    <div className="glass-panel p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-[var(--glass-border)] pb-2">
        <Zap className="w-5 h-5 text-neon-amber" style={{ filter: 'drop-shadow(0 0 6px #ffb800)' }} />
        <h3 className="text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-amber">
          AUTO-PILOT
        </h3>
        <button
          id="agent-simulation-btn"
          onClick={runSimulation}
          disabled={isRunning}
          className={`ml-auto text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 font-mono
            ${isRunning
              ? 'border-neon-amber/20 text-neon-amber/40 cursor-not-allowed'
              : 'border-neon-amber/50 text-neon-amber hover:bg-neon-amber/10 hover:shadow-[0_0_15px_rgba(255,184,0,0.3)]'
            }`}
        >
          {isRunning ? 'THINKING...' : '▶ RUN AGENTS'}
        </button>
      </div>

      {/* Agent discussion steps */}
      <div className="flex-1 space-y-3 overflow-y-auto min-h-0">
        <AnimatePresence>
          {discussion.map((msg, i) => {
            const agentInfo = AGENT_ORDER.find(a => a.key === msg.agent);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-2"
              >
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: agentInfo?.color, boxShadow: `0 0 8px ${agentInfo?.color}` }}></div>
                <div>
                  <span className="text-xs font-semibold" style={{ color: agentInfo?.color }}>{agentInfo?.name}</span>
                  <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Final strategy card */}
        <AnimatePresence>
          {strategy && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4 p-3 rounded-xl border border-neon-emerald/40 bg-neon-emerald/5 shadow-[0_0_20px_rgba(0,255,102,0.1)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-4 h-4 text-neon-emerald" />
                <span className="text-xs font-bold text-neon-emerald tracking-wider">CONSENSUS REACHED</span>
                <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full bg-neon-emerald/20 text-neon-emerald">{strategy.risk}</span>
              </div>
              <p className="text-xs font-semibold text-white mb-1">{strategy.title}</p>
              <p className="text-xs text-gray-300">{strategy.action}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1 rounded-full bg-space-800">
                  <div className="h-full rounded-full bg-neon-emerald" style={{ width: strategy.confidence, boxShadow: '0 0 6px #00ff66' }}></div>
                </div>
                <span className="text-xs font-mono text-neon-emerald">{strategy.confidence}</span>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-neon-emerald/50 text-neon-emerald text-xs font-semibold hover:bg-neon-emerald/10 transition-all">
                EXECUTE <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isRunning && discussion.length === 0 && (
          <p className="text-xs text-gray-500 font-mono text-center pt-4">Click RUN AGENTS to let the Hive Mind deliberate.</p>
        )}
      </div>
    </div>
  );
}
