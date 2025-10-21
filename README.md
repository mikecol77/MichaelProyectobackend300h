# Backend - MichaelProyectobackend300h

Base técnica para el proyecto del diplomado: **Node.js + Express + MongoDB** con modelo `Usuario` y endpoints de autenticación.

## Requisitos
- Node.js 18+
- MongoDB local o Atlas
- Archivo `.env` basado en `.env.example`

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```

## Producción
```bash
npm start
```

## Rutas
- `GET /api/health` → Healthcheck
- `POST /api/auth/register` → Crea usuario
- `POST /api/auth/login` → Autentica y devuelve JWT
- `GET /api/auth/me` → Perfil (requiere `Authorization: Bearer <token>`)

## Estructura
```
src/
  config/db.js
  models/User.js
  controllers/auth.controller.js
  routes/index.routes.js
  routes/auth.routes.js
  middlewares/errorHandler.js
  middlewares/auth.middleware.js
  utils/ApiResponse.js
```

## Buenas prácticas
- Commits pequeños y descriptivos
- `.env` nunca se sube al repo
- Ramas: `desarrollo` como base; features desde ahí y PRs hacia `desarrollo`
