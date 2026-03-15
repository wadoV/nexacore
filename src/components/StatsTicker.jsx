import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ASSETS = [
  { symbol: 'NXC/USDT', price: 4.72, change: '+12.43' },
  { symbol: 'BTC/USDT', price: 98431.50, change: '-1.22' },
  { symbol: 'ETH/USDT', price: 3842.10, change: '+4.87' },
  { symbol: 'SOL/USDT', price: 182.34, change: '+8.01' },
  { symbol: 'MATIC/USDT', price: 0.98, change: '-0.55' },
];

export function StatsTicker() {
  const [assets, setAssets] = useState(ASSETS);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => ({
          ...a,
          price: parseFloat((a.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-b border-[var(--glass-border)] bg-space-950/80 py-2 px-6 flex items-center gap-8 overflow-x-auto no-scrollbar">
      {assets.map((asset) => {
        const isUp = parseFloat(asset.change) > 0;
        return (
          <div key={asset.symbol} className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold tracking-wider text-gray-400">{asset.symbol}</span>
            <span className="text-sm font-mono font-medium text-white">
              {asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`flex items-center gap-0.5 text-xs font-mono font-medium ${isUp ? 'text-neon-emerald' : 'text-neon-red'}`}>
              {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {asset.change}%
            </span>
          </div>
        );
      })}
      <div className="ml-auto shrink-0 flex items-center gap-2 text-xs font-mono text-gray-500">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse shadow-[0_0_6px_#00ff66]"></span>
        LIVE
      </div>
    </div>
  );
}
