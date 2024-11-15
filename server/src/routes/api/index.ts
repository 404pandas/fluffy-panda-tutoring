import { Router } from "express";
import highscore from "./highscore.js";
import { userRouter } from "./user-routes.js";

const router = Router();

router.use("/highscore", highscore);
router.use("/users", userRouter);

export default router;
