import express from "express";
import { getUsers, getUserById, updateUser, deleteUser, Register, Login, Logout } from "../controllers/Users.js";
import { getKards } from "../controllers/Kards.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// User route
router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Kard route
router.get('/kards', getKards);

export default router;
