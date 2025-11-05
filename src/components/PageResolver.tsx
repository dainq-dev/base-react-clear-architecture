import { useState, useEffect } from 'react';
import { useAppContext, useJet } from '../context/AppContext';
import type { Page } from '../jet/types';
import LoadingSpinner from './LoadingSpinner';
import ErrorPage from './pages/ErrorPage';
import DefaultPage from './pages/DefaultPage';

export default function PageResolver() {
  const { context } = useAppContext();
  const jet = useJet();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TODO: Implement page loading logic using jet.dispatch()
    // For now, set a default page
    async function loadPage() {
      try {
        // In the future, this will dispatch an intent to get page data
        // const pageData = await jet.dispatch({ $kind: 'GetPageIntent', url: window.location.href });
        
        // Placeholder implementation
        setPage({
          canonicalURL: window.location.href,
          pageType: 'default',
        });
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load page');
        setError(error);
        setLoading(false);
      }
    }

    loadPage();
  }, [jet, context]);

  if (loading) {
    return <LoadingSpinner delay={1000} />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!page) {
    return <LoadingSpinner delay={1000} />;
  }

  return <DefaultPage page={page} />;
}

