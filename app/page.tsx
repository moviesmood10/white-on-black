'use client';

import { lazy, Suspense } from 'react';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import WhoWeAre from './components/WhoWeAre';
import { handleSmoothScroll } from './utils/smoothScroll';

// Lazy load components below the fold to reduce initial bundle size
const Start = lazy(() => import('./components/Start'));
const WhatWeDo = lazy(() => import('./components/WhatWeDo'));
const OurProcess = lazy(() => import('./components/OurProcess'));
const FAQ = lazy(() => import('./components/FAQ'));
const BookCallForm = lazy(() => import('./components/BookCallForm'));
const ClientsReview = lazy(() => import('./components/ClientsReview'));
const MoreProjects = lazy(() => import('./components/MoreProjects'));

export default function Home() {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };

  return (
    <div className="flex min-h-screen w-full mx-auto flex-col items-center bg-white overflow-x-hidden">
      <div className="w-full flex flex-col component-spacing">
        <Hero onSmoothScroll={onSmoothScroll} />
        <SelectedWorks onSmoothScroll={onSmoothScroll} />
        <WhoWeAre />
        <Suspense fallback={null}>
          <MoreProjects />
        </Suspense>
        <Suspense fallback={null}>
          <WhatWeDo />
        </Suspense>
        <Suspense fallback={null}>
          <Start onSmoothScroll={onSmoothScroll} />
        </Suspense>
        <Suspense fallback={null}>
          <OurProcess onSmoothScroll={onSmoothScroll} />
        </Suspense>
        <Suspense fallback={null}>
          <ClientsReview />
        </Suspense>
        <Suspense fallback={null}>
          <FAQ onSmoothScroll={onSmoothScroll} />
        </Suspense>
        <Suspense fallback={null}>
          <BookCallForm onSmoothScroll={onSmoothScroll} />
        </Suspense>
      </div>
    </div>
  );
}
