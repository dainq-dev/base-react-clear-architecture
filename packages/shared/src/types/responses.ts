/**
 * Response types for API Gateway
 */

/**
 * Success response
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: ResponseMeta;
}

/**
 * Error response
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    module?: string;
    function?: string;
    details?: unknown;
  };
  meta?: ResponseMeta;
}

/**
 * Response type union
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * Response metadata
 */
export interface ResponseMeta {
  module: string;
  function: string;
  intent?: string;
  timestamp: string;
  requestId?: string;
}

/**
 * Route configuration
 */
export interface RouteConfig {
  module: string;
  function: string;
  service?: string; // Service URL if external
}

