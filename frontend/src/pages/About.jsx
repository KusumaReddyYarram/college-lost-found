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
      color: "border-[#C9A96E]/40 bg-[#C9A96E]/15 text-[#183C35]",
      description: "Modern startup-grade landing interface, auth pages (Login/Register), MERN backend project scaffold, and smart matching algorithm specification."
    },
    {
      phase: "Phase 2",
      title: "Smart Matching Engine & Claim Verification",
      status: "Next Release",
      color: "border-[#C96F52]/40 bg-[#C96F52]/15 text-[#C96F52]",
      description: "Attribute matrix execution (category, color, location radius, time delta), explainable confidence scoring (0-100%), and private ownership question unlocks."
    },
    {
      phase: "Phase 3",
      title: "AI Assistant & Image Similarity Matching",
      status: "Planned",
      color: "border-[#31594F]/40 bg-[#31594F]/15 text-[#31594F]",
      description: "Conversational report assistant to refine raw student descriptions, feature vector extraction for photo comparisons, and duplicate report merging."
    },
    {
      phase: "Phase 4",
      title: "Campus Loss Heatmap & Security Dashboard",
      status: "Planned",
      color: "border-[#C9A96E]/40 bg-[#C9A96E]/15 text-[#183C35]",
      description: "Interactive campus map visualizing high-frequency loss zones (Library, Cafeteria, Sports Complex) and analytics for university administration."
    }
  ];

  return (
    <div className="space-y-20 pb-20 pt-8 bg-[#F7F4ED] text-[#24332F]">
      
      {/* SECTION 1: HEADER & STORY INTRO */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183C35]/10 border border-[#183C35]/20 text-[#183C35] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C96F52]" />
          <span>The Story Behind CampusFind AI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#183C35] tracking-tight leading-tight">
          Reimagining How Belongings Are Recovered On College Campuses.
        </h1>
        <p className="text-[#66736D] text-base sm:text-lg leading-relaxed font-medium">
          Every day across university campuses, hundreds of laptops, keys, wallets, and ID cards are lost. We built CampusFind AI to transition from chaotic notice boards to intelligent attribute matching.
        </p>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] shadow-xl space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C96F52]/10 text-[#C96F52] border border-[#C96F52]/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C96F52] uppercase tracking-widest">1. The Friction Point</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#183C35]">Why Traditional Lost & Found Fails</h2>
            </div>
          </div>

          <p className="text-[#66736D] text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
            In traditional university setups, lost and found processes are scattered across WhatsApp groups, physical security desks, and social media posts. This creates massive inefficiencies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            
            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#D8D0C1] space-y-2">
              <h3 className="text-sm font-bold text-[#183C35]">Manual & Unorganized</h3>
              <p className="text-xs text-[#66736D] leading-relaxed font-medium">
                Items sit unclaimed in security drawers because students don't know which specific office received their item.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#D8D0C1] space-y-2">
              <h3 className="text-sm font-bold text-[#183C35]">Vulnerable to False Claims</h3>
              <p className="text-xs text-[#66736D] leading-relaxed font-medium">
                Posting exact photos and descriptions on public groups allows opportunists to falsely claim valuable electronics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7F4ED] border border-[#D8D0C1] space-y-2">
              <h3 className="text-sm font-bold text-[#183C35]">Keyword Search Limitations</h3>
              <p className="text-xs text-[#66736D] leading-relaxed font-medium">
                A report titled "Black Bag" won't match a query for "Herschel Backpack" in basic text filters.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: OUR SOLUTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#183C35] uppercase tracking-widest">2. Our Paradigm Shift</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#183C35] tracking-tight">
            An Intelligent Campus Recovery System
          </h2>
          <p className="text-[#66736D] text-sm sm:text-base font-medium">
            CampusFind AI bridges the gap by connecting lost and found submissions using multi-attribute similarity calculations and private ownership validation.
          </p>
        </div>

        {/* SECTION 4: HOW SMART MATCHING WORKS STEP FLOW */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] shadow-xl space-y-8">
          <h3 className="text-xs font-black text-[#183C35] uppercase tracking-wider text-center">
            3. How Smart Matching Operates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            
            <div className="p-4 rounded-xl bg-[#F7F4ED] border border-[#D8D0C1] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C96F52]/20 text-[#C96F52] flex items-center justify-center font-extrabold text-xs mx-auto">1</div>
              <p className="text-xs font-bold text-[#183C35]">Lost Report</p>
              <p className="text-[11px] text-[#66736D]">Structured attribute submission</p>
            </div>

            <div className="hidden md:flex justify-center text-[#C96F52]">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="p-4 rounded-xl bg-[#183C35] text-white border border-[#31594F] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center font-extrabold text-xs mx-auto">2</div>
              <p className="text-xs font-bold text-[#C9A96E]">Similarity Matrix</p>
              <p className="text-[11px] text-[#E9E1D2]">Category + Proximity + Color</p>
            </div>

            <div className="hidden md:flex justify-center text-[#C96F52]">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="p-4 rounded-xl bg-[#31594F] text-white border border-[#447468] text-center space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center font-extrabold text-xs mx-auto">3</div>
              <p className="text-xs font-bold text-white">Verified Recovery</p>
              <p className="text-[11px] text-[#E9E1D2]">Ownership secret confirmed</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CAMPUSFIND AI & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Why CampusFind AI */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] space-y-6 shadow-xl">
          <span className="text-xs font-bold text-[#C96F52] uppercase tracking-widest">4. Key Differentiators</span>
          <h2 className="text-2xl font-black text-[#183C35]">Why CampusFind AI Stand Out</h2>
          
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#31594F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#183C35] block font-bold">Explainable Match Confidence (0-100%)</strong>
                <span className="text-[#66736D] font-medium">Shows clear bullet points explaining exactly why an item is flagged as a match.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#31594F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#183C35] block font-bold">Privacy-First Information Masking</strong>
                <span className="text-[#66736D] font-medium">Keeps distinct identifying traits private until private verification passes.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#31594F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#183C35] block font-bold">Campus Proximity Radius</strong>
                <span className="text-[#66736D] font-medium">Factors in university building geography and timestamp deltas.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Vision Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#183C35] text-white border border-[#31594F] flex flex-col justify-between space-y-6 shadow-2xl">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-widest">5. Core Mission</span>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              "Make every lost item recoverable."
            </h2>
            <p className="text-[#E9E1D2] text-xs sm:text-sm leading-relaxed font-medium">
              We envision a smart university ecosystem where technology minimizes stress, prevents theft, and restores lost possessions safely to their rightful owners.
            </p>
          </div>

          <div className="pt-4 border-t border-[#31594F] text-xs text-[#C9A96E] font-medium">
            CampusFind AI • Designed for Scalable University Deployment
          </div>
        </div>

      </section>

      {/* SECTION 6: FUTURE ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#183C35] uppercase tracking-widest">6. Platform Progression</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#183C35] tracking-tight">
            Future Development Roadmap
          </h2>
          <p className="text-[#66736D] text-sm sm:text-base font-medium">
            Our architectural blueprint allows seamless rollout of advanced AI modules without restructuring core components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D8D0C1] space-y-3 relative shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#66736D] font-bold">{item.phase}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${item.color}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#183C35]">{item.title}</h3>
              <p className="text-xs text-[#66736D] leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
