import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Handles user registration, taking in two arguments, req and res
export const register = async(req,res) => {
    try{
        // Destructures incoming HTTP request. It extracts data sent by the client to the server
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
    }= req.body;
    const salt = await bcrypt.genSalt();
    // Hashes the user's password by the generated salt to ensure security
    const passwordHash = await bcrypt.hash(password, salt);
    // Creates a new instance of the User
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000)
    });
    // Saves the newly created user instance to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
}catch(err){
    res.status(500).json({error: err.message});
    }
}
    // Exports login function to handle user authentication
export const login = async(req, res) => {
    try{
        // Destructures email and password from the incoming request's body
        const{email, password} = req.body;
        // Search for the user in database with the provided email
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg: "User does not exist. "});

        // Compare provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials. "});

        // Create a JWT token to authenticate user for subsequent requests IF passwords match
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        // Send a successful response with the token and user data
        res.status(200).json({token, user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}