import express from "express";
import {
  getAllUsers,
  getUserByUsername,
} from "../../controllers/user-controller.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", getAllUsers);

// GET /users/:username - Get a user by username
router.get("/:username", getUserByUsername);

export { router as userRouter };
