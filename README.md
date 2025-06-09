# Syntheia

A beautiful, production-ready web application that allows users to upload meeting audio files or paste transcripts and generate AI-powered summaries using Supabase as the backend.

## Features

- 🔐 **User Authentication** - Secure email/password authentication with Supabase Auth (no email confirmation required)
- 📁 **File Upload** - Drag & drop interface for audio files (MP3, WAV, M4A)
- 🎙️ **Audio Transcription** - Powered by Deepgram for accurate speech-to-text
- 📝 **Text Input** - Paste meeting transcripts directly
- 🤖 **AI Summarization** - Generate intelligent meeting summaries using OpenRouter
- 📚 **History Dashboard** - View and manage all your previous summaries
- 👤 **User Profile** - Manage account settings and preferences
- ⚙️ **Settings Page** - Customize summary styles and notification preferences
- ℹ️ **About Page** - Learn about the app and its features
- 💾 **Export** - Download summaries as text files
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔒 **Row Level Security** - Secure data isolation per user
- 🎨 **Modern UI** - Clean, minimalistic design with smooth animations

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + React Router
- **Backend**: Supabase (Auth, Database, Storage)
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Routing**: React Router DOM
- **Font**: Inter (Google Fonts)
- **AI**: OpenRouter API
- **Transcription**: Deepgram API

## Pages & Features

### 🏠 Dashboard (/)
- Upload audio files or paste transcripts
- Generate AI summaries
- Export summaries

### 📚 History (/history)
- View all previous summaries
- Delete summaries
- Export individual summaries

### 👤 Profile (/profile)
- View and edit user information
- Update display name
- Dark mode toggle

### ⚙️ Settings (/settings)
- Summary style preferences (Brief, Bullet Points, Action Items)
- Default input method (Audio/Text)
- Notification settings
- Auto-save preferences

### ℹ️ About (/about)
- App overview and features
- How it works
- Technology stack
- Privacy & security information
- Contact information

### 🚫 404 Page
- Friendly error page
- Navigation back to main sections

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the database migration in the SQL editor:

```sql
-- Copy and paste the contents of supabase/migrations/20250608154421_square_pine.sql
```

4. In Authentication settings:
   - **IMPORTANT**: Disable email confirmation for immediate signup access
   - Navigate to Authentication > Settings > Email Auth
   - Turn OFF "Enable email confirmations"
   - Enable email/password authentication

### 2. Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your API credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Provider API Key (OpenRouter)
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# Deepgram API Key for Audio Transcription
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm run dev
```

## Usage

1. **Sign Up/Sign In** - Create an account or sign in (no email confirmation required)
2. **Upload Audio** - Drag and drop audio files or use the file picker
3. **Paste Transcript** - Alternatively, paste meeting transcripts directly
4. **Generate Summary** - Click the "Generate AI Summary" button
5. **View History** - Access all your previous summaries in the History tab
6. **Manage Profile** - Update your profile and preferences
7. **Customize Settings** - Adjust summary styles and notification preferences
8. **Export** - Download summaries as text files

## AI Integration

The application uses OpenRouter for AI summarization, which provides access to various AI models. The default configuration uses Claude 3 Haiku for optimal performance and cost-effectiveness.

To use a different AI provider:
1. Update the environment variables with your preferred API key
2. Modify the AI service configuration in `src/services/aiService.ts`

## Database Schema

```sql
summaries (
  id: uuid (primary key)
  user_id: text (foreign key)
  file_name: text
  transcript: text
  summary: text
  created_at: timestamptz
)
```

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication with Supabase Auth
- Environment variables for sensitive data
- No email confirmation required for immediate access

## Routing

The application uses React Router for navigation:

- `/` - Dashboard (Upload & Summarize)
- `/history` - Meeting History
- `/profile` - User Profile
- `/settings` - App Settings
- `/about` - About Page
- `*` - 404 Not Found

## Deployment

This application can be deployed to:
- Vercel
- Netlify
- Supabase Edge Functions
- Any static hosting provider

Make sure to set your environment variables in your deployment platform.

## License

MIT License - see LICENSE file for details.