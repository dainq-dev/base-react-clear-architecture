import type { Intent, Action, ActionOutcome, RouterResponse } from './types';
import type { Logger } from '../../shared/logger/src/Logger';

/**
 * Jet Framework - Core routing and state management
 * Adapted from Apple App Store's Jet framework
 */
export class Jet {
  private readonly log: Logger;
  private readonly intentHandlers: Map<string, (intent: Intent) => Promise<unknown>>;
  private readonly actionHandlers: Map<string, (action: Action) => Promise<ActionOutcome>>;

  constructor(logger: Logger) {
    this.log = logger;
    this.intentHandlers = new Map();
    this.actionHandlers = new Map();
  }

  /**
   * Dispatch an intent and return its output
   * @throws {Error} If handler is not found or handler throws an error
   */
  async dispatch<I extends Intent>(intent: I): Promise<unknown> {
    const handler = this.intentHandlers.get(intent.$kind);
    if (!handler) {
      const error = new Error(`No handler registered for intent: ${intent.$kind}`);
      this.log.error(error.message, { intent });
      throw error;
    }

    try {
      return await handler(intent);
    } catch (error) {
      this.log.error(`Error dispatching intent ${intent.$kind}:`, error);
      throw error;
    }
  }

  /**
   * Perform an action
   * @returns 'performed' if action was handled, 'unsupported' if no handler or error occurred
   */
  async perform(action: Action): Promise<ActionOutcome> {
    const handler = this.actionHandlers.get(action.$kind);
    if (!handler) {
      this.log.warn(`No handler registered for action: ${action.$kind}`, { action });
      return 'unsupported';
    }

    try {
      return await handler(action);
    } catch (error) {
      this.log.error(`Error performing action ${action.$kind}:`, error);
      return 'unsupported';
    }
  }

  /**
   * Register an intent handler
   */
  onIntent(kind: string, handler: (intent: Intent) => Promise<unknown>): void {
    if (this.intentHandlers.has(kind)) {
      throw new Error(`Intent handler already registered for: ${kind}`);
    }
    this.intentHandlers.set(kind, handler);
  }

  /**
   * Register an action handler
   */
  onAction(kind: string, handler: (action: Action) => Promise<ActionOutcome>): void {
    if (this.actionHandlers.has(kind)) {
      throw new Error(`Action handler already registered for: ${kind}`);
    }
    this.actionHandlers.set(kind, handler);
  }

  /**
   * Route a URL using Jet
   */
  async routeUrl(url: string): Promise<RouterResponse | null> {
    const intent = {
      $kind: 'RouteUrlIntent',
      url,
    };
    
    const result = await this.dispatch(intent);
    return result as RouterResponse | null;
  }

  /**
   * Set locale information
   */
  setLocale(_localizer: unknown, storefront: string, language: string): void {
    // Implementation for locale setting
    this.log.info('Setting locale:', { storefront, language });
  }
}

