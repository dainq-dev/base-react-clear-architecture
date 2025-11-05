/**
 * Core types for Jet framework (React adaptation)
 */

// Import Intent from shared package
import type { Intent } from '@react-app-store/shared';
export type { Intent };

/**
 * Action represents a user interaction
 */
export interface Action {
  $kind: string;
  [key: string]: unknown;
}

/**
 * Action outcome
 */
export type ActionOutcome = 'performed' | 'unsupported';

/**
 * Optional type (similar to Apple's Opt)
 */
export type Opt<T> = T | null | undefined;

/**
 * Router response
 */
export interface RouterResponse {
  intent: Intent;
  action: Action;
  storefront: string;
  language: string;
}

/**
 * Page model base
 */
export interface Page {
  canonicalURL?: string;
  webNavigation?: unknown;
  pageType?: string;
  [key: string]: unknown;
}

/**
 * Context type for dependency injection
 */
export type Context = Map<string, unknown>;
