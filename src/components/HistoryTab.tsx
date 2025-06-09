import React from "react";
import {
  Calendar,
  FileText,
  Trash2,
  Download,
  Loader2,
  Clock,
} from "lucide-react";
import { useSummaries } from "../hooks/useSummaries";

export function HistoryTab() {
  const { summaries, loading, deleteSummary } = useSummaries();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportSummary = (summary: any) => {
    const element = document.createElement("a");
    const file = new Blob([summary.summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${summary.file_name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this summary?")) {
      await deleteSummary(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center text-white/80">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading your summaries...
        </div>
      </div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-16">
          <Clock className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h3 className="text-2xl font-medium text-white mb-2">
            No summaries yet
          </h3>
          <p className="text-white/60">
            Upload your first meeting audio or paste a transcript to get
            started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Meeting Summaries
        </h2>
        <p className="text-white/60">
          {summaries.length} {summaries.length === 1 ? "summary" : "summaries"}{" "}
          saved
        </p>
      </div>

      <div className="space-y-6">
        {summaries.map((summary) => (
          <div
            key={summary.id}
            className="glass-card overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    {summary.file_name}
                  </h3>
                  <div className="flex items-center text-sm text-white/60">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(summary.created_at)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => exportSummary(summary)}
                    className="p-2 text-white/60 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors"
                    title="Export summary"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(summary.id)}
                    className="p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                    title="Delete summary"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <details className="group">
                  <summary className="cursor-pointer text-blue-400 hover:text-blue-300 font-medium mb-3 select-none">
                    View Summary
                  </summary>
                  <div className="glass-card p-4 mt-3">
                    <pre className="whitespace-pre-wrap text-white/90 leading-relaxed font-sans text-base">
                      {summary.summary}
                    </pre>
                  </div>
                </details>
              </div>

              {summary.transcript && summary.transcript !== summary.summary && (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <details className="group">
                    <summary className="cursor-pointer text-white/60 hover:text-white/80 font-medium mb-3 select-none">
                      View Original Transcript
                    </summary>
                    <div className="glass-card p-4 mt-3 max-h-48 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-white/80 leading-relaxed font-sans text-base">
                        {summary.transcript}
                      </pre>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
