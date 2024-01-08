import express from "express";

// Importing the 'login' function
import {login} from "../controllers/auth.js";

// Create a new instance of an Express Router
const router = express.Router();

// Define a route that listens for POST requests on the "/login" path. 
router.post("/login", login);

export default router;
