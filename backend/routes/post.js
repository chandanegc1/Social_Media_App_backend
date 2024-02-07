import express from "express";
import { addcomment, createpost, deleteComment, deletepost, followUnfollow, forgotPassword, getPostFollowing, likeunlikepost, resetPassword, updatePassword, updatecaption, updateprofile } from "../controllers/post.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.route("/post/upload").post( isAuthenticated ,createpost); //this is working on step by step many steps when first is complete then other will be gone..(isAuthenticated->createpost->other any..)
router.route("/post/:id").post( isAuthenticated ,likeunlikepost);
router.route("/post/:id").delete(isAuthenticated , deletepost); 
router.route("/follow/:id").get( isAuthenticated ,followUnfollow);
router.route("/posts").get( isAuthenticated ,getPostFollowing);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateprofile);
router.route("/update/caption/:id").put(isAuthenticated, updatecaption);
router.route("/post/comment/:id").put(isAuthenticated, addcomment);
router.route("/post/comment/:id").delete(isAuthenticated, deleteComment);
router.route("/forgot/password").post(isAuthenticated, forgotPassword);
router.route("/password/reset/:token").post( resetPassword);
export default router; 