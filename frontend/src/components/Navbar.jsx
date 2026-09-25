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
    <header className="sticky top-0 z-50 bg-[#183C35]/95 backdrop-blur-md border-b border-[#31594F] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C96F52] to-[#C9A96E] p-0.5 shadow-md shadow-[#C96F52]/20 group-hover:shadow-[#C96F52]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#183C35] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#C9A96E] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#F7F4ED]">CampusFind</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-[#A3B0A9] tracking-wider font-medium uppercase -mt-1">
                Smart Recovery System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#112C27]/80 p-1.5 rounded-full border border-[#31594F]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#C96F52] text-white shadow-md shadow-[#C96F52]/30 font-bold'
                    : 'text-[#E9E1D2] hover:text-white hover:bg-[#31594F]/60'
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#C96F52] hover:bg-[#B25C41] rounded-xl transition-all shadow-md shadow-[#C96F52]/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="nav-user-dropdown-btn"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#F7F4ED] hover:text-white bg-[#112C27] border border-[#31594F] rounded-xl transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-[#C9A96E]" />
                    <span className="max-w-[100px] truncate text-xs font-semibold">{user?.fullName || 'Account'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#112C27] border border-[#31594F] shadow-xl py-2 z-50">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#F7F4ED] hover:bg-[#31594F] hover:text-white"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>My Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-300 hover:bg-[#31594F] text-left"
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
                  className="px-4 py-2 text-sm font-semibold text-[#E9E1D2] hover:text-white transition-colors duration-200"
                >
                  Log In
                </Link>
                
                <Link
                  to="/register"
                  id="nav-register-btn"
                  className="px-4 py-2 text-sm font-semibold text-[#F7F4ED] bg-[#31594F] hover:bg-[#274840] border border-[#447468] rounded-xl transition-all duration-200"
                >
                  Register
                </Link>

                {/* Arrow Dropdown Menu for Quick Navigation */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="nav-arrow-dropdown-btn"
                    className="p-2 text-[#E9E1D2] hover:text-white bg-[#112C27] border border-[#31594F] rounded-xl transition-all flex items-center gap-1 text-xs"
                    title="Account Navigation Menu"
                  >
                    <User className="w-4 h-4 text-[#C9A96E]" />
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#112C27] border border-[#31594F] shadow-xl py-1.5 z-50">
                      <Link
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#F7F4ED] hover:bg-[#31594F] hover:text-white"
                      >
                        <User className="w-3.5 h-3.5 text-[#C9A96E]" />
                        <span>Log In</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#C9A96E] hover:bg-[#31594F] hover:text-white"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C96F52]" />
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#C96F52] hover:bg-[#B25C41] shadow-md shadow-[#C96F52]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Report Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#E9E1D2] hover:text-white hover:bg-[#31594F] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#112C27] border-b border-[#31594F] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-[#C96F52] text-white font-bold'
                    : 'text-[#E9E1D2] hover:bg-[#31594F] hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#31594F] flex flex-col gap-2.5">
            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-[#E9E1D2] bg-[#31594F] border border-[#447468]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-[#C96F52]"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-rose-300 bg-rose-500/10 border border-rose-500/20"
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-[#C96F52] hover:bg-[#B25C41] shadow-md shadow-[#C96F52]/30"
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
