// Import hooks and Redux related functions
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import action for setting posts in Redux store
import { setPosts } from "state";

// Import the PostWidget component to display individual posts
import PostWidget from "./PostWidget";

// PostsWidget component definition
const PostsWidget = ({ userId, isProfile = false }) => {
    // useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // useSelector hook to access Redux store state
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    // Function to fetch all posts
    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    // Function to fetch posts of a specific user
    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    // useEffect hook to load posts on component mount
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Rendering the list of PostWidget components
    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;
