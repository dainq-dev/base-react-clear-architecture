import { Jet } from './Jet';
import { RouteUrlController } from './controllers/RouteUrlController';

/**
 * Bootstrap Jet framework with intent controllers
 */
export function bootstrapJet(jet: Jet): void {
  const routeUrlController = new RouteUrlController();

  // Register intent handlers
  jet.onIntent('RouteUrlIntent', async (intent) => {
    return routeUrlController.handle(intent);
  });

  // TODO: Register more intent controllers
}

