import { Injectable, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RouteConfig, ApiResponse, SuccessResponse, ErrorResponse } from '@react-app-store/shared';
import type { Intent } from '@react-app-store/shared';

/**
 * Routes intent to appropriate backend service
 */
@Injectable()
export class IntentRouter {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Dispatch intent to backend service
   */
  async dispatch(route: RouteConfig, intent: Intent): Promise<ApiResponse> {
    try {
      const url = `${route.service}/${route.function}`;
      
      // Call backend service
      const response = await firstValueFrom(
        this.httpService.post(url, {
          ...intent,
          module: route.module,
          function: route.function,
        }),
      );

      return {
        success: true,
        data: response.data,
        meta: {
          module: route.module,
          function: route.function,
          intent: intent.$kind,
          timestamp: new Date().toISOString(),
        },
      } as SuccessResponse;
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: error.response?.status || 'INTERNAL_ERROR',
          message: error.response?.data?.message || error.message || 'Unknown error',
          module: route.module,
          function: route.function,
          details: error.response?.data,
        },
      };

      throw errorResponse;
    }
  }
}

