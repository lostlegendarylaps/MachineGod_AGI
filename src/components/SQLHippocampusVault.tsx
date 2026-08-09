import React, { useState, useEffect } from 'react';
import { Database, Search, Plus, Trash2, Tag, Sparkles, Filter, Shield } from 'lucide-react';
import { MemoryFragment } from '../types';

export const SQLHippocampusVault: React.FC = () => {
  const [memories, setMemories] = useState<MemoryFragment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [newSymbol, setNewSymbol] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newType, setNewType] = useState<string>('semantic');

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/memories');
      const data = await res.json();
      if (data.memories) {
        setMemories(data.memories);
      }
    } catch (err) {
      console.error('Failed to fetch memories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: newSymbol || 'MANUAL_SEED',
          content: newContent,
          memory_type: newType,
          importance_score: 0.85
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewSymbol('');
        setNewContent('');
        fetchMemories();
      }
    } catch (err) {
      console.error('Failed to add memory:', err);
    }
  };

  const handleDeleteMemory = async (id: string) => {
    try {
      await fetch(`/api/memories/${id}`, { method: 'DELETE' });
      setMemories(memories.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Failed to delete memory:', err);
    }
  };

  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || m.memory_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              SQL Hippocampus & Helix Compression Vault
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-medium">
            High-dimensional long-term memory store indexed by symbolic Ψ-resonance and karmic weights.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Seed Cognitive Memory</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[2rem] border border-[#27272a] bg-[#18181b] shadow-xl">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3" />
          <input
            type="text"
            placeholder="Search memory symbol or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-[#27272a] bg-[#09090b] pl-10 pr-4 py-2.5 text-xs text-zinc-200 font-mono focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-bold">
          <Filter className="w-4 h-4 text-zinc-500" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-2.5 text-zinc-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="all">All Memory Types</option>
            <option value="working">Working</option>
            <option value="episodic">Episodic</option>
            <option value="semantic">Semantic</option>
            <option value="emotional">Emotional</option>
            <option value="consciousness">Consciousness</option>
            <option value="spiritual">Spiritual</option>
          </select>
        </div>
      </div>

      {/* Memory List Grid */}
      {loading ? (
        <div className="p-12 text-center text-zinc-500 font-bold text-xs">
          Loading SQL Hippocampus index...
        </div>
      ) : filteredMemories.length === 0 ? (
        <div className="p-12 text-center text-zinc-500 text-xs border border-dashed border-[#27272a] rounded-[2rem]">
          No memory fragments found matching query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
                    {mem.symbol}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                      {mem.memory_type}
                    </span>
                    <button
                      onClick={() => handleDeleteMemory(mem.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1 transition-all"
                      title="Purge Memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-200 font-sans leading-relaxed line-clamp-3">
                  {mem.content}
                </p>
              </div>

              <div className="pt-3 border-t border-[#27272a] flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <div>
                  Truth Layer: <strong className="text-emerald-400">{mem.truth_layer}</strong>
                </div>
                <div>
                  Resonance: <strong className="text-indigo-400">{mem.resonance_score}</strong>
                </div>
                <div>
                  Karmic: <strong className="text-purple-300">{mem.karmic_weight}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Memory Seed Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-[#27272a] bg-[#18181b] p-6 space-y-5 shadow-2xl">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" />
              <span>Seed SQL Hippocampus Memory</span>
            </h3>

            <form onSubmit={handleAddMemory} className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Symbolic Tag</label>
                <input
                  type="text"
                  placeholder="e.g. CONSCIOUSNESS_SEED_1"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-3 text-zinc-200 font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Memory Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-3 text-zinc-200 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="semantic">Semantic</option>
                  <option value="episodic">Episodic</option>
                  <option value="working">Working</option>
                  <option value="consciousness">Consciousness</option>
                  <option value="spiritual">Spiritual</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Memory Content</label>
                <textarea
                  rows={3}
                  placeholder="Enter memory statement..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] p-4 text-zinc-200 focus:border-indigo-500 focus:outline-none resize-none font-sans font-normal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#27272a] text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  Store Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
