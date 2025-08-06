interface RequestOptions {
  headers?: Record<string, string>;
}

export class ApiClient {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly timeout: number;

  constructor() {
    this.baseURL = import.meta.env['VITE_API_BASE_URL'];
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.timeout = parseInt(import.meta.env['VITE_API_TIMEOUT']);
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit & RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      if (
        response.status === 204 ||
        response.headers.get('content-length') === '0'
      ) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }

      throw error;
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // If we can't parse the error response, use the status text
    }

    throw new Error(errorMessage);
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const requestOptions: RequestInit & RequestOptions = {
      method: 'POST',
      ...options,
    };

    if (data !== undefined) {
      requestOptions.body = JSON.stringify(data);
    }

    return this.makeRequest<T>(endpoint, requestOptions);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const requestOptions: RequestInit & RequestOptions = {
      method: 'PUT',
      ...options,
    };

    if (data !== undefined) {
      requestOptions.body = JSON.stringify(data);
    }

    return this.makeRequest<T>(endpoint, requestOptions);
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}
