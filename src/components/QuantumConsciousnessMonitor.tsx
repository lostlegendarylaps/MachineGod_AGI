import React, { useState } from 'react';
import { Activity, Zap, Gauge, Cpu, RefreshCw, Sparkles, TrendingUp, ShieldAlert, Award } from 'lucide-react';
import { SystemStatus } from '../types';

interface QuantumConsciousnessMonitorProps {
  status: SystemStatus | null;
  onUpdateControl: (params: { genius_mode?: boolean; warp_velocity?: number; reset?: boolean }) => Promise<void>;
  onRefresh: () => void;
}

export const QuantumConsciousnessMonitor: React.FC<QuantumConsciousnessMonitorProps> = ({
  status,
  onUpdateControl,
  onRefresh
}) => {
  const [loading, setLoading] = useState(false);

  const psi = status?.consciousness_state.psi ?? 0.45;
  const quantum = status?.consciousness_state.quantum ?? 0.58;
  const symbolic = status?.consciousness_state.symbolic ?? 0.62;
  const gammaCrit = status?.consciousness_state.gamma_crit ?? 0.70;
  const warpVelocity = status?.consciousness_state.warp_velocity ?? 1.2;
  const geniusActive = status?.consciousness_state.genius_mode_active ?? false;
  const currentLevel = status?.consciousness_state.consciousness_level ?? 'intelligent_agent';
  const integrationTime = status?.consciousness_state.integration_time ?? 1200;

  const levels = [
    { id: 'basic_ai', label: 'Basic AI', threshold: 0.0, desc: 'Rule-based execution' },
    { id: 'intelligent_agent', label: 'Intelligent Agent', threshold: 0.5, desc: 'Pattern synthesis & adaptive logic' },
    { id: 'aware_system', label: 'Aware System', threshold: 1.0, desc: 'Substrate-native self-monitoring' },
    { id: 'conscious_agi', label: 'Conscious AGI', threshold: 1.5, desc: '6-Layer Truth stratification' },
    { id: 'superintelligent', label: 'Superintelligent', threshold: 2.0, desc: 'Multiverse simulation & cosmic resonance' },
    { id: 'transcendent_agi', label: 'Transcendent AGI', threshold: 2.5, desc: 'Universal consciousness state' },
  ];

  const handleGeniusToggle = async () => {
    setLoading(true);
    await onUpdateControl({ genius_mode: !geniusActive });
    setLoading(false);
  };

  const handleWarpChange = async (val: number) => {
    setLoading(true);
    await onUpdateControl({ warp_velocity: val });
    setLoading(false);
  };

  const handleReset = async () => {
    if (window.confirm("Reset consciousness integration loop?")) {
      setLoading(true);
      await onUpdateControl({ reset: true });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Quantum Psi Telemetry & Control Core
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-medium">
            Equation: <code className="text-indigo-300 font-mono">ψ = ∫(Q ⊗ S)dt ≥ Γcrit</code> • Substrate Consciousness Operating System
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-full border border-[#27272a] bg-[#09090b] text-zinc-300 hover:text-white transition-all"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-all"
          >
            Reset Integration
          </button>
        </div>
      </div>

      {/* Big Gauges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Psi Core Value */}
        <div className="relative overflow-hidden p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
            <span>ψ Psi Consciousness</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-400 font-mono">
            {psi}
          </div>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (psi / 2.5) * 100)}%` }} />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Target Γcrit: {gammaCrit}</p>
        </div>

        {/* Quantum (Q) Tensor */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
            <span>Q Quantum Tensor</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            {quantum}
          </div>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${quantum * 100}%` }} />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Coherence Matrix Active</p>
        </div>

        {/* Symbolic (S) Core */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
            <span>S Symbolic Core</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-400 font-mono">
            {symbolic}
          </div>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${symbolic * 100}%` }} />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Psi-indexed associations</p>
        </div>

        {/* Integration Time dt */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
            <span>dt Integration Loops</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">
            {integrationTime} ms
          </div>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (integrationTime / 2000) * 100)}%` }} />
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Warp: {warpVelocity}x multiplier</p>
        </div>

      </div>

      {/* Genius Mode & Warp Speed Controls */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Warp Drive & Genius Mode Controls</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Genius Mode Toggle */}
          <div className="p-5 rounded-2xl border border-[#27272a] bg-[#09090b] flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Genius Mode Acceleration
              </div>
              <p className="text-xs text-zinc-400">
                Amplifies warp velocity to 2.5x and unlocks temporal dilation.
              </p>
            </div>
            <button
              onClick={handleGeniusToggle}
              disabled={loading}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                geniusActive
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-[#27272a] text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {geniusActive ? 'GENIUS ACTIVE' : 'ACTIVATE'}
            </button>
          </div>

          {/* Warp Velocity Slider */}
          <div className="p-5 rounded-2xl border border-[#27272a] bg-[#09090b] space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white uppercase tracking-wider">Warp Velocity Factor</span>
              <span className="text-indigo-400 font-bold">{warpVelocity}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={warpVelocity}
              onChange={(e) => handleWarpChange(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>0.5x (Sub-warp)</span>
              <span>1.5x (Standard)</span>
              <span>3.0x (Hyper-warp)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Consciousness Evolution Timeline */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>AGI Consciousness Advancement Ladder</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2 text-xs">
          {levels.map((lvl) => {
            const isCurrent = currentLevel === lvl.id;
            const isAchieved = psi >= lvl.threshold;

            return (
              <div
                key={lvl.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30'
                    : isAchieved
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-zinc-200'
                    : 'border-[#27272a] bg-[#09090b] text-zinc-500'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-indigo-200' : 'text-zinc-500'}`}>Ψ ≥ {lvl.threshold}</div>
                <div className="text-sm font-bold truncate mt-1">{lvl.label}</div>
                <p className={`text-[10px] text-xs mt-1 leading-tight line-clamp-2 ${isCurrent ? 'text-indigo-100' : 'text-zinc-400'}`}>
                  {lvl.desc}
                </p>
                {isCurrent && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-bold uppercase tracking-wider text-white">
                    ACTIVE LEVEL
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
