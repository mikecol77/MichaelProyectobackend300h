import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import indexRouter from './src/routes/index.routes.js';
import { notFoundHandler, errorHandler } from './src/middlewares/errorHandler.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Conexión a MongoDB
await connectDB();

// Rutas
app.use('/api', indexRouter);

// Healthcheck / raíz
app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Servidor activo', ts: new Date().toISOString() });
});

// Manejadores de error
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`> API escuchando en http://localhost:${PORT}`);
});
