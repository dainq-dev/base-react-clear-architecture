import { useBootstrap } from './jet/hooks/useJet';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import PageResolver from './components/PageResolver';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const { bootstrapResult, isInitialized, error } = useBootstrap();

  if (!isInitialized) {
    return <LoadingSpinner delay={0} />;
  }

  if (error || !bootstrapResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Failed to initialize application
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error?.message || 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AppProvider context={bootstrapResult.context}>
        <div className="app-container" data-testid="app-container">
          <div className="navigation-container">
            {/* Navigation will be added here */}
          </div>
          <div className="page-container">
            <PageResolver />
          </div>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;

