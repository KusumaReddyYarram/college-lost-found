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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183C35]/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#F7F4ED] border border-[#D8D0C1] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#D8D0C1] flex items-center justify-between bg-[#183C35] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30">
              <Sparkles className="w-5 h-5 text-[#C9A96E]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white capitalize">
                Report {formData.type} Item
              </h3>
              <p className="text-xs text-[#E9E1D2]">
                Connect with CampusFind AI Smart Matching System
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#E9E1D2] hover:text-white hover:bg-[#31594F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-[#24332F]">
          {statusMsg && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              statusMsg.type === 'success' ? 'bg-[#31594F]/15 border border-[#31594F]/30 text-[#183C35]' : 'bg-rose-500/10 border border-rose-500/20 text-rose-800'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-[#31594F]" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <div className="font-semibold">{statusMsg.message}</div>
            </div>
          )}

          {duplicateWarning && (
            <div className="p-4 rounded-xl bg-[#C96F52]/15 border border-[#C96F52]/30 text-[#C96F52] text-xs space-y-1">
              <strong className="font-bold block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#C96F52]" /> Possible Duplicate Report Warning ({duplicateWarning.similarityScore}% similarity)
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
                  ? 'bg-[#C96F52] text-white border-[#C96F52]'
                  : 'bg-[#FFFFFF] border-[#D8D0C1] text-[#66736D] hover:text-[#183C35]'
              }`}
            >
              Report Lost Item
            </button>

            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: 'found' }))}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                formData.type === 'found'
                  ? 'bg-[#31594F] text-white border-[#31594F]'
                  : 'bg-[#FFFFFF] border-[#D8D0C1] text-[#66736D] hover:text-[#183C35]'
              }`}
            >
              Report Found Item
            </button>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#183C35] uppercase">Item Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={handleCheckDuplicate}
                placeholder="e.g. Black HP Laptop / Blue Water Bottle"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#183C35] uppercase">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
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
              <label className="text-xs font-bold text-[#183C35] uppercase">Location *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                onBlur={handleCheckDuplicate}
                placeholder="e.g. Central Library / Main Canteen Table 4"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#183C35] uppercase">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
              />
            </div>
          </div>

          {/* Color & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#183C35] uppercase">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Dark Blue / Matte Black"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#183C35] uppercase">Brand Name</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Apple / Dell / Nike"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#183C35] uppercase">Detailed Description *</label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe key details, stickers, scratches, or condition..."
              className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D8D0C1] rounded-xl text-xs text-[#24332F] placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C96F52]"
            />
          </div>

          {/* Privacy Verification Secret Box */}
          <div className="p-4 rounded-xl bg-[#183C35] text-white border border-[#31594F] space-y-3">
            <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold">
              <Shield className="w-4 h-4 text-[#C9A96E]" />
              <span>Privacy Ownership Lock (Hidden Verification Data)</span>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-[#E9E1D2] font-medium block">
                Secret Answer (Required for ownership verification) *
              </label>
              <input
                type="text"
                name="privateVerificationAnswer"
                required
                value={formData.privateVerificationAnswer}
                onChange={handleChange}
                placeholder="e.g. Batman sticker inside laptop lid / initials 'YK' on strap"
                className="w-full px-3 py-2 bg-[#112C27] border border-[#31594F] rounded-xl text-xs text-white placeholder-[#8A918B] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
              />
              <span className="text-[10px] text-[#C9A96E] block font-medium">
                🔒 Hidden publicly. Only used to calculate verification score when claims are submitted.
              </span>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#D8D0C1] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#66736D] hover:text-[#183C35]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#C96F52] hover:bg-[#B25C41] shadow-md shadow-[#C96F52]/25 flex items-center gap-2 disabled:opacity-50"
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
