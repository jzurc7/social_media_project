// Import Material UI icons and components
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

// Import hooks from React Redux and React Router
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import action for setting friends in Redux store
import { setFriends } from "state";

// Import custom components
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

// Friend component definition
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // Hooks for dispatching actions to Redux store and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors to access Redux store state
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Using Material UI theme for styling
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Check if the current friend is in the user's friend list
  const isFriend = friends.find((friend) => friend._id === friendId);

  // Function to add or remove a friend
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  // Rendering the Friend component
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        {/* User image */}
        <UserImage image={userPicturePath} size="55px" />

        {/* User name and subtitle */}
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* Add/Remove friend button */}
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
