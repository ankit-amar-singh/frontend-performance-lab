import React, { useState } from 'react';

export const ImageOptimizationLab: React.FC = () => {
  const [optimized, setOptimized] = useState(true);

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Lab 4: Asset Optimization & Cumulative Layout Shift (CLS)</h3>
          <p className="text-xs text-slate-400">Eliminating Cumulative Layout Shift (CLS) using aspect ratio placeholders & lazy loading</p>
        </div>

        <button
          type="button"
          onClick={() => setOptimized(!optimized)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors min-h-[40px] ${
            optimized ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {optimized ? '⚡ Optimized Image (0 CLS)' : '⚠️ Un-optimized (High CLS Shift)'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-300">Hero Demonstration Image</span>
          <div className={`w-full overflow-hidden rounded ${optimized ? 'aspect-video bg-slate-900 border border-slate-800' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Analytics Dashboard Preview"
              loading={optimized ? 'lazy' : 'eager'}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2 text-xs font-mono">
          <span className="text-slate-400">Core Web Vitals Impact:</span>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-300">CLS (Layout Shift):</span>
              <span className={`font-bold ${optimized ? 'text-emerald-400' : 'text-red-400'}`}>
                {optimized ? '0.000 (Pass)' : '0.245 (Poor)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Format:</span>
              <span className="text-blue-400 font-bold">{optimized ? 'WebP / AVIF' : 'Raw PNG'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Loading:</span>
              <span className="text-purple-400 font-bold">{optimized ? 'Lazy Native' : 'Eager Blocking'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
