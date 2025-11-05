import { Injectable } from '@nestjs/common';
import { IntentRouter } from './intent.router';
import { IntentMapper } from './intent.mapper';
import { ApiResponse } from '@react-app-store/shared';
import type { Intent } from '@react-app-store/shared';

/**
 * Intent Service - Business logic for intent processing
 */
@Injectable()
export class IntentsService {
  constructor(
    private readonly intentRouter: IntentRouter,
    private readonly intentMapper: IntentMapper,
  ) {}

  /**
   * Process intent and route to appropriate backend service
   */
  async processIntent(intent: Intent): Promise<ApiResponse> {
    try {
      // Map intent to route
      const route = this.intentMapper.mapIntentToRoute(intent);

      // Dispatch to backend service
      const response = await this.intentRouter.dispatch(route, intent);

      return response;
    } catch (error: any) {
      // If error is already ApiResponse, return it
      if (error.success !== undefined) {
        return error;
      }

      // Otherwise, wrap in error response
      return {
        success: false,
        error: {
          code: 'PROCESSING_ERROR',
          message: error.message || 'Failed to process intent',
        },
      };
    }
  }
}

