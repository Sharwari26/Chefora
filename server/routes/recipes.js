const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

// ─── ADMIN MIDDLEWARE ─────────────────────────────────
const adminOnly = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// ─── GET ALL RECIPES ──────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {
      $or: [
        { uploadedBy: null },
        { isApproved: true }
      ]
    };

    if (search) {
      query.$and = [{
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ]
      }];
      delete query.$or;
      query.$or = [
        { uploadedBy: null },
        { isApproved: true }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const recipes = await Recipe.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── GET USER'S FAVOURITES ────────────────────────────
// ⚠️ Must be before /:id route
router.get('/user/favourites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favourites');
    res.json({ favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── GET USER'S UPLOADED RECIPES ─────────────────────
// ⚠️ Must be before /:id route
router.get('/user/uploads', protect, async (req, res) => {
  try {
    const recipes = await Recipe.find({ uploadedBy: req.user._id });
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── GET PENDING RECIPES ──────────────────────────────
// ⚠️ Must be before /:id route
router.get('/admin/pending', protect, adminOnly, async (req, res) => {
  try {
    const recipes = await Recipe.find({
      uploadedBy: { $ne: null },
      isApproved: false
    }).populate('uploadedBy', 'name email');
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── GET SINGLE RECIPE ────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ recipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── UPLOAD A RECIPE ──────────────────────────────────
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    const {
      title, description, prepTime,
      cookTime, servings, difficulty,
      ingredients, instructions, category, tags
    } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      prepTime,
      cookTime,
      servings: Number(servings),
      difficulty,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      category,
      tags: tags ? JSON.parse(tags) : [],
      image: req.file ? req.file.path : '',
      uploadedBy: req.user._id,
      isApproved: false
    });

    res.status(201).json({ message: 'Recipe submitted for approval!', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── TOGGLE FAVOURITE ─────────────────────────────────
router.post('/favourite/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;

    const isFav = user.favourites.includes(recipeId);

    if (isFav) {
      user.favourites = user.favourites.filter(
        id => id.toString() !== recipeId
      );
    } else {
      user.favourites.push(recipeId);
    }

    await user.save();

    res.json({
      message: isFav ? 'Removed from favourites' : 'Added to favourites',
      isFavourite: !isFav
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── APPROVE A RECIPE ─────────────────────────────────
router.put('/admin/approve/:id', protect, adminOnly, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe approved!', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─── DELETE A RECIPE ──────────────────────────────────
router.delete('/delete/:id', protect, adminOnly, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe deleted!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;