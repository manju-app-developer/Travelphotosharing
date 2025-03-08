import express from "express";
import photoModel from "../models/photoModel.js";

const router = express.Router();

// Upload Photo
router.post("/upload", async (req, res) => {
  const { user_id, image_url, caption } = req.body;

  try {
    const photo = await photoModel.addPhoto(user_id, image_url, caption);
    res.status(201).json({ message: "Photo uploaded successfully", photo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get All Photos
router.get("/", async (req, res) => {
  try {
    const photos = await photoModel.getAllPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
