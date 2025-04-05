import { PrismaClient } from "@prisma/client";
import axios from "axios"; // For calling AI API
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export const getCareerRecommendations = async (req, res) => {
  try {
    // Fetch user data from DB
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { careerInterests: true, skills: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.careerInterests || !user.skills) {
      return res.status(400).json({ message: "Please update your profile with career interests and skills first." });
    }

    // Call Gemini model to generate recommendations
    const aiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `Suggest career paths based on these skills: ${user.skills} and interests: ${user.careerInterests}` }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // console.log("Gemini API Response:", aiResponse.data);

    if (!aiResponse.data.candidates || aiResponse.data.candidates.length === 0) {
        return res.status(500).json({ message: "No recommendations found" });
    }

    const recommendations = aiResponse.data.candidates[0].content.parts[0].text;
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
