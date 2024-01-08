import express from "express";

// Import user-related controller functions.
import{
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

// Import the authentication middleware to verify tokens.
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// Route to get details of a specific user
router.get("/:id", verifyToken, getUser);

// Route to get all friends of a specific user
router.get("/:id/friends", verifyToken, getUserFriends);

// Route to add or remove a friend for a specific user
router.patch("/:id/:friendID", verifyToken, addRemoveFriend);

export default router;
