import express from "express";
import { registerUser, loginUser, updateUser } from "../controllers/userController";
const router = express.Router();

router.post("/", registerUser); // register new user
router.get("/:uid", loginUser); // login existing user
router.put("/:uid", updateUser); // update user info
router.patch("/:uid", updateUser); // update user info

export default router;