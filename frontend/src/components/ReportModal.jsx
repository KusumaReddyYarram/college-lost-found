import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, Shield, MapPin, Tag, ArrowRight, Loader2, Search } from 'lucide-react';
import { itemService } from '../services/api';

const ReportModal = ({ isOpen, onClose, type = 'lost', onItemSubmitted }) => {
  const [formData, setFormData] = useState({
    type: type || 'lost',
    title: '',
    category: 'Electronics & Gadgets',
    description: '',
    location: '',
    color: '',
    brand: '',
    identifyingMarks: '',
    imageUrl: '',
    privateVerificationQuestion: 'Describe one secret unmentioned detail about this item.',
    privateVerificationAnswer: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      type: type || 'lost'
    }));
    setDuplicateWarning(null);
    setStatusMsg(null);
  }, [type, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (statusMsg) setStatusMsg(null);
  };

  // Check duplicate report
  const handleCheckDuplicate = async () => {
    if (!formData.title || !formData.location) return;
    try {
      const res = await itemService.checkDuplicate({
        type: formData.type,
        title: formData.title,
        category: formData.category,
        location: formData.location
      });
      if (res.isDuplicate) {
        setDuplicateWarning(res);
      } else {
        setDuplicateWarning(null);
      }
    } catch (err) {
      console.error('Duplicate check error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description || !formData.location || !formData.privateVerificationAnswer) {
      setStatusMsg({
        type: 'error',
        message: 'Please fill all required fields and the private verification answer.'
      });
      return;
    }

    setIsLoading(true);
    setStatusMsg(null);

    try {
      const payload = {
        type: formData.type,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        color: formData.color,
        brand: formData.brand,
        identifyingMarks: formData.identifyingMarks,
        images: formData.imageUrl ? [formData.imageUrl] : [],
        privateVerificationQuestion: formData.privateVerificationQuestion,
        privateVerificationAnswer: formData.privateVerificationAnswer
      };

      const res = await itemService.createReport(payload);
      setIsLoading(false);

      setStatusMsg({
        type: 'success',
        message: `${formData.type.toUpperCase()} item report created successfully! ${res.potentialMatchesCount ? `${res.potentialMatchesCount} potential matches found.` : ''}`
      });

      if (onItemSubmitted) onItemSubmitted(res.item);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      setStatusMsg({
        type: 'error',
        message: error.message || 'Failed to submit report. Please try again.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden glass-panel my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${formData.type === 'lost' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white capitalize">
                Report {formData.type} Item
              </h3>
              <p className="text-xs text-slate-400">
                Connect with CampusFind AI Smart Matching System
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

        {/* Body content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {statusMsg && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <div>{statusMsg.message}</div>
            </div>
          )}

          {duplicateWarning && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-1">
              <strong className="font-semibold block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" /> Possible Duplicate Report Warning ({duplicateWarning.similarityScore}% similarity)
              </strong>
              <p>A similar item '{duplicateWarning.similarItem?.title}' was reported recently at {duplicateWarning.similarItem?.location}.</p>
            </div>
          )}

          {/* Type Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: 'lost' }))}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                formData.type === 'lost'
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Report Lost Item
            </button>

            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: 'found' }))}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                formData.type === 'found'
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Report Found Item
            </button>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">Item Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={handleCheckDuplicate}
                placeholder="e.g. Black HP Laptop / Blue Water Bottle"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Electronics & Gadgets">Electronics & Gadgets</option>
                <option value="Wallets & Identification">Wallets & Identification</option>
                <option value="Water Bottles & Containers">Water Bottles & Containers</option>
                <option value="Bags & Accessories">Bags & Accessories</option>
                <option value="Books & Academic Supplies">Books & Academic Supplies</option>
                <option value="Apparel & Accessories">Apparel & Accessories</option>
                <option value="Other Belongings">Other Belongings</option>
              </select>
            </div>
          </div>

          {/* Location & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">Location *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                onBlur={handleCheckDuplicate}
                placeholder="e.g. Central Library / Main Canteen Table 4"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Color & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Dark Blue / Matte Black"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 uppercase">Brand Name</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Apple / Dell / Nike"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase">Detailed Description *</label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe key details, stickers, scratches, or condition..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Privacy Verification Secret Box */}
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 space-y-3">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-bold">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Privacy Ownership Lock (Hidden Verification Data)</span>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-300 font-medium block">
                Secret Answer (Required for ownership verification) *
              </label>
              <input
                type="text"
                name="privateVerificationAnswer"
                required
                value={formData.privateVerificationAnswer}
                onChange={handleChange}
                placeholder="e.g. Batman sticker inside laptop lid / initials 'YK' on strap"
                className="w-full px-3 py-2 bg-slate-950 border border-purple-800/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <span className="text-[10px] text-purple-400/80 block">
                🔒 Hidden publicly. Only used to calculate verification score when claims are submitted.
              </span>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting to MongoDB Atlas...</span>
                </>
              ) : (
                <>
                  <span>Submit {formData.type.toUpperCase()} Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
