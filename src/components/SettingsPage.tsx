import React, { useState } from "react";
import { Settings, FileText, Mic, Bell, Save } from "lucide-react";

export function SettingsPage() {
  const [summaryStyle, setSummaryStyle] = useState("brief");
  const [defaultInput, setDefaultInput] = useState("audio");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [message, setMessage] = useState("");

  const handleSaveSettings = () => {
    // In a real implementation, you would save these to the database
    localStorage.setItem(
      "userSettings",
      JSON.stringify({
        summaryStyle,
        defaultInput,
        emailNotifications,
        pushNotifications,
        autoSave,
      })
    );
    setMessage("Settings saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="glass-card p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-blue-400" />
          Settings
        </h2>

        <div className="space-y-8">
          {/* Summary Style Settings */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Summary Preferences
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Summary Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      value: "brief",
                      label: "Brief",
                      desc: "Concise overview",
                    },
                    {
                      value: "bullet",
                      label: "Bullet Points",
                      desc: "Key points listed",
                    },
                    {
                      value: "action",
                      label: "Action Items",
                      desc: "Focus on tasks",
                    },
                  ].map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setSummaryStyle(style.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        summaryStyle === style.value
                          ? "border-purple-400 bg-white/10"
                          : "border-white/20 hover:border-white/30 bg-white/5"
                      }`}
                    >
                      <div className="font-medium text-white">
                        {style.label}
                      </div>
                      <div className="text-sm text-white/60">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Default Input Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      value: "audio",
                      label: "Audio Upload",
                      desc: "Upload meeting recordings",
                    },
                    {
                      value: "text",
                      label: "Text Input",
                      desc: "Paste meeting transcripts",
                    },
                  ].map((input) => (
                    <button
                      key={input.value}
                      onClick={() => setDefaultInput(input.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        defaultInput === input.value
                          ? "border-blue-400 bg-white/10"
                          : "border-white/20 hover:border-white/30 bg-white/5"
                      }`}
                    >
                      <div className="font-medium text-white">
                        {input.label}
                      </div>
                      <div className="text-sm text-white/60">{input.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-purple-400" />
              Notifications
            </h3>

            <div className="space-y-4">
              {[
                {
                  key: "email",
                  label: "Email Notifications",
                  desc: "Receive updates via email",
                  value: emailNotifications,
                  onChange: setEmailNotifications,
                },
                {
                  key: "push",
                  label: "Push Notifications",
                  desc: "Browser notifications for updates",
                  value: pushNotifications,
                  onChange: setPushNotifications,
                },
                {
                  key: "autosave",
                  label: "Auto-save Summaries",
                  desc: "Automatically save generated summaries",
                  value: autoSave,
                  onChange: setAutoSave,
                },
              ].map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center justify-between p-4 glass-card"
                >
                  <div>
                    <div className="font-medium text-white">
                      {setting.label}
                    </div>
                    <div className="text-sm text-white/60">{setting.desc}</div>
                  </div>
                  <button
                    onClick={() => setting.onChange(!setting.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.value ? "bg-purple-400" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="glass-button flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mt-4 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-400">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
