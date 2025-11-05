import type { Page } from '../../jet/types';

interface DefaultPageProps {
  page: Page;
}

export default function DefaultPage({ page }: DefaultPageProps) {
  return (
    <div className="container mx-auto px-4 py-8" data-testid="default-page">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Welcome to React App Store
        </h1>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Page Type</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {page.pageType || 'default'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">URL</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white break-all">
              {page.canonicalURL || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

