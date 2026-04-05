import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/clients/ApiClient';

// Usamos una API pública real: fakestoreapi.com
const BASE_URL = 'https://fakestoreapi.com';

test.describe('🛒 Products API', () => {
  let apiClient: ApiClient;

  test.beforeAll(async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`).catch(() => null);
    test.skip(
      !response || response.status() === 403,
      'fakestoreapi.com is not reachable from this environment (403). Run tests locally against the real API.'
    );
  });

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request, BASE_URL);
  });

  test('GET /products - retorna lista de productos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`);
    
    expect(response.status()).toBe(200);
    
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
    
    // Validación de schema TypeScript
    const product = products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(typeof product.price).toBe('number');
    
    console.log(`✅ Se encontraron ${products.length} productos`);
  });

  test('GET /products/:id - retorna producto específico', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/1`);
    
    expect(response.status()).toBe(200);
    
    const product = await response.json();
    expect(product.id).toBe(1);
    expect(product.title).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);
  });

  test('GET /products/category/:category - filtra por categoría', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/category/electronics`);
    
    expect(response.status()).toBe(200);
    
    const products = await response.json();
    expect(products.length).toBeGreaterThan(0);
    products.forEach((p: any) => {
      expect(p.category).toBe('electronics');
    });
  });

  test('POST /products - crea nuevo producto', async ({ request }) => {
    const newProduct = {
      title: 'Test Product QA',
      price: 99.99,
      description: 'Automated test product',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/test.jpg'
    };

    const response = await request.post(`${BASE_URL}/products`, {
      data: newProduct,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.ok()).toBeTruthy();
    const created = await response.json();
    expect(created.id).toBeTruthy();
    expect(created.title).toBe(newProduct.title);
    
    console.log(`✅ Producto creado con ID: ${created.id}`);
  });

  test('Response time < 2000ms', async ({ request }) => {
    const start = Date.now();
    await request.get(`${BASE_URL}/products`);
    const elapsed = Date.now() - start;
    
    expect(elapsed).toBeLessThan(2000);
    console.log(`⚡ Tiempo de respuesta: ${elapsed}ms`);
  });
});
