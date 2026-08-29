import express from "express";
import "dotenv/config";
import { InferenceClient } from "@huggingface/inference";

const router = express.Router();

console.log("HF TOKEN:", process.env.HF_TOKEN ? "FOUND" : "MISSING");

const client = new InferenceClient(process.env.HF_TOKEN);

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hugging Face image generation is running",
  });
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    console.log("Generating image:", prompt);

    const imageBlob = await client.textToImage({
      provider: "fal-ai",
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
    });

    const buffer = Buffer.from(await imageBlob.arrayBuffer());

    const base64Image = buffer.toString("base64");

    console.log("Image generated successfully");

    res.status(200).json({
      success: true,
      photo: base64Image,
    });
  } catch (error) {
    console.error("Hugging Face Error:", error);

    res.status(error?.status || 500).json({
      success: false,
      error: error?.message || "Failed to generate image",
    });
  }
});

export default router;
