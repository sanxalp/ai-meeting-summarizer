import React, { useState } from "react";
import { LogIn, UserPlus, Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <div className="icon-wrapper">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              syntheia
            </h1>
            <p className="text-white/80 mt-2">
              {isSignUp ? "Create your account" : "Welcome back"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="icon-wrapper absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-white/50" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input w-full pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="icon-wrapper absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-white/50" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="glass-input w-full pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glass-button w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="icon-wrapper">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  </div>
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="icon-wrapper">
                    {isSignUp ? (
                      <UserPlus className="w-5 h-5 mr-2" />
                    ) : (
                      <LogIn className="w-5 h-5 mr-2" />
                    )}
                  </div>
                  {isSignUp ? "Create Account" : "Sign In"}
                </div>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
