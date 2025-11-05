import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  delay?: number;
}

export default function LoadingSpinner({ delay = 0 }: LoadingSpinnerProps) {
  const [show, setShow] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!show) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen" data-testid="page-loading">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

