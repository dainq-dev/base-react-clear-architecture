import { Injectable } from '@nestjs/common';
import { RouteConfig } from '@react-app-store/shared';
import type { Intent } from '@react-app-store/shared';

/**
 * Maps Intent $kind to module + function
 */
@Injectable()
export class IntentMapper {
  private readonly routing: Map<string, RouteConfig> = new Map([
    ['RouteUrlIntent', { module: 'routing', function: 'routeUrl' }],
    ['GetProductIntent', { module: 'product', function: 'getProduct' }],
    ['SearchIntent', { module: 'search', function: 'search' }],
  ]);

  /**
   * Map intent to route configuration
   */
  mapIntentToRoute(intent: Intent): RouteConfig {
    const config = this.routing.get(intent.$kind);
    
    if (!config) {
      throw new Error(`Unknown intent: ${intent.$kind}`);
    }

    return {
      ...config,
      service: this.getServiceUrl(config.module),
    };
  }

  /**
   * Get service URL for module
   */
  private getServiceUrl(module: string): string {
    const serviceUrl = process.env[`${module.toUpperCase()}_SERVICE_URL`];
    
    if (serviceUrl) {
      return serviceUrl;
    }

    // Default to backend service
    const backendUrl = process.env.BACKEND_SERVICE_URL || 'http://localhost:3002';
    return `${backendUrl}/api/${module}`;
  }

  /**
   * Register new intent mapping
   */
  registerIntent(kind: string, config: RouteConfig): void {
    this.routing.set(kind, config);
  }
}

