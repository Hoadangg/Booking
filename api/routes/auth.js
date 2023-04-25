import express from "express";
import { login, register, sendMail } from "../controllers/auth.js";
import { parseToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", parseToken, register);
router.post("/admin/register", register);
router.post("/login", login);
router.post("/sendMail", sendMail);
export default router;
