import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

const router = express.Router();

console.log("Cloudinary ENV:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "FOUND" : "MISSING",
  api_key: process.env.CLOUDINARY_API_KEY ? "FOUND" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "FOUND" : "MISSING",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    console.error("FETCH POSTS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    console.log("POST ROUTE HIT");
    console.log("NAME:", name);
    console.log("PROMPT:", prompt);
    console.log("PHOTO EXISTS:", !!photo);

    if (!name || !prompt || !photo) {
      return res.status(400).json({
        success: false,
        message: "Name, prompt and photo are required",
      });
    }

    console.log("Uploading image to Cloudinary...");

    const photoUrl = await cloudinary.uploader.upload(photo);

    console.log("Cloudinary upload successful");

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    console.log("MongoDB post created");

    res.status(200).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
