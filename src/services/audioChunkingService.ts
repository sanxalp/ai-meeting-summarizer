import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export interface AudioChunk {
  blob: Blob;
  startTime: number;
  endTime: number;
}

export class AudioChunkingService {
  private ffmpeg: FFmpeg;
  private isLoaded: boolean = false;

  constructor() {
    this.ffmpeg = new FFmpeg();
  }

  async load() {
    if (this.isLoaded) return;
    await this.ffmpeg.load(); // loads from official CDN
    this.isLoaded = true;
  }

  async chunkAudio(
    audioFile: File,
    chunkDuration: number = 300
  ): Promise<AudioChunk[]> {
    if (!this.isLoaded) {
      await this.load();
    }

    const chunks: AudioChunk[] = [];
    const inputFileExt = this.getFileExtension(audioFile.name);
    const inputFileName = `input${inputFileExt}`;
    const outputFileName = `chunk${inputFileExt}`;

    // Write the audio file to FFmpeg FS
    await this.ffmpeg.writeFile(inputFileName, await fetchFile(audioFile));

    // Get total duration
    const duration = await this.getAudioDuration(inputFileName);

    // How many chunks needed
    const numChunks = Math.ceil(duration / chunkDuration);

    for (let i = 0; i < numChunks; i++) {
      const startTime = i * chunkDuration;
      const endTime = Math.min((i + 1) * chunkDuration, duration);

      // Transcode and extract a chunk
      await this.ffmpeg.exec([
        "-ss", //seek to start
        startTime.toString(),
        "-t", //duration
        (endTime - startTime).toString(),
        "-i", //input file
        inputFileName,
        "-vn", //no video
        "-acodec",
        "aac", //audio codec
        "-b:a", //audio bitrate
        "128k",
        outputFileName,
      ]);

      // Read the resulting chunk
      const chunkData = await this.ffmpeg.readFile(outputFileName);
      const chunkBlob = new Blob([chunkData], { type: "audio/aac" });

      chunks.push({
        blob: chunkBlob,
        startTime,
        endTime,
      });
    }

    return chunks;
  }

  private getFileExtension(filename: string): string {
    const ext = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 1);
    return `.${ext}`;
  }

  private async getAudioDuration(fileName: string): Promise<number> {
    let durationOutput = "";

    this.ffmpeg.on("log", ({ message }) => {
      if (message.includes("Duration")) {
        durationOutput = message;
      }
    });

    try {
      await this.ffmpeg.exec(["-i", fileName]);
    } catch {
      // FFmpeg may throw, ignore — we only need the logs
    }

    const match = durationOutput.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const [_, hours, minutes, seconds] = match;
      return (
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds)
      );
    }

    throw new Error("Failed to parse duration from audio file.");
  }
}
