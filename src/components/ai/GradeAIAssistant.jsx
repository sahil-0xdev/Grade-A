import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Key,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Check,
  ArrowRight,
  HelpCircle,
  Zap,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import { askGroqAI, getGroqApiKey, getGroqModel } from '../../services/aiService';
import GroqKeyModal from './GroqKeyModal';

export default function GradeAIAssistant({
  isOpen,
  onClose,
  students = [],
  onSelectStudent
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I'm **Grade A AI**, your educational diagnostic assistant powered by **Groq**.\n\nI have complete contextual grounding across your active student cohort (${students.length} students). You can ask me:\n\n* *"Which students are at the highest risk right now?"*\n* *"Why is Marcus Vance flagged?"*\n* *"Who shows declining score trends over tests?"*\n* *"What intervention should we schedule for Aarav Sharma?"*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [groqKey, setGroqKey] = useState(getGroqApiKey());
  const [currentModel, setCurrentModel] = useState(getGroqModel());

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '🚨 Highest Risk Students', query: 'Which students are at the highest risk right now and why?' },
    { label: '📉 Declining Test Trends', query: 'Which students have downward trajectories across sequential test evaluations?' },
    { label: '💡 Intervention Plan', query: 'Suggest personalized intervention plans for students below the 75% attendance threshold.' },
    { label: '📊 Cohort Executive Summary', query: 'Give me an executive summary of the entire cohort health and attendance discipline.' }
  ];

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askGroqAI(query, students, messages);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.text || response.fallbackText || 'I processed your query.',
        isFallback: response.isFallback,
        modelUsed: response.modelUsed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `⚠️ Error communicating with Groq AI: ${err.message}. Please verify your key.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        sender: 'assistant',
        text: `Conversation reset. Ask me anything about your current student cohort!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to parse basic markdown and render clickable student badges
  const renderMessageContent = (text) => {
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-white mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-base font-extrabold text-white mt-2.5 mb-1">{line.replace('## ', '')}</h3>;
      }

      // Bullet points
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const bulletText = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 my-0.5 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F9870D] mt-1.5 shrink-0" />
            <div>{renderFormattedSpans(bulletText)}</div>
          </div>
        );
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="text-xs text-zinc-300 leading-relaxed my-0.5">
          {renderFormattedSpans(line)}
        </p>
      );
    });
  };

  // Helper to highlight bold text, code, and student IDs
  const renderFormattedSpans = (rawText) => {
    // Regex to split by bold **text** or `code`
    const parts = rawText.split(/(\*\*.*?\*\*|`.*?`)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const clean = part.slice(2, -2);
        return <strong key={i} className="font-bold text-white">{clean}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        const clean = part.slice(1, -1);
        
        // Check if this is a student ID from our active cohort
        const matchStudent = students.find(s => s.studentId === clean || s.name === clean);
        if (matchStudent && onSelectStudent) {
          return (
            <button
              key={i}
              onClick={() => onSelectStudent(matchStudent)}
              className="inline-flex items-center gap-1 font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#F9870D]/20 text-[#F9870D] border border-[#F9870D]/40 hover:bg-[#F9870D] hover:text-black transition-colors"
              title={`Click to inspect ${matchStudent.name}`}
            >
              <span>{clean}</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          );
        }

        return <code key={i} className="font-mono text-[11px] px-1 py-0.2 rounded bg-[#161a22] text-[#F9870D]">{clean}</code>;
      }
      return part;
    });
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0c0f13] border-l border-white/15 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-200">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#090c0f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F9870D]/20 border border-[#F9870D]/40 flex items-center justify-center text-[#F9870D] shadow-sm">
              <Sparkles className="w-5 h-5 text-[#F9870D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">Grade A AI</h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  groqKey
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-[#F9870D]/15 text-[#F9870D] border-[#F9870D]/30'
                }`}>
                  {groqKey ? 'Groq Active' : 'Local Engine'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {groqKey ? currentModel : 'Connect free Groq API key'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="p-2 text-zinc-400 hover:text-[#F9870D] rounded-lg hover:bg-white/5 transition-colors"
              title="Configure Groq API Key & Model"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearChat}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              title="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Grounding Notification Bar */}
        <div className="px-4 py-2 bg-[#12161c] border-b border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Grounding: <strong>{students.length} Student Records</strong>
          </span>
          {!groqKey && (
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="text-[#F9870D] font-bold hover:underline flex items-center gap-0.5"
            >
              <span>+ Add Free Groq Key</span>
            </button>
          )}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-zinc-500 font-medium">
                {msg.sender === 'user' ? (
                  <>
                    <span>You</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#F9870D]" />
                    <span className="text-[#F9870D] font-bold">Grade A AI</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </>
                )}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[90%] text-xs shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#F9870D] text-black font-semibold rounded-tr-sm'
                    : 'bg-[#14181f] border border-white/10 text-white rounded-tl-sm'
                }`}
              >
                {msg.sender === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div>{renderMessageContent(msg.text)}</div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-2 p-3 bg-[#14181f] border border-white/10 rounded-2xl max-w-[70%]">
              <span className="w-2 h-2 rounded-full bg-[#F9870D] animate-ping mt-1" />
              <span className="text-xs text-zinc-400">Groq AI is analyzing cohort patterns...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 border-t border-white/10 bg-[#0a0d10] space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p.query)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#14181f] hover:bg-[#1f2530] text-zinc-300 hover:text-white border border-white/10 hover:border-[#F9870D]/40 text-[11px] font-medium transition-all shrink-0 active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about student risk, scores, or interventions..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#14181f] border border-white/15 focus:border-[#F9870D] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#F9870D] transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-[#F9870D] hover:bg-[#ea7600] text-black font-extrabold rounded-xl transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Groq Key Configuration Modal */}
      <GroqKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeySaved={(newKey) => {
          setGroqKey(newKey);
          setCurrentModel(getGroqModel());
        }}
      />
    </>
  );
}
