import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Lock, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">CampusFind <span className="text-indigo-400">AI</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An intelligent campus recovery platform that connects students who lose items with students who find them using smart matching, confidence scoring, evidence verification, and secure claim validation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Privacy Protected
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> AI Confidence Engine
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Story</Link></li>
              <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Student Login</Link></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Smart Features */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">AI Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-slate-300">Attribute Similarity</li>
              <li className="hover:text-slate-300">Confidence Scoring</li>
              <li className="hover:text-slate-300">Private Claim Verification</li>
              <li className="hover:text-slate-300">Campus Proximity Engine</li>
              <li className="hover:text-slate-300">Duplicate Report Detection</li>
            </ul>
          </div>

          {/* Contact / Architecture */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> React.js Frontend
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Node & Express API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span> MongoDB Atlas DB
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span> Smart Match Engine
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusFind AI. Built for modern university recovery operations.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
