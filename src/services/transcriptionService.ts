import { AudioChunkingService, AudioChunk } from "./audioChunkingService";

export interface TranscriptionOptions {
  language?: string;
  model?: string;
  smart_format?: boolean;
  punctuate?: boolean;
  chunkDuration?: number; // Duration of each chunk in seconds
}

export interface TranscriptionService {
  transcribeAudio: (
    audioFile: File,
    options?: TranscriptionOptions
  ) => Promise<string>;
}

class DeepgramTranscriptionService implements TranscriptionService {
  private apiKey: string;
  private chunkingService: AudioChunkingService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.chunkingService = new AudioChunkingService();
  }

  async transcribeAudio(
    audioFile: File,
    options: TranscriptionOptions = {}
  ): Promise<string> {
    try {
      const chunkDuration = options.chunkDuration || 300; // Default 5 minutes per chunk
      const chunks = await this.chunkingService.chunkAudio(
        audioFile,
        chunkDuration
      );

      const transcripts: string[] = [];
      let currentProgress = 0;

      for (const chunk of chunks) {
        const chunkFile = new File(
          [chunk.blob],
          `chunk_${chunk.startTime}.${audioFile.name.split(".").pop()}`,
          {
            type: audioFile.type,
          }
        );

        const chunkTranscript = await this.transcribeChunk(chunkFile, options);
        transcripts.push(chunkTranscript);

        // Update progress
        currentProgress =
          (chunk.endTime / chunks[chunks.length - 1].endTime) * 100;

        // Emit progress event
        window.dispatchEvent(
          new CustomEvent("transcriptionProgress", {
            detail: currentProgress,
          })
        );
      }

      // Combine all transcripts
      return transcripts.join(" ");
    } catch (error) {
      console.error("Transcription error:", error);
      throw new Error(
        `Failed to transcribe audio file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private async transcribeChunk(
    chunkFile: File,
    options: TranscriptionOptions
  ): Promise<string> {
    const audioBuffer = await chunkFile.arrayBuffer();

    const response = await fetch("https://api.deepgram.com/v1/listen", {
      method: "POST",
      headers: {
        Authorization: `Token ${this.apiKey}`,
        "Content-Type": chunkFile.type,
      },
      body: audioBuffer,
      signal: AbortSignal.timeout(300000), // 5 minute timeout for each chunk
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Deepgram API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.results?.channels?.[0]?.alternatives?.[0]?.transcript) {
      throw new Error("No transcript found in the response");
    }

    return data.results.channels[0].alternatives[0].transcript;
  }
}

export function createTranscriptionService(
  apiKey: string
): TranscriptionService {
  return new DeepgramTranscriptionService(apiKey);
}
