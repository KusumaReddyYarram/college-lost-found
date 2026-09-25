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
    <header className="sticky top-0 z-50 bg-[#171717]/95 backdrop-blur-md border-b border-[#292929] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7A303F] to-[#D6B98C] p-0.5 shadow-md shadow-[#7A303F]/20 group-hover:shadow-[#7A303F]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#171717] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D6B98C] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#F5F1E8]">CampusFind</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#D6B98C]/20 text-[#D6B98C] border border-[#D6B98C]/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-[#A69F95] tracking-wider font-medium uppercase -mt-1">
                Smart Recovery System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#212121]/80 p-1.5 rounded-full border border-[#333333]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-[#7A303F] text-white shadow-md shadow-[#7A303F]/30 font-bold'
                    : 'text-[#E7DED0] hover:text-white hover:bg-[#333333]/60'
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#7A303F] hover:bg-[#632532] rounded-xl transition-all shadow-md shadow-[#7A303F]/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Dashboard</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="nav-user-dropdown-btn"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#F5F1E8] hover:text-white bg-[#212121] border border-[#333333] rounded-xl transition-all"
                  >
                    <UserCheck className="w-4 h-4 text-[#D6B98C]" />
                    <span className="max-w-[100px] truncate text-xs font-semibold">{user?.fullName || 'Account'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#212121] border border-[#333333] shadow-xl py-2 z-50">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#F5F1E8] hover:bg-[#333333] hover:text-white"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#D6B98C]" />
                        <span>My Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-300 hover:bg-[#333333] text-left"
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
                  className="px-4 py-2 text-sm font-semibold text-[#E7DED0] hover:text-white transition-colors duration-200"
                >
                  Log In
                </Link>
                
                <Link
                  to="/register"
                  id="nav-register-btn"
                  className="px-4 py-2 text-sm font-semibold text-[#F5F1E8] bg-[#292929] hover:bg-[#333333] border border-[#444444] rounded-xl transition-all duration-200"
                >
                  Register
                </Link>

                {/* Arrow Dropdown Menu for Quick Navigation */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    id="nav-arrow-dropdown-btn"
                    className="p-2 text-[#E7DED0] hover:text-white bg-[#212121] border border-[#333333] rounded-xl transition-all flex items-center gap-1 text-xs"
                    title="Account Navigation Menu"
                  >
                    <User className="w-4 h-4 text-[#D6B98C]" />
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#212121] border border-[#333333] shadow-xl py-1.5 z-50">
                      <Link
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#F5F1E8] hover:bg-[#333333] hover:text-white"
                      >
                        <User className="w-3.5 h-3.5 text-[#D6B98C]" />
                        <span>Log In</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#D6B98C] hover:bg-[#333333] hover:text-white"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#7A303F]" />
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#7A303F] hover:bg-[#632532] shadow-md shadow-[#7A303F]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Report Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#E7DED0] hover:text-white bg-[#212121] border border-[#333333] rounded-xl transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#212121] border-b border-[#333333] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-[#7A303F] text-white font-bold'
                    : 'text-[#E7DED0] hover:bg-[#333333]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#333333] flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-rose-300 hover:bg-[#333333]"
              >
                Logout Account
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-[#E7DED0] bg-[#333333]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#7A303F]"
                >
                  Register Campus Account
                </Link>
              </>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenReportModal && onOpenReportModal('lost');
              }}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#7A303F] hover:bg-[#632532] flex items-center justify-center gap-2 shadow-md"
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
