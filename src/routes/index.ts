import { Router } from 'express';

const router = Router();

router.get('/test', (_req, res) => {
  res.json({
    status: 'success',
    message: 'API routes are working!',
    timestamp: new Date().toISOString(),
  });
});

export default router;
