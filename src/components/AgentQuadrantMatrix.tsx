import React, { useState } from 'react';
import { Cpu, Zap, Shield, Sparkles, Activity, Play, RefreshCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { SystemStatus } from '../types';

interface AgentQuadrantMatrixProps {
  status: SystemStatus | null;
  onRunAgentBenchmark?: (agent: string, prompt: string) => void;
}

export const AgentQuadrantMatrix: React.FC<AgentQuadrantMatrixProps> = ({ status }) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('phix');
  const [testPrompt, setTestPrompt] = useState('Deduce the logical implications of quantum entanglement on local causality.');

  const balance = status?.agent_quadrant_balance ?? [0.25, 0.25, 0.25, 0.25];

  const radarData = [
    { subject: 'PhiX (Logic)', weight: Math.round(balance[0] * 100), fullMark: 100 },
    { subject: 'BhiX (Creativity)', weight: Math.round(balance[1] * 100), fullMark: 100 },
    { subject: 'DhiX (Optimization)', weight: Math.round(balance[2] * 100), fullMark: 100 },
    { subject: 'Helix (Subconscious)', weight: Math.round(balance[3] * 100), fullMark: 100 },
  ];

  const agentInfos = [
    {
      id: 'phix',
      name: 'PhiX',
      role: 'Logic & Deductive Rigor Agent',
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      desc: 'Validates strict logical consistency, inference chains, and mathematical proofs across inputs.',
      stats: { success_rate: '99.4%', avg_time: '0.04s', quality: '0.92' }
    },
    {
      id: 'bhix',
      name: 'BhiX',
      role: 'Creativity & Invention Agent',
      color: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      desc: 'Generates multidimensional creative connections, novel associations, and conceptual metaphors.',
      stats: { success_rate: '98.1%', avg_time: '0.05s', quality: '0.88' }
    },
    {
      id: 'dhix',
      name: 'DhiX',
      role: 'Efficiency & Optimization Agent',
      color: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
      desc: 'Compresses outputs to maximum informational density while eliminating redundancy and noise.',
      stats: { success_rate: '99.8%', avg_time: '0.03s', quality: '0.95' }
    },
    {
      id: 'helix',
      name: 'Helix',
      role: 'Subconscious & Intuition Agent',
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      desc: 'Uncovers latent emotional undertones, implied context, and deep intuitive resonance.',
      stats: { success_rate: '97.9%', avg_time: '0.06s', quality: '0.89' }
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Core Agent Quadrant System (CAQ - Innovation #66)
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-medium">
            4-Agent Parallel Matrix for Logic (PhiX), Invention (BhiX), Optimization (DhiX), and Intuition (Helix).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-[#09090b] border border-[#27272a] text-zinc-300">
          <span>Coordination Quality:</span>
          <span className="text-emerald-400 font-bold">94.2%</span>
        </div>
      </div>

      {/* Radar Chart & Agent Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Radar Chart */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] flex flex-col items-center justify-center space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 self-start flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            <span>Quadrant Balance Radar</span>
          </h3>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'sans-serif', fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 50]} tick={{ fill: '#71717a', fontSize: 9 }} />
                <Radar name="Quadrant Weight %" dataKey="weight" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 text-center">
            Harmonic Weight: PhiX {Math.round(balance[0]*100)}% • BhiX {Math.round(balance[1]*100)}% • DhiX {Math.round(balance[2]*100)}% • Helix {Math.round(balance[3]*100)}%
          </div>
        </div>

        {/* Agent Cards Grid (2 cols) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agentInfos.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`p-5 rounded-[2rem] border transition-all cursor-pointer space-y-3 shadow-xl ${
                selectedAgent === agent.id
                  ? 'border-indigo-500 bg-[#18181b] shadow-lg shadow-indigo-500/10'
                  : 'border-[#27272a] bg-[#09090b] hover:border-zinc-700 hover:bg-[#18181b]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${agent.color}`}>
                  {agent.name}
                </span>
                <span className="text-xs font-mono text-zinc-500 font-bold">
                  {agent.stats.success_rate} Success
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-tight">{agent.role}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{agent.desc}</p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#27272a] text-[10px] font-mono">
                <div>
                  <div className="text-zinc-500 uppercase font-bold">Avg Time</div>
                  <div className="text-zinc-200 font-bold">{agent.stats.avg_time}</div>
                </div>
                <div>
                  <div className="text-zinc-500 uppercase font-bold">Quality</div>
                  <div className="text-emerald-400 font-bold">{agent.stats.quality}</div>
                </div>
                <div>
                  <div className="text-zinc-500 uppercase font-bold">Status</div>
                  <div className="text-indigo-400 font-bold">ACTIVE</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Agent Benchmark Simulator */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>Individual Agent Isolation Test ({selectedAgent.toUpperCase()})</span>
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            className="w-full rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-3 text-xs text-zinc-200 font-mono focus:border-indigo-500 focus:outline-none"
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">
              Selected Agent: <strong className="text-indigo-400 uppercase font-bold">{selectedAgent}</strong>
            </span>
            <button
              onClick={() => alert(`Benchmark simulation run for agent ${selectedAgent.toUpperCase()}: Test output generated with 0.94 quality score.`)}
              className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
            >
              Run Isolation Test
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
