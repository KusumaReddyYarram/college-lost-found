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
    <div className="space-y-28 pb-20 overflow-x-hidden text-[#24332F] bg-[#F7F4ED]">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (THREE.JS 3D LANDING EXPERIENCE)                         */}
      {/* ========================================================================= */}
      <section className="relative pt-8 lg:pt-16 pb-12 overflow-hidden bg-[#F7F4ED]">
        
        {/* Warm Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C9A96E]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#C96F52]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#31594F]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Subtle Depth Grid Lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d8d0c130_1px,transparent_1px),linear-gradient(to_bottom,#d8d0c130_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-20">
              
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#183C35]/10 border border-[#183C35]/20 text-[#183C35] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C96F52] animate-pulse" />
                <span>Next-Gen Campus Intelligence • Smart Recovery Engine</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#183C35] tracking-tight leading-[1.1]">
                FIND WHAT'S LOST.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#183C35] via-[#C96F52] to-[#C9A96E]">
                  RETURN WHAT'S FOUND.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-[#66736D] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                CampusFind AI connects lost and found items using intelligent matching, confidence scoring, and secure ownership verification.
              </p>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenReportModal && onOpenReportModal('lost')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-[#C96F52] hover:bg-[#B25C41] shadow-xl shadow-[#C96F52]/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
                >
                  <span>Report Lost Item</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenReportModal && onOpenReportModal('found')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-[#183C35] bg-[#E9E1D2] hover:bg-[#D8D0C1] border border-[#D8D0C1] shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Report Found Item</span>
                </button>
              </div>

              {/* Visual Demonstration Bar */}
              <div className="pt-6 border-t border-[#D8D0C1]">
                <div className="text-xs font-bold text-[#66736D] uppercase tracking-wider mb-3">
                  Live Smart Match Interactive Preview
                </div>
                
                <div className="p-4 rounded-2xl bg-[#183C35] text-white border border-[#31594F] flex items-center justify-between gap-2 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span className="w-8 h-8 rounded-lg bg-[#31594F] text-[#C9A96E] flex items-center justify-center text-sm">🎒</span>
                    <div>
                      <div className="text-[10px] text-[#A3B0A9] uppercase font-bold">LOST ITEM</div>
                      <div>Backpack</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="px-2 py-0.5 rounded-full bg-[#C96F52]/20 border border-[#C96F52]/40 text-[10px] font-extrabold text-[#C96F52] animate-pulse">
                      ⚡ SMART MATCH
                    </div>
                    <div className="text-[10px] text-[#C9A96E] font-extrabold mt-0.5">94% MATCH</div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <div>
                      <div className="text-[10px] font-bold text-right text-[#A3B0A9] uppercase">FOUND ITEM</div>
                      <div className="text-right">Backpack</div>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-[#31594F] text-[#C9A96E] flex items-center justify-center text-sm">🎒</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-[11px] font-semibold text-[#66736D]">
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#31594F]" /> Same category</div>
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#31594F]" /> Similar description</div>
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#31594F]" /> Nearby location</div>
                  <div className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#31594F]" /> Similar color</div>
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
              <div className="absolute top-4 left-2 sm:-left-4 z-20 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D8D0C1] shadow-xl flex items-center gap-3 animate-[bounce_4s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 border border-[#C9A96E]/40 text-[#C9A96E] flex items-center justify-center font-black text-sm shrink-0">
                  94%
                </div>
                <div>
                  <div className="text-xs font-bold text-[#183C35]">94% Match</div>
                  <div className="text-[11px] text-[#66736D]">Possible Match Identified</div>
                </div>
              </div>

              {/* Floating Card 2: Verified */}
              <div className="absolute top-1/3 -right-2 sm:-right-4 z-20 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D8D0C1] shadow-xl flex items-center gap-3 animate-[bounce_5s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-[#183C35]/15 border border-[#183C35]/30 text-[#183C35] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#183C35]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#183C35]">Verified</div>
                  <div className="text-[11px] text-[#66736D]">Ownership Confirmed</div>
                </div>
              </div>

              {/* Floating Card 3: Nearby */}
              <div className="absolute bottom-16 left-4 z-20 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D8D0C1] shadow-xl flex items-center gap-3 animate-[bounce_4.5s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-[#C96F52]/15 border border-[#C96F52]/30 text-[#C96F52] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C96F52]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#183C35]">Nearby</div>
                  <div className="text-[11px] text-[#66736D]">Library • 120m away</div>
                </div>
              </div>

              {/* Floating Card 4: Recovered */}
              <div className="absolute -bottom-2 right-6 z-20 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D8D0C1] shadow-xl flex items-center gap-3 animate-[bounce_6s_infinite_ease-in-out]">
                <div className="w-10 h-10 rounded-xl bg-[#31594F]/15 border border-[#31594F]/30 text-[#31594F] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#31594F]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#183C35]">Recovered</div>
                  <div className="text-[11px] text-[#66736D]">Item successfully returned</div>
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#183C35]/10 border border-[#183C35]/20 text-[#183C35] text-xs font-bold uppercase tracking-widest">
            Guided Recovery Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#183C35] tracking-tight">
            HOW CAMPUSFIND AI WORKS
          </h2>
          <p className="text-[#66736D] text-sm max-w-2xl mx-auto font-medium">
            A frictionless, intelligent 4-step workflow that transforms chaotic lost-and-found into verified campus returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* STEP 01 */}
          <div className="group p-8 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#C96F52] transition-all duration-300 hover:-translate-y-1 shadow-md relative overflow-hidden">
            <div className="text-xs font-black text-[#C96F52] tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>01 — REPORT</span>
              <FileText className="w-5 h-5 text-[#C96F52]" />
            </div>
            <h3 className="text-xl font-bold text-[#183C35] mb-2">Report Item</h3>
            <p className="text-[#66736D] text-xs leading-relaxed font-medium">
              Report your lost or found item with public descriptors and private verification markers.
            </p>
          </div>

          {/* STEP 02 */}
          <div className="group p-8 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#C9A96E] transition-all duration-300 hover:-translate-y-1 shadow-md relative overflow-hidden">
            <div className="text-xs font-black text-[#C9A96E] tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>02 — MATCH</span>
              <BrainCircuit className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <h3 className="text-xl font-bold text-[#183C35] mb-2">Smart Match</h3>
            <p className="text-[#66736D] text-xs leading-relaxed font-medium">
              Our intelligent matching system identifies possible matches using spatial & attribute scoring.
            </p>
          </div>

          {/* STEP 03 */}
          <div className="group p-8 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#31594F] transition-all duration-300 hover:-translate-y-1 shadow-md relative overflow-hidden">
            <div className="text-xs font-black text-[#31594F] tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>03 — VERIFY</span>
              <ShieldCheck className="w-5 h-5 text-[#31594F]" />
            </div>
            <h3 className="text-xl font-bold text-[#183C35] mb-2">Verify Ownership</h3>
            <p className="text-[#66736D] text-xs leading-relaxed font-medium">
              Ownership is verified securely before revealing sensitive identifying information to finders.
            </p>
          </div>

          {/* STEP 04 */}
          <div className="group p-8 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#183C35] transition-all duration-300 hover:-translate-y-1 shadow-md relative overflow-hidden">
            <div className="text-xs font-black text-[#183C35] tracking-widest uppercase mb-4 flex items-center justify-between">
              <span>04 — RECOVER</span>
              <UserCheck className="w-5 h-5 text-[#183C35]" />
            </div>
            <h3 className="text-xl font-bold text-[#183C35] mb-2">Safe Recovery</h3>
            <p className="text-[#66736D] text-xs leading-relaxed font-medium">
              Connect with the right verified person and safely recover your belonging on campus.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 3 — SMART MATCHING (MATCHING THAT EXPLAINS ITSELF)             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-[#183C35] text-white border border-[#31594F] relative overflow-hidden shadow-2xl">
          
          <div className="text-center space-y-3 mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] text-xs font-bold uppercase tracking-widest border border-[#C9A96E]/30">
              Explainable AI Matching Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              MATCHING THAT EXPLAINS ITSELF
            </h2>
            <p className="text-[#E9E1D2] text-sm max-w-2xl mx-auto font-medium">
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
                      ? 'bg-[#C96F52] text-white shadow-md' 
                      : 'bg-[#112C27] text-[#E9E1D2] hover:text-white border border-[#31594F]'
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
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#112C27] border border-[#31594F] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#C96F52]/20 text-[#C96F52] border border-[#C96F52]/30 text-xs font-bold uppercase">
                  Lost Report
                </span>
                <span className="text-xs text-[#A3B0A9]">{activeMatch.lostDate}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{activeMatch.name}</h4>
                <p className="text-xs text-[#E9E1D2] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  {activeMatch.lostLocation}
                </p>
              </div>
              <p className="text-xs text-[#E9E1D2] bg-[#183C35] p-3 rounded-xl border border-[#31594F]">
                "{activeMatch.publicDesc}"
              </p>
            </div>

            {/* Center: CampusFind AI Core Engine */}
            <div className="lg:col-span-3 p-6 rounded-2xl bg-gradient-to-b from-[#244B42] to-[#183C35] border border-[#C9A96E]/40 text-center space-y-4 shadow-2xl relative">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/20 border border-[#C9A96E]/40 flex items-center justify-center mx-auto text-[#C9A96E] shadow-lg">
                <BrainCircuit className="w-6 h-6 animate-pulse text-[#C9A96E]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#E9E1D2] font-extrabold">CampusFind AI</div>
                <div className="text-3xl font-black text-[#C9A96E] mt-1">{activeMatch.score}% MATCH</div>
              </div>
              
              <div className="space-y-1.5 text-left text-xs font-medium text-[#F7F4ED] border-t border-[#31594F] pt-3">
                {activeMatch.reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5" />
                    <span className="text-[11px]">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Found Report Card */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#112C27] border border-[#31594F] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#31594F]/40 text-[#C9A96E] border border-[#C9A96E]/30 text-xs font-bold uppercase">
                  Found Report
                </span>
                <span className="text-xs text-[#A3B0A9]">{activeMatch.foundDate}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{activeMatch.name}</h4>
                <p className="text-xs text-[#E9E1D2] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" />
                  {activeMatch.foundLocation}
                </p>
              </div>
              <p className="text-xs text-[#E9E1D2] bg-[#183C35] p-3 rounded-xl border border-[#31594F]">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#183C35]/10 border border-[#183C35]/20 text-[#183C35] text-xs font-bold uppercase tracking-widest">
              Zero-Leak Protection
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-[#183C35] tracking-tight leading-tight">
              FINDERS SEE THE ITEM.<br />
              <span className="text-[#C96F52]">OWNERS PROVE IT.</span>
            </h2>

            <p className="text-[#66736D] text-sm leading-relaxed font-medium">
              To prevent fraudulent claims and protect student privacy, public listings only display high-level non-identifying features. Private unique details remain encrypted until ownership proof is verified.
            </p>

            <button
              onClick={() => setIsVerifiedDemo(!isVerifiedDemo)}
              className="px-6 py-3 rounded-xl bg-[#183C35] hover:bg-[#112C27] text-xs font-bold text-white flex items-center gap-2 transition-all shadow-md"
            >
              <Lock className="w-4 h-4 text-[#C9A96E]" />
              <span>{isVerifiedDemo ? "Reset Verification Demo" : "Simulate Owner Verification"}</span>
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card A: Public Information */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] space-y-4 relative shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#183C35] uppercase tracking-wider pb-2 border-b border-[#D8D0C1]">
                <Eye className="w-4 h-4 text-[#31594F]" />
                <span>Public Information</span>
              </div>
              <ul className="space-y-3 text-xs text-[#66736D] font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#31594F] shrink-0" />
                  <span>Black canvas backpack</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#31594F] shrink-0" />
                  <span>Found near Central Library</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#31594F] shrink-0" />
                  <span>Reported September 23</span>
                </li>
              </ul>
            </div>

            {/* Card B: Hidden Private Information */}
            <div className={`p-6 rounded-3xl transition-all duration-500 border space-y-4 relative shadow-md ${
              isVerifiedDemo 
                ? 'bg-[#183C35] text-white border-[#C9A96E]' 
                : 'bg-[#FFFFFF] border-[#D8D0C1]'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-[#D8D0C1]/40">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-[#C96F52]" />
                  <span className={isVerifiedDemo ? "text-white" : "text-[#183C35]"}>Hidden Information</span>
                </div>
                {isVerifiedDemo && (
                  <span className="px-2 py-0.5 rounded bg-[#C9A96E]/20 text-[#C9A96E] text-[10px] font-extrabold border border-[#C9A96E]/40">
                    VERIFIED ✓
                  </span>
                )}
              </div>

              <ul className={`space-y-3 text-xs font-medium ${isVerifiedDemo ? "text-[#E9E1D2]" : "text-[#66736D]"}`}>
                <li className="flex items-center gap-2">
                  <span className="text-[#C96F52]">🔒</span>
                  <span>Private identifying mark: <strong>{isVerifiedDemo ? activeMatch.privateInfo : "••••••••••••••••"}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C96F52]">🔒</span>
                  <span>Private contents: <strong>{isVerifiedDemo ? "Engineering Lab Notes + Blue USB" : "••••••••••••••••"}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C96F52]">🔒</span>
                  <span>Ownership evidence: <strong>{isVerifiedDemo ? "Serial # confirmed on file" : "••••••••••••••••"}</strong></span>
                </li>
              </ul>

              <div className="pt-2 text-[11px] font-bold text-center">
                {isVerifiedDemo ? (
                  <span className="text-[#C9A96E] font-extrabold">Ownership Verified ✓ Contact Details Unlocked</span>
                ) : (
                  <span className="text-[#8A918B]">Requires verification challenge to reveal</span>
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
        <div className="p-8 sm:p-12 rounded-3xl bg-[#183C35] text-white border border-[#31594F] shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              CAMPUS RECOVERY NETWORK IN NUMBERS
            </h2>
            <p className="text-[#E9E1D2] text-xs font-medium">
              Demonstrated system throughput and match performance benchmarks
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-[#112C27] border border-[#31594F] space-y-2">
              <div className="text-4xl font-black text-[#C96F52]">
                1,248+
              </div>
              <div className="text-xs font-bold text-[#E9E1D2]">Total Reports</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#112C27] border border-[#31594F] space-y-2">
              <div className="text-4xl font-black text-[#C9A96E]">
                342+
              </div>
              <div className="text-xs font-bold text-[#E9E1D2]">Items Recovered</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#112C27] border border-[#31594F] space-y-2">
              <div className="text-4xl font-black text-[#F7F4ED]">
                87%
              </div>
              <div className="text-xs font-bold text-[#E9E1D2]">Recovery Rate</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#112C27] border border-[#31594F] space-y-2">
              <div className="text-4xl font-black text-[#C9A96E]">
                94%
              </div>
              <div className="text-xs font-bold text-[#E9E1D2]">Average Match Confidence</div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 6 — CAMPUS HOTSPOTS                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#183C35]/10 border border-[#183C35]/20 text-[#183C35] text-xs font-bold uppercase tracking-widest">
            Spatial Intelligence Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#183C35] tracking-tight">
            CAMPUS HOTSPOT ANALYTICS
          </h2>
          <p className="text-[#66736D] text-sm max-w-xl mx-auto font-medium">
            High-density lost and found activity zones mapped across campus grounds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#C96F52] transition-all group shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C96F52]">Hotspot #1</span>
              <span className="px-2.5 py-1 rounded-full bg-[#C96F52]/15 text-[#C96F52] text-xs font-extrabold">24 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-[#183C35] group-hover:text-[#C96F52] transition-colors">Central Library</h3>
            <p className="text-[#66736D] text-xs mt-1 font-medium">Study Reading Rooms & 2nd Floor Quiet Zone</p>
            <div className="w-full bg-[#E9E1D2] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#C96F52] h-full w-[85%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#31594F] transition-all group shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#31594F]">Hotspot #2</span>
              <span className="px-2.5 py-1 rounded-full bg-[#31594F]/15 text-[#31594F] text-xs font-extrabold">17 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-[#183C35] group-hover:text-[#31594F] transition-colors">Main Canteen</h3>
            <p className="text-[#66736D] text-xs mt-1 font-medium">Outdoor Seating & Dining Counters</p>
            <div className="w-full bg-[#E9E1D2] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#31594F] h-full w-[65%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#C9A96E] transition-all group shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C9A96E]">Hotspot #3</span>
              <span className="px-2.5 py-1 rounded-full bg-[#C9A96E]/20 text-[#183C35] text-xs font-extrabold">12 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-[#183C35] group-hover:text-[#C9A96E] transition-colors">CSE Academic Block</h3>
            <p className="text-[#66736D] text-xs mt-1 font-medium">Auditoriums & Computer Labs</p>
            <div className="w-full bg-[#E9E1D2] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#C9A96E] h-full w-[45%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#31594F] transition-all group shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#31594F]">Active Zone</span>
              <span className="px-2.5 py-1 rounded-full bg-[#31594F]/15 text-[#31594F] text-xs font-extrabold">9 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-[#183C35] group-hover:text-[#31594F] transition-colors">Science Labs</h3>
            <p className="text-[#66736D] text-xs mt-1 font-medium">Physics & Chemistry Research Wings</p>
            <div className="w-full bg-[#E9E1D2] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#31594F] h-full w-[35%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#C96F52] transition-all group shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C96F52]">Monitored Zone</span>
              <span className="px-2.5 py-1 rounded-full bg-[#C96F52]/15 text-[#C96F52] text-xs font-extrabold">8 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-[#183C35] group-hover:text-[#C96F52] transition-colors">Student Hostel</h3>
            <p className="text-[#66736D] text-xs mt-1 font-medium">Hostel Block A Common Lounge</p>
            <div className="w-full bg-[#E9E1D2] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#C96F52] h-full w-[30%]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8D0C1] hover:border-[#31594F] transition-all group shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#31594F]">Outdoor Zone</span>
              <span className="px-2.5 py-1 rounded-full bg-[#31594F]/15 text-[#31594F] text-xs font-extrabold">5 Reports</span>
            </div>
            <h3 className="text-lg font-bold text-[#183C35] group-hover:text-[#31594F] transition-colors">Central Parking</h3>
            <p className="text-[#66736D] text-xs mt-1 font-medium">Two-Wheeler & Bicycle Bays</p>
            <div className="w-full bg-[#E9E1D2] h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#31594F] h-full w-[20%]" />
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION 7 — FINAL CTA                                                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-10 sm:p-16 rounded-3xl bg-[#183C35] text-white border border-[#31594F] text-center relative overflow-hidden shadow-2xl space-y-6">
          
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C9A96E]/15 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight relative z-10">
            LOST SOMETHING?
          </h2>

          <p className="text-[#E9E1D2] text-base sm:text-lg max-w-2xl mx-auto font-medium relative z-10">
            Don't just search. Let CampusFind AI help you find it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <button
              onClick={() => onOpenReportModal && onOpenReportModal('lost')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-[#C96F52] hover:bg-[#B25C41] shadow-xl shadow-[#C96F52]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Report Lost Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenReportModal && onOpenReportModal('found')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-sm text-[#183C35] bg-[#E9E1D2] hover:bg-[#D8D0C1] border border-[#D8D0C1] shadow-lg transition-all flex items-center justify-center gap-2"
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
