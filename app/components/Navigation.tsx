'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Set mounted state for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Search data based on website content
  const searchData = [
    { title: 'Home', description: 'Welcome to My Makati Journey', url: '/', category: 'Page' },
    { title: 'Gallery', description: 'Travel photos from Makati City', url: '/gallery', category: 'Page' },
    { title: 'About', description: 'My experiences and story in Makati', url: '/about', category: 'Page' },
    { title: 'Makati Skyline', description: 'Beautiful view of the city skyline', url: '/gallery', category: 'Gallery' },
    { title: 'Ayala Triangle', description: 'Peaceful green space in the heart of the city', url: '/gallery', category: 'Gallery' },
    { title: 'Greenbelt Park', description: 'Urban oasis with lush greenery', url: '/gallery', category: 'Gallery' },
    { title: 'Bonifacio Global City', description: 'Modern architecture and urban design', url: '/gallery', category: 'Gallery' },
    { title: 'Poblacion Nightlife', description: 'Vibrant street art and culture', url: '/gallery', category: 'Gallery' },
    { title: 'Salcedo Market', description: 'Weekend food market experience', url: '/gallery', category: 'Gallery' },
    { title: 'My Experiences', description: 'Timeline of adventures in Makati', url: '/about', category: 'About' },
    { title: 'Favorites', description: 'My favorite places in Makati City', url: '/about', category: 'About' },
    { title: 'Filipino Cuisine', description: 'Authentic Filipino dishes and local favorites', url: '/about', category: 'About' },
    { title: 'Cultural Discoveries', description: 'Filipino culture and traditions', url: '/about', category: 'About' },
  ];

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const filteredSuggestions = searchData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.toLowerCase() === 'login') {
      setShowLoginModal(true);
      setSearchQuery('');
      setShowSuggestions(false);
    } else if (filteredSuggestions.length > 0) {
      handleSuggestionClick(filteredSuggestions[0]);
    }
  };

  const handleSuggestionClick = (suggestion: typeof searchData[0]) => {
    if (suggestion.url !== '#') {
      window.location.href = suggestion.url;
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded admin credentials
    const ADMIN_USERNAME = 'l4nszxc';
    const ADMIN_PASSWORD = 'lanslorence';
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store login state
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUsername', username);
      
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      
      // Redirect to admin page
      router.push('/admin');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
              <Image 
                src="/makati-logo.png" 
                alt="Makati Philippines" 
                width={120} 
                height={50}
                className="object-contain brightness-0 invert"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  placeholder="Search..."
                  className="bg-slate-800 text-gray-200 px-4 py-2 pr-10 rounded-full border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 w-48 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-96 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
                  {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 hover:bg-slate-700 transition-colors text-left border-b border-slate-700 last:border-b-0 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {suggestion.category === 'Page' && (
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {suggestion.category === 'Gallery' && (
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                          {suggestion.category === 'About' && (
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          {suggestion.category === 'Action' && (
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                            {suggestion.title}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">{suggestion.description}</p>
                          <span className="inline-block mt-1 text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded">
                            {suggestion.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No results message */}
              {showSuggestions && searchQuery.length > 0 && filteredSuggestions.length === 0 && (
                <div className="absolute top-full mt-2 w-96 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-6 z-50 text-center">
                  <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-gray-400">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-600"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal - rendered via portal to body */}
      {mounted && showLoginModal && createPortal(
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]" 
            onClick={() => setShowLoginModal(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-md px-4">
            <div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border-2 border-slate-700" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin Login
                </h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-300">
                    <input type="checkbox" className="mr-2 rounded bg-slate-700 border-slate-600" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Contact Administrator
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </nav>
  );
}