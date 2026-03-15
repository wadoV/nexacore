import { useState, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { TopBar } from './TopBar';
import { AgentFeed } from './AgentFeed';
import { TradingTerminal } from './TradingTerminal';
import { MarketProjection } from './MarketProjection';
import { StatsTicker } from './StatsTicker';
import { NexaAutoP } from './NexaAutoP';

export function Dashboard() {
  const [volatility, setVolatility] = useState('stable');

  useEffect(() => {
    const triggerVolatility = () => {
      setVolatility('high');
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        // Haptic Market Pulse — heartbeat
        navigator.vibrate([80, 40, 80, 40, 120, 60, 120]);
      }
      setTimeout(() => setVolatility('stable'), 5000 + Math.random() * 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.65) triggerVolatility();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-space-950 text-white overflow-hidden relative font-sans">
      <ParticleBackground volatility={volatility} />

      <div className="relative z-10 flex flex-col h-screen max-h-screen">
        <TopBar />
        <StatsTicker />

        {/* Main grid */}
        <main className="flex-1 p-4 lg:p-5 grid grid-cols-12 grid-rows-[1fr_1fr] gap-4 overflow-hidden">

          {/* 1. Quantum Projections — top left (spans 8 cols, row 1) */}
          <div className="col-span-12 lg:col-span-8 row-span-1">
            <MarketProjection volatility={volatility} />
          </div>

          {/* 2. Hive Mind Feed — right column, full height */}
          <div className="col-span-12 lg:col-span-4 row-span-2">
            <AgentFeed />
          </div>

          {/* 3. Bottom row: Trading Terminal (5 cols) + Auto-Pilot (3 cols) */}
          <div className="col-span-12 lg:col-span-5 row-span-1">
            <TradingTerminal />
          </div>

          <div className="col-span-12 lg:col-span-3 row-span-1">
            <NexaAutoP />
          </div>

        </main>
      </div>

      {/* Volatility border-pulse overlay */}
      <div
        className="pointer-events-none fixed inset-0 transition-all duration-700"
        style={{
          boxShadow: volatility === 'high'
            ? 'inset 0 0 60px rgba(255,51,102,0.35)'
            : 'inset 0 0 0px rgba(255,51,102,0)',
        }}
      />
    </div>
  );
}
