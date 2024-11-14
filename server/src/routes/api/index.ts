import { Router } from 'express';
import highscore from './highscore.js';
import collectable from './collectable.js';

const router = Router();

router.use('/highscore', highscore);
router.use('/collectables',collectable);


export default router;
