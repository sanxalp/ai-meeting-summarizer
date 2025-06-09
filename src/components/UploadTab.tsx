import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileAudio,
  FileText,
  Loader2,
  Sparkles,
  Download,
  AlertCircle,
} from "lucide-react";
import { useSummaries } from "../hooks/useSummaries";
import { useAI } from "../hooks/useAI";
import { useTranscription } from "../hooks/useTranscription";
import { SummaryOptions } from "../services/aiService";

export function UploadTab() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [summaryStyle, setSummaryStyle] = useState<
    "brief" | "bullet" | "action"
  >("brief");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);

  const { createSummary } = useSummaries();
  const { summarize, loading: aiLoading } = useAI();
  const { transcribeAudio, loading: transcriptionLoading } = useTranscription();

  // Add progress listener
  useEffect(() => {
    const handleProgress = (event: CustomEvent) => {
      setTranscriptionProgress(event.detail);
    };

    window.addEventListener(
      "transcriptionProgress",
      handleProgress as EventListener
    );
    return () => {
      window.removeEventListener(
        "transcriptionProgress",
        handleProgress as EventListener
      );
    };
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Check file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
          setError(
            "File size exceeds 50MB limit. Please upload a smaller file."
          );
          return;
        }

        setUploadedFile(file);
        setFileName(file.name);
        setSummary("");
        setError(null);
        setTranscriptionProgress(0);

        // Start transcription process
        setIsTranscribing(true);
        try {
          const transcript = await transcribeAudio(file, {
            chunkDuration: 300, // 5 minutes per chunk
          });
          if (transcript) {
            setTranscript(transcript);
          }
        } catch (error) {
          console.error("Transcription failed:", error);
          setError(
            error instanceof Error
              ? error.message
              : "Failed to transcribe audio"
          );
        } finally {
          setIsTranscribing(false);
          setTranscriptionProgress(0);
        }
      }
    },
    [transcribeAudio]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".ogg"],
      "video/*": [".mp4", ".mov", ".webm", ".mkv"],
    },
    multiple: false,
  });

  const generateSummary = async () => {
    if (!transcript.trim()) return;

    setError(null); // Clear any previous errors
    const options: SummaryOptions = { style: summaryStyle };
    try {
      const result = await summarize(transcript, options);
      if (result) {
        setSummary(result);
        // Save to database
        const currentFileName = fileName || "Text Input";
        await createSummary(currentFileName, transcript, result);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to generate summary"
      );
    }
  };

  const exportSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || "meeting-summary"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setTranscript("");
    setSummary("");
    setFileName("");
    setUploadedFile(null);
    setIsTranscribing(false);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Upload Section */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Upload className="w-6 h-6 mr-3 text-blue-400" />
          Upload Meeting File
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-blue-400 bg-blue-500/10"
              : "border-white/20 hover:border-blue-400 hover:bg-blue-500/5"
          }`}
        >
          <input {...getInputProps()} />
          <FileAudio className="w-12 h-12 text-white/50 mx-auto mb-4" />
          {isTranscribing ? (
            <div>
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-blue-400 mb-2">
                Transcribing audio...
              </p>
              <p className="text-sm text-white/60 mb-2">
                This may take a few moments
              </p>
              {transcriptionProgress > 0 && (
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${transcriptionProgress}%` }}
                  ></div>
                </div>
              )}
              <p className="text-sm text-white/60">
                {transcriptionProgress.toFixed(1)}% complete
              </p>
            </div>
          ) : uploadedFile ? (
            <div>
              <p className="text-lg font-medium text-white mb-2">
                {uploadedFile.name}
              </p>
              <p className="text-sm text-green-400">
                ✓ Audio transcribed successfully
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-white mb-2">
                {isDragActive
                  ? "Drop your audio file here"
                  : "Drag & drop your meeting file here"}
              </p>
              <p className="text-sm text-white/60">
                Supports audio and video files up to 50MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Text Input Section */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-purple-400" />
          Meeting Transcript
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="filename"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Meeting Name (Optional)
            </label>
            <input
              id="filename"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g., Weekly Team Meeting - Jan 15"
              className="glass-input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="summaryStyle"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Summary Style
            </label>
            <select
              id="summaryStyle"
              value={summaryStyle}
              onChange={(e) =>
                setSummaryStyle(e.target.value as "brief" | "bullet" | "action")
              }
              className="glass-select w-full"
            >
              <option value="brief">Brief Summary</option>
              <option value="bullet">Bullet Points</option>
              <option value="action">Action Items Focus</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="transcript"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Meeting Transcript
            </label>
            <textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here or upload an audio file above..."
              rows={8}
              className="glass-input w-full resize-none"
            />
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
          <div className="text-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Generate Summary Section */}
      {transcript && (
        <div className="flex justify-center">
          <button
            onClick={generateSummary}
            disabled={aiLoading}
            className="glass-button"
          >
            {aiLoading ? (
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating AI Summary...
              </div>
            ) : (
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Summary ({summaryStyle})
              </div>
            )}
          </button>
        </div>
      )}

      {/* Summary Results */}
      {summary && (
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-emerald-400" />
              AI Generated Summary ({summaryStyle})
            </h2>
            <div className="flex space-x-3">
              <button onClick={exportSummary} className="glass-button">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button onClick={resetForm} className="glass-button">
                New Summary
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <pre className="whitespace-pre-wrap text-white/90 leading-relaxed font-sans">
              {summary}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
