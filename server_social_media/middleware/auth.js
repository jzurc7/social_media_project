import jwt from "jsonwebtoken";

// Function to verify the JWT token in the request
export const verifyToken = async (req, res, next) => {
  try {
    // Extracting the token from the Authorization header
    let token = req.header("Authorization");

    // If no token is provided, return a 403 Forbidden status
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // If the token has a 'Bearer ' prefix, remove it to get the actual token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verifying the token with the secret key from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attaching the verified user information to the request
    req.user = verified;

    // Proceed to the next middleware function
    next();
  } catch (err) {
    // If an error occurs (e.g., invalid token), return a 500 Internal Server Error status
    res.status(500).json({ error: err.message });
  }
};
