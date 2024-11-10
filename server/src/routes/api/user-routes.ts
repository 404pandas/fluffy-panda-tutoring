import express from "express";
import { getAllUsers, getUserById } from "../../controllers/user-controller.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", getAllUsers);

// GET /users/:id - Get a user by id
router.get("/:id", getUserById);

export { router as userRouter };
