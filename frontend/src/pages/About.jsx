import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, AlertTriangle, ShieldCheck, Cpu, ArrowRight, BrainCircuit, 
  MapPin, Bell, Layers, CheckCircle2, Search, Flame, LineChart, Target, Zap
} from 'lucide-react';

const About = () => {
  const roadmapItems = [
    {
      phase: "Phase 1 (Current Scope)",
      title: "Core UX & Architecture Foundation",
      status: "Completed",
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
      description: "Modern startup-grade landing interface, auth pages (Login/Register), MERN backend project scaffold, and smart matching algorithm specification."
    },
    {
      phase: "Phase 2",
      title: "Smart Matching Engine & Claim Verification",
      status: "Next Release",
      color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
      description: "Attribute matrix execution (category, color, location radius, time delta), explainable confidence scoring (0-100%), and private ownership question unlocks."
    },
    {
      phase: "Phase 3",
      title: "AI Assistant & Image Similarity Matching",
      status: "Planned",
      color: "border-purple-500/40 bg-purple-500/10 text-purple-300",
      description: "Conversational report assistant to refine raw student descriptions, feature vector extraction for photo comparisons, and duplicate report merging."
    },
    {
      phase: "Phase 4",
      title: "Campus Loss Heatmap & Security Dashboard",
      status: "Planned",
      color: "border-amber-500/40 bg-amber-500/10 text-amber-300",
      description: "Interactive campus map visualizing high-frequency loss zones (Library, Cafeteria, Sports Complex) and analytics for university administration."
    }
  ];

  return (
    <div className="space-y-20 pb-20 pt-8">
      
      {/* SECTION 1: HEADER & STORY INTRO */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>The Story Behind CampusFind AI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Reimagining How Belongings Are Recovered On College Campuses.
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Every day across university campuses, hundreds of laptops, keys, wallets, and ID cards are lost. We built CampusFind AI to transition from chaotic notice boards to intelligent attribute matching.
        </p>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800/80 shadow-2xl space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">1. The Friction Point</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Traditional Lost & Found Fails</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            In traditional university setups, lost and found processes are scattered across WhatsApp groups, physical security desks, and social media posts. This creates massive inefficiencies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-200">Manual & Unorganized</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Items sit unclaimed in security drawers because students don't know which specific office received their item.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-200">Vulnerable to False Claims</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Posting exact photos and descriptions on public groups allows opportunists to falsely claim valuable electronics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-200">Keyword Search Limitations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A report titled "Black Bag" won't match a query for "Herschel Backpack" in basic text filters.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: OUR SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">2. Our Paradigm Shift</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            An Intelligent Campus Recovery System
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            CampusFind AI bridges the gap by connecting lost and found submissions using multi-attribute similarity calculations and private ownership validation.
          </p>
        </div>

        {/* SECTION 4: HOW SMART MATCHING WORKS STEP FLOW */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800 space-y-8">
          <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider text-center">
            3. How Smart Matching Operates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mx-auto">1</div>
              <p className="text-xs font-bold text-white">Lost Report</p>
              <p className="text-[11px] text-slate-400">Structured attribute submission</p>
            </div>

            <div className="hidden md:flex justify-center text-indigo-400">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs mx-auto">2</div>
              <p className="text-xs font-bold text-indigo-200">Similarity Matrix</p>
              <p className="text-[11px] text-indigo-300/80">Category + Proximity + Color</p>
            </div>

            <div className="hidden md:flex justify-center text-indigo-400">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mx-auto">3</div>
              <p className="text-xs font-bold text-emerald-200">Verified Recovery</p>
              <p className="text-[11px] text-emerald-300/80">Ownership secret confirmed</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CAMPUSFIND AI & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Why CampusFind AI */}
        <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">4. Key Differentiators</span>
          <h2 className="text-2xl font-extrabold text-white">Why CampusFind AI Stand Out</h2>
          
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Explainable Match Confidence (0-100%)</strong>
                <span className="text-slate-400">Shows clear bullet points explaining exactly why an item is flagged as a match.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Privacy-First Information Masking</strong>
                <span className="text-slate-400">Keeps distinct identifying traits private until private verification passes.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Campus Proximity Radius</strong>
                <span className="text-slate-400">Factors in university building geography and timestamp deltas.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Vision Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">5. Core Mission</span>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              "Make every lost item recoverable."
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We envision a smart university ecosystem where technology minimizes stress, prevents theft, and restores lost possessions safely to their rightful owners.
            </p>
          </div>

          <div className="pt-4 border-t border-indigo-500/20 text-xs text-indigo-300 font-medium">
            CampusFind AI • Designed for Scalable University Deployment
          </div>
        </div>

      </section>

      {/* SECTION 6: FUTURE ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">6. Platform Progression</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Future Development Roadmap
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Our architectural blueprint allows seamless rollout of advanced AI modules without restructuring core components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 font-semibold">{item.phase}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.color}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
