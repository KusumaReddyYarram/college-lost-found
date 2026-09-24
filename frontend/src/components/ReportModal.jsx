import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, Shield, FileText, Image as ImageIcon, MapPin, Tag } from 'lucide-react';

const ReportModal = ({ isOpen, onClose, type = 'lost' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${type === 'lost' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white capitalize">
                Report {type} Item (Architectural Preview)
              </h3>
              <p className="text-xs text-slate-400">
                AI attribute extraction schema prepared for next phase integration
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex gap-3 text-indigo-300 text-sm">
            <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-indigo-200">Phase 1 System Notice</strong>
              You are viewing the structured schema for CampusFind AI's report engine. In Phase 2, this form connects directly to Node.js & MongoDB Atlas endpoints.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col gap-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Tag className="w-3.5 h-3.5 text-indigo-400" /> Attributes Collected
              </span>
              <span className="text-slate-200 font-semibold">Title, Category, Color, Brand</span>
            </div>
            
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col gap-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-sky-400" /> Campus Context
              </span>
              <span className="text-slate-200 font-semibold">Proximity zone & Date/Time</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col gap-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> Visual Vectors
              </span>
              <span className="text-slate-200 font-semibold">Multi-angle Photo Upload</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col gap-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Privacy Verification
              </span>
              <span className="text-slate-200 font-semibold">Private Ownership Lock</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">How AI Smart Match Works</h4>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Category comparison</span>
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Text similarity analysis</span>
              <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Location & time score</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">CampusFind AI Architecture v1.0</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
