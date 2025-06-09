import { useState } from 'react';
import { TranscriptionService, createTranscriptionService, TranscriptionOptions } from '../services/transcriptionService';

export function useTranscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcriptionService] = useState<TranscriptionService>(() => {
    const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
    if (!apiKey) {
      console.error('Deepgram API key is not configured. Please add VITE_DEEPGRAM_API_KEY to your .env file');
      throw new Error('Deepgram API key is not configured');
    }
    return createTranscriptionService(apiKey);
  });

  const transcribeAudio = async (audioFile: File, options?: TranscriptionOptions): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const transcript = await transcriptionService.transcribeAudio(audioFile, options);
      return transcript;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to transcribe audio';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    transcribeAudio,
    loading,
    error
  };
} 