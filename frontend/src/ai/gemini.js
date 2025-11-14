import axios from "axios";

const GEMINI_API_KEY = "AIzaSyAzCfN3u2jEO63wK9I5J79eRZZXQvGpwiM";

export async function askGemini(prompt) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Suggestion is unavailable right now.";
  }
}
