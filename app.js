// server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Vastu prompt
const VASTU_PROMPT = `
You are an expert Vastu Shastra consultant with 30 years of experience. 
Provide detailed, practical advice based on Vastu principles for any query.

Guidelines:
1. Be specific and actionable
2. Reference traditional Vastu principles
3. Suggest remedies when pointing out issues
4. Be culturally sensitive and professional

Format responses with:
- Analysis of the situation
- Vastu principles involved
- Recommended solutions
- Placement suggestions when applicable
`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    
    // Get the Gemini model - use the correct model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",  // Note: removed "models/" prefix
      generationConfig: {
        // maxOutputTokens: 1000,
        temperature: 0.7,
      }
    });
    
    // Format chat history for Gemini
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: VASTU_PROMPT }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am now a Vastu Shastra expert ready to provide detailed consultations." }]
        },
        ...chatHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ]
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.message 
    });
  }
});

app.get('/api/v1/test', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    const response = await result.response;
    res.json({ success: true, text: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});