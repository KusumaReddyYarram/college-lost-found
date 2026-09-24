import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  CheckCircle2, AlertCircle, KeyRound, UserCheck 
} from 'lucide-react';
import { authService } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

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
        message: `Welcome back, ${response.user.fullName}! Connected live to MongoDB Atlas via Render.`
      });
    } catch (error) {
      setIsLoading(false);
      setAuthStatus({
        type: 'error',
        message: error.message || 'Login failed. Please check your credentials.'
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl glass-panel border border-slate-800/80 shadow-2xl overflow-hidden">
        
        {/* Left Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-8 bg-slate-950/70">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
              <span>Campus Account Portal</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 text-sm">
              Log in to check your lost item match notifications and manage active claims.
            </p>
          </div>

          {authStatus && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 ${
              authStatus.type === 'success' 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' 
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block">Authentication Feedback</strong>
                {authStatus.message}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* College Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                College Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="login-email-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset module will connect to Node.js nodemailer service in next release.'); }} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
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
                  className="w-full pl-10 pr-12 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
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
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950"
                />
                <span className="text-xs text-slate-400">Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              id="login-submit-btn"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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
          <div className="text-center pt-4 border-t border-slate-800/80">
            <p className="text-xs text-slate-400">
              Don't have a verified account yet?{' '}
              <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Register Campus Account
              </Link>
            </p>
          </div>

        </div>

        {/* Right Side: Visually Interesting SaaS Highlight Panel */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-8 relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Campus recovery platform</span>
              <h3 className="text-2xl font-extrabold text-white mt-1 leading-tight">
                Your lost item journey starts here.
              </h3>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Log in to access real-time match confidence alerts, track claim statuses, and securely verify physical ownership of reported belongings.
            </p>
          </div>

          {/* Feature Badge Cards */}
          <div className="space-y-3 relative z-10">
            
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Private Verification Protocol</span>
                <span className="text-slate-400">Protects items from fraudulent public claims.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Verified Student Identity</span>
                <span className="text-slate-400">Only authenticated college domain emails.</span>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 relative z-10">
            Connected to Express.js REST API • MongoDB Atlas Auth Schema
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
