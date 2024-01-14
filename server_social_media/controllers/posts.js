// Importing Post and User models
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */

// Function to create a new post
export const createPost = async (req, res) => {
  try {
    // Extracting post details from request body
    const { userId, description, picturePath } = req.body;

    // Finding the user from the database by userId
    const user = await User.findById(userId);

    // Creating a new Post instance
    const newPost = new Post({
      userId,
      firstName: user.firstName, // Setting first name from the user's data
      lastName: user.lastName,   // Setting last name from the user's data
      location: user.location,   // Setting location from the user's data
      description,
      userPicturePath: user.picturePath, // User's profile picture path
      picturePath,                        // Post's picture path
      likes: {},                          // Initializing likes as an empty object
      comments: [],                       // Initializing comments as an empty array
    });

    // Saving the new post to the database
    await newPost.save();

    // Retrieving all posts to return as response
    const post = await Post.find();
    res.status(201).json(post); // Sending the created post with status 201 Created
  } catch (err) {
    res.status(409).json({ message: err.message }); // Handling any errors
  }
};

/* READ */

// Function to get all feed posts
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); // Retrieving all posts from the database
    res.status(200).json(post);     // Sending posts with status 200 OK
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handling any errors
  }
};

// Function to get posts by a specific user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; // Extracting userId from request parameters
    const post = await Post.find({ userId }); // Finding posts by userId
    res.status(200).json(post); // Sending the user's posts with status 200 OK
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handling any errors
  }
};

/* UPDATE */

// Function to like or unlike a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // Extracting post id from request parameters
    const { userId } = req.body; // Extracting userId from request body
    const post = await Post.findById(id); // Finding the post by id
    const isLiked = post.likes.get(userId); // Checking if the post is already liked by the user

    // Toggling the like status
    if (isLiked) {
      post.likes.delete(userId); // If liked, unlike it
    } else {
      post.likes.set(userId, true); // If not liked, like it
    }

    // Updating the post with the new likes status
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); // Sending the updated post with status 200 OK
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handling any errors
  }
};
