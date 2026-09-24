import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Menu, X, ArrowRight, LayoutDashboard, LogOut, ChevronDown, User, UserCheck 
} from 'lucide-react';

const Navbar = ({ onOpenReportModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('campusfind_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('campusfind_user'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    setToken(localStorage.getItem('campusfind_token'));
    try {
      setUser(JSON.parse(localStorage.getItem('campusfind_user')));
    } catch {
      setUser(null);
    }
  }, [location]);

  const isActive = (path) => location.pathname === path;
  const isLoggedIn = !!token;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'About', path: '/about' },
  ];

  if (isLoggedIn) {
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  const handleLogout = () => {
    localStorage.removeItem('campusfind_token');
    localStorage.removeItem('campusfind_user');
    setToken(null);
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-sky-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">CampusFind</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-medium uppercase -mt-1">
                Smart Recovery System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="nav-user-dropdown-btn"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span className="max-w-[100px] truncate text-xs font-semibold">{user?.fullName || 'Account'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                        <span>My Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-400 hover:bg-slate-800 text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  id="nav-login-btn"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Log In
                </Link>
                
                <Link
                  to="/register"
                  id="nav-register-btn"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all duration-200"
                >
                  Register
                </Link>

                {/* Arrow Dropdown Menu for Quick Navigation */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="nav-arrow-dropdown-btn"
                    className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all flex items-center gap-1 text-xs"
                    title="Account Navigation Menu"
                  >
                    <User className="w-4 h-4 text-indigo-400" />
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-1.5 z-50">
                      <Link
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Log In</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-indigo-300 hover:bg-slate-800 hover:text-white"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Register</span>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => onOpenReportModal && onOpenReportModal('lost')}
              id="nav-report-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Report Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenReportModal) onOpenReportModal('lost');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-600/30"
            >
              <span>Report Lost / Found Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
