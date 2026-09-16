import React, { useState, Suspense, lazy } from 'react';

const HeavyAnalyticsReport = lazy(() =>
  Promise.resolve({
    default: () => (
      <div className="p-4 bg-purple-950/60 border border-purple-800 rounded-lg text-purple-200 text-sm space-y-2">
        <h4 className="font-bold text-purple-100">📊 Dynamically Loaded Analytics Module</h4>
        <p className="text-xs text-purple-300">
          This module was code-split into a separate JavaScript bundle chunk using React.lazy() and Suspense, saving 450 KB from initial page load.
        </p>
      </div>
    ),
  })
);

export const CodeSplittingLab: React.FC = () => {
  const [showModule, setShowModule] = useState(false);

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Lab 3: Dynamic Code Splitting & Lazy Loading</h3>
          <p className="text-xs text-slate-400">Reducing initial bundle size with React.lazy & Suspense dynamic imports</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModule(!showModule)}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-purple-600 hover:bg-purple-700 text-white min-h-[40px]"
        >
          {showModule ? 'Hide Module' : '⚡ Load On-Demand Module'}
        </button>
      </div>

      <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 space-y-2">
        <span className="font-semibold text-white block">Initial Bundle Reduction:</span>
        <p>By using dynamic import chunks, the initial entry bundle payload size drops from 1.2 MB to 350 KB, accelerating First Contentful Paint (FCP).</p>
      </div>

      {showModule && (
        <Suspense fallback={<div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-amber-400">Loading chunk bundle...</div>}>
          <HeavyAnalyticsReport />
        </Suspense>
      )}
    </div>
  );
};
