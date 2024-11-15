import { Router } from 'express';
import highscore from './highscore.js';
import collectable from './collectable.js';
import { userRouter } from "./user-routes.js";

const router = Router();

router.use('/highscore', highscore);
router.use('/collectables',collectable);
router.use("/users", userRouter);

export default router;
