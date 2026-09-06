import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOperational } from '@/context/OperationalContext';
import { PORTAL_DATA } from '@/lib/portalData';
import { Bot, User, Sparkles, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PortalPlanner() {
  const { templeInfo } = useOperational();
  const pData = PORTAL_DATA[templeInfo.id];
  const primaryColor = pData.theme.primary;

  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Namaste! I am the AI Pilgrimage Assistant for ${templeInfo.name}. Tell me about your upcoming visit, and I will craft the perfect itinerary for you. For example, you can say: "I want to visit tomorrow morning with my parents."` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I have analyzed the expected crowd levels, weather, and parking availability at ${templeInfo.name}. Here is the best recommended itinerary for your darshan.`
      }]);
      setShowItinerary(true);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12 min-h-[calc(100vh-80px)] flex flex-col">
      
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center p-3 bg-${pData.theme.secondary} text-${primaryColor} rounded-2xl mb-4 transition-colors`}>
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">AI Visit Planner</h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
          Chat with our intelligent assistant to generate a personalized itinerary for {templeInfo.name}.
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Chat Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col overflow-hidden">
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant' ? `bg-${pData.theme.secondary} text-${primaryColor}` : 'bg-slate-100 text-slate-600'
                }`}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                  msg.role === 'assistant' ? 'bg-slate-50 border border-slate-100 text-slate-700' : `bg-${primaryColor} text-white shadow-md`
                }`}>
                  <p className="leading-relaxed font-medium">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full bg-${pData.theme.secondary} text-${primaryColor} flex items-center justify-center shrink-0`}>
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-${primaryColor} animate-bounce`} />
                  <span className={`w-2 h-2 rounded-full bg-${primaryColor} animate-bounce`} style={{ animationDelay: '0.2s' }} />
                  <span className={`w-2 h-2 rounded-full bg-${primaryColor} animate-bounce`} style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message here..." 
                className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 pr-16 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-${primaryColor} focus:ring-4 focus:ring-${primaryColor}/10 transition-all text-lg`}
              />
              <button 
                onClick={handleSend}
                className={`absolute right-2 top-2 bottom-2 w-12 flex items-center justify-center bg-${primaryColor} hover:opacity-90 text-white rounded-xl shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100`}
                disabled={!input.trim() || isTyping}
              >
                <span className="text-xl transform rotate-90 inline-block -mt-1">&#10148;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Itinerary Panel */}
        <AnimatePresence>
          {showItinerary && (
            <motion.div 
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: '400px' }}
              className="hidden lg:flex flex-col bg-white border border-slate-200 rounded-[2rem] shadow-xl overflow-hidden shrink-0"
            >
              <div className={`p-6 bg-gradient-to-br ${pData.theme.gradient} text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/30">
                    <Sparkles className="w-3 h-3" /> AI Optimized
                  </div>
                  <h2 className="text-2xl font-black mb-1">Your Itinerary</h2>
                  <p className="text-white/80 font-medium text-sm">Tomorrow Morning • {templeInfo.name}</p>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                
                <div className={`p-4 bg-${pData.theme.secondary} rounded-2xl border border-${primaryColor}/20`}>
                  <h3 className={`text-sm font-bold text-${primaryColor} uppercase tracking-widest mb-3`}>Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-white text-${primaryColor} flex items-center justify-center shadow-sm`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">Best Arrival Time</div>
                        <div className="text-sm font-bold text-slate-900">06:30 AM (Least crowded)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-white text-${primaryColor} flex items-center justify-center shadow-sm`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">Recommended Entry</div>
                        <div className="text-sm font-bold text-slate-900">Priority Gate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Step-by-step Route</h3>
                  
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                    
                    <div className="relative flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-800 text-white flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                        <div className="font-bold text-slate-900 text-sm">Arrive at {templeInfo.name}</div>
                        <div className="text-xs text-slate-500 mt-1 font-medium">Park at the main designated visitor lot.</div>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                        <div className="font-bold text-slate-900 text-sm">Security Check</div>
                        <div className="text-xs text-slate-500 mt-1 font-medium">Deposit electronics at the cloak room.</div>
                      </div>
                    </div>

                    <div className="relative flex items-center gap-4 group">
                      <div className={`w-10 h-10 rounded-full border-4 border-white bg-${primaryColor} text-white flex items-center justify-center shrink-0 relative z-10 shadow-sm`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className={`flex-1 bg-${pData.theme.secondary} border border-${primaryColor}/20 p-4 rounded-2xl shadow-sm`}>
                        <div className={`font-bold text-${primaryColor} text-sm`}>Darshan</div>
                        <div className={`text-xs text-${primaryColor}/80 mt-1 font-medium`}>Estimated wait is only 15 minutes.</div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <Link to="/portal/queue" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Join Virtual Queue <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
