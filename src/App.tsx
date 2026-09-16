import React, { useState } from 'react';
import { VirtualizationLab } from './labs/VirtualizationLab';
import { WorkerLab } from './labs/WorkerLab';
import { CodeSplittingLab } from './labs/CodeSplittingLab';
import { ImageOptimizationLab } from './labs/ImageOptimizationLab';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VIRTUAL' | 'WORKER' | 'SPLIT' | 'IMAGE'>('VIRTUAL');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              🧪 Frontend Performance Lab
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Measurable Web Vitals (LCP, INP, CLS) optimization strategies with before & after interactive benchmarks.
            </p>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'VIRTUAL', label: '1. List Virtualization' },
            { id: 'WORKER', label: '2. Web Worker Computation' },
            { id: 'SPLIT', label: '3. Code Splitting' },
            { id: 'IMAGE', label: '4. Asset & CLS Optimization' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors min-h-[44px] ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'VIRTUAL' && <VirtualizationLab />}
          {activeTab === 'WORKER' && <WorkerLab />}
          {activeTab === 'SPLIT' && <CodeSplittingLab />}
          {activeTab === 'IMAGE' && <ImageOptimizationLab />}
        </div>
      </div>
    </div>
  );
};
