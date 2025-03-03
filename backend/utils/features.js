import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const connectDb = (url) => {
  mongoose
    .connect(url, {
      dbName: "chat-app",
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.log("Error connecting to the database", error);
    });
};
const connectDB = async (url) => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "your-mongodb-uri", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const sendToken = (res, user, statusCode, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(statusCode).cookie("chat-token", token, cookieOptions).json({
    success: true,
    message,
    user,
  });
};
const emitEvent = (req, event, users, data) => {
  console.log("Emitting event");
};
const deleteFilesFromCloudinary = (publicIds) => {
  console.log("Deleting files from cloudinary");
};
export { connectDb, sendToken, emitEvent, deleteFilesFromCloudinary };
