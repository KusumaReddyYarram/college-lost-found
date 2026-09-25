import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Lock, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#112C27] border-t border-[#31594F] pt-16 pb-12 text-[#A3B0A9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#31594F]">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C96F52] to-[#C9A96E] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#183C35] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C9A96E]" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-[#F7F4ED] tracking-tight">CampusFind <span className="text-[#C9A96E]">AI</span></span>
            </Link>
            <p className="text-[#A3B0A9] text-sm leading-relaxed max-w-sm">
              An intelligent campus recovery platform that connects students who lose items with students who find them using smart matching, confidence scoring, evidence verification, and secure claim validation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#183C35] border border-[#31594F] text-[#E9E1D2]">
                <Shield className="w-3.5 h-3.5 text-[#C9A96E]" /> Privacy Protected
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#183C35] border border-[#31594F] text-[#E9E1D2]">
                <Cpu className="w-3.5 h-3.5 text-[#C96F52]" /> AI Confidence Engine
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#F7F4ED] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[#C9A96E] transition-colors">Home Landing</Link></li>
              <li><Link to="/about" className="hover:text-[#C9A96E] transition-colors">About Story</Link></li>
              <li><a href="#how-it-works" className="hover:text-[#C9A96E] transition-colors">How It Works</a></li>
              <li><Link to="/login" className="hover:text-[#C9A96E] transition-colors">Student Login</Link></li>
              <li><Link to="/register" className="hover:text-[#C9A96E] transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Smart Features */}
          <div>
            <h4 className="text-sm font-bold text-[#F7F4ED] uppercase tracking-wider mb-4">AI Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-[#E9E1D2]">Attribute Similarity</li>
              <li className="hover:text-[#E9E1D2]">Confidence Scoring</li>
              <li className="hover:text-[#E9E1D2]">Private Claim Verification</li>
              <li className="hover:text-[#E9E1D2]">Campus Proximity Engine</li>
              <li className="hover:text-[#E9E1D2]">Duplicate Report Detection</li>
            </ul>
          </div>

          {/* Contact / Architecture */}
          <div>
            <h4 className="text-sm font-bold text-[#F7F4ED] uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]"></span> React.js Frontend
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C96F52]"></span> Node & Express API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#31594F]"></span> MongoDB Atlas DB
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]"></span> Smart Match Engine
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A918B]">
          <p>© {new Date().getFullYear()} CampusFind AI. Built for modern university recovery operations.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#E9E1D2] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#E9E1D2] transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#E9E1D2] transition-colors cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
