# 🧪 Frontend Performance Lab (`frontend-performance-lab`)

[![React 18](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3_Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Web Workers](https://img.shields.io/badge/Web_Workers-INP_Optimization-4285F4?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
[![TanStack Virtual](https://img.shields.io/badge/TanStack-Virtualization-FF4154?style=for-the-badge)](https://tanstack.com/virtual/v3)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_%26_Bench-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> **Personal Engineering Showcase Project**  
Interactive laboratory demonstrating measurable Core Web Vitals (LCP, INP, CLS) optimization strategies: 5,000+ item List Virtualization, off-main-thread Web Worker dataset sorting, dynamic code splitting with React.lazy, and zero-CLS image asset optimization.

---

## 🎯 What Recruiters & Engineering Managers Will See

- **List Virtualization (DOM Windowing)**: Compares 5,000 un-virtualized DOM elements vs windowed virtualization reducing DOM count to ~15 active nodes.
- **Off-Main-Thread Processing (Web Workers)**: Eliminates Interaction to Next Paint (INP) spikes by offloading 50,000 record array sorts to a dedicated Web Worker thread.
- **Dynamic Bundle Code Splitting**: Demonstrates `React.lazy()` and `Suspense` chunking to reduce upfront JavaScript payload by 450 KB.
- **Cumulative Layout Shift (CLS) Mitigation**: Prevents visual layout reflow shifts using aspect-ratio placeholder containers and native lazy loading.
- **Automated Testing Suite**: Vitest suite asserting dataset generation algorithms and lab component rendering.

---

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run Vite local dev server
npm run dev

# Run Vitest test suite
npm test

# Typecheck TypeScript codebase
npm run typecheck
```

---

## 🧪 Automated Verification Results

```text
 ✓ tests/performance.test.tsx (3 tests)

 Test Files  1 passed (1)
      Tests  3 passed (3)
```
