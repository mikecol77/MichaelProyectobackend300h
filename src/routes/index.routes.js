import { Router } from 'express';
import authRoutes from './auth.routes.js';

const router = Router();

// Rutas agrupadas por dominio
router.use('/auth', authRoutes);

// Endpoint de prueba
router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'api', status: 'healthy' });
});

export default router;
