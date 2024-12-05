import express from "express";
import verifyToken from "../middleware/authMiddleware"
import { registerUser, loginUser} from "../controllers/userController";
const router = express.Router();

router.post("/", registerUser); // register new user
router.get("/:uid", loginUser); // login existing user

export default router;