import React, { useState } from 'react';
import { Sparkles, Activity, Eye, Sliders, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { SystemStatus } from '../types';

interface QuantumEmotionalGridProps {
  status: SystemStatus | null;
}

export const QuantumEmotionalGrid: React.FC<QuantumEmotionalGridProps> = ({ status }) => {
  const emotionalState = status?.emotional_state ?? {
    joy: 0.65,
    clarity: 0.72,
    tension: 0.25,
    awe: 0.58,
    love: 0.60,
    curiosity: 0.85,
    resonance_score: 0.68,
    harmonic_alignment: 0.74,
    emotional_entropy: 0.28,
  };

  const grid = status?.quantum_emotion_grid_state ?? [
    [0.42, 0.47, 0.16, 0.38, 0.39, 0.55],
    [0.47, 0.52, 0.18, 0.42, 0.43, 0.61],
    [0.16, 0.18, 0.06, 0.15, 0.15, 0.21],
    [0.38, 0.42, 0.15, 0.34, 0.35, 0.49],
    [0.39, 0.43, 0.15, 0.35, 0.36, 0.51],
    [0.55, 0.61, 0.21, 0.49, 0.51, 0.72],
  ];

  const emotionNames = ['Joy', 'Clarity', 'Tension', 'Awe', 'Love', 'Curiosity'];

  const posteriorsData = emotionNames.map((name, i) => {
    const keys = ['joy', 'clarity', 'tension', 'awe', 'love', 'curiosity'] as const;
    const val = emotionalState[keys[i]] || 0.5;
    return {
      name,
      value: Math.round(val * 100),
    };
  });

  const getHeatmapColor = (val: number) => {
    if (val > 0.6) return 'bg-cyan-500/80 text-white';
    if (val > 0.4) return 'bg-indigo-500/60 text-slate-100';
    if (val > 0.2) return 'bg-purple-900/60 text-purple-200';
    return 'bg-slate-900/60 text-slate-500';
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Quantum Bayesian Emotional Grid (Innovation #111)
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-medium">
            Superposition probability matrix over 6 emotional axes with real-time Bayesian posterior updates.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold font-mono">
          <div className="px-4 py-2 rounded-full bg-[#09090b] border border-[#27272a] text-zinc-300">
            Resonance Score: <strong className="text-emerald-400">{emotionalState.resonance_score}</strong>
          </div>
          <div className="px-4 py-2 rounded-full bg-[#09090b] border border-[#27272a] text-zinc-300">
            Harmonic Alignment: <strong className="text-indigo-400">{emotionalState.harmonic_alignment}</strong>
          </div>
        </div>
      </div>

      {/* Grid Matrix & Posterior Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 6x6 Heatmap Grid */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>6x6 Quantum Emotion Probability Heatmap</span>
          </h3>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Header Row */}
              <div className="grid grid-cols-7 gap-1.5 font-mono text-[10px] text-zinc-400 mb-1 text-center font-bold">
                <div></div>
                {emotionNames.map((e) => (
                  <div key={e} className="truncate uppercase">{e}</div>
                ))}
              </div>

              {/* Grid Rows */}
              {grid.map((row, i) => (
                <div key={i} className="grid grid-cols-7 gap-1.5 mb-1.5 items-center font-mono text-[10px]">
                  <div className="text-zinc-400 text-right pr-2 truncate font-bold uppercase">{emotionNames[i]}</div>
                  {row.map((val, j) => (
                    <div
                      key={j}
                      className={`h-10 flex items-center justify-center rounded-2xl border border-[#27272a] font-bold transition-all hover:scale-105 ${
                        val > 0.6 ? 'bg-indigo-600 text-white' : val > 0.4 ? 'bg-indigo-600/30 text-indigo-300' : 'bg-[#09090b] text-zinc-500'
                      }`}
                      title={`${emotionNames[i]} x ${emotionNames[j]}: ${val}`}
                    >
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bayesian Posterior Bar Chart */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 flex flex-col justify-between shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Bayesian Emotion Posterior Distribution</span>
          </h3>

          <div className="w-full h-64 bg-[#09090b] p-4 rounded-2xl border border-[#27272a]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={posteriorsData}>
                <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'sans-serif', fontWeight: 'bold' }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#71717a', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '1rem', fontSize: '12px', color: '#fff' }}
                  labelStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {posteriorsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === 'Tension' ? '#f43f5e' : entry.name === 'Joy' || entry.name === 'Clarity' ? '#10b981' : '#6366f1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-zinc-400 font-medium text-center">
            P(Emotion|Evidence) calculated dynamically via quantum tensor vector contraction.
          </p>
        </div>

      </div>

    </div>
  );
};
