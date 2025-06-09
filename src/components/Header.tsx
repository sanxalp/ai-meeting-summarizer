import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User, Bot, Upload, History, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                syntheia
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Link>
            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                isActive('/history')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Link>
            <Link
              to="/settings"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                isActive('/settings')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                isActive('/about')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className={`flex items-center text-sm transition-colors ${
                isActive('/profile')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{user?.email}</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200/50 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            <Link
              to="/"
              className={`flex-shrink-0 px-3 py-2 text-sm rounded-lg font-medium transition-all flex items-center ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </Link>
            <Link
              to="/history"
              className={`flex-shrink-0 px-3 py-2 text-sm rounded-lg font-medium transition-all flex items-center ${
                isActive('/history')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <History className="w-4 h-4 mr-1" />
              History
            </Link>
            <Link
              to="/settings"
              className={`flex-shrink-0 px-3 py-2 text-sm rounded-lg font-medium transition-all flex items-center ${
                isActive('/settings')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Link>
            <Link
              to="/about"
              className={`flex-shrink-0 px-3 py-2 text-sm rounded-lg font-medium transition-all flex items-center ${
                isActive('/about')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}