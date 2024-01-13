// Import necessary Material UI components and icons
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

// Import custom components used in this widget
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

// Import hooks from React and Redux
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import action creator for setting a post state
import { setPost } from "state";

// PostWidget component definition
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  // State to toggle comments section
  const [isComments, setIsComments] = useState(false);

  // Dispatch to send actions to the Redux store
  const dispatch = useDispatch();

  // Selectors to access Redux store state
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  // Determine if the post is liked by the logged-in user
  const isLiked = Boolean(likes[loggedInUserId]);

  // Calculate total number of likes
  const likeCount = Object.keys(likes).length;

  // Use custom Material UI theme
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // Function to handle like action
  const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
  };

  // Rendering the PostWidget component
  return (
      <WidgetWrapper m="2rem 0">
          {/* Friend component displaying user who posted */}
          <Friend
              friendId={postUserId}
              name={name}
              subtitle={location}
              userPicturePath={userPicturePath}
          />

          {/* Post description */}
          <Typography color={main} sx={{ mt: "1rem" }}>
              {description}
          </Typography>

          {/* Display post image if exists */}
          {picturePath && (
              <img
                  width="100%"
                  height="auto"
                  alt="post"
                  style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                  src={`http://localhost:3001/assets/${picturePath}`}
              />
          )}

          {/* Action buttons and counters for likes and comments */}
          <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                  {/* Like button and like count */}
                  <FlexBetween gap="0.3rem">
                      <IconButton onClick={patchLike}>
                          {isLiked ? (
                              <FavoriteOutlined sx={{ color: primary }} />
                          ) : (
                              <FavoriteBorderOutlined />
                          )}
                      </IconButton>
                      <Typography>{likeCount}</Typography>
                  </FlexBetween>

                  {/* Comment button and comments count */}
                  <FlexBetween gap="0.3rem">
                      <IconButton onClick={() => setIsComments(!isComments)}>
                          <ChatBubbleOutlineOutlined />
                      </IconButton>
                      <Typography>{comments.length}</Typography>
                  </FlexBetween>
              </FlexBetween>

              {/* Share button */}
              <IconButton>
                  <ShareOutlined />
              </IconButton>
          </FlexBetween>

          {/* Comments section, displayed based on isComments state */}
          {isComments && (
              <Box mt="0.5rem">
                  {comments.map((comment, i) => (
                      <Box key={`${name}-${i}`}>
                          <Divider />
                          <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                              {comment}
                          </Typography>
                      </Box>
                  ))}
                  <Divider />
              </Box>
          )}
      </WidgetWrapper>
  );
};

export default PostWidget;
