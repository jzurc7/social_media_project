import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

// Importing the authentication middleware to verify tokens.
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Route to get all feed posts
router.get("/", verifyToken, getFeedPosts);

// Route to get all posts for a specific user
router.get("/:userId/posts", verifyToken, getUserPosts);

// Route to 'like' a specific post
router.patch("/:id/like", verifyToken, likePost);

export default router;
