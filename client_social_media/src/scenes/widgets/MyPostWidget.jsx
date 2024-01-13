// Importing Material UI icons and components
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

// Importing custom components and hooks
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

// MyPostWidget: Functional component for creating a social media post widget
const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch(); // Hook for dispatching Redux actions
  const [isImage, setIsImage] = useState(false); // State for toggling image upload
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [post, setPost] = useState(""); // State for storing the text of the post
  const { palette } = useTheme(); // Accessing theme colors
  const { _id } = useSelector((state) => state.user); // Accessing user ID from Redux state
  const token = useSelector((state) => state.token); // Accessing token from Redux state
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Media query for responsive design
  const mediumMain = palette.neutral.mediumMain; // Theming: medium color
  const medium = palette.neutral.medium; // Theming: alternate medium color

  // handlePost: Function to handle the post submission
  const handlePost = async () => {
    const formData = new FormData(); // Using FormData to handle file upload
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    // Sending a POST request to the server
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json(); // Parsing the response JSON
    dispatch(setPosts({ posts })); // Updating the Redux state with the new posts
    setImage(null); // Resetting the image state
    setPost(""); // Resetting the post state
  };

  // JSX for the post widget
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        {/* User image component */}
        <UserImage image={picturePath} />
        {/* Input field for the post */}
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* Image upload section */}
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {/* Delete icon button */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* Divider for layout separation */}
      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Buttons for adding media to the post */}
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {/* Conditional rendering based on screen size */}
        {isNonMobileScreens ? (
          <>
            {/* Buttons for adding clip, attachment, and audio on non-mobile screens */}
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        {/* Post button */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
