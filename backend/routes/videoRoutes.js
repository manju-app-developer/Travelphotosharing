import express from "express";
import videoModel from "../models/videoModel.js";

const router = express.Router();

// Upload Video
router.post("/upload", async (req, res) => {
  const { user_id, video_url, caption } = req.body;

  try {
    const video = await videoModel.addVideo(user_id, video_url, caption);
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get All Videos
router.get("/", async (req, res) => {
  try {
    const videos = await videoModel.getAllVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
