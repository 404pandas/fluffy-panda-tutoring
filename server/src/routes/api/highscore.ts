import { Router } from "express";
import { getHighscores, getHighscoreById, updateHighscore } from "../../controllers/highscore-controller.js";

const router = Router();

router.get("/", getHighscores);
router.get("/:id", getHighscoreById);
router.put("/:id", updateHighscore);

export default router;