import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import crypto from "crypto";
import redis from "../../../common/redis/redis.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { token, email, password } = req.body;
    let user;

    // Case 1: Google Login (if token is provided)
    if (token) {
      const decodetoken = await getAuth(app).verifyIdToken(token);
      user = await User.findOne({ firebaseID: decodetoken.uid });
      if (!user) {
        user = await User.create({
          firebaseID: decodetoken.uid,
          name: decodetoken.name,
          email: decodetoken.email,
          avatar: decodetoken.picture,
        });
      }
    }
    // Case 2: Email & Password Login
    else if (email && password) {
      user = await User.findOne({ email });
      // Manually compare password
      const isMatch = user && (await bcrypt.compare(password, user.password));
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }
    // Case 3: If request is invalid
    else {
      return res
        .status(400)
        .json({
          message: "Invalid login request. Provide token or email/password.",
        });
    }

    // --- Common Session Creation Logic ---
    const sessionID = crypto.randomUUID();
    // Important: Don't send password in the session or response
    const userSessionData = { ...user.toObject() };
    delete userSessionData.password;

    await redis.set(
      `session:${sessionID}`,
      JSON.stringify(userSessionData),
      "EX",
      60 * 60 * 24 * 2,
    );

    res.cookie("session", sessionID, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    return res
      .status(200)
      .json({ message: "Login success", user: userSessionData });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(400).json({ message: "Login failed" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Manually hash the password before creating the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // --- Session Creation Logic (Same as login) ---
    const sessionID = crypto.randomUUID();
    // Important: Don't send password in the session or response
    const userSessionData = { ...user.toObject() };
    delete userSessionData.password;

    await redis.set(
      `session:${sessionID}`,
      JSON.stringify(userSessionData),
      "EX",
      60 * 60 * 24 * 2,
    );

    res.cookie("session", sessionID, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    return res
      .status(201)
      .json({ message: "Registration successful", user: userSessionData });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "Registration failed due to server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionID = req.cookies.session;
    if (!sessionID) {
      return res.status(400).json({ message: "Session ID not found" });
    }
    await redis.del(`session:${sessionID}`);
    res.clearCookie("session");
    return res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(400).json({ message: "Logout failed" });
  }
};
