import { processHeavyDataset, generateDataset } from '../utils/computation';

self.onmessage = (e: MessageEvent) => {
  const { count } = e.data;
  const dataset = generateDataset(count);
  const startTime = performance.now();
  const result = processHeavyDataset(dataset);
  const duration = Math.round(performance.now() - startTime);

  self.postMessage({ result, duration });
};
