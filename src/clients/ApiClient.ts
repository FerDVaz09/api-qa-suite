import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`);
    expect(response.status()).toBe(200);
    return response.json() as Promise<T>;
  }

  async post<T>(endpoint: string, body: object): Promise<{ status: number; data: T }> {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
      data: body,
      headers: { 'Content-Type': 'application/json' }
    });
    return {
      status: response.status(),
      data: await response.json() as T
    };
  }

  async validateResponseTime(endpoint: string, maxMs: number): Promise<void> {
    const start = Date.now();
    await this.request.get(`${this.baseUrl}${endpoint}`);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(maxMs);
    console.log(`✅ Response time: ${elapsed}ms (limit: ${maxMs}ms)`);
  }
}
