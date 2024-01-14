import mongoose from "mongoose";

// Defining a schema for the User model
const UserSchema = new mongoose.Schema(
  {
    // First name of the user, a required string between 2 to 50 characters
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // Last name of the user, a required string between 2 to 50 characters
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // Email of the user, a required and unique string with a maximum length of 50 characters
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    // Password of the user, a required string with a minimum length of 5 characters
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // Picture path for the user's profile picture, optional with a default value of an empty string
    picturePath: {
      type: String,
      default: "",
    },
    // Friends list of the user, an array with a default value of an empty array
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true } // Enable automatic creation of createdAt and updatedAt fields
);

// Creating the User model from the defined schema
const User = mongoose.model("User", UserSchema);

// Exporting the User model
export default User;
