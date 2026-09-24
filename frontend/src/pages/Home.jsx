import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Shield, Cpu, Lock, CheckCircle2, ArrowRight, Search, 
  MapPin, Clock, Eye, EyeOff, Zap, Bell, FileText, ChevronRight, 
  Layers, BrainCircuit, RefreshCw, BarChart3, HelpCircle
} from 'lucide-react';

const Home = ({ onOpenReportModal }) => {
  const [selectedDemoTab, setSelectedDemoTab] = useState('airpods');
  const [showPrivateDetails, setShowPrivateDetails] = useState(false);

  const demoItems = {
    airpods: {
      title: "Apple AirPods Pro (2nd Gen)",
      lostLocation: "Central Library Study Room 4",
      lostTime: "Yesterday, 2:30 PM",
      foundLocation: "Library 2nd Floor Quiet Zone",
      foundTime: "Yesterday, 3:15 PM",
      score: 89,
      reasons: [
        "Exact category & model match (AirPods Pro)",
        "Same location perimeter (Central Library)",
        "Time gap under 45 minutes",
        "Matching custom engravings described"
      ],
      publicDesc: "White wireless earbud case found on table 4 in Central Library.",
      privateVerification: "What unique sticker is placed on the back of the charging case?",
      privateAnswer: "Custom blue NASA space sticker"
    },
    backpack: {
      title: "Herschel Black Canvas Laptop Bag",
      lostLocation: "Campus Cafeteria Outdoor Bench",
      lostTime: "Today, 11:00 AM",
      foundLocation: "Main Dining Hall Security Desk",
      foundTime: "Today, 11:40 AM",
      score: 94,
      reasons: [
        "Identical brand & fabric texture",
        "Identical cafeteria quadrant reported",
        "Found within 40 minutes of loss report",
        "Contains distinctive keychain ornament"
      ],
      publicDesc: "Black canvas backpack found near dining area.",
      privateVerification: "What keytag or pin is attached to the front zipper pocket?",
      privateAnswer: "Red metal Spiderman keychain"
    }
  };

  const activeDemo = demoItems[selectedDemoTab];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Next-Gen Campus Intelligence Engine</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Lost Something on Campus? <br className="hidden sm:inline" />
                <span className="text-gradient">Let Smart Matching Find It.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                CampusFind AI helps students and staff report, discover, and recover lost belongings using intelligent attribute matching and secure ownership verification.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenReportModal && onOpenReportModal('lost')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Report Lost Item</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenReportModal && onOpenReportModal('found')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Report Found Item</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left text-xs text-slate-400">
                <div>
                  <span className="block font-bold text-white text-base">Instant</span>
                  Attribute Matrix
                </div>
                <div>
                  <span className="block font-bold text-emerald-400 text-base">100% Secure</span>
                  Private Verification
                </div>
                <div>
                  <span className="block font-bold text-indigo-400 text-base">Verified</span>
                  Campus Network
                </div>
              </div>

            </div>

            {/* Hero Right Visual Diagram */}
            <div className="lg:col-span-5">
              <div className="relative p-6 rounded-2xl glass-panel border border-slate-800/80 shadow-2xl space-y-4">
                
                {/* Visual Diagram Title */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Smart Recovery Concept Flow</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Demo Simulation
                  </span>
                </div>

                {/* Step 1: Lost Item Entry */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Student Reports Lost Item</p>
                      <p className="text-[11px] text-slate-400">"Black Bose Headphones in Lab 3"</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">10:15 AM</span>
                </div>

                {/* Connecting Node */}
                <div className="flex justify-center my-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-amber-500 to-indigo-500"></div>
                </div>

                {/* Step 2: AI Smart Matching & Score */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-indigo-200">Smart Matching Analysis</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-extrabold text-xs">
                      87% Match Score
                    </div>
                  </div>

                  {/* Reasons pills */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                    <div className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Same Category
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Color Proximity
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Same Building
                    </div>
                    <div className="flex items-center gap-1 text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Time &lt; 2 hours
                    </div>
                  </div>
                </div>

                {/* Connecting Node */}
                <div className="flex justify-center my-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-indigo-500 to-emerald-500"></div>
                </div>

                {/* Step 3: Secure Claim & Ownership */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Private Claim Verification</p>
                      <p className="text-[11px] text-emerald-400">Ownership Verified • Item Returned</p>
                    </div>
                  </div>
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SMART MATCH EXPLANATION DEMO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-800/80 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Explainable AI Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why CampusFind AI Doesn't Just Say "Match Found"
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Traditional systems create false hope with simple keyword matches. Our platform breaks down the exact attributes, generating a transparent confidence score with actionable explanations.
            </p>
          </div>

          {/* Interactive Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 gap-2">
              <button
                onClick={() => setSelectedDemoTab('airpods')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedDemoTab === 'airpods'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AirPods Pro Match (89%)
              </button>
              <button
                onClick={() => setSelectedDemoTab('backpack')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedDemoTab === 'backpack'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Herschel Backpack Match (94%)
              </button>
            </div>
          </div>

          {/* Demo Content Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
            
            {/* Match Breakdown Left */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Item Under Evaluation</span>
                  <h3 className="text-xl font-bold text-white">{activeDemo.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400">{activeDemo.score}%</div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Match Confidence</span>
                </div>
              </div>

              {/* Reasons List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Why this item may be a match:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDemo.reasons.map((reason, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proximity Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> Location Proximity
                  </span>
                  <p className="text-white font-medium">{activeDemo.foundLocation}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Date & Time Proximity
                  </span>
                  <p className="text-white font-medium">{activeDemo.foundTime}</p>
                </div>
              </div>
            </div>

            {/* Privacy Claim Right */}
            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" /> Privacy & Verification Layer
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Protected
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Public Visible Description:</label>
                <p className="text-xs text-slate-300 p-3 rounded-lg bg-slate-950 border border-slate-800 italic">
                  "{activeDemo.publicDesc}"
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-400 font-medium">Private Verification Question:</label>
                  <button 
                    onClick={() => setShowPrivateDetails(!showPrivateDetails)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                  >
                    {showPrivateDetails ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showPrivateDetails ? "Hide Secret" : "Reveal Secret"}
                  </button>
                </div>
                
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1">
                  <p className="text-indigo-200 font-semibold">{activeDemo.privateVerification}</p>
                  {showPrivateDetails ? (
                    <p className="text-emerald-400 font-mono text-[11px] pt-1 border-t border-indigo-500/20">
                      Required Secret Answer: "{activeDemo.privateAnswer}"
                    </p>
                  ) : (
                    <p className="text-slate-500 text-[11px]">••••••••••••••••••••••••••••</p>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                <Lock className="w-3 h-3 text-amber-400 inline mr-1" />
                Only users who correctly answer the private detail can claim this item.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS - 4 STEP TIMELINE */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Lost → Match → Verify → Recover
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Designed to replace unstructured WhatsApp chats, bulletin boards, and manual lost & found logs with a seamless 4-step recovery pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl glass-card relative group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Report Belonging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log lost or found items with location, approximate timeframe, physical tags, and private verification questions.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl glass-card relative group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Smart Match Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our AI evaluates text similarity, physical attributes, category taxonomy, and campus location proximity.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl glass-card relative group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Private Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ownership is proven by answering unmentioned identifying details before item location or finder contact is revealed.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl glass-card relative group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="text-lg font-bold text-white">Verified Recovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Item successfully returned to owner. Both parties build their Campus Trust & Reputation badge.
            </p>
          </div>

        </div>
      </section>

      {/* CORE PLATFORM FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Campus Recovery & Security
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every feature is designed to prevent fraudulent claims, accelerate recovery time, and provide total transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Attribute Similarity Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compares category, color, brand, location radius, and timestamp instead of simple exact text search.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Privacy-First Item Display</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prevents opportunists from making fake claims by suppressing distinctive identifying details publicly.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Duplicate Report Detection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects if multiple students submit lost reports for the same physical object, unifying claim pipelines.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Match Notifications</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly notifies relevant students as soon as a potential match crosses the confidence threshold.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Campus Hotspot Insights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maps high-density loss areas like libraries, labs, and cafeterias for proactive campus security monitoring.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">AI Assistant & Text Polishing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Converts brief student inputs like "black bottle clg" into rich, structured attribute reports.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 border border-indigo-500/30 relative overflow-hidden shadow-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Connect Campus Recovery with Intelligence?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Create your verified college account today or explore our architectural framework to see how AI transforms lost and found operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/40 transition-all"
            >
              Get Started with College Email
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              Read Architecture Story
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
