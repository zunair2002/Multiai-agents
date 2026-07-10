import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firebaseID: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;