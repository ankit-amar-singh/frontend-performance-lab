import React, { useState } from 'react';
import { generateDataset, processHeavyDataset, DataRecord } from '../utils/computation';

export const WorkerLab: React.FC = () => {
  const [testInput, setTestInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [results, setResults] = useState<DataRecord[]>([]);

  const runMainThread = () => {
    setIsProcessing(true);
    const start = performance.now();

    setTimeout(() => {
      const dataset = generateDataset(50000);
      const output = processHeavyDataset(dataset);
      const duration = Math.round(performance.now() - start);

      setResults(output);
      setExecutionTime(duration);
      setIsProcessing(false);
    }, 50);
  };

  const runWebWorker = () => {
    setIsProcessing(true);
    const start = performance.now();

    const worker = new Worker(new URL('../workers/heavyWorker.ts', import.meta.url), { type: 'module' });

    worker.onmessage = (e) => {
      const { result, duration } = e.data;
      setResults(result);
      setExecutionTime(duration || Math.round(performance.now() - start));
      setIsProcessing(false);
      worker.terminate();
    };

    worker.postMessage({ count: 50000 });
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white">Lab 2: Off-Main-Thread Web Worker Computation</h3>
          <p className="text-xs text-slate-400">Preventing Interaction to Next Paint (INP) spikes during heavy dataset sorting</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={runMainThread}
            disabled={isProcessing}
            className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 min-h-[40px]"
          >
            ⚠️ Run Main Thread (Freeze UI)
          </button>
          <button
            type="button"
            onClick={runWebWorker}
            disabled={isProcessing}
            className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 min-h-[40px]"
          >
            ⚡ Run in Web Worker (60 FPS)
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
        <label className="text-xs font-semibold text-slate-300 block">
          ⌨️ Interactive Input Responsiveness Test (Try typing while running computation above):
        </label>
        <input
          type="text"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          placeholder="Type rapidly here to verify UI thread responsiveness..."
          className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[44px]"
        />
      </div>

      <div className="flex items-center justify-between text-xs font-mono p-3 bg-slate-950 rounded border border-slate-800">
        <span className="text-slate-400">
          Status:{' '}
          <strong className={isProcessing ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}>
            {isProcessing ? 'Processing 50,000 records...' : 'Idle'}
          </strong>
        </span>
        <span className="text-slate-400">
          Duration: <strong className="text-blue-400">{executionTime !== null ? `${executionTime} ms` : '-'}</strong>
        </span>
      </div>

      {results.length > 0 && (
        <div className="max-h-48 overflow-y-auto border border-slate-800 rounded bg-slate-950 p-3 text-xs font-mono divide-y divide-slate-800">
          {results.slice(0, 5).map((res) => (
            <div key={res.id} className="py-1.5 flex justify-between">
              <span className="text-slate-300">{res.name}</span>
              <span className="text-purple-400 font-bold">Score: {res.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
