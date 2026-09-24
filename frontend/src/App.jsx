import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReportModal from './components/ReportModal';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

// Helper component to auto-scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected route wrapper for authenticated-only pages
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('campusfind_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [reportModalState, setReportModalState] = useState({
    isOpen: false,
    type: 'lost'
  });

  const handleOpenReportModal = (type = 'lost') => {
    setReportModalState({
      isOpen: true,
      type
    });
  };

  const handleCloseReportModal = () => {
    setReportModalState((prev) => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        
        {/* Top Navbar */}
        <Navbar onOpenReportModal={handleOpenReportModal} />

        {/* Main Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenReportModal={handleOpenReportModal} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard onOpenReportModal={handleOpenReportModal} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Bottom Footer */}
        <Footer />

        {/* Report Preview Modal */}
        <ReportModal
          isOpen={reportModalState.isOpen}
          onClose={handleCloseReportModal}
          type={reportModalState.type}
        />

      </div>
    </Router>
  );
}

export default App;
