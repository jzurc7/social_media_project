// Importing the User model
import User from "../models/User.js";

/* READ */

// Function to get a user by ID
export const getUser = async (req, res) => {
  try {
    // Extracting user ID from request parameters
    const { id } = req.params;
    // Finding the user by ID in the database
    const user = await User.findById(id);
    // Sending the found user as a response
    res.status(200).json(user);
  } catch (err) {
    // Handling errors, such as user not found
    res.status(404).json({ message: err.message });
  }
};

// Function to get friends of a user
export const getUserFriends = async (req, res) => {
  try {
    // Extracting user ID from request parameters
    const { id } = req.params;
    // Finding the user by ID
    const user = await User.findById(id);

    // Using Promise.all to find all friends concurrently based on their IDs
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formatting the friends' data to send only necessary fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    // Sending the formatted friends list as a response
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handling errors, such as user not found
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

// Function to add or remove a friend
export const addRemoveFriend = async (req, res) => {
  try {
    // Extracting user ID and friend ID from request parameters
    const { id, friendId } = req.params;
    // Finding the user and the friend by their IDs
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Checking if the friend is already in the user's friend list
    if (user.friends.includes(friendId)) {
      // If so, remove the friend from both user's and friend's friend lists
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // If not, add the friend to both lists
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    // Saving the updated user and friend data
    await user.save();
    await friend.save();

    // Fetching the updated friends list
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formatting the friends' data for the response
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Sending the updated friends list as a response
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handling errors, such as user not found
    res.status(404).json({ message: err.message });
  }
};
