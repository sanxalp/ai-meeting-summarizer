export interface TranscriptionOptions {
  language?: string;
  model?: string;
  smart_format?: boolean;
  punctuate?: boolean;
}

export interface TranscriptionService {
  transcribeAudio: (audioFile: File, options?: TranscriptionOptions) => Promise<string>;
}

class DeepgramTranscriptionService implements TranscriptionService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async transcribeAudio(audioFile: File, options: TranscriptionOptions = {}): Promise<string> {
    try {
      const audioBuffer = await audioFile.arrayBuffer();
      
      const response = await fetch('https://api.deepgram.com/v1/listen', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': audioFile.type,
        },
        body: audioBuffer,
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`Deepgram API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.results?.channels?.[0]?.alternatives?.[0]?.transcript) {
        throw new Error('No transcript found in the response');
      }

      return data.results.channels[0].alternatives[0].transcript;
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio file');
    }
  }
}

export function createTranscriptionService(apiKey: string): TranscriptionService {
  return new DeepgramTranscriptionService(apiKey);
} 