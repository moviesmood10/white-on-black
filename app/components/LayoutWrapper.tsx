'use client';

import Navigation from './Navigation';
import Footer from './Footer';
import { handleSmoothScroll } from '../utils/smoothScroll';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const onSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    handleSmoothScroll(e, targetId);
  };

  return (
    <>
      <Navigation onSmoothScroll={onSmoothScroll} />
      {children}
      <Footer />
    </>
  );
}

