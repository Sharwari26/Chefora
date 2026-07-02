const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Recipe = require('./models/Recipe');

const recipes = [
  {
    title: "Fluffy Buttermilk Pancakes",
    description: "Light, golden pancakes with crisp edges and a tender center. Perfect weekend breakfast.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    category: "Breakfast",
    tags: ["pancakes", "breakfast", "sweet"],
    isFeatured: true,
    ingredients: [
      "200g all-purpose flour",
      "2 tbsp sugar",
      "1 tsp baking powder",
      "1/2 tsp baking soda",
      "1/4 tsp salt",
      "300ml buttermilk",
      "1 large egg",
      "2 tbsp melted butter"
    ],
    instructions: [
      "Whisk together the flour, sugar, baking powder, baking soda, and salt in a large bowl.",
      "In another bowl, whisk the buttermilk, egg, and melted butter together.",
      "Pour the wet ingredients into the dry and stir until just combined — lumps are fine.",
      "Heat a non-stick pan over medium heat and pour in 1/4 cup of batter per pancake.",
      "Cook until bubbles form on the surface (about 2 min), then flip and cook 1 more minute.",
      "Serve warm with maple syrup and fresh berries."
    ]
  },
  {
    title: "Creamy Tomato Basil Soup",
    description: "Velvety roasted tomato soup finished with cream and fresh basil. Cozy comfort in a bowl.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    prepTime: "10 min",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Easy",
    category: "Soup",
    tags: ["soup", "tomato", "comfort food"],
    isFeatured: true,
    ingredients: [
      "800g canned crushed tomatoes",
      "1 medium onion, chopped",
      "4 garlic cloves",
      "2 tbsp olive oil",
      "1 cup heavy cream",
      "1 tsp sugar",
      "Salt and pepper to taste",
      "Fresh basil leaves"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add onion and cook until soft, about 5 minutes.",
      "Add garlic and cook for 1 more minute until fragrant.",
      "Pour in the crushed tomatoes, add sugar, salt and pepper. Simmer for 20 minutes.",
      "Use an immersion blender to blend the soup until smooth.",
      "Stir in the heavy cream and heat gently — do not boil.",
      "Serve topped with fresh basil leaves and a drizzle of olive oil."
    ]
  },
  {
    title: "Classic Spaghetti Carbonara",
    description: "Authentic Roman pasta with eggs, pecorino, and crispy pancetta. Ready in 20 minutes.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    prepTime: "5 min",
    cookTime: "20 min",
    servings: 2,
    difficulty: "Medium",
    category: "Pasta",
    tags: ["pasta", "italian", "quick"],
    isFeatured: true,
    ingredients: [
      "200g spaghetti",
      "100g pancetta or bacon",
      "2 large eggs",
      "50g Pecorino Romano, grated",
      "50g Parmesan, grated",
      "Black pepper",
      "Salt for pasta water"
    ],
    instructions: [
      "Cook spaghetti in heavily salted boiling water until al dente. Reserve 1 cup pasta water.",
      "Fry pancetta in a pan until crispy. Remove from heat.",
      "Whisk eggs with grated cheeses and lots of black pepper in a bowl.",
      "Add hot pasta to the pancetta pan off the heat. Toss well.",
      "Pour egg mixture over pasta, tossing quickly and adding pasta water to create a creamy sauce.",
      "Serve immediately with extra cheese and black pepper."
    ]
  },
  {
    title: "Avocado Toast with Poached Egg",
    description: "Creamy smashed avocado on sourdough topped with a perfectly poached egg.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
    difficulty: "Easy",
    category: "Breakfast",
    tags: ["avocado", "eggs", "healthy", "breakfast"],
    isFeatured: false,
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 eggs",
      "1 tbsp white vinegar",
      "Lemon juice",
      "Red pepper flakes",
      "Salt and pepper"
    ],
    instructions: [
      "Toast the sourdough slices until golden and crisp.",
      "Mash avocado with lemon juice, salt and pepper.",
      "Bring a pot of water to a gentle simmer and add vinegar.",
      "Crack each egg into a small cup and slide gently into the simmering water.",
      "Poach for 3 minutes until whites are set but yolk is runny.",
      "Spread avocado on toast, top with poached egg, and sprinkle with red pepper flakes."
    ]
  },
  {
    title: "Chicken Tikka Masala",
    description: "Tender chicken in a rich, spiced tomato cream sauce. A true crowd-pleaser.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    prepTime: "20 min",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    category: "Indian",
    tags: ["chicken", "indian", "curry", "spicy"],
    isFeatured: false,
    ingredients: [
      "500g chicken breast, cubed",
      "200ml plain yogurt",
      "2 tbsp tikka masala spice mix",
      "1 onion, diced",
      "400g canned tomatoes",
      "200ml heavy cream",
      "3 garlic cloves",
      "1 tsp ginger",
      "2 tbsp oil"
    ],
    instructions: [
      "Marinate chicken in yogurt and 1 tbsp spice mix for at least 1 hour.",
      "Grill or pan-fry chicken until charred on edges. Set aside.",
      "Sauté onion in oil until golden. Add garlic, ginger and remaining spices.",
      "Add canned tomatoes and simmer for 15 minutes until thick.",
      "Blend the sauce until smooth, then return to pan.",
      "Add cream and cooked chicken. Simmer 5 minutes. Serve with naan."
    ]
  },
  {
    title: "Lemon Garlic Butter Salmon",
    description: "Pan-seared salmon with a rich lemon garlic butter sauce. Dinner in 15 minutes.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
    prepTime: "5 min",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    category: "Seafood",
    tags: ["salmon", "fish", "healthy", "quick"],
    isFeatured: false,
    ingredients: [
      "2 salmon fillets",
      "3 tbsp butter",
      "4 garlic cloves, minced",
      "Juice of 1 lemon",
      "Fresh parsley",
      "Salt and pepper",
      "1 tbsp olive oil"
    ],
    instructions: [
      "Season salmon with salt and pepper on both sides.",
      "Heat olive oil in a skillet over medium-high heat.",
      "Cook salmon skin-side up for 4 minutes, then flip and cook 3 more minutes.",
      "Remove salmon and add butter and garlic to the same pan.",
      "Cook garlic for 1 minute, then add lemon juice.",
      "Pour sauce over salmon and garnish with fresh parsley."
    ]
  },
  {
    title: "Classic Beef Tacos",
    description: "Seasoned ground beef in crispy taco shells with all your favourite toppings.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Easy",
    category: "Mexican",
    tags: ["tacos", "beef", "mexican", "fun"],
    isFeatured: false,
    ingredients: [
      "500g ground beef",
      "8 taco shells",
      "1 packet taco seasoning",
      "1/4 cup water",
      "Shredded lettuce",
      "Diced tomatoes",
      "Grated cheddar cheese",
      "Sour cream"
    ],
    instructions: [
      "Brown ground beef in a skillet over medium heat, breaking it up as it cooks.",
      "Drain excess fat from the pan.",
      "Add taco seasoning and water. Stir and simmer for 5 minutes.",
      "Warm taco shells in the oven at 180°C for 3 minutes.",
      "Fill shells with beef mixture.",
      "Top with lettuce, tomatoes, cheese and sour cream. Serve immediately."
    ]
  },
  {
    title: "Mushroom Risotto",
    description: "Creamy, slow-cooked Italian risotto with earthy mushrooms and Parmesan.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800",
    prepTime: "10 min",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    category: "Italian",
    tags: ["risotto", "mushroom", "italian", "vegetarian"],
    isFeatured: false,
    ingredients: [
      "300g Arborio rice",
      "250g mushrooms, sliced",
      "1L warm vegetable stock",
      "1 onion, finely diced",
      "3 garlic cloves",
      "100ml white wine",
      "50g Parmesan, grated",
      "2 tbsp butter",
      "2 tbsp olive oil"
    ],
    instructions: [
      "Sauté onion and garlic in olive oil until soft. Add mushrooms and cook until golden.",
      "Add rice and toast for 2 minutes, stirring constantly.",
      "Pour in wine and stir until absorbed.",
      "Add warm stock one ladle at a time, stirring until each addition is absorbed.",
      "Continue for 25-30 minutes until rice is creamy and al dente.",
      "Stir in butter and Parmesan. Season and serve immediately."
    ]
  },
  {
    title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center. The ultimate dessert indulgence.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    prepTime: "15 min",
    cookTime: "12 min",
    servings: 4,
    difficulty: "Medium",
    category: "Dessert",
    tags: ["chocolate", "dessert", "cake", "indulgent"],
    isFeatured: true,
    ingredients: [
      "200g dark chocolate",
      "100g butter",
      "3 eggs",
      "3 egg yolks",
      "100g icing sugar",
      "50g all-purpose flour",
      "Butter and cocoa for ramekins"
    ],
    instructions: [
      "Preheat oven to 200°C. Butter 4 ramekins and dust with cocoa powder.",
      "Melt chocolate and butter together in a heatproof bowl.",
      "Whisk eggs, yolks and icing sugar until pale and thick.",
      "Fold chocolate mixture into egg mixture, then fold in flour.",
      "Divide batter among ramekins. Refrigerate for 30 minutes or bake immediately.",
      "Bake for 12 minutes — edges should be set but center still jiggly. Serve immediately."
    ]
  },
  {
    title: "Greek Salad",
    description: "Fresh Mediterranean salad with crisp vegetables, olives and creamy feta cheese.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    prepTime: "15 min",
    cookTime: "0 min",
    servings: 4,
    difficulty: "Easy",
    category: "Salad",
    tags: ["salad", "greek", "healthy", "vegetarian"],
    isFeatured: false,
    ingredients: [
      "2 large tomatoes, chopped",
      "1 cucumber, chopped",
      "1 red onion, sliced",
      "200g feta cheese",
      "100g Kalamata olives",
      "3 tbsp olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano"
    ],
    instructions: [
      "Combine tomatoes, cucumber and red onion in a large bowl.",
      "Add olives and crumble feta cheese on top.",
      "Drizzle with olive oil and red wine vinegar.",
      "Sprinkle with dried oregano, salt and pepper.",
      "Toss gently and serve immediately."
    ]
  },
  {
    title: "Banana Smoothie Bowl",
    description: "Thick, creamy blended banana bowl loaded with fresh toppings. Healthy never looked so good.",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 2,
    difficulty: "Easy",
    category: "Breakfast",
    tags: ["smoothie", "healthy", "vegan", "breakfast"],
    isFeatured: false,
    ingredients: [
      "3 frozen bananas",
      "100ml almond milk",
      "1 tbsp peanut butter",
      "Granola for topping",
      "Fresh berries",
      "Chia seeds",
      "Honey to drizzle"
    ],
    instructions: [
      "Blend frozen bananas with almond milk and peanut butter until thick and smooth.",
      "Pour into two bowls.",
      "Top with granola, fresh berries and chia seeds.",
      "Drizzle with honey and serve immediately."
    ]
  },
  {
    title: "Garlic Butter Shrimp Pasta",
    description: "Juicy shrimp tossed with pasta in a garlicky white wine butter sauce.",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 4,
    difficulty: "Easy",
    category: "Pasta",
    tags: ["pasta", "shrimp", "seafood", "quick"],
    isFeatured: false,
    ingredients: [
      "400g linguine",
      "500g large shrimp, peeled",
      "5 garlic cloves, minced",
      "100ml white wine",
      "4 tbsp butter",
      "2 tbsp olive oil",
      "Fresh parsley",
      "Lemon juice",
      "Red pepper flakes"
    ],
    instructions: [
      "Cook linguine in salted boiling water until al dente. Reserve 1/2 cup pasta water.",
      "Season shrimp with salt, pepper and red pepper flakes.",
      "Heat olive oil and 2 tbsp butter in a large pan over high heat.",
      "Cook shrimp for 1-2 minutes per side until pink. Remove and set aside.",
      "Add garlic to the pan, cook 30 seconds, then add white wine.",
      "Add remaining butter, pasta and shrimp. Toss with pasta water to create sauce. Finish with lemon and parsley."
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Recipe.deleteMany({});
    console.log('🗑️  Cleared existing recipes');

    await Recipe.insertMany(recipes);
    console.log('✅ 12 recipes seeded successfully!');

    mongoose.connection.close();
    console.log('✅ Done! You can now start the server.');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();