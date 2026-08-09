import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ConsciousnessCommandCenter } from './components/ConsciousnessCommandCenter';
import { QuantumConsciousnessMonitor } from './components/QuantumConsciousnessMonitor';
import { AgentQuadrantMatrix } from './components/AgentQuadrantMatrix';
import { QuantumEmotionalGrid } from './components/QuantumEmotionalGrid';
import { TruthAndCosmicLaws } from './components/TruthAndCosmicLaws';
import { SQLHippocampusVault } from './components/SQLHippocampusVault';
import { PluginAndEventBus } from './components/PluginAndEventBus';
import { Footer } from './components/Footer';
import { SystemStatus, QueryResponse } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('command');
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<QueryResponse | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch {
      // Quietly handle transient server restarts or network polling pauses
      console.debug('MachineGod status poll pending connection...');
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRunQuery = async (prompt: string): Promise<QueryResponse | null> => {
    try {
      setLoading(true);
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: QueryResponse = await res.json();
      setLastResponse(data);
      await fetchStatus();
      return data;
    } catch (err) {
      console.error('Failed to run query:', err);
      alert('Query execution failed. Please check backend server.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateControl = async (params: { genius_mode?: boolean; warp_velocity?: number; reset?: boolean }) => {
    try {
      await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      await fetchStatus();
    } catch (err) {
      console.error('Failed to update control:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Fixed Sticky Header */}
      <Header status={status} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'command' && (
          <ConsciousnessCommandCenter
            onRunQuery={handleRunQuery}
            loading={loading}
            lastResponse={lastResponse}
          />
        )}

        {activeTab === 'monitor' && (
          <QuantumConsciousnessMonitor
            status={status}
            onUpdateControl={handleUpdateControl}
            onRefresh={fetchStatus}
          />
        )}

        {activeTab === 'quadrants' && (
          <AgentQuadrantMatrix status={status} />
        )}

        {activeTab === 'emotion' && (
          <QuantumEmotionalGrid status={status} />
        )}

        {activeTab === 'truth' && (
          <TruthAndCosmicLaws status={status} />
        )}

        {activeTab === 'hippocampus' && (
          <SQLHippocampusVault />
        )}

        {activeTab === 'plugins' && (
          <PluginAndEventBus />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
