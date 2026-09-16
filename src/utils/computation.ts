export interface DataRecord {
  id: string;
  name: string;
  category: string;
  score: number;
}

export function generateDataset(count = 50000): DataRecord[] {
  const categories = ['Finance', 'Healthcare', 'Logistics', 'Analytics', 'DevOps'];
  const dataset: DataRecord[] = [];
  for (let i = 0; i < count; i++) {
    dataset.push({
      id: `rec-${i}`,
      name: `Enterprise Analytics Item #${i}`,
      category: categories[i % categories.length]!,
      score: Math.floor(Math.random() * 10000),
    });
  }
  return dataset;
}

export function processHeavyDataset(dataset: DataRecord[]): DataRecord[] {
  // Heavy CPU computation: multiple sort passes & hash aggregations
  const copy = [...dataset];
  copy.sort((a, b) => b.score - a.score);

  // Heavy CPU work iteration
  for (let i = 0; i < 5; i++) {
    copy.forEach((item) => {
      Math.hypot(item.score, Math.sin(item.score));
    });
  }

  return copy.slice(0, 100);
}
