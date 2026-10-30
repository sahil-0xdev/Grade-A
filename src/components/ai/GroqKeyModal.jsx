import React, { useState } from 'react';
import { Key, Sparkles, Check, AlertCircle, ExternalLink, X, Shield, Cpu } from 'lucide-react';
import { getGroqApiKey, setGroqApiKey, getGroqModel, setGroqModel, AVAILABLE_GROQ_MODELS } from '../../services/aiService';

export default function GroqKeyModal({ isOpen, onClose, onKeySaved }) {
  const [apiKeyInput, setApiKeyInput] = useState(getGroqApiKey());
  const [selectedModel, setSelectedModel] = useState(getGroqModel());
  const [testStatus, setTestStatus] = useState(null); // null | 'testing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleTestAndSave = async (e) => {
    e.preventDefault();
    const cleanKey = apiKeyInput.trim();

    if (!cleanKey) {
      setGroqApiKey('');
      setGroqModel(selectedModel);
      setTestStatus('success');
      if (onKeySaved) onKeySaved('');
      setTimeout(() => onClose(), 600);
      return;
    }

    setTestStatus('testing');
    setErrorMessage('');

    // Determine candidate models to test (prioritize selectedModel, then robust fallbacks)
    const candidateModels = [
      selectedModel,
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'qwen/qwen3.8-27b'
    ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

    let workingModel = null;
    let authError = null;

    for (const modelToTest of candidateModels) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cleanKey}`
          },
          body: JSON.stringify({
            model: modelToTest,
            messages: [{ role: 'user', content: 'Ping' }],
            max_tokens: 5
          })
        });

        if (response.ok) {
          workingModel = modelToTest;
          break;
        }

        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData.error?.message || `HTTP ${response.status}`;
        if (response.status === 401) {
          authError = new Error('Invalid Groq API Key. Please verify your key at https://console.groq.com/keys');
          break;
        } else if (response.status === 404 || errMsg.includes('does not exist') || errMsg.includes('model_not_found')) {
          // try next fallback model
          continue;
        } else {
          authError = new Error(errMsg);
        }
      } catch (err) {
        authError = err;
      }
    }

    if (workingModel) {
      setGroqApiKey(cleanKey);
      setGroqModel(workingModel);
      setSelectedModel(workingModel);
      setTestStatus('success');
      if (onKeySaved) onKeySaved(cleanKey);
      setTimeout(() => {
        onClose();
      }, 900);
    } else {
      setTestStatus('error');
      setErrorMessage(authError?.message || 'Failed to verify Groq API key with available models.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0e1216] border border-white/15 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#12161b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F9870D]/15 border border-[#F9870D]/30 flex items-center justify-center text-[#F9870D]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Groq AI Configuration</h3>
              <p className="text-[11px] text-zinc-400">Ultra-fast local & free generative intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body & Form */}
        <form onSubmit={handleTestAndSave} className="p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Quick Guide to get key */}
          <div className="p-3.5 rounded-2xl bg-[#161a22] border border-[#F9870D]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F9870D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                How to get your free Groq API key:
              </span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-white underline hover:text-[#F9870D] inline-flex items-center gap-1 font-semibold"
              >
                <span>console.groq.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal pl-4 space-y-1 text-zinc-300 text-[11px] leading-relaxed">
              <li>Sign in for free at <strong>console.groq.com</strong> (no card needed).</li>
              <li>Click <strong>API Keys</strong> &rarr; <strong>Create API Key</strong>.</li>
              <li>Copy the key (starts with <code className="bg-[#0b0e12] px-1 py-0.5 rounded text-[#F9870D]">gsk_...</code>) and paste below.</li>
            </ol>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="block text-zinc-300 font-bold">
              Groq API Key
            </label>
            <input
              type="password"
              placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={apiKeyInput}
              onChange={(e) => {
                setApiKeyInput(e.target.value);
                setTestStatus(null);
              }}
              className="w-full p-3 bg-[#14181f] border border-white/15 rounded-xl text-white font-mono placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#F9870D] text-xs"
            />
            <div className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                Stored 100% locally on your browser. Never sent to any external server.
              </span>
            </div>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="block text-zinc-300 font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#F9870D]" />
              Select Groq Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2.5 bg-[#14181f] border border-white/15 rounded-xl text-zinc-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F9870D]"
            >
              {AVAILABLE_GROQ_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Alert Banner */}
          {testStatus === 'testing' && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>Verifying API Key with Groq servers...</span>
            </div>
          )}

          {testStatus === 'success' && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Groq API Key verified and saved successfully!</span>
            </div>
          )}

          {testStatus === 'error' && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white bg-[#14181f] hover:bg-[#1a2029] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={testStatus === 'testing'}
              className="px-5 py-2.5 bg-[#F9870D] hover:bg-[#ea7600] text-[#000000] font-black rounded-xl transition-all shadow-sm disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>Verify & Save Key</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
