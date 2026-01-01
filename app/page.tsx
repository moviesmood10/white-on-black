'use client';

import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import WhoWeAre from './components/WhoWeAre';
import Start from './components/Start';
import WhatWeDo from './components/WhatWeDo';
import OurProcess from './components/OurProcess';
import FAQ from './components/FAQ';
import BookCallForm from './components/BookCallForm';
import { handleSmoothScroll } from './utils/smoothScroll';
import ClientsReview from './components/ClientsReview';
import MoreProjects from './components/MoreProjects';

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
        <MoreProjects />
        <WhatWeDo />
        <Start onSmoothScroll={onSmoothScroll} />
        <OurProcess onSmoothScroll={onSmoothScroll} />
        <ClientsReview />
        <FAQ onSmoothScroll={onSmoothScroll} />
        <BookCallForm onSmoothScroll={onSmoothScroll} />
      </div>
    </div>
  );
}
