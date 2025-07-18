// routes/insights.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
console.log("Insight route hit!");


router.post("/", async (req, res) => {
    try {
        const { labels, values, xLabel, yLabel } = req.body;

        const prompt = `
You are a data analyst. Analyze this chart data.

X-axis (${xLabel}): ${labels.join(', ')}
Y-axis (${yLabel}): ${values.join(', ')}

Provide a short professional summary with key trends or insights.
        `.trim();

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            }
        );

        const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text 
            || "No insights generated.";

        res.json({ insights: aiResponse });

    } catch (error) {
  console.error("Gemini Insight Error:");
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  } else {
    console.error("Message:", error.message);
  }
  res.status(500).json({ error: "Failed to generate insights" });
}

});

module.exports = router;
