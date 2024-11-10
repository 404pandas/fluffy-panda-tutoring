import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
// import {authauthenticateToken} from '../middleware/auth-middleware.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

export default router;
