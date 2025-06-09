import React, { useState } from 'react';
import { Settings, FileText, Mic, Bell, Save } from 'lucide-react';

export function SettingsPage() {
  const [summaryStyle, setSummaryStyle] = useState('brief');
  const [defaultInput, setDefaultInput] = useState('audio');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [message, setMessage] = useState('');

  const handleSaveSettings = () => {
    // In a real implementation, you would save these to the database
    localStorage.setItem('userSettings', JSON.stringify({
      summaryStyle,
      defaultInput,
      emailNotifications,
      pushNotifications,
      autoSave
    }));
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Customize your experience</p>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-600">
            {message}
          </div>
        )}

        <div className="space-y-8">
          {/* Summary Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Summary Preferences
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'brief', label: 'Brief', desc: 'Concise overview' },
                    { value: 'bullet', label: 'Bullet Points', desc: 'Key points listed' },
                    { value: 'action', label: 'Action Items', desc: 'Focus on tasks' }
                  ].map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setSummaryStyle(style.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        summaryStyle === style.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{style.label}</div>
                      <div className="text-sm text-gray-600">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Input Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'audio', label: 'Audio Upload', icon: Mic, desc: 'Upload audio files' },
                    { value: 'text', label: 'Text Input', icon: FileText, desc: 'Paste transcripts' }
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setDefaultInput(method.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        defaultInput === method.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <method.icon className="w-5 h-5 mr-2 text-purple-600" />
                        <div className="font-medium text-gray-900">{method.label}</div>
                      </div>
                      <div className="text-sm text-gray-600">{method.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-purple-600" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  key: 'email',
                  label: 'Email Notifications',
                  desc: 'Receive updates via email',
                  value: emailNotifications,
                  onChange: setEmailNotifications
                },
                {
                  key: 'push',
                  label: 'Push Notifications',
                  desc: 'Browser notifications for updates',
                  value: pushNotifications,
                  onChange: setPushNotifications
                },
                {
                  key: 'autosave',
                  label: 'Auto-save Summaries',
                  desc: 'Automatically save generated summaries',
                  value: autoSave,
                  onChange: setAutoSave
                }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.desc}</p>
                  </div>
                  <button
                    onClick={() => setting.onChange(!setting.value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.value ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center">
              <Save className="w-5 h-5 mr-2" />
              Save Settings
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}