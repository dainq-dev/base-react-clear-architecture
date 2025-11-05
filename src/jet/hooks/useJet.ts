import { useState, useEffect, useRef } from 'react';
import { bootstrap } from '../../bootstrap';
import type { BootstrapResult } from '../../bootstrap';

/**
 * Hook to initialize and access application bootstrap result
 * This hook should only be used once at the root of the application
 */
export function useBootstrap() {
  const [bootstrapResult, setBootstrapResult] = useState<BootstrapResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    async function initialize() {
      try {
        const result = await bootstrap({
          initialUrl: window.location.href,
          fetch: window.fetch.bind(window),
        });
        setBootstrapResult(result);
        setIsInitialized(true);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to bootstrap application');
        setError(error);
        setIsInitialized(true);
      }
    }

    initialize();
  }, []);

  return {
    bootstrapResult,
    isInitialized,
    error,
  };
}

