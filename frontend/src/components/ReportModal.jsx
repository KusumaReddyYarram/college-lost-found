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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#F5F1E8] border border-[#D9D0C3] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#D9D0C3] flex items-center justify-between bg-[#171717] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D6B98C]/20 text-[#D6B98C] border border-[#D6B98C]/30">
              <Sparkles className="w-5 h-5 text-[#D6B98C]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white capitalize">
                Report {formData.type} Item
              </h3>
              <p className="text-xs text-[#E7DED0]">
                Connect with CampusFind AI Smart Matching System
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#E7DED0] hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-[#252525]">
          {statusMsg && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              statusMsg.type === 'success' ? 'bg-[#7A303F]/15 border border-[#7A303F]/30 text-[#171717]' : 'bg-rose-500/10 border border-rose-500/20 text-rose-800'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-[#7A303F]" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <div className="font-semibold">{statusMsg.message}</div>
            </div>
          )}

          {duplicateWarning && (
            <div className="p-4 rounded-xl bg-[#7A303F]/15 border border-[#7A303F]/30 text-[#7A303F] text-xs space-y-1">
              <strong className="font-bold block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#7A303F]" /> Possible Duplicate Report Warning ({duplicateWarning.similarityScore}% similarity)
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
                  ? 'bg-[#7A303F] text-white border-[#7A303F]'
                  : 'bg-[#FFFFFF] border-[#D9D0C3] text-[#6F6A64] hover:text-[#171717]'
              }`}
            >
              Report Lost Item
            </button>

            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: 'found' }))}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                formData.type === 'found'
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-[#FFFFFF] border-[#D9D0C3] text-[#6F6A64] hover:text-[#171717]'
              }`}
            >
              Report Found Item
            </button>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase">Item Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={handleCheckDuplicate}
                placeholder="e.g. Black HP Laptop / Blue Water Bottle"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
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
              <label className="text-xs font-bold text-[#171717] uppercase">Location *</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                onBlur={handleCheckDuplicate}
                placeholder="e.g. Central Library / Main Canteen Table 4"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase">Image URL (Optional)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
              />
            </div>
          </div>

          {/* Color & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Dark Blue / Matte Black"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase">Brand Name</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Apple / Dell / Nike"
                className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#171717] uppercase">Detailed Description *</label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe key details, stickers, scratches, or condition..."
              className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-xs text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#7A303F]"
            />
          </div>

          {/* Privacy Verification Secret Box */}
          <div className="p-4 rounded-xl bg-[#171717] text-white border border-[#292929] space-y-3">
            <div className="flex items-center gap-2 text-[#D6B98C] text-xs font-bold">
              <Shield className="w-4 h-4 text-[#D6B98C]" />
              <span>Privacy Ownership Lock (Hidden Verification Data)</span>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-[#E7DED0] font-medium block">
                Secret Answer (Required for ownership verification) *
              </label>
              <input
                type="text"
                name="privateVerificationAnswer"
                required
                value={formData.privateVerificationAnswer}
                onChange={handleChange}
                placeholder="e.g. Batman sticker inside laptop lid / initials 'YK' on strap"
                className="w-full px-3 py-2 bg-[#212121] border border-[#333333] rounded-xl text-xs text-white placeholder-[#6F6A64] focus:outline-none focus:ring-1 focus:ring-[#D6B98C]"
              />
              <span className="text-[10px] text-[#D6B98C] block font-medium">
                🔒 Hidden publicly. Only used to calculate verification score when claims are submitted.
              </span>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#D9D0C3] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6F6A64] hover:text-[#171717]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7A303F] hover:bg-[#632532] shadow-md shadow-[#7A303F]/25 flex items-center gap-2 disabled:opacity-50"
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
