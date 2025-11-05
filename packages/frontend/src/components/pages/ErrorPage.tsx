interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  // Show stack trace in development mode (Vite exposes this via import.meta.env.MODE)
  const showStack = import.meta.env.MODE === 'development';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8" data-testid="error-page">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          {error.message || 'An error occurred'}
        </p>
        {showStack && error.stack && (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">
            {error.stack}
          </pre>
        )}
      </div>
    </div>
  );
}

