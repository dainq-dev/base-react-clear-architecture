import { Jet } from './jet/Jet';
import { bootstrapJet } from './jet/bootstrap';
import type { Action } from './jet/types';
import type { Intent } from '@react-app-store/shared';
import type { AppContext } from './types/context';
import { ConsoleLoggerFactory, I18NImpl } from '@react-app-store/shared';
import type { Logger, I18N } from '@react-app-store/shared';

const DEFAULT_STOREFRONT = 'vn';
const DEFAULT_LANGUAGE = 'vi-VN';

export interface BootstrapOptions {
  loggerFactory?: {
    loggerFor(name: string): Logger;
  };
  initialUrl: string;
  fetch: typeof window.fetch;
  prefetchedIntents?: unknown;
  featuresCallbacks?: unknown;
}

export interface BootstrapResult {
  context: AppContext;
  jet: Jet;
  initialAction: Action | null;
  intent: Intent | null;
  storefront: string;
  language: string;
  i18n: I18N;
}

/**
 * Unified bootstrap function that initializes the entire application
 * Consolidates app bootstrap and Jet framework bootstrap
 */
export async function bootstrap(options: BootstrapOptions): Promise<BootstrapResult> {
  const {
    loggerFactory = new ConsoleLoggerFactory(),
    initialUrl,
    fetch: fetchFn,
    prefetchedIntents: _prefetchedIntents,
    featuresCallbacks: _featuresCallbacks,
  } = options;

  const logger = loggerFactory.loggerFor('Bootstrap');
  logger.info('Initializing application...');

  // Initialize Jet framework
  const jet = new Jet(logger);

  // Bootstrap Jet with controllers
  bootstrapJet(jet);
  logger.info('Jet framework initialized');

  // Route initial URL
  const routing = await jet.routeUrl(initialUrl);

  if (routing) {
    logger.info('Initial URL routed successfully', { url: initialUrl, routing });
  } else {
    logger.warn('Initial URL was unroutable', { url: initialUrl });
  }

  const {
    intent = null,
    action: initialAction = null,
    storefront = DEFAULT_STOREFRONT,
    language = DEFAULT_LANGUAGE,
  } = routing || {};

  // Setup i18n (simplified - will be enhanced later)
  const i18n = new I18NImpl(language, {});

  jet.setLocale(i18n, storefront, language);

  // Create type-safe context
  const context: AppContext = {
    jet,
    logger,
    i18n,
    storefront,
    language,
    uniqueId: 0,
    fetch: fetchFn,
  };

  logger.info('Application bootstrap completed', {
    storefront,
    language,
    hasRouting: !!routing,
  });

  return {
    context,
    jet,
    initialAction,
    intent,
    storefront,
    language,
    i18n,
  };
}

