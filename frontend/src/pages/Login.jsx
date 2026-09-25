import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  CheckCircle2, AlertCircle, KeyRound, UserCheck 
} from 'lucide-react';
import { authService } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registeredEmail = location.state?.registeredEmail || '';

  const [formData, setFormData] = useState({
    email: registeredEmail,
    password: '',
    rememberMe: false
  });

  const successNotice = location.state?.successMsg || (registeredEmail ? 'Account created successfully. Please log in.' : null);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(
    successNotice
      ? { type: 'success', message: successNotice }
      : null
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthStatus(null);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      if (response.user && response.user.token) {
        localStorage.setItem('campusfind_token', response.user.token);
        localStorage.setItem('campusfind_user', JSON.stringify(response.user));
      }

      setIsLoading(false);
      setAuthStatus({
        type: 'success',
        message: `Welcome back, ${response.user.fullName}! Redirecting to Dashboard...`
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (error) {
      setIsLoading(false);
      setAuthStatus({
        type: 'error',
        message: error.message || 'Login failed. Please check your credentials.'
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-[#FFFFFF] border border-[#D9D0C3] shadow-2xl overflow-hidden">
        
        {/* Left Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 bg-[#F5F1E8]">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717]/10 border border-[#171717]/20 text-[#171717] text-xs font-bold">
              <KeyRound className="w-3.5 h-3.5 text-[#7A303F]" />
              <span>Campus Account Portal</span>
            </div>
            <h2 className="text-3xl font-black text-[#171717] tracking-tight">Welcome Back</h2>
            <p className="text-[#6F6A64] text-sm font-medium">
              Log in to check your lost item match notifications and manage active claims.
            </p>
          </div>

          {authStatus && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              authStatus.type === 'success' 
                ? 'bg-[#7A303F]/15 border border-[#7A303F]/30 text-[#171717]' 
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-800'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-[#7A303F] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Authentication Feedback</strong>
                {authStatus.message}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Address */}
            <div className="space-y-1.5">
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
                  id="login-email-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset module will connect to Node.js nodemailer service in next release.'); }} className="text-xs text-[#7A303F] hover:text-[#632532] font-semibold">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6F6A64]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="login-password-input"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-[#FFFFFF] border border-[#D9D0C3] rounded-xl text-sm text-[#252525] placeholder-[#6F6A64] focus:outline-none focus:ring-2 focus:ring-[#7A303F]/50 focus:border-[#7A303F] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6F6A64] hover:text-[#252525]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-[#FFFFFF] border-[#D9D0C3] text-[#7A303F] focus:ring-[#7A303F]"
                />
                <span className="text-xs text-[#6F6A64] font-medium">Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              id="login-submit-btn"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#7A303F] hover:bg-[#632532] shadow-lg shadow-[#7A303F]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating with Mongo Atlas...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer link to register */}
          <div className="text-center pt-4 border-t border-[#D9D0C3]">
            <p className="text-xs text-[#6F6A64]">
              Don't have a verified account yet?{' '}
              <Link to="/register" className="font-bold text-[#7A303F] hover:text-[#632532]">
                Register Campus Account
              </Link>
            </p>
          </div>

        </div>

        {/* Right Side: Visually Interesting SaaS Highlight Panel */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-[#171717] text-white border-t lg:border-t-0 lg:border-l border-[#292929] flex flex-col justify-between space-y-8 relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6B98C]/15 blur-[80px] rounded-full pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#D6B98C]/20 border border-[#D6B98C]/30 flex items-center justify-center text-[#D6B98C] shadow-lg">
              <Sparkles className="w-6 h-6 text-[#D6B98C]" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#D6B98C] uppercase tracking-widest">Campus recovery platform</span>
              <h3 className="text-2xl font-extrabold text-white mt-1 leading-tight">
                Your lost item journey starts here.
              </h3>
            </div>

            <p className="text-[#E7DED0] text-xs sm:text-sm leading-relaxed font-medium">
              Log in to access real-time match confidence alerts, track claim statuses, and securely verify physical ownership of reported belongings.
            </p>
          </div>

          {/* Feature Badge Cards */}
          <div className="space-y-3 relative z-10">
            
            <div className="p-3.5 rounded-xl bg-[#212121] border border-[#333333] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D6B98C]/20 text-[#D6B98C] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Private Verification Protocol</span>
                <span className="text-[#A69F95]">Protects items from fraudulent public claims.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#212121] border border-[#333333] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#7A303F]/20 text-[#B8757F] flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Verified Account Identity</span>
                <span className="text-[#A69F95]">Authenticates securely across all email domains.</span>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-[#333333] text-[11px] text-[#A69F95] relative z-10">
            Connected to Express.js REST API • MongoDB Atlas Auth Schema
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
