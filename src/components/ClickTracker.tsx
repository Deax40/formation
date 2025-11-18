'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ClickTrackerProps {
  elementId: string;
  children: ReactNode;
}

export function ClickTracker({ elementId, children }: ClickTrackerProps) {
  const pathname = usePathname();

  const handleClick = async () => {
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: pathname,
          elementId,
        }),
      });
    } catch (error) {
      // Silently fail - analytics should not break user experience
      console.error('Failed to track click:', error);
    }
  };

  return (
    <div onClick={handleClick} className="contents">
      {children}
    </div>
  );
}
