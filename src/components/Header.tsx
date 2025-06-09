import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  User,
  Ghost,
  Cat,
  AudioLines,
  Upload,
  History,
  Settings,
  HelpCircle,
  LogIn,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

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
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <div className="icon-wrapper">
                  <Ghost className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                syntheia
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`glass-nav-link ${
                isActive("/") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <Upload className="w-4 h-4 mr-2" />
              </div>
              Upload
            </Link>
            <Link
              to="/history"
              className={`glass-nav-link ${
                isActive("/history") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <History className="w-4 h-4 mr-2" />
              </div>
              History
            </Link>
            <Link
              to="/settings"
              className={`glass-nav-link ${
                isActive("/settings") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <Settings className="w-4 h-4 mr-2" />
              </div>
              Settings
            </Link>
            <Link
              to="/about"
              className={`glass-nav-link ${
                isActive("/about") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <HelpCircle className="w-4 h-4 mr-2" />
              </div>
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="glass-nav-link">
                  <div className="icon-wrapper">
                    <User className="w-4 h-4 mr-2" />
                  </div>
                  Profile
                </Link>
                <button onClick={handleSignOut} className="glass-button">
                  <div className="icon-wrapper">
                    <LogOut className="w-4 h-2 mr-2" />
                  </div>
                  <span className="text-sm">Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/auth" className="glass-button">
                <div className="icon-wrapper">
                  <LogIn className="w-4 h-4 mr-2" />
                </div>
                Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="md:hidden border-t border-white/10 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            <Link
              to="/"
              className={`glass-nav-link ${
                isActive("/") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <Upload className="w-4 h-4 mr-1" />
              </div>
              <span className="text-sm">Upload</span>
            </Link>
            <Link
              to="/history"
              className={`glass-nav-link ${
                isActive("/history") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <History className="w-4 h-4 mr-1" />
              </div>
              History
            </Link>
            <Link
              to="/settings"
              className={`glass-nav-link ${
                isActive("/settings") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <Settings className="w-4 h-4 mr-1" />
              </div>
              Settings
            </Link>
            <Link
              to="/about"
              className={`glass-nav-link ${
                isActive("/about") ? "glass-nav-link-active" : ""
              }`}
            >
              <div className="icon-wrapper">
                <HelpCircle className="w-4 h-4 mr-1" />
              </div>
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
