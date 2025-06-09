import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-16 h-16 text-white/50" />
          </div>
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/80 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="glass-button flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="glass-button flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Upload & Summarize
            </Link>
            <Link
              to="/history"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Meeting History
            </Link>
            <Link
              to="/settings"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Settings
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
