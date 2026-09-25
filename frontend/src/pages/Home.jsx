import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Shield, Cpu, Lock, CheckCircle2, ArrowRight, Search, 
  MapPin, Clock, Eye, EyeOff, Zap, Bell, FileText, ChevronRight, 
  Layers, BrainCircuit, RefreshCw, BarChart3, HelpCircle, UserCheck,
  ShieldCheck, Check, Crosshair, Map, Activity
} from 'lucide-react';
import HeroThreeCanvas from '../components/HeroThreeCanvas';

const Home = ({ onOpenReportModal }) => {
  const [selectedMatchDemo, setSelectedMatchDemo] = useState('backpack');
  const [isVerifiedDemo, setIsVerifiedDemo] = useState(false);

  const demoItems = {
    backpack: {
      name: "Black Backpack",
      lostLocation: "Central Library",
      lostDate: "Sept 22, 2:30 PM",
      foundLocation: "Library 2nd Floor",
      foundDate: "Sept 23, 10:15 AM",
      score: 94,
      reasons: [
        "Same category (Bags & Backpacks)",
        "Similar color profile (Matte Black)",
        "Nearby location (Library Perimeter)",
        "Similar detailed description"
      ],
      publicDesc: "Black canvas backpack found near quiet study tables.",
      privateInfo: "Custom blue NASA space patch on bottom front pocket"
    },
    airpods: {
      name: "Apple AirPods Pro",
      lostLocation: "Campus Cafeteria",
      lostDate: "Sept 24, 11:00 AM",
      foundLocation: "Dining Hall Desk",
      foundDate: "Sept 24, 11:45 AM",
      score: 91,
      reasons: [
        "Same brand & model hardware",
        "Matching custom engravings described",
        "Found within 45 minutes of report",
        "Identical cafeteria quadrant"
      ],
      publicDesc: "Wireless earbuds in white charging case.",
      privateInfo: "Initial 'K.Y.' engraved on front case shell"
    },
    phone: {
      name: "iPhone 15 Pro",
      lostLocation: "CSE Auditorium",
      lostDate: "Sept 25, 9:00 AM",
      foundLocation: "Auditorium Podium",
      foundDate: "Sept 25, 9:30 AM",
      score: 96,
      reasons: [
        "Exact device model & color (Titanium)",
        "Matching lock screen wallpaper description",
        "Identical seat row reported",
        "Time gap under 30 minutes"
      ],
      publicDesc: "Dark metallic smartphone with clear protective case.",
      privateInfo: "Lock screen photo of golden retriever dog"
    }
  };

  const activeMatch = demoItems[selectedMatchDemo];

  return (
    <div className="space-y-28 pb-20 overflow-x-hidden text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (THREE.JS 3D LANDING EXPERIENCE)                         */}
      {/* ========================================================================= */}
      <section className="relative pt-8 lg:pt-16 pb-12 overflow-hidden">
        
        {/* Subtle Ambient Radial Gradients & Glow Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Subtle Depth Grid Lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-20">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/10">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Next-Gen Campus Intelligence • Smart Recovery Engine</span>
              </div>

              {/* Main Required Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                FIND WHAT'S LOST.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                  RETURN WHAT'S FOUND.
                </span>
              </h1>

              {/* Required Supporting Text */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                CampusFind AI connects lost and found items using intelligent matching, confidence scoring, and secure ownership verification.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenReportModal && onOpenReportModal('lost')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
                >
                  <span>Report Lost Item</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenReportModal && onOpenReportModal('found')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 shadow-lg backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Report Found Item</span>
                </button>
              </div>

              {/* Visual Demonstration Bar */}
              <div className="pt-6 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Live Smart Match Interactive Preview
                </div>
                
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex items-center justify-between gap-2 shadow-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-sm">🎒</span>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">LOST ITEM</div>
                      <div>Backpack</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-extrabold text-purple-300 animate-pulse">
                      ⚡ SMART MATCH
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-0.5">94% MATCH</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <div>
                      <div className="text-[10px] font-bold text-right text-slate-400 uppercase">FOUND ITEM</div>
                      <div className="text-right">Backpack</div>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-sm">🎒</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px] font-medium text-slate-400">
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> Same category</div>
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> Similar description</div>
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> Nearby location</div>
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-400" /> Similar color</div>
                </div>

              </div>

            </div>

            {/* Right Column: Three.js Interactive 3D Canvas & Floating Glass Cards */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Three.js 3D Canvas Container */}
              <div className="w-full relative z-10">
                <HeroThreeCanvas />
              </div>

              {/* FLOATING GLASS CARDS AROUND 3D SCENE */}
              {/* Floating Card 1: 94% Match */}
              <div className="absolute top-4 left-2 sm:-left-4 z-20 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-[bounce_4s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-sm shrink-0">
                  94%
                </div>
                <div>
                  <div className="text-xs font-bold text-white">94% Match</div>
                  <div className="text-[11px] text-slate-400">Possible Match Identified</div>
                </div>
              </div>

              {/* Floating Card 2: Verified */}
              <div className="absolute top-1/3 -right-2 sm:-right-4 z-20 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-[bounce_5s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Verified</div>
                  <div className="text-[11px] text-slate-400">Ownership Confirmed</div>
                </div>
              </div>

              {/* Floating Card 3: Nearby */}
              <div className="absolute bottom-16 left-4 z-20 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-[bounce_4.5s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Nearby</div>
                  <div className="text-[11px] text-slate-400">Library • 120m away</div>
                </div>
              </div>

              {/* Floating Card 4: Recovered */}
              <div className="absolute -bottom-2 right-6 z-20 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-[bounce_6s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Recovered</div>
                  <div className="text-[11px] text-slate-400">Item successfully returned</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 2 — HOW CAMPUSFIND AI WORKS                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            Guided Recovery Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            HOW CAMPUSFIND AI WORKS
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            A frictionless, intelligent 4-step workflow that transforms chaotic lost-and-found into verified campus returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* STEP 01 */}
          <div className="group p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
            <div className="text-xs font-black text-indigo-400 tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>01 — REPORT</span>
              <FileText className="w-5 h-5 text-indigo-400/70" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Report Item</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Report your lost or found item with public descriptors and private verification markers.
            </p>
          </div>

          {/* STEP 02 */}
          <div className="group p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none group-hover:bg-purple-500/10 transition-all" />
            <div className="text-xs font-black text-purple-400 tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>02 — MATCH</span>
              <BrainCircuit className="w-5 h-5 text-purple-400/70" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Match</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our intelligent matching system identifies possible matches using spatial & attribute scoring.
            </p>
          </div>

          {/* STEP 03 */}
          <div className="group p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-all" />
            <div className="text-xs font-black text-cyan-400 tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>03 — VERIFY</span>
              <ShieldCheck className="w-5 h-5 text-cyan-400/70" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Verify Ownership</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ownership is verified securely before revealing sensitive identifying information to finders.
            </p>
          </div>

          {/* STEP 04 */}
          <div className="group p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-all" />
            <div className="text-xs font-black text-emerald-400 tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>04 — RECOVER</span>
              <UserCheck className="w-5 h-5 text-emerald-400/70" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Safe Recovery</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Connect with the right verified person and safely recover your belonging on campus.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 3 — SMART MATCHING (MATCHING THAT EXPLAINS ITSELF)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/20 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          
          <div className="text-center space-y-3 mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
              Explainable AI Matching Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              MATCHING THAT EXPLAINS ITSELF
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              CampusFind AI doesn't leave recovery to chance. Every match comes with clear multi-factor reasoning score.
            </p>

            {/* Item selector tabs */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {Object.keys(demoItems).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedMatchDemo(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedMatchDemo === key 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {demoItems[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Three-part diagram with connection lines */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center relative z-10">
            
            {/* Left: Lost Report Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase">
                  Lost Report
                </span>
                <span className="text-xs text-slate-500">{activeMatch.lostDate}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{activeMatch.name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  {activeMatch.lostLocation}
                </p>
              </div>
              <p className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                "{activeMatch.publicDesc}"
              </p>
            </div>

            {/* Center: CampusFind AI Core Engine */}
            <div className="lg:col-span-3 p-6 rounded-2xl bg-gradient-to-b from-indigo-900/90 to-purple-900/90 border border-indigo-500/40 text-center space-y-4 shadow-2xl relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center mx-auto text-indigo-300 shadow-lg shadow-indigo-500/30">
                <BrainCircuit className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-extrabold">CampusFind AI</div>
                <div className="text-3xl font-black text-white mt-1">{activeMatch.score}% MATCH</div>
              </div>
              
              <div className="space-y-1.5 text-left text-xs font-medium text-slate-200 border-t border-indigo-500/30 pt-3">
                {activeMatch.reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Found Report Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                  Found Report
                </span>
                <span className="text-xs text-slate-500">{activeMatch.foundDate}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{activeMatch.name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {activeMatch.foundLocation}
                </p>
              </div>
              <p className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                "{activeMatch.publicDesc}"
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 4 — PRIVACY-FIRST VERIFICATION                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Zero-Leak Protection
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              FINDERS SEE THE ITEM.<br />
              <span className="text-cyan-400">OWNERS PROVE IT.</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              To prevent fraudulent claims and protect student privacy, public listings only display high-level non-identifying features. Private unique details remain encrypted until ownership proof is verified.
            </p>

            <button
              onClick={() => setIsVerifiedDemo(!isVerifiedDemo)}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-2 transition-all shadow-md"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>{isVerifiedDemo ? "Reset Verification Demo" : "Simulate Owner Verification"}</span>
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card A: Public Information */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>Public Information</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Black canvas backpack</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Found near Central Library</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Reported September 23</span>
                </li>
              </ul>
            </div>

            {/* Card B: Hidden Private Information */}
            <div className={`p-6 rounded-3xl transition-all duration-500 border space-y-4 relative shadow-xl ${
              isVerifiedDemo 
                ? 'bg-emerald-950/40 border-emerald-500/50 shadow-emerald-500/10' 
                : 'bg-slate-900/90 border-slate-800'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Hidden Information</span>
                </div>
                {isVerifiedDemo && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold">
                    VERIFIED ✓
                  </span>
                )}
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">🔒</span>
                  <span>Private identifying mark: <strong className="text-white">{isVerifiedDemo ? activeMatch.privateInfo : "••••••••••••••••"}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">🔒</span>
                  <span>Private contents: <strong className="text-white">{isVerifiedDemo ? "Engineering Lab Notes + Blue USB" : "••••••••••••••••"}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">🔒</span>
                  <span>Ownership evidence: <strong className="text-white">{isVerifiedDemo ? "Serial # confirmed on file" : "••••••••••••••••"}</strong></span>
                </li>
              </ul>

              <div className="pt-2 text-[11px] font-bold text-center">
                {isVerifiedDemo ? (
                  <span className="text-emerald-400 font-extrabold">Ownership Verified ✓ Contact Details Unlocked</span>
                ) : (
                  <span className="text-slate-500">Requires verification challenge to reveal</span>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 5 — CAMPUS ACTIVITY (STATISTICS)                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              CAMPUS RECOVERY NETWORK IN NUMBERS
            </h2>
            <p className="text-slate-400 text-xs">
              Demonstrated system throughput and match performance benchmarks
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                1,248+
              </div>
              <div className="text-xs font-bold text-slate-300">Total Reports</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                342+
              </div>
              <div className="text-xs font-bold text-slate-300">Items Recovered</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                87%
              </div>
              <div className="text-xs font-bold text-slate-300">Recovery Rate</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                94%
              </div>
              <div className="text-xs font-bold text-slate-300">Average Match Confidence</div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 6 — CAMPUS HOTSPOTS                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
            Spatial Intelligence Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            CAMPUS HOTSPOT ANALYTICS
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            High-density lost and found activity zones mapped across campus grounds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-indigo-400">Hotspot #1</span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-extrabold">24 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Central Library</h3>
            <p className="text-slate-400 text-xs mt-1">Study Reading Rooms & 2nd Floor Quiet Zone</p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-indigo-500 h-full w-[85%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-purple-400">Hotspot #2</span>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-extrabold">17 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Main Canteen</h3>
            <p className="text-slate-400 text-xs mt-1">Outdoor Seating & Dining Counters</p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-purple-500 h-full w-[65%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan-400">Hotspot #3</span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-extrabold">12 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">CSE Academic Block</h3>
            <p className="text-slate-400 text-xs mt-1">Auditoriums & Computer Labs</p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-cyan-500 h-full w-[45%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-400">Active Zone</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-extrabold">9 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">Science Labs</h3>
            <p className="text-slate-400 text-xs mt-1">Physics & Chemistry Research Wings</p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[35%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400">Monitored Zone</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-extrabold">8 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">Student Hostel</h3>
            <p className="text-slate-400 text-xs mt-1">Hostel Block A Common Lounge</p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-amber-500 h-full w-[30%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 transition-all group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-rose-400">Outdoor Zone</span>
              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-extrabold">5 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">Central Parking</h3>
            <p className="text-slate-400 text-xs mt-1">Two-Wheeler & Bicycle Bays</p>
            <div className="w-full bg-slate-950 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-rose-500 h-full w-[20%]" />
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION 7 — FINAL CTA                                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl space-y-6">
          
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight relative z-10">
            LOST SOMETHING?
          </h2>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-normal relative z-10">
            Don't just search. Let CampusFind AI help you find it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <button
              onClick={() => onOpenReportModal && onOpenReportModal('lost')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Report Lost Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenReportModal && onOpenReportModal('found')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 shadow-lg backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Report Found Item</span>
            </button>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
