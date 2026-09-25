import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Cpu, Lock, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#171717] border-t border-[#292929] pt-16 pb-12 text-[#A69F95]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#292929]">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7A303F] to-[#D6B98C] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#171717] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D6B98C]" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-[#F5F1E8] tracking-tight">CampusFind <span className="text-[#D6B98C]">AI</span></span>
            </Link>
            <p className="text-[#A69F95] text-sm leading-relaxed max-w-sm">
              An intelligent campus recovery platform that connects students who lose items with students who find them using smart matching, confidence scoring, evidence verification, and secure claim validation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#212121] border border-[#333333] text-[#E7DED0]">
                <Shield className="w-3.5 h-3.5 text-[#D6B98C]" /> Privacy Protected
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#212121] border border-[#333333] text-[#E7DED0]">
                <Cpu className="w-3.5 h-3.5 text-[#7A303F]" /> AI Confidence Engine
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#F5F1E8] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-[#D6B98C] transition-colors">Home Landing</Link></li>
              <li><Link to="/about" className="hover:text-[#D6B98C] transition-colors">About Story</Link></li>
              <li><a href="#how-it-works" className="hover:text-[#D6B98C] transition-colors">How It Works</a></li>
              <li><Link to="/login" className="hover:text-[#D6B98C] transition-colors">Student Login</Link></li>
              <li><Link to="/register" className="hover:text-[#D6B98C] transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Smart Features */}
          <div>
            <h4 className="text-sm font-bold text-[#F5F1E8] uppercase tracking-wider mb-4">AI Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-[#E7DED0]">Attribute Similarity</li>
              <li className="hover:text-[#E7DED0]">Confidence Scoring</li>
              <li className="hover:text-[#E7DED0]">Private Claim Verification</li>
              <li className="hover:text-[#E7DED0]">Campus Proximity Engine</li>
              <li className="hover:text-[#E7DED0]">Duplicate Report Detection</li>
            </ul>
          </div>

          {/* Contact / Architecture */}
          <div>
            <h4 className="text-sm font-bold text-[#F5F1E8] uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6B98C]"></span> React.js Frontend
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7A303F]"></span> Node & Express API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8757F]"></span> MongoDB Atlas DB
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6B98C]"></span> Smart Match Engine
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6F6A64]">
          <p>© {new Date().getFullYear()} CampusFind AI. Built for modern university recovery operations.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#E7DED0] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#E7DED0] transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#E7DED0] transition-colors cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
