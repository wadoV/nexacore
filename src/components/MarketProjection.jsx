import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Layers } from 'lucide-react';
import clsx from 'clsx';

export function MarketProjection({ volatility }) {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    // Generate initial holographic chart data
    const generateData = () => {
      return Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        value: 30 + Math.random() * 60,
        prediction: Math.random() > 0.5 ? 'up' : 'down',
      }));
    };
    setDataPoints(generateData());

    const interval = setInterval(() => {
      setDataPoints(generateData());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel h-full flex flex-col p-4 relative group overflow-hidden">
      {/* Holographic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 to-transparent pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-neon-emerald text-glow" />
          <h3 className="text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-emerald">
            QUANTUM PROJECTIONS
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={clsx("animate-pulse", volatility === 'high' ? 'text-neon-red text-glow' : 'text-neon-cyan')}>
            VOL: {volatility === 'high' ? 'CRITICAL' : 'STABLE'}
          </span>
          <TrendingUp className="w-4 h-4 text-neon-emerald" />
        </div>
      </div>

      <div className="flex-1 flex items-end gap-2 relative z-10 h-48">
        {dataPoints.map((point) => (
          <div key={point.id} className="relative flex-1 flex flex-col justify-end h-full">
            {/* Holographic projection line */}
            <motion.div 
              className={clsx(
                "w-full rounded-t-sm opacity-80 backdrop-blur-sm",
                point.prediction === 'up' ? "bg-gradient-to-t from-neon-emerald/20 to-neon-emerald" : "bg-gradient-to-t from-neon-red/20 to-neon-red"
              )}
              initial={{ height: "0%" }}
              animate={{ height: `${point.value}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
              style={{
                boxShadow: point.prediction === 'up' ? '0 0 10px rgba(0,255,102,0.5)' : '0 0 10px rgba(255,51,102,0.5)'
              }}
            />
            {/* Base anchor */}
            <div className="h-1 w-full bg-white/20 mt-1 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex justify-between text-xs text-gray-400 font-mono relative z-10">
        <span>SIMULATING 1,000 SCENARIOS</span>
        <span>CONFIDENCE: 94.2%</span>
      </div>
    </div>
  );
}
