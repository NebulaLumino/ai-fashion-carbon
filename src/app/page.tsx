"use client";
import { useState } from "react";
export default function FashionCarbonPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const data = await res.json();
      setResult(data.result || data.error || "No result.");
    } catch { setResult("Error connecting to API."); }
    setLoading(false);
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-400 mb-2">AI Fashion Carbon</h1>
          <p className="text-slate-400">Fashion sustainability & carbon footprint analysis powered by DeepSeek AI.</p>
        </div>
        <div className="space-y-4">
          <textarea className="w-full bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition resize-none" rows={4} placeholder="Describe the fashion item or practice... e.g., 'Carbon footprint of buying fast fashion vs. renting a dress for one event'" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <button onClick={handleGenerate} disabled={loading} className="w-full py-3 rounded-xl font-semibold bg-teal-600 hover:bg-teal-500 disabled:opacity-50 transition text-white">{loading ? "Generating..." : "Calculate Carbon Impact"}</button>
          {result && <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 whitespace-pre-wrap text-slate-200 leading-relaxed">{result}</div>}
        </div>
      </div>
    </main>
  );
}
