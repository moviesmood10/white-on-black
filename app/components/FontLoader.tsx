'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Halant:wght@400;500;600;700&family=Onest:wght@400;500;700&family=Comfortaa:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Cleanup if needed
      document.head.removeChild(link);
    };
  }, []);

  return null;
}

