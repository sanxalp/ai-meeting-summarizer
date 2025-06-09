import React, { useState } from "react";
import { User, Mail, Save, Moon, Sun } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.display_name || ""
  );
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (error) throw error;
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-card p-8">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <p className="text-white/80">Manage your account preferences</p>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              message.includes("Error")
                ? "bg-red-500/10 border border-red-500/20 text-red-400"
                : "bg-green-500/10 border border-green-500/20 text-green-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="glass-input w-full pl-10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="glass-input w-full"
              placeholder="Enter your display name"
            />
          </div>

          <div className="flex items-center justify-between p-4 glass-card">
            <div className="flex items-center">
              {darkMode ? (
                <Moon className="w-5 h-5 text-white/80 mr-3" />
              ) : (
                <Sun className="w-5 h-5 text-white/80 mr-3" />
              )}
              <div>
                <h3 className="font-medium text-white">Dark Mode</h3>
                <p className="text-sm text-white/60">
                  Toggle dark mode appearance
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="glass-button"
            >
              {darkMode ? "Disable" : "Enable"}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="glass-button"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
