/**
 * Type-safe application context
 * Replaces Map<string, unknown> with explicit interface
 */

import { Jet } from '../jet/Jet';
import type { I18N } from '../../shared/localization/src/i18n';
import type { Logger } from '../../shared/logger/src/Logger';

/**
 * Application context containing all dependencies
 */
export interface AppContext {
  jet: Jet;
  logger: Logger;
  i18n: I18N;
  storefront: string;
  language: string;
  uniqueId: number;
  fetch: typeof window.fetch;
}

/**
 * Create a new unique ID
 */
export function createUniqueId(context: AppContext): number {
  const currentId = context.uniqueId;
  context.uniqueId = currentId + 1;
  return currentId;
}

