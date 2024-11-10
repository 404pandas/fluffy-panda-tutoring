import { Router, Request, Response, RequestHandler } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, });

    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    const userInfo = {
      id: user.id,
      username: user.username,
    }
    res.json({ token,user: userInfo });
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    const userInfo = {
      id: newUser.id,
      username: newUser.username,
    }

    res.status(201).json({ token, user: userInfo })
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const router = Router();

router.post("/login", login);
router.post("/register", createUser);

export default router;
