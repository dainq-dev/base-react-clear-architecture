/**
 * Intent types - shared between frontend, gateway, and backend
 */

/**
 * Base Intent interface
 */
export interface Intent {
  $kind: string;
  [key: string]: unknown;
}

/**
 * Route URL Intent
 */
export interface RouteUrlIntent extends Intent {
  $kind: 'RouteUrlIntent';
  url: string;
}

/**
 * Get Product Intent
 */
export interface GetProductIntent extends Intent {
  $kind: 'GetProductIntent';
  productId: string;
  storefront?: string;
  language?: string;
}

/**
 * Search Intent
 */
export interface SearchIntent extends Intent {
  $kind: 'SearchIntent';
  query: string;
  storefront?: string;
  language?: string;
  limit?: number;
  offset?: number;
}

/**
 * Type guards
 */
export function isRouteUrlIntent(intent: Intent): intent is RouteUrlIntent {
  return intent.$kind === 'RouteUrlIntent';
}

export function isGetProductIntent(intent: Intent): intent is GetProductIntent {
  return intent.$kind === 'GetProductIntent';
}

export function isSearchIntent(intent: Intent): intent is SearchIntent {
  return intent.$kind === 'SearchIntent';
}

/**
 * Factory functions
 */
export function makeRouteUrlIntent(url: string): RouteUrlIntent {
  return {
    $kind: 'RouteUrlIntent',
    url,
  };
}

export function makeGetProductIntent(productId: string, options?: { storefront?: string; language?: string }): GetProductIntent {
  return {
    $kind: 'GetProductIntent',
    productId,
    ...options,
  };
}

export function makeSearchIntent(query: string, options?: { storefront?: string; language?: string; limit?: number; offset?: number }): SearchIntent {
  return {
    $kind: 'SearchIntent',
    query,
    ...options,
  };
}

