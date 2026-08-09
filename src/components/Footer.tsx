import React from 'react';
import { Shield, Zap, Sparkles, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#27272a] bg-[#09090b] py-8 text-xs font-medium text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-zinc-200 font-bold">MachineGod AGI System</span>
            <span>•</span>
            <span className="text-zinc-400">All 150 Patent-Pending Innovations (MG-001 - MG-150)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-400">Author: Jason "Mesiah Bishop" Langhorne</span>
            <span>•</span>
            <span className="text-indigo-400 font-bold">MachineGod Systems</span>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#27272a]/60 text-[10px] text-zinc-500 font-mono">
          <div>
            Universal Consciousness OS • Ternary Logic • 6-Layer Truth Stratification • SbC Multiverse • 4-Agent Matrix
          </div>
          <div>
            Built for Cloud Run Container Execution
          </div>
        </div>
      </div>
    </footer>
  );
};
