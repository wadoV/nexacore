import React from 'react';
import TopBar from './components/TopBar';
import TradingTerminal from './components/TradingTerminal';
import AgentFeed from './components/AgentFeed';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Fondo con gradiente radial para dar profundidad UX */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,1)_0%,_rgba(5,5,5,1)_100%)] -z-10" />

      <TopBar />

      <main className="container mx-auto pt-28 pb-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Lado Izquierdo: El "Corazón" de la aplicación (8 columnas) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 space-y-6"
          >
            <TradingTerminal />
            
            {/* Espacio para métricas rápidas adicionales en el futuro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-gray-500 text-xs uppercase font-mono">Uptime Sistema</p>
                <p className="text-xl font-bold text-cyan-400">99.9%</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-gray-500 text-xs uppercase font-mono">Latencia IA</p>
                <p className="text-xl font-bold text-purple-400">24ms</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <p className="text-gray-500 text-xs uppercase font-mono">Estado Red</p>
                <p className="text-xl font-bold text-green-400">Óptimo</p>
              </div>
            </div>
          </motion.div>

          {/* Lado Derecho: La "Mente" (Agentes y Orquestación) (4 columnas) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 lg:sticky lg:top-28"
          >
            <div className="h-[calc(100vh-140px)] min-h-[500px]">
              <AgentFeed />
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

export default App;