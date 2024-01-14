import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state"; // Make sure this import points to where setFriends is actually defined

// This component is responsible for fetching and displaying a list of friends for a given user.
const FriendListWidget = ({ userId }) => {
  // useDispatch is a hook that gives you access to the Redux dispatch function.
  const dispatch = useDispatch();
  // useTheme is a hook from MUI that gives you access to the theme object.
  const { palette } = useTheme();
  // useSelector is a hook that lets you extract data from the Redux store state.
  // Make sure the state paths provided match your actual state structure.
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // getFriends is an asynchronous function that fetches the user's friends.
  const getFriends = async () => {
    // Fetch data from your API endpoint. Update the URL to match your actual endpoint.
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        // Authorization header is important for secure API calls.
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // After fetching the data, dispatch an action to update the friends in the global state.
    dispatch(setFriends({ friends: data }));
  };

  // useEffect is used to perform side effects in the component.
  // In this case, it fetches the friends when the component mounts.
  // The empty dependency array means it will only run once, like componentDidMount.
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // The component returns JSX to render the UI.
  return (
    <WidgetWrapper>
      {/* Typography is a component from MUI that displays text. */}
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {/* Box is a component from MUI that serves as a container for layout purposes. */}
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {/* Map through the friends array and render a Friend component for each item. */}
        {friends.map((friend) => (
          <Friend
            key={friend._id} // Always use a unique key when mapping over an array to render a list.
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
