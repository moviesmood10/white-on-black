'use client';

import { lazy, Suspense } from 'react';
import { handleSmoothScroll } from '../utils/smoothScroll';

// Lazy load components below the fold to reduce initial bundle size
const Start = lazy(() => import('../components/Start'));
const FAQ = lazy(() => import('../components/FAQ'));
const BookCallForm = lazy(() => import('../components/BookCallForm'));

export default function TestPage() {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };
  return (
    <div className="flex min-h-screen w-full mx-auto flex-col items-center bg-white">
      <div className="w-full flex flex-col items-center mt-25">
        <Suspense fallback={null}>
          <Start onSmoothScroll={onSmoothScroll} />
        </Suspense>
        <Suspense fallback={null}>
          <BookCallForm onSmoothScroll={onSmoothScroll} />
        </Suspense>
        <Suspense fallback={null}>
          <FAQ onSmoothScroll={onSmoothScroll} />
        </Suspense>
      </div>
    </div>
  );
}
