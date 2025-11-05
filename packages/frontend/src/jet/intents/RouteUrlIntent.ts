import type { Intent } from '@react-app-store/shared';

/**
 * Intent for routing a URL
 */
export interface RouteUrlIntent extends Intent {
  $kind: 'RouteUrlIntent';
  url: string;
}

export function isRouteUrlIntent(intent: Intent): intent is RouteUrlIntent {
  return intent.$kind === 'RouteUrlIntent';
}

export function makeRouteUrlIntent(url: string): RouteUrlIntent {
  return {
    $kind: 'RouteUrlIntent',
    url,
  };
}

