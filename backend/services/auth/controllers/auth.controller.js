import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import crypto from "crypto";
import redis from "../../../common/redis/redis.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { idToken } = req.body;
    let user;

    // Case 1: Google Login (if token is provided)
    if (idToken) {
      const decodetoken = await getAuth(app).verifyIdToken(idToken);
      user = await User.findOne({ firebaseID: decodetoken.uid });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
    }
    // Case 3: If request is invalid
    else {
      return res
        .status(400)
        .json({
          message: "Invalid login request. Provide token.",
        });
    }

    const userSessionData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      firebaseID: user.firebaseID,
    };
    // --- Common Session Creation Logic ---
    const sessionID = crypto.randomUUID();

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