// src/components/Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate('/');
    window.location.reload(); // Force UI refresh
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-cyan-100 to-blue-100/80 backdrop-blur-md shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-700 drop-shadow-sm cursor-pointer hover:scale-105 transition duration-200"
        >
          🏛 Civic Resolver
        </Link>

        {/* Hamburger icon for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl text-gray-700 focus:outline-none cursor-pointer"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-4 items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-white/80 backdrop-blur-sm border border-cyan-300 px-4 py-2 rounded text-sm font-medium text-gray-800 hover:bg-cyan-100 transition cursor-pointer"
              >
                👋 {user.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md shadow-xl rounded border border-cyan-300 z-50 overflow-hidden">
                  <Link
                    to="/report"
                    className="block px-4 py-2 text-sm hover:bg-cyan-50 text-gray-800 cursor-pointer transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📝 Report Issue
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-cyan-50 text-gray-800 cursor-pointer transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded cursor-pointer transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded cursor-pointer transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-3 space-y-2">
          {user ? (
            <div ref={dropdownRef} className="space-y-2">
              <Link
                to="/report"
                className="block bg-cyan-50 px-4 py-2 rounded text-sm text-gray-800 hover:bg-cyan-100 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                📝 Report Issue
              </Link>
              <Link
                to="/profile"
                className="block bg-cyan-50 px-4 py-2 rounded text-sm text-gray-800 hover:bg-cyan-100 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                👤 Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-100 text-red-700 px-4 py-2 rounded text-sm hover:bg-red-200 cursor-pointer"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded text-sm text-center hover:bg-blue-700 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-600 text-white px-4 py-2 rounded text-sm text-center hover:bg-green-700 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
