import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('🔐 Authentication API', () => {

  test('Login exitoso retorna token JWT', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: { username: 'mor_2314', password: '83r5^_' },
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
    console.log(`✅ Token recibido: ${body.token.substring(0, 20)}...`);
  });

  test('Login con credenciales inválidas retorna error', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: { username: 'invalid_user', password: 'wrong_pass' },
      headers: { 'Content-Type': 'application/json' }
    });

    // Validamos que no retorna 200
    expect(response.status()).not.toBe(200);
    console.log(`✅ Error manejado correctamente: ${response.status()}`);
  });
});
