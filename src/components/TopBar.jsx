import { Menu, Bell, User } from 'lucide-react';

export function TopBar() {
  return (
    <header className="relative z-10 w-full glass-panel !rounded-none !border-x-0 !border-t-0 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Minimalist NexaCore SVG Logo */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 border-[2px] border-neon-cyan/30 rotate-45 rounded-sm box-glow"></div>
          <div className="absolute inset-2 border-[2px] border-neon-purple/50 -rotate-12 rounded-sm mix-blend-screen"></div>
          <div className="w-2 h-2 bg-neon-emerald rounded-full shadow-[0_0_10px_#00ff66]"></div>
        </div>
        <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white/50">
          NEXA<span className="font-light">CORE</span>
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-neon-cyan text-glow">Dashboard</a>
        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Markets</a>
        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Hive Mind</a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-neon-amber transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full shadow-[0_0_8px_#ff3366]"></span>
        </button>
        <button className="glass-button !p-2 !rounded-full text-neon-cyan">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
