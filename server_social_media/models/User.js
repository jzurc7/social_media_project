import mongoose from "mongoose";

// Defining the schema for 'User' 
const UserSchema = new mongoose.Schema(
    {
        // The first name of the user, with minimum and maximum length constraints
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        // The last name of the user, with minimum and maximum length constraints
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        // The email address of the user, which must be unique for all users
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },

        // The user's encrypted password, with a minimum length constraint
        password: {
            type: String,
            required: true,
            min: 5,
        },

        // Path or URL to the user's profile picture; initialized as an empty string if not provided
        picturePath: {
            type: String,
            default: "",
        },

        // An array storing user IDs of the user's friends
        friends: {
            type: Array,
            default: [],
        },

        // Optional location data and occupation for the user
        location: String,
        occupation: String,

        // Profile view count
        viwedProfile: Number,

        // Count of impressions 
        impressions: Number,
    }, 
    // Option to automatically include timestamps for user posts
    { timestamps: true }
);

// Creating a Mongoose model named 'User' based on the schema.
const User = mongoose.model("User", UserSchema)
export default User;
