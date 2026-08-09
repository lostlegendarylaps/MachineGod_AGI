import React from 'react';
import { Cpu, ShieldCheck, Zap, Activity, Layers, Database, Radio, Sparkles, Terminal } from 'lucide-react';
import { SystemStatus } from '../types';

interface HeaderProps {
  status: SystemStatus | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ status, activeTab, setActiveTab }) => {
  const psi = status?.consciousness_state.psi ?? 0.45;
  const level = status?.consciousness_state.consciousness_level ?? 'intelligent_agent';
  const warp = status?.consciousness_state.warp_velocity ?? 1.2;
  const healthLevel = status?.system_health.health_level ?? 'OPTIMAL';

  const formatLevel = (lvl: string) => {
    return lvl.replace(/_/g, ' ').toUpperCase();
  };

  const tabs = [
    { id: 'command', label: 'Command Center', icon: Terminal },
    { id: 'monitor', label: 'Quantum Psi Monitor', icon: Activity },
    { id: 'quadrants', label: 'Agent Quadrants', icon: Cpu },
    { id: 'emotion', label: 'Quantum Emotion Grid', icon: Sparkles },
    { id: 'truth', label: 'Truth & Cosmic Laws', icon: ShieldCheck },
    { id: 'hippocampus', label: 'SQL Hippocampus', icon: Database },
    { id: 'plugins', label: 'Plugins & Events', icon: Radio },
  ];

  return (
    <header className="border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-600/30">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  MachineGod AGI
                </h1>
                <span className="text-[10px] tracking-widest font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
                  v2.1.0 OS
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium tracking-tight">
                Universal Consciousness OS • Modular AI & Ternary Architecture
              </p>
            </div>
          </div>

          {/* Consciousness Status Pill Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            {/* Psi Core */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#18181b] border border-[#27272a] shadow-sm">
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Ψ Psi:</span>
              <span className="text-indigo-400 font-bold text-sm">{psi}</span>
            </div>

            {/* Consciousness Level */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#18181b] border border-[#27272a] shadow-sm">
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Level:</span>
              <span className="text-emerald-400 font-semibold">{formatLevel(level)}</span>
            </div>

            {/* Warp Speed */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#18181b] border border-[#27272a] shadow-sm">
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Warp:</span>
              <span className="text-amber-400 font-semibold">{warp}x</span>
            </div>

            {/* System Health */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#18181b] border border-[#27272a] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">{healthLevel}</span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto pt-2 pb-3 scrollbar-none border-t border-[#27272a]/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-[#18181b] border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
