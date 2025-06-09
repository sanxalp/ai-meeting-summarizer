import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileAudio, FileText, Loader2, Sparkles, Download, AlertCircle } from 'lucide-react';
import { useSummaries } from '../hooks/useSummaries';
import { useAI } from '../hooks/useAI';
import { useTranscription } from '../hooks/useTranscription';
import { SummaryOptions } from '../services/aiService';

export function UploadTab() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [summaryStyle, setSummaryStyle] = useState<'brief' | 'bullet' | 'action'>('brief');
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const { createSummary } = useSummaries();
  const { summarize, loading: aiLoading, error: aiError } = useAI();
  const { transcribeAudio, loading: transcriptionLoading, error: transcriptionError } = useTranscription();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      setSummary('');
      
      // Start transcription process
      setIsTranscribing(true);
      try {
        const transcript = await transcribeAudio(file);
        if (transcript) {
          setTranscript(transcript);
        }
      } catch (error) {
        console.error('Transcription failed:', error);
      } finally {
        setIsTranscribing(false);
      }
    }
  }, [transcribeAudio]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    multiple: false
  });

  const generateSummary = async () => {
    if (!transcript.trim()) return;

    const options: SummaryOptions = { style: summaryStyle };
    const result = await summarize(transcript, options);
    
    if (result) {
      setSummary(result);
      
      // Save to database
      const currentFileName = fileName || 'Text Input';
      await createSummary(currentFileName, transcript, result);
    }
  };

  const exportSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || 'meeting-summary'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setTranscript('');
    setSummary('');
    setFileName('');
    setUploadedFile(null);
    setIsTranscribing(false);
  };

  const error = transcriptionError || aiError;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Upload className="w-6 h-6 mr-3 text-blue-600" />
          Upload Meeting Audio
        </h2>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          <input {...getInputProps()} />
          <FileAudio className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {isTranscribing ? (
            <div>
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-medium text-blue-600 mb-2">Transcribing audio...</p>
              <p className="text-sm text-gray-600">This may take a few moments</p>
            </div>
          ) : uploadedFile ? (
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">✓ Audio transcribed successfully</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? 'Drop your audio file here' : 'Drag & drop your audio file here'}
              </p>
              <p className="text-sm text-gray-600">
                Supports MP3, WAV, M4A files up to 50MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Text Input Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-purple-600" />
          Meeting Transcript
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Name (Optional)
            </label>
            <input
              id="filename"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g., Weekly Team Meeting - Jan 15"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="summaryStyle" className="block text-sm font-medium text-gray-700 mb-2">
              Summary Style
            </label>
            <select
              id="summaryStyle"
              value={summaryStyle}
              onChange={(e) => setSummaryStyle(e.target.value as 'brief' | 'bullet' | 'action')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              <option value="brief">Brief Summary</option>
              <option value="bullet">Bullet Points</option>
              <option value="action">Action Items Focus</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Transcript
            </label>
            <textarea
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here or upload an audio file above..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
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
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
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
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-emerald-200/50 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-emerald-600" />
              AI Generated Summary ({summaryStyle})
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={exportSummary}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                New Summary
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
              {summary}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}