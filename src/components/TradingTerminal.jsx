import { useState } from 'react';
import { Terminal, Send, Mic } from 'lucide-react';

export function TradingTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { role: 'system', text: 'NexaCore Companion initialized. Awaiting voice or text input.' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setHistory(prev => [...prev, { role: 'user', text: input }]);
    
    // Simulate AI thinking and responding
    setTimeout(() => {
      setHistory(prev => [...prev, { 
        role: 'system', 
        text: `Acknowledged: "${input}". The Trader and Seer are formulating an execution plan. Expected ETA 1.2s.` 
      }]);
    }, 600);
    
    setInput('');
  };

  return (
    <div className="glass-panel h-full flex flex-col p-4 relative overflow-hidden group">
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Terminal className="w-5 h-5 text-neon-purple text-glow" />
        <h3 className="text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-purple">
          NEXA TERMINAL
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 font-mono text-sm relative z-10">
        {history.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className={`text-xs mb-1 ${msg.role === 'user' ? 'text-gray-400' : 'text-neon-purple/70'}`}>
              {msg.role === 'user' ? 'YOU' : 'NEXA'}
            </span>
            <div className={`px-3 py-2 rounded-lg max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-space-800 border border-[var(--glass-border)] text-white' 
                : 'bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-glow'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 mt-auto">
        <div className="relative flex items-center bg-space-950/50 rounded-xl border border-[var(--glass-border)] focus-within:border-neon-purple/50 focus-within:shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Try: "Balance my portfolio for low risk..."'
            className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm text-white placeholder-gray-500 font-mono"
          />
          <div className="flex items-center gap-1 pr-2">
            <button type="button" className="p-2 text-gray-400 hover:text-neon-cyan transition-colors" title="Voice Command">
              <Mic className="w-5 h-5" />
            </button>
            <button type="submit" disabled={!input.trim()} className="p-2 text-neon-purple hover:text-white disabled:opacity-50 disabled:hover:text-neon-purple transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
