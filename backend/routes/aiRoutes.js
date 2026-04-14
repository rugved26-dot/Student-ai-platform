const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenAI } = require('@google/genai');


const upload = multer({ storage: multer.memoryStorage() });

const aiOptions = process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {};
const ai = new GoogleGenAI(aiOptions);

router.post('/search', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    const prompt = `You are a helpful student assistant. Please provide comprehensive, structured, and easy-to-understand study notes for the topic: "${topic}". 
    Also, recommend exactly 3 high-quality YouTube search queries or video titles for this topic.
    IMPORTANT: Respond ONLY with a valid JSON object matching this schema exactly:
    {
      "notes": "Detailed notes goes here. You can use markdown formatting.",
      "recommendedVideos": [
         {"title": "Video Title Example", "query": "Youtube Search Query"}
      ]
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let text = response.text;
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n?/, '').replace(/\n?```\s*$/, '');
    }
    const parsedData = JSON.parse(text);
    res.json(parsedData);
  } catch (error) {
    console.error('Error generating notes:', error);
    res.status(500).json({ error: 'Failed to generate topic notes' });
  }
});

router.post('/summarize', upload.single('document'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Document is required' });

  try {
    let textContent = '';

    if (req.file.mimetype === 'application/pdf') {
      try {

        const pdfParse = require('pdf-parse/lib/pdf-parse'); // bypasses the test file loading
        const pdfData = await pdfParse(req.file.buffer);
        textContent = pdfData.text;
      } catch (e) {
        console.error('PDF parsing error:', e);
        textContent = req.file.buffer.toString('utf8');
      }
    } else {
      textContent = req.file.buffer.toString('utf8');
    }

    if (!textContent || textContent.trim() === '') {
      return res.status(400).json({ error: 'Could not extract text from document.' });
    }

    const prompt = `Please provide a clear, concise, and structured summary of the following educational document content. 
    Focus on the main ideas, key takeaways, and definitions. Format it beautifully using markdown.
    
    Document Content:
    ${textContent.substring(0, 50000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ summary: response.text });
  } catch (error) {
    console.error('Error summarizing document:', error);
    res.status(500).json({ error: 'Failed to summarize document' });
  }
});

module.exports = router;