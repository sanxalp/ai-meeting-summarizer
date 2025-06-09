import { useState } from 'react';
import { AIService, createAIService, SummaryOptions } from '../services/aiService';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiService] = useState<AIService>(() => createAIService());

  const summarize = async (transcript: string, options?: SummaryOptions): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const summary = await aiService.summarizeMeeting(transcript, options);
      return summary;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate summary';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getProviderName = (): string => {
    return aiService.getProviderName();
  };

  return {
    summarize,
    loading,
    error,
    getProviderName
  };
}