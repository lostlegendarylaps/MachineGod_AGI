import React, { useState, useEffect } from 'react';
import { Radio, ToggleLeft, ToggleRight, FileCode, Save, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { EventLogItem, PluginInfo } from '../types';

export const PluginAndEventBus: React.FC = () => {
  const [events, setEvents] = useState<EventLogItem[]>([]);
  const [configJson, setConfigJson] = useState<string>('');
  const [configSaved, setConfigSaved] = useState<boolean>(false);
  const [pluginsList, setPluginsList] = useState<PluginInfo[]>([
    { name: 'SimulateBeforeCompression', version: '2.1.0', enabled: true, dependencies: [], description: 'Multiverse response simulation & branch selection' },
    { name: 'QuantumBayesianGrid', version: '2.1.0', enabled: true, dependencies: [], description: '6x6 Quantum emotional probability grid' },
    { name: 'TruthStratifier', version: '2.1.0', enabled: true, dependencies: [], description: '6-Layer Truth verification engine' },
    { name: 'CoreAgentQuadrant', version: '2.1.0', enabled: true, dependencies: [], description: 'PhiX, BhiX, DhiX, Helix 4-agent matrix' },
    { name: 'CosmicComplianceValidator', version: '2.1.0', enabled: true, dependencies: [], description: '5 Cosmic law verification' },
    { name: 'TernaryLogicUnit', version: '2.1.0', enabled: true, dependencies: [], description: '3-state non-binary processing unit' },
  ]);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.events) setEvents(data.events);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data.config) {
        setConfigJson(JSON.stringify(data.config, null, 2));
      }
    } catch (err) {
      console.error('Failed to fetch config:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchConfig();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveConfig = async () => {
    try {
      const parsed = JSON.parse(configJson);
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: parsed })
      });
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 2000);
      fetchEvents();
    } catch (err) {
      alert('Invalid JSON structure. Please verify formatting.');
    }
  };

  const togglePlugin = (pluginName: string) => {
    setPluginsList((prev) =>
      prev.map((p) => (p.name === pluginName ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Plugin Architecture & Event Bus Core
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-medium">
            Modular AI integration with async event dispatch, hook callbacks, and runtime configuration management.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-[#09090b] border border-[#27272a] text-zinc-300">
          <span>Active Plugins:</span>
          <span className="text-indigo-400 font-bold">{pluginsList.filter((p) => p.enabled).length} / {pluginsList.length}</span>
        </div>
      </div>

      {/* Grid: Plugin Manager + Event Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Plugin Architecture Manager */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ToggleRight className="w-4 h-4 text-indigo-400" />
              <span>Modular Plugin Registry</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">v2.1.0 Architecture</span>
          </h3>

          <div className="space-y-3">
            {pluginsList.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-2xl border border-[#27272a] bg-[#09090b] flex items-center justify-between gap-4"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">v{p.version}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans">{p.description}</p>
                </div>

                <button
                  onClick={() => togglePlugin(p.name)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                    p.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#18181b] text-zinc-500 border border-[#27272a]'
                  }`}
                >
                  {p.enabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Event Bus Log Stream */}
        <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Event Bus Stream Log</span>
            </h3>

            <button
              onClick={fetchEvents}
              className="p-2 rounded-full border border-[#27272a] bg-[#09090b] text-zinc-400 hover:text-white"
              title="Refresh Stream"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 font-mono text-xs">
            {events.length === 0 ? (
              <div className="text-zinc-500 text-center py-8 text-[11px]">No events recorded in bus history.</div>
            ) : (
              events.map((evt) => (
                <div key={evt.id} className="p-3 rounded-2xl border border-[#27272a] bg-[#09090b] space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-indigo-400 font-bold">{evt.type}</span>
                    <span className="text-zinc-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-zinc-400 text-[10px] truncate">
                    {JSON.stringify(evt.data)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* System Configuration Editor */}
      <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>system_config.json Configuration Editor</span>
          </h3>

          <button
            onClick={handleSaveConfig}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
          >
            {configSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{configSaved ? 'Saved' : 'Save Config'}</span>
          </button>
        </div>

        <textarea
          value={configJson}
          onChange={(e) => setConfigJson(e.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-[#27272a] bg-[#09090b] p-4 font-mono text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none resize-none"
        />
      </div>

    </div>
  );
};
