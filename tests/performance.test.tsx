import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generateDataset, processHeavyDataset } from '../src/utils/computation';
import { App } from '../src/App';

describe('Frontend Performance Lab Suite', () => {
  it('generateDataset generates required dataset size', () => {
    const data = generateDataset(500);
    expect(data.length).toBe(500);
    expect(data[0]?.name).toBeDefined();
  });

  it('processHeavyDataset sorts and returns top 100 items', () => {
    const data = generateDataset(1000);
    const sorted = processHeavyDataset(data);
    expect(sorted.length).toBe(100);
    expect(sorted[0]!.score).toBeGreaterThanOrEqual(sorted[1]!.score);
  });

  it('App renders main performance lab navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('🧪 Frontend Performance Lab')).toBeInTheDocument();
    expect(screen.getByText('1. List Virtualization')).toBeInTheDocument();
    expect(screen.getByText('2. Web Worker Computation')).toBeInTheDocument();
  });
});
