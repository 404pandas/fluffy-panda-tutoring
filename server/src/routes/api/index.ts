import { Router } from 'express';
import highscore from './highscore.js';

const router = Router();

router.use('/highscore', highscore);


export default router;
