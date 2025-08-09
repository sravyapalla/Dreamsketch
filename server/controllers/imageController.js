// server/controllers/imageController.js
import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModel.js";

function buildPrompt(prompt, styleSuffix) {
  return `${prompt || ""}${styleSuffix || ""}`.trim();
}

// Map "1024x1024" etc. to Stability aspect ratios
function sizeToAspect(size = "1024x1024") {
  const s = (size || "").toLowerCase();
  if (s === "1024x1024" || s === "512x512" || s === "256x256") return "1:1";
  if (s === "768x1024" || s === "3:4") return "3:4";
  if (s === "1024x768" || s === "4:3") return "4:3";
  if (s === "1280x720" || s === "16:9") return "16:9";
  if (s === "720x1280" || s === "9:16") return "9:16";
  return "1:1";
}

export const generateImage = async (req, res) => {
  try {
    const {
      prompt,
      provider = "stability", // "stability" | "clipdrop"
      styleSuffix = "",
      size = "1024x1024",
      n = 1, // (ignored by stability; we generate 1)
    } = req.body;

    const userId = req.userId;
    if (!prompt || !userId) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findById(userId).select("creditBalance");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if ((user.creditBalance ?? 0) <= 0) {
      return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance ?? 0 });
    }

    // ---------- STABILITY AI ----------
    if (provider === "stability") {
      const finalPrompt = buildPrompt(prompt, styleSuffix);
      const formData = new FormData();
      formData.append("prompt", finalPrompt);
      formData.append("mode", "text-to-image");
      formData.append("output_format", "png");
      formData.append("aspect_ratio", sizeToAspect(size));

      const resp = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
            Accept: "image/*",
            ...formData.getHeaders(),
          },
          responseType: "arraybuffer",
          timeout: 60000,
        }
      );

      const base64 = Buffer.from(resp.data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64}`;

      const updated = await userModel.findByIdAndUpdate(
        userId,
        { $inc: { creditBalance: -1 } },
        { new: true, projection: { creditBalance: 1 } }
      );

      return res.json({
        success: true,
        message: "Image generated",
        resultImage,
        creditBalance: updated?.creditBalance ?? 0,
      });
    }

    // ---------- CLIPDROP ----------
    if (provider === "clipdrop") {
      const finalPrompt = buildPrompt(prompt, styleSuffix);
      const formData = new FormData();
      formData.append("prompt", finalPrompt);

      const { data } = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            "x-api-key": process.env.CLIPDROP_API,
            ...formData.getHeaders(),
          },
          responseType: "arraybuffer",
          timeout: 60000,
        }
      );

      const base64Image = Buffer.from(data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64Image}`;

      const updated = await userModel.findByIdAndUpdate(
        userId,
        { $inc: { creditBalance: -1 } },
        { new: true, projection: { creditBalance: 1 } }
      );

      return res.json({
        success: true,
        message: "Image generated",
        resultImage,
        creditBalance: updated?.creditBalance ?? 0,
      });
    }

    return res.json({ success: false, message: "Unknown provider" });
  } catch (error) {
    const status = error?.response?.status;
    const body = error?.response?.data;
    console.error("generateImage error:", status || "", body || error);
    return res.json({
      success: false,
      message: body?.error || body?.message || error.message || "Generation failed",
    });
  }
};
