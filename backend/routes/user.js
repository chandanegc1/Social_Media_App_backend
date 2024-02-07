import express from "express";
import { deleteuser, getAllUser, getUserPrfl, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/delete/account").delete(isAuthenticated, deleteuser);
router.route("/user/:id").get(isAuthenticated, getUserPrfl);
router.route("/users").get(isAuthenticated, getAllUser);

export default router;