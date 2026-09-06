import { Outlet, Link, useLocation } from 'react-router-dom';
import { useOperational, OperationalProvider } from '@/context/OperationalContext';
import { useTheme } from '@/context/ThemeContext';
import { PORTAL_DATA } from '@/lib/portalData';
import { Map, CalendarClock, Compass, PhoneCall, Bot, Menu, X, CheckCircle2, User, Bell, ChevronDown, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalLayout() {
  return (
    <OperationalProvider>
      <PortalLayoutContent />
    </OperationalProvider>
  );
}

function PortalLayoutContent() {
  const { theme, toggleTheme } = useTheme();
  const { templeInfo, setSelectedTemple } = useOperational();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{sender: 'ai' | 'user', text: string}[]>([
    { sender: 'ai', text: `Namaste! Welcome to ${templeInfo.name}. I am your trusted Digital Assistant. How can I help you have a blessed darshan today?` }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: "Thank you for your question. As this is a demo environment, I am currently operating in limited capacity. Please refer to the information sections above." }]);
      setIsTyping(false);
    }, 1200);
  };

  const pData = PORTAL_DATA[templeInfo.id];

  const navLinks = [
    { name: 'Live Status', path: '/portal', icon: <CheckCircle2 className="w-4 h-4" /> },
    { name: 'AI Planner', path: '/portal/planner', icon: <CalendarClock className="w-4 h-4" /> },
    { name: 'Pilgrim Map', path: '/portal/map', icon: <Map className="w-4 h-4" /> },
  ];

  const temples = [
    { id: 'somnath', name: 'Somnath' },
    { id: 'dwarka', name: 'Dwarka' },
    { id: 'ambaji', name: 'Ambaji' },
    { id: 'pavagadh', name: 'Pavagadh' },
  ] as const;

  return (
    <div className="min-h-screen bg-sandstone-50 font-sans text-slate-900 selection:bg-saffron-500/20 relative">
      
      {/* Hero Background Crossfade */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={templeInfo.id}
            src={pData.hero.image}
            alt="Temple Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-125"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-sandstone-50/80 to-sandstone-50" />
      </div>

      <div className="relative z-10">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/portal" className="flex items-center gap-3 group">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${pData.theme.gradient} flex items-center justify-center shadow-lg transition-all group-hover:shadow-xl group-hover:scale-105`}>
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                  YatraFlow
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-saffron-50 text-saffron-600 uppercase tracking-widest border border-saffron-200/50">Govt. of Gujarat</span>
                </div>
                <div className="text-xs text-slate-400 font-medium tracking-wide">
                  AI Powered Pilgrimage Assistant
                </div>
              </div>
            </Link>

            {/* Desktop Navigation & Temple Switcher */}
            <div className="hidden md:flex items-center gap-6">
              
              {/* Temple Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setSwitcherOpen(!switcherOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-sandstone-100 hover:bg-sandstone-200 border border-sandstone-200 rounded-xl text-sm font-bold text-slate-800 transition-colors"
                >
                  {templeInfo.name}
                  <ChevronDown className={`w-4 h-4 transition-transform text-slate-400 ${switcherOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {switcherOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-portal-hover overflow-hidden py-1.5 z-50"
                    >
                      {temples.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setSelectedTemple(t.id); setSwitcherOpen(false); }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm font-bold transition-colors",
                            templeInfo.id === t.id ? "bg-saffron-50 text-saffron-600" : "text-slate-500 hover:bg-sandstone-50 hover:text-slate-900"
                          )}
                        >
                          {t.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <nav className="flex items-center gap-1 bg-sandstone-100/80 p-1.5 rounded-full border border-sandstone-200/60">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all relative overflow-hidden group",
                        isActive ? "text-saffron-600" : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeNavPortal" 
                          className="absolute inset-0 bg-white shadow-portal-card border border-slate-200/80 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.icon}</span>
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-px h-6 bg-slate-200 mx-1" />
              <button onClick={toggleTheme} className="w-10 h-10 rounded-full hover:bg-sandstone-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors relative" title="Toggle Dark/Light Mode">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button className="w-10 h-10 rounded-full hover:bg-sandstone-100 flex items-center justify-center text-slate-400 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-saffron-500 rounded-full animate-saffron-pulse" />
              </button>
              
              <button className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-sandstone-50 flex items-center justify-center text-slate-400 transition-colors overflow-hidden">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-saffron-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 bg-white overflow-hidden shadow-portal-hover"
            >
              <div className="p-4 flex flex-col gap-2">
                <select 
                  value={templeInfo.id}
                  onChange={(e) => { setSelectedTemple(e.target.value as any); setMobileMenuOpen(false); }}
                  className="w-full mb-4 bg-sandstone-50 border border-sandstone-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-saffron-400"
                >
                  {temples.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-colors",
                      location.pathname === link.path ? "bg-saffron-50 text-saffron-600 border border-saffron-200/50" : "bg-sandstone-50 text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-900 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-500 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold">YatraFlow</div>
                <div className="text-[10px] text-slate-500 tracking-wider uppercase">Government of Gujarat · Digital India</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 text-center">
              © 2025 YatraFlow — AI-Powered Pilgrimage Management System · Government of Gujarat
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI & Emergency Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-80 sm:w-96 bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col mb-2 origin-bottom-right"
            >
              <div className={`p-5 bg-gradient-to-r ${pData.theme.gradient} flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/20">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">YatraFlow AI</div>
                    <div className="text-xs text-white/80 font-medium">Digital FAQ Assistant</div>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="h-96 p-5 bg-sandstone-50 overflow-y-auto flex flex-col gap-4 text-sm scroll-smooth">
                {messages.map((msg, i) => (
                  <div key={i} className={`p-4 rounded-2xl border shadow-sm w-[85%] leading-relaxed ${msg.sender === 'ai' ? 'bg-white rounded-tl-sm border-slate-200/80 text-slate-700 self-start' : 'bg-saffron-50 rounded-tr-sm border-saffron-200 text-slate-800 self-end'}`}>
                    {msg.text}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-200/80 text-slate-700 shadow-sm w-16 flex items-center justify-center gap-1 self-start">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150" />
                  </div>
                )}

                {messages.length === 1 && !isTyping && (
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-1">Suggested Questions</div>
                    <button onClick={() => handleSend("Where is the nearest parking?")} className="text-left px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-500 hover:text-saffron-600 hover:border-saffron-200 shadow-sm transition-all hover:-translate-y-0.5">
                      Where is the nearest parking?
                    </button>
                    <button onClick={() => handleSend("What is the dress code?")} className="text-left px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-500 hover:text-saffron-600 hover:border-saffron-200 shadow-sm transition-all hover:-translate-y-0.5">
                      What is the dress code?
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(chatInput)}
                  placeholder="Type your question..." 
                  className="flex-1 bg-sandstone-50 border border-sandstone-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-saffron-400 focus:ring-2 focus:ring-saffron-500/10 transition-all" 
                />
                <button onClick={() => handleSend(chatInput)} className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-saffron-500 to-saffron-600 hover:opacity-90 text-white rounded-xl shadow-lg transition-all hover:scale-105">
                  <span className="text-lg leading-none transform rotate-90 inline-block -mt-1">&#10148;</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <button onClick={() => window.alert('Calling Emergency Services 112...')} className="h-14 px-5 rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-105">
            <PhoneCall className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-xs">Emergency</span>
          </button>
          {!chatOpen && (
            <button 
              onClick={() => setChatOpen(true)}
              className="w-14 h-14 rounded-full saffron-gradient-bg hover:opacity-90 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 relative"
            >
              <Bot className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
            </button>
          )}
        </div>
      </div>

      </div>
    </div>
  );
}
