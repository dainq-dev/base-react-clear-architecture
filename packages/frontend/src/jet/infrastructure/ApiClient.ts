import type { Intent } from '@react-app-store/shared';
import type { ApiResponse } from '@react-app-store/shared';

/**
 * API Client for communicating with Gateway
 */
export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Dispatch intent to gateway
   */
  async dispatch(intent: Intent, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'): Promise<ApiResponse> {
    const url = method === 'GET' 
      ? this.buildGetUrl(intent)
      : `${this.baseUrl}/intents`;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthToken(),
      },
      body: method !== 'GET' ? JSON.stringify(intent) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(response.status, error);
    }

    return response.json();
  }

  /**
   * Build GET URL with query parameters
   */
  private buildGetUrl(intent: Intent): string {
    const params = new URLSearchParams();
    params.set('$kind', intent.$kind);
    Object.entries(intent).forEach(([key, value]) => {
      if (key !== '$kind' && value !== undefined && value !== null) {
        params.set(key, String(value));
      }
    });
    return `${this.baseUrl}/intents?${params.toString()}`;
  }

  /**
   * Get authentication token
   */
  private getAuthToken(): string {
    // TODO: Implement actual token retrieval
    const token = localStorage.getItem('auth_token');
    return token ? `Bearer ${token}` : '';
  }
}

/**
 * API Error
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
  ) {
    super(`API Error: ${status}`);
    this.name = 'ApiError';
  }
}

