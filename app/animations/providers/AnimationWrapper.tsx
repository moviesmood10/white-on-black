'use client';

import { ReactNode } from 'react';
import AnimationProvider from './AnimationProvider';
import SmoothScrollProvider from './SmoothScrollProvider';
import CustomCursor from '../components/CustomCursor';

interface AnimationWrapperProps {
  children: ReactNode;
}

export default function AnimationWrapper({ children }: AnimationWrapperProps) {
  return (
    <AnimationProvider>
      <SmoothScrollProvider>
        <CustomCursor />
        {children}
      </SmoothScrollProvider>
    </AnimationProvider>
  );
}
