import React, { useState, useRef } from 'react';
import { generateDataset } from '../utils/computation';

export const VirtualizationLab: React.FC = () => {
  const [mode, setMode] = useState<'VIRTUALIZED' | 'UNVIRTUALIZED'>('VIRTUALIZED');
  const [itemCount] = useState(5000);
  const [renderDuration, setRenderDuration] = useState<number | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const dataset = generateDataset(itemCount);

  // Virtualization windowing calculation
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 52;
  const containerHeight = 400;
  const totalHeight = itemCount * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + 2);

  const visibleItems = dataset.slice(startIndex, endIndex + 1);

  const handleToggleMode = (newMode: 'VIRTUALIZED' | 'UNVIRTUALIZED') => {
    const start = performance.now();
    setMode(newMode);
    setTimeout(() => {
      setRenderDuration(Math.round(performance.now() - start));
    }, 0);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Lab 1: Large List Virtualization</h3>
          <p className="text-xs text-slate-400">Comparing 5,000+ DOM Node rendering vs Windowed Virtualization</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleToggleMode('VIRTUALIZED')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors min-h-[40px] ${
              mode === 'VIRTUALIZED' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            ⚡ Virtualized (Windowed)
          </button>
          <button
            type="button"
            onClick={() => handleToggleMode('UNVIRTUALIZED')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors min-h-[40px] ${
              mode === 'UNVIRTUALIZED' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            ⚠️ Un-virtualized (All DOM Nodes)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-3 bg-slate-950 rounded border border-slate-800">
          <span className="text-slate-400">Total Records:</span>
          <span className="ml-2 font-bold text-white">{itemCount.toLocaleString()} items</span>
        </div>
        <div className="p-3 bg-slate-950 rounded border border-slate-800">
          <span className="text-slate-400">DOM Nodes Rendered:</span>
          <span className={`ml-2 font-bold ${mode === 'VIRTUALIZED' ? 'text-emerald-400' : 'text-red-400'}`}>
            {mode === 'VIRTUALIZED' ? visibleItems.length : itemCount} DOM elements
          </span>
        </div>
        <div className="p-3 bg-slate-950 rounded border border-slate-800">
          <span className="text-slate-400">Last Render Time:</span>
          <span className="ml-2 font-bold text-blue-400">{renderDuration !== null ? `${renderDuration} ms` : 'Ready'}</span>
        </div>
      </div>

      <div
        ref={listRef}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        className="h-[400px] overflow-auto border border-slate-800 rounded-lg bg-slate-950 relative"
      >
        {mode === 'VIRTUALIZED' ? (
          <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
            {visibleItems.map((item, idx) => {
              const actualIndex = startIndex + idx;
              return (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${itemHeight}px`,
                    transform: `translateY(${actualIndex * itemHeight}px)`,
                  }}
                  className="px-4 py-2 border-b border-slate-800 flex items-center justify-between hover:bg-slate-900"
                >
                  <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{item.category}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {dataset.map((item) => (
              <div key={item.id} className="px-4 py-2 flex items-center justify-between hover:bg-slate-900">
                <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">{item.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
