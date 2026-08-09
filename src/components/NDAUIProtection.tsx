import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, ShieldCheck, KeyRound, FileText, Download, PenTool, RotateCcw, CheckCircle2, AlertTriangle, Eye, EyeOff, FileCode, Cpu, Layers, Sparkles, Award } from 'lucide-react';

interface NDARecord {
  id: string;
  certHash: string;
  signerName: string;
  titleRole: string;
  organization: string;
  email: string;
  executedAt: string;
  signatureType: 'draw' | 'typed';
  status: 'ACTIVE' | 'REVOKED';
  signatureDataUrl?: string;
}

interface ProtectedFile {
  name: string;
  path: string;
  size: string;
  encrypted: boolean;
  checksum: string;
}

interface ProtectionState {
  encrypted: boolean;
  encryptionAlgorithm: string;
  protectedFiles: ProtectedFile[];
  lastEncryptedAt: string | null;
}

export const NDAUIProtection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [records, setRecords] = useState<NDARecord[]>([]);
  const [protectionState, setProtectionState] = useState<ProtectionState | null>(null);

  // Form State
  const [signerName, setSignerName] = useState<string>('Dr. Arthur Pendelton');
  const [titleRole, setTitleRole] = useState<string>('Lead AI Evaluator');
  const [organization, setOrganization] = useState<string>('DeepMind / xAI Peer Review Unit');
  const [email, setEmail] = useState<string>('evaluator@machinegod-lab.org');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [sigMode, setSigMode] = useState<'draw' | 'typed'>('draw');
  const [typedSig, setTypedSig] = useState<string>('');

  // Encryption Control State
  const [passphrase, setPassphrase] = useState<string>('MachineGod-Substrate-Key-2026');
  const [showPassphrase, setShowPassphrase] = useState<boolean>(false);
  const [selectedFileForPreview, setSelectedFileForPreview] = useState<ProtectedFile | null>(null);

  // Canvas Signature Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/nda/status');
      if (res.ok) {
        const data = await res.json();
        setRecords(data.nda_records || []);
        setProtectionState(data.protection_state || null);
        if (data.protection_state?.protectedFiles?.length > 0) {
          setSelectedFileForPreview(data.protection_state.protectedFiles[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch NDA status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  // Canvas Drawing Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasDrawn(false);
  };

  const handleExecuteNda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName || !email || !agreedToTerms) {
      alert('Please fill out all required fields and accept the legal non-disclosure terms.');
      return;
    }

    if (sigMode === 'draw' && !hasDrawn) {
      alert('Please draw your digital signature on the pad.');
      return;
    }

    if (sigMode === 'typed' && !typedSig.trim()) {
      alert('Please type your legal signature.');
      return;
    }

    try {
      let signatureDataUrl = '';
      if (sigMode === 'draw' && canvasRef.current) {
        signatureDataUrl = canvasRef.current.toDataURL();
      }

      const res = await fetch('/api/nda/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signerName,
          titleRole,
          organization,
          email,
          signatureType: sigMode,
          signatureDataUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`NDA Executed successfully! Certificate Hash: ${data.record.certHash}`);
        fetchStatus();
      }
    } catch (err) {
      console.error('Failed to register NDA:', err);
      alert('Error executing NDA registration.');
    }
  };

  const handleToggleEncryption = async (encryptAction: boolean) => {
    if (!passphrase || passphrase.length < 4) {
      alert('Passphrase must be at least 4 characters long.');
      return;
    }

    const endpoint = encryptAction ? '/api/nda/encrypt-configs' : '/api/nda/decrypt-configs';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      });

      if (res.ok) {
        fetchStatus();
      } else {
        alert('Encryption request failed.');
      }
    } catch (err) {
      console.error('Failed to change encryption state:', err);
    }
  };

  const handleDownloadCertificate = (rec: NDARecord) => {
    const certText = `================================================================================
      MACHINEGOD SUBSTRATE AGI - EXECUTED NON-DISCLOSURE CERTIFICATE
================================================================================

Certificate Hash: ${rec.certHash}
Execution Date:   ${new Date(rec.executedAt).toUTCString()}
Status:           ${rec.status} - CONFIDENTIALITY & PROPRIETARY LICENSE ACTIVE

EVALUATOR IDENTIFICATION:
  Full Name:      ${rec.signerName}
  Title / Role:   ${rec.titleRole}
  Organization:   ${rec.organization}
  Contact Email:  ${rec.email}

AGREEMENT SCOPE & PROPRIETARY PROTECTION:
  - MachineGod Substrate AGI Operating System (v2.1.0)
  - Non-Gradient Ternary Logic Gate ($0, 1, 2$) Circuits
  - 6-Layer Truth Stratification Verification Formulas & Weights
  - SQL Hippocampus & Memory Entropy Compression Vectors
  - Colossus Cluster Scaling Metrics & Raw Latency Benchmarks

SIGNATURE METADATA:
  Signature Type: ${rec.signatureType.toUpperCase()}
  Verification Hash: ${rec.certHash}

STATEMENT OF ACKNOWLEDGMENT:
  The Evaluator acknowledges that all proprietary benchmark data, architectural
  schematics, and latency metrics accessed during this session are subject to strict
  confidentiality. Unauthorized distribution or reproduction is prohibited.

================================================================================
Generated by MachineGod Substrate AI Studio Engine | Certificate Hash: ${rec.certHash}
================================================================================`;

    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${rec.certHash}-Executed-NDA.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeRecord = records.find(r => r.status === 'ACTIVE');

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-[2rem] border border-[#27272a] bg-[#18181b] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    NDA & Intellectual Property Protection
                  </h2>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono">
                    AES-256 GCM ENCRYPTION
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Safeguards non-gradient ternary logic gates, 6-layer truth stratification parameters, and Colossus-scale latency traces with legal NDAs and configuration encryption.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 ${
              activeRecord ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              {activeRecord ? <Lock className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4 text-amber-400" />}
              <span>{activeRecord ? `NDA Executed: ${activeRecord.certHash}` : 'NDA Pending Execution'}</span>
            </div>

            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 ${
              protectionState?.encrypted ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-[#09090b] border-[#27272a] text-zinc-400'
            }`}>
              <KeyRound className="w-4 h-4" />
              <span>Configs: {protectionState?.encrypted ? 'ENCRYPTED (AES-256)' : 'UNLOCKED'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Digital NDA Execution Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Mutual Non-Disclosure Agreement (NDA) Pad
                </h3>
              </div>
              <span className="text-zinc-500 text-[11px] font-mono">
                Proprietary Substrate License
              </span>
            </div>

            {/* Legal Terms Scroll Box */}
            <div className="p-4 rounded-2xl border border-[#27272a] bg-[#09090b] text-[11px] font-mono leading-relaxed text-zinc-300 max-h-40 overflow-y-auto space-y-2">
              <p className="font-bold text-white uppercase text-[12px]">
                MUTUAL NON-DISCLOSURE & EVALUATION LICENSE AGREEMENT
              </p>
              <p>
                This Mutual Non-Disclosure Agreement ("Agreement") governs the evaluation and peer-review of the MachineGod Substrate AGI Operating System, ternary logic gates, 6-layer truth stratification weights, and associated benchmarking test suites ("Proprietary Test Bench").
              </p>
              <p className="font-bold text-indigo-300">1. DEFINITION OF CONFIDENTIAL INFORMATION</p>
              <p>
                Confidential Information includes without limitation: raw substrate execution traces, internal memory compression algorithms, quantum psi coherence state equations, and non-public performance benchmarking vectors.
              </p>
              <p className="font-bold text-indigo-300">2. PERMITTED USE & NON-DISCLOSURE</p>
              <p>
                The Evaluator agrees to use Confidential Information solely for scientific peer review, academic auditing, and independent benchmarking. The Evaluator shall not reverse-engineer, decompile, or publicly release un-watermarked internal traces without explicit consent.
              </p>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleExecuteNda} className="space-y-4 text-xs font-bold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Evaluator Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Pendelton"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-2.5 text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Title / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead AI Research Scientist"
                    value={titleRole}
                    onChange={(e) => setTitleRole(e.target.value)}
                    className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-2.5 text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Organization / Lab</label>
                  <input
                    type="text"
                    placeholder="e.g. DeepMind / xAI Peer Review Unit"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-2.5 text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. evaluator@xai-research.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1.5 rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-2.5 text-zinc-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Signature Mode & Pad */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Digital Signature Pad *</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSigMode('draw')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        sigMode === 'draw' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-[#09090b] text-zinc-400 border border-[#27272a]'
                      }`}
                    >
                      Draw Signature
                    </button>
                    <button
                      type="button"
                      onClick={() => setSigMode('typed')}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        sigMode === 'typed' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-[#09090b] text-zinc-400 border border-[#27272a]'
                      }`}
                    >
                      Typed Signature
                    </button>
                  </div>
                </div>

                {sigMode === 'draw' ? (
                  <div className="space-y-2">
                    <div className="border border-[#27272a] rounded-2xl bg-[#09090b] p-1 relative">
                      <canvas
                        ref={canvasRef}
                        width={550}
                        height={130}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-32 cursor-crosshair rounded-xl touch-none bg-[#09090b]"
                      />
                      {!hasDrawn && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-zinc-600 text-xs italic">
                          Draw legal signature here using mouse or touch...
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={clearCanvas}
                        className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 font-mono"
                      >
                        <RotateCcw className="w-3 h-3" /> Clear Signature Pad
                      </button>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Type full legal signature e.g. /s/ Dr. Arthur Pendelton"
                    value={typedSig}
                    onChange={(e) => setTypedSig(e.target.value)}
                    className="w-full rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-3 text-zinc-200 font-serif italic text-base focus:border-indigo-500 focus:outline-none"
                  />
                )}
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 p-3 rounded-2xl border border-[#27272a] bg-[#09090b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 bg-[#18181b] border-[#27272a]"
                />
                <span className="text-[11px] text-zinc-300 font-sans leading-tight">
                  I agree to be legally bound by this Mutual Non-Disclosure Agreement for the MachineGod Substrate Test Bench and authorize the inclusion of my execution hash in generated whitepaper watermarks.
                </span>
              </label>

              <button
                type="submit"
                disabled={!agreedToTerms}
                className="w-full py-3.5 rounded-full bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <PenTool className="w-4 h-4" />
                <span>Execute & Record Digital NDA Signature</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration Encryption & Active Registrations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AES-256 Configuration File Encryption Card */}
          <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Substrate Config File Encryption
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                AES-GCM-256
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Encrypts critical local configuration files (`/server.ts`, `truth_weights.env`, `substrate_config.json`) to prevent unauthorized local reading or tampering.
            </p>

            {/* Passphrase Input */}
            <div className="space-y-2">
              <label className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold">Passphrase Key</label>
              <div className="relative">
                <input
                  type={showPassphrase ? 'text' : 'password'}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full rounded-2xl border border-[#27272a] bg-[#09090b] px-4 py-2.5 pr-10 text-zinc-200 font-mono text-xs focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase(!showPassphrase)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-white"
                >
                  {showPassphrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Action Lock / Unlock Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleToggleEncryption(true)}
                disabled={protectionState?.encrypted}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-600/30 disabled:opacity-40 transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Encrypt Files</span>
              </button>

              <button
                type="button"
                onClick={() => handleToggleEncryption(false)}
                disabled={!protectionState?.encrypted}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 disabled:opacity-40 transition-all"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Files</span>
              </button>
            </div>

            {/* Protected File List */}
            <div className="space-y-2 pt-3">
              <div className="text-[10px] uppercase font-mono font-bold text-zinc-500">Protected Substrate Payload Files</div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {protectionState?.protectedFiles.map((file) => (
                  <div
                    key={file.path}
                    onClick={() => setSelectedFileForPreview(file)}
                    className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                      selectedFileForPreview?.path === file.path ? 'bg-indigo-600/10 border-indigo-500/40 text-white' : 'bg-[#09090b] border-[#27272a] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-[10px]">
                      <span>{file.size}</span>
                      {file.encrypted ? (
                        <span className="text-indigo-400 font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> ENCRYPTED
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> RAW
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ciphertext / Raw Payload Preview */}
            {selectedFileForPreview && (
              <div className="p-3 rounded-xl border border-[#27272a] bg-[#09090b] space-y-1 font-mono text-[10px]">
                <div className="text-zinc-500 flex items-center justify-between">
                  <span>PREVIEW: {selectedFileForPreview.name}</span>
                  <span className="text-indigo-400">{selectedFileForPreview.checksum}</span>
                </div>
                <div className="p-2 rounded bg-black text-zinc-300 overflow-x-auto text-[10px]">
                  {selectedFileForPreview.encrypted ? (
                    <span className="text-amber-300 font-bold">
                      {"0x7F8A9B3C2D1E0F4A... [AES-256-GCM Encrypted Block Data - Decryption key required]"}
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      {`// Raw Substrate Configuration Payload\n{"module": "${selectedFileForPreview.name}", "status": "VERIFIED", "laws_active": 5}`}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Active Executed NDA Registrations Card */}
          <div className="p-6 rounded-[2rem] border border-[#27272a] bg-[#18181b] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Executed NDA Registry
                </h3>
              </div>
              <span className="text-zinc-500 text-xs font-mono font-bold">
                {records.length} Executed
              </span>
            </div>

            <div className="space-y-3">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl border border-[#27272a] bg-[#09090b] space-y-2 text-xs font-mono"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-indigo-400 font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{rec.certHash}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                      {rec.status}
                    </span>
                  </div>

                  <div className="text-zinc-300 font-sans text-xs">
                    <strong>{rec.signerName}</strong> ({rec.titleRole}) — <span className="text-zinc-400">{rec.organization}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#27272a]/60 text-[10px] text-zinc-500">
                    <span>Email: {rec.email}</span>
                    <button
                      onClick={() => handleDownloadCertificate(rec)}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
                    >
                      <Download className="w-3 h-3" /> Download Cert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
