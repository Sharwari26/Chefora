const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, async (req, res) => {
  try {
    const { ingredients, dietary, cuisine } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: 'Please provide ingredients' });
    }

    const prompt = `You are a professional chef. Generate a detailed recipe using these ingredients: ${ingredients.join(', ')}.
${dietary ? `Dietary preference: ${dietary}` : ''}
${cuisine ? `Cuisine style: ${cuisine}` : ''}

Respond ONLY with a valid JSON object in this exact format, no extra text, no markdown:
{
  "title": "Recipe Name",
  "description": "One line description",
  "prepTime": "X min",
  "cookTime": "X min",
  "servings": 4,
  "difficulty": "Easy",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "ingredients": ["200g ingredient 1", "2 tbsp ingredient 2"],
  "instructions": ["Step 1 instruction", "Step 2 instruction"]
}`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rawText = response.data.choices[0].message.content;
    console.log('Groq raw response:', rawText.substring(0, 100));

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ message: 'AI response was not valid JSON' });
    }

    const recipe = JSON.parse(jsonMatch[0]);
    recipe.isAIGenerated = true;

    res.json({ recipe });

  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'AI generation failed', error: error.message });
  }
});

module.exports = router;