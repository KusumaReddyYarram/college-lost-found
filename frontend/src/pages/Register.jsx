import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  CheckCircle2, AlertCircle, Building2, GraduationCap 
} from 'lucide-react';
import { authService } from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    year: '1st Year',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(null);

  const validateEmail = (email) => {
    if (!email || typeof email !== 'string' || !email.trim()) {
      return { isValid: false, message: 'Email Address is required.' };
    }
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { isValid: false, message: 'Please enter a valid email address (e.g. name@gmail.com).' };
    }
    return { isValid: true, message: '' };
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-[#D9D0C3]' };
    let score = 0;
    if (pwd.length >= 6) score += 25;
    if (pwd.length >= 10) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9!@#$%^&*]/.test(pwd)) score += 25;

    if (score <= 25) return { score, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 50) return { score, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 75) return { score, label: 'Good', color: 'bg-[#B8757F]' };
    return { score, label: 'Strong', color: 'bg-[#7A303F]' };
  };

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (registerStatus) setRegisterStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterStatus(null);

    if (!formData.fullName.trim()) {
      setRegisterStatus({ type: 'error', message: 'Full Name is required.' });
      return;
    }

    const emailVal = validateEmail(formData.email);
    if (!emailVal.isValid) {
      setRegisterStatus({ type: 'error', message: emailVal.message });
      return;
    }

    if (!formData.password) {
      setRegisterStatus({ type: 'error', message: 'Password is required.' });
      return;
    }

    if (formData.password.length < 6) {
      setRegisterStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setRegisterStatus({ type: 'error', message: 'Password and Confirm Password do not match.' });
      return;
    }

    if (!formData.agreeTerms) {
      setRegisterStatus({ type: 'error', message: 'You must agree to the Campus Recovery Code of Conduct.' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        department: formData.department.trim(),
        year: formData.year
      });

      setIsLoading(false);
      setRegisterStatus({
        type: 'success',
        message: 'Account created successfully! Redirecting to login portal...'
      });

      setTimeout(() => {
        navigate('/login', {
          state: {
            registeredEmail: formData.email.trim().toLowerCase(),
            successMsg: 'Registration successful! Please sign in with your password.'
          }
        });
      }, 1200);

    } catch (error) {
      setIsLoading(false);
      setRegisterStatus({
        type: 'error',
        message: error.message || 'Registration failed. An account with this email may already exist.'
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-[#FFFFFF] border border-[#D9D0C3] shadow-2xl overflow-hidden">
        
        {/* Left Side: Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-7 bg-[#F5F1E8]">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717]/10 border border-[#171717]/20 text-[#171717] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#7A303F]" />
              <span>Create Verified Campus Account</span>
            </div>
            <h2 className="text-3xl font-black text-[#171717] tracking-tight">Join CampusFind AI</h2>
            <p className="text-[#6F6A64] text-sm font-medium">
              Connect with students and staff to quickly report and recover lost belongings.
            </p>
          </div>

          {registerStatus && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              registerStatus.type === 'success' 
                ? 'bg-[#7A303F]/15 border border-[#7A303F]/30 text-[#171717]' 
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-800'
            }`}>
              {registerStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#7A303F] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <strong className="font-bold block">Registration Notice</strong>
                {registerStatus.message}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="reg-fullname-input"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Alex Rivera"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="reg-email-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                />
              </div>
            </div>

            {/* Department & Year (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Department (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Computer Science"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Academic Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year / Senior</option>
                    <option value="Postgraduate">Postgraduate / Staff</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="reg-password-input"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6F6A64] hover:text-[#252525]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="reg-confirmpassword-input"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#6F6A64]">Password Strength:</span>
                  <span className="font-bold text-[#171717]">{strength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-[#E7DED0] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${strength.color} transition-all duration-300`} 
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-[#FFFFFF] border-[#D9D0C3] text-[#7A303F] focus:ring-[#7A303F] mt-0.5"
                />
                <span className="text-xs text-[#6F6A64] font-medium leading-relaxed">
                  I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#7A303F] hover:underline font-bold">Campus Recovery Code of Conduct</a> and understand that false claiming is prohibited.
                </span>
              </label>
            </div>

            {/* Register Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              id="reg-submit-btn"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#7A303F] hover:bg-[#632532] shadow-lg shadow-[#7A303F]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer link to login */}
          <div className="text-center pt-3 border-t border-[#D9D0C3]">
            <p className="text-xs text-[#6F6A64]">
              Already have a campus account?{' '}
              <Link to="/login" className="font-bold text-[#7A303F] hover:text-[#632532]">
                Log In Here
              </Link>
            </p>
          </div>

        </div>

        {/* Right Side: Campus Security Feature Highlights */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-[#171717] text-white border-t lg:border-t-0 lg:border-l border-[#292929] flex flex-col justify-between space-y-8 relative overflow-hidden">
          
          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#D6B98C]/20 border border-[#D6B98C]/30 flex items-center justify-center text-[#D6B98C] shadow-lg">
              <ShieldCheck className="w-6 h-6 text-[#D6B98C]" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#D6B98C] uppercase tracking-widest">Campus Identity & Trust</span>
              <h3 className="text-2xl font-extrabold text-white mt-1 leading-tight">
                Built specifically for verified students & staff.
              </h3>
            </div>

            <p className="text-[#E7DED0] text-xs sm:text-sm leading-relaxed font-medium">
              By requiring verified email registration, CampusFind AI ensures authentic reports and maintains high accountability across campus.
            </p>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="p-3.5 rounded-xl bg-[#212121] border border-[#333333] flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D6B98C] shrink-0" />
              <span className="text-xs text-[#E7DED0] font-medium">Automatic email format validation schema</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#212121] border border-[#333333] flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D6B98C] shrink-0" />
              <span className="text-xs text-[#E7DED0] font-medium">Verified Finder reputation score tracking</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#212121] border border-[#333333] flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D6B98C] shrink-0" />
              <span className="text-xs text-[#E7DED0] font-medium">Zero-spam private verification questions</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#333333] text-[11px] text-[#A69F95] relative z-10">
            Express Auth Middleware • JWT Session Management Ready
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;
