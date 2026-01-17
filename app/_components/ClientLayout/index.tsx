'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '../LoadingScreen';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1500; // Total loading time in ms
    const steps = 60; // Number of progress updates
    const interval = duration / steps;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} progress={progress} />
      {children}
    </>
  );
}
