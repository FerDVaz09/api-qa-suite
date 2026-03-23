# API Testing Suite — TypeScript + Playwright + Newman

Suite completa de pruebas API y E2E en TypeScript con arquitectura de cliente reutilizable, validación de schemas, performance testing y pipeline CI/CD automatizado.

## 🚀 Tecnologías
- **TypeScript**: Tipado estricto para mayor robustez.
- **Playwright**: Runner para pruebas de API y E2E (UI).
- **Newman**: Integración con colecciones de Postman.
- **GitHub Actions**: Pipeline de CI/CD automatizado.
- **HTML Reports**: Reportes visuales de ejecución.

## 📁 Estructura
- `src/clients/`: Cliente HTTP base reutilizable.
- `src/types/`: Interfaces de TypeScript para modelos de datos.
- `tests/api/`: Pruebas de endpoints (Auth, Products).
- `tests/e2e/`: Pruebas funcionales de interfaz de usuario.
- `collections/`: Colecciones de Postman para Newman.
- `reports/`: Resultados de ejecución en formato HTML.

## 🛠️ Instalación y Uso
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   npx playwright install chromium
   ```
3. Ejecutar pruebas de API:
   ```bash
   npm run test:api
   ```
4. Ejecutar pruebas E2E:
   ```bash
   npm run test:e2e
   ```
5. Ejecutar Newman:
   ```bash
   npm run test:newman
   ```
6. Ver reporte:
   ```bash
   npm run report
   ```

## 📊 Métricas del Proyecto
- ✅ 8+ casos de prueba de API.
- ✅ Validación de esquemas y tipos.
- ✅ Pruebas de tiempo de respuesta (Performance).
- ✅ Integración continua configurada.
