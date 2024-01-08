import mongoose from "mongoose";

// Defining the schema for 'post' 
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    
    description: String,

    // Path or URL to the post's associated image
    picturePath: String,

    // Path or URL to the profile picture of the post's user
    userPicturePath: String,

    // A map tracking users' likes. Keyed by user ID, Boolean value indicates a like
    likes: {
      type: Map,
      of: Boolean,
    },

    // An array storing comments on the post, initialized as empty
    comments: {
      type: Array,
      default: [],
    },
  },
  // Option to automatically include timestamps for user posts
  { timestamps: true }
);

// Create a Mongoose model named 'Post' based on the schema
const Post = mongoose.model("Post", postSchema);

export default Post;
