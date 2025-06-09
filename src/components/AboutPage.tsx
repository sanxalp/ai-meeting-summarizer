import React from "react";
import { Bot, Shield, Zap, Users, Github, Mail, Heart } from "lucide-react";

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="glass-card p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Syntheia - An AI-powered meeting summarizer
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Transform your meeting recordings and transcripts into actionable
          insights with the power of artificial intelligence.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Lightning Fast
          </h3>
          <p className="text-white/80">
            Generate comprehensive meeting summaries in seconds, not hours. Our
            AI processes your content instantly.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Secure & Private
          </h3>
          <p className="text-white/80">
            Your data is protected with enterprise-grade security. Only you can
            access your meeting summaries.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Team Collaboration
          </h3>
          <p className="text-white/80">
            Share summaries with your team and keep everyone aligned on meeting
            outcomes and action items.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
          <p className="text-white/80">
            Advanced natural language processing extracts key points, action
            items, and decisions automatically.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-400">1</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Upload or Paste</h3>
            <p className="text-white/80">
              Upload your audio files or paste meeting transcripts directly into
              the app.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-400">2</span>
            </div>
            <h3 className="font-semibold text-white mb-2">AI Processing</h3>
            <p className="text-white/80">
              Our AI analyzes the content and extracts key insights, decisions,
              and action items.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-emerald-400">3</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Get Summary</h3>
            <p className="text-white/80">
              Receive a structured summary with key points and actionable next
              steps.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-3">Frontend</h3>
            <ul className="space-y-2 text-white/80">
              <li>• React 18 with TypeScript</li>
              <li>• Vite for fast development</li>
              <li>• Tailwind CSS for styling</li>
              <li>• React Router for navigation</li>
              <li>• Lucide React for icons</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Backend & AI</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Supabase for authentication & database</li>
              <li>• Row Level Security (RLS)</li>
              <li>• Claude AI for summarization</li>
              <li>• Whisper.js for audio transcription</li>
              <li>• Real-time data synchronization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Privacy & Security
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-white mb-3">Data Protection</h3>
            <ul className="space-y-2 text-white/80">
              <li>• End-to-end encryption for all data</li>
              <li>• No data sharing with third parties</li>
              <li>• Automatic data deletion options</li>
              <li>• GDPR compliant data handling</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Security Features</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Row Level Security (RLS) in database</li>
              <li>• Secure authentication with Supabase</li>
              <li>• Regular security audits</li>
              <li>• SOC 2 Type II compliance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Contact & Support
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center p-4 glass-card">
            <Mail className="w-6 h-6 text-blue-400 mr-3" />
            <div>
              <h3 className="font-semibold text-white">Email Support</h3>
              <p className="text-white/80">sankalp2924@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center p-4 glass-card">
            <Github className="w-6 h-6 text-white/80 mr-3" />
            <a
              href="https://github.com/sanxalp"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-white/5 p-2 rounded-lg transition"
            >
              <div>
                <h3 className="font-semibold text-white">Check My Github</h3>
                <p className="text-white/80">github.com/sanxalp</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-white/80 flex items-center justify-center">
          Made with <Heart className="w-4 h-4 text-red-400 mx-1" /> for
          productive meetings
        </p>
        <p className="text-sm text-white/60 mt-2">
          © 2024 AI Meeting Summarizer. All rights reserved.
        </p>
      </div>
    </div>
  );
}
