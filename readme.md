# 🍳 Chefora – Your AI Cooking Companion

A full-stack AI-powered recipe web application built with the MERN stack. Chefora lets users discover recipes, generate AI-powered meals from their available ingredients, upload their own recipes, and save their favourites.

---

## 🌟 Features

- 🔐 **Gmail OTP Authentication** — Secure signup and login with real OTP verification sent to your Gmail
- 🏠 **Home Page** — Beautiful recipe card grid with 12 pre-loaded curated recipes
- 🔍 **Live Search** — Search recipes as you type by name, description or tags
- 📂 **Category Filtering** — Filter recipes by Breakfast, Pasta, Indian, Dessert and more
- 📖 **Recipe Detail Page** — Full recipe view with ingredients, step-by-step instructions, prep/cook time and difficulty
- 🤖 **AI Recipe Generator** — Enter ingredients you have at home and AI generates a full recipe instantly (powered by Groq + Llama)
- ❤️ **Favourites System** — Save and unsave recipes with a single click
- 📤 **Upload Recipes** — Share your own recipes with photo upload via Cloudinary
- 🛡️ **Admin Approval Panel** — Admin reviews and approves user-uploaded recipes before they go live
- 🗑️ **Delete Recipes** — Admin can reject and permanently delete uploaded recipes

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (port 3000) |
| Backend | Node.js + Express.js (port 5000) |
| Database | MongoDB Atlas |
| AI Generation | Groq API (Llama 3.3 70B) |
| Email OTP | Nodemailer (Gmail) |
| Image Upload | Cloudinary |
| Authentication | JWT Tokens + bcryptjs |
| Routing | React Router DOM |
| Notifications | React Hot Toast |

---

## 📁 Project Structure

```
Chefora/
├── client/                          # React Frontend
│   └── src/
│       ├── components/
│       │   ├── Navbar.js            # Sticky navigation bar
│       │   ├── RecipeCard.js        # Recipe card with favourite toggle
│       │   ├── Footer.js            # Site footer
│       │   └── Loader.js            # Loading spinner
│       ├── pages/
│       │   ├── Login.js             # Login page
│       │   ├── Signup.js            # Signup page
│       │   ├── VerifyOTP.js         # OTP verification page
│       │   ├── Home.js              # Main home page with recipes
│       │   ├── RecipeDetail.js      # Full recipe detail page
│       │   ├── UploadRecipe.js      # Upload your own recipe
│       │   ├── AIGenerator.js       # AI recipe generator
│       │   ├── Favourites.js        # Saved favourites page
│       │   ├── AdminPanel.js        # Admin approval panel
│       │   └── NotFound.js          # 404 page
│       ├── context/
│       │   └── AuthContext.js       # Global auth state
│       └── utils/
│           └── api.js               # All API calls (axios)
│
└── server/                          # Node.js Backend
    ├── models/
    │   ├── User.js                  # User schema (name, email, password, OTP, favourites)
    │   └── Recipe.js                # Recipe schema (ingredients, instructions, approval status)
    ├── routes/
    │   ├── auth.js                  # Signup, OTP verify, Login routes
    │   ├── recipes.js               # CRUD + favourites + admin routes
    │   └── ai.js                    # AI generation route (Groq)
    ├── middleware/
    │   └── auth.js                  # JWT protect middleware
    ├── utils/
    │   ├── sendEmail.js             # Nodemailer OTP email sender
    │   └── cloudinary.js            # Cloudinary + multer config
    ├── seed.js                      # Seeds 12 pre-built recipes into DB
    └── server.js                    # Express app entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` folder with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/chefora?appName=<cluster>
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:3000
```

### How to get each key:
| Key | Where to get it |
|---|---|
| `MONGO_URI` | [mongodb.com/atlas](https://mongodb.com/atlas) → Connect → Drivers |
| `JWT_SECRET` | Any random string you choose |
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | [Google App Password](https://myaccount.google.com/apppasswords) |
| `CLOUDINARY_*` | [cloudinary.com](https://cloudinary.com) → Dashboard |
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → Free API Key |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- MongoDB Atlas account (free)
- Cloudinary account (free)
- Groq account (free)
- Gmail account with App Password enabled

---

### Step 1 — Clone and open project

```bash
# Open the Chefora folder in VS Code
# Then open the terminal (Ctrl + `)
```

---

### Step 2 — Set up the Backend

```bash
cd server
npm install
```

Create your `.env` file inside `server/` and fill in all the values listed above.

---

### Step 3 — Seed the database with 12 recipes

```bash
cd server
node seed.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing recipes
✅ 12 recipes seeded successfully!
```

---

### Step 4 — Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Server running on port 5000
```

---

### Step 5 — Set up the Frontend

Open a **second terminal** in VS Code:

```bash
cd client
npm install
npm start
```

Your browser will open at `http://localhost:3000` automatically.

---

## 📱 Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/login` | Login Page | Public |
| `/signup` | Signup Page | Public |
| `/verify-otp` | OTP Verification | Public |
| `/` | Home Page | Protected |
| `/recipe/:id` | Recipe Detail | Protected |
| `/upload` | Upload Recipe | Protected |
| `/ai-generator` | AI Generator | Protected |
| `/favourites` | Favourites | Protected |
| `/admin` | Admin Panel | Protected |

---

## 🤖 AI Recipe Generation

Chefora uses the **Groq API** with the **Llama 3.3 70B** model to generate recipes. It's completely free!

How it works:
1. User enters ingredients they have at home
2. Optionally selects dietary preference and cuisine style
3. Clicks **✨ Generate My Recipe**
4. Groq AI generates a complete recipe with ingredients and step-by-step instructions
5. User can regenerate or save the recipe

---

## 🛡️ Admin Panel

The admin panel at `/admin` lets you:
- View all **pending user-uploaded recipes** waiting for approval
- See who uploaded each recipe (name + email)
- **Approve** recipes → they appear on the Home page instantly
- **Reject & Delete** recipes → permanently removed from the database

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Login/Signup | Beautiful split-screen with orange gradient |
| Home | Recipe grid with search, filters and featured section |
| Recipe Detail | Full recipe with hero image, info cards, ingredients and instructions |
| AI Generator | Ingredient input → AI-generated recipe displayed on the right |
| Favourites | Pink gradient hero with saved recipe grid |
| Admin Panel | Pending recipe cards with approve/reject buttons |

---

## 🙏 Credits

Built as a full-stack learning project using:
- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Groq API](https://console.groq.com) — Free AI inference
- [Cloudinary](https://cloudinary.com) — Image hosting
- [Unsplash](https://unsplash.com) — Recipe images

---

## 👩‍💻 Developer

**Sharwari Tunge**
GitHub: [github.com/Sharwari26](https://github.com/Sharwari26)

---

*Chefora – Cook smarter with AI* 🍳✨