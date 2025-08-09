# 🎨 DreamSketch — AI-Powered Image Generation Platform

DreamSketch is a modern AI image generation web app that lets users **pick styles**, choose between **Stability AI** and **ClipDrop** as providers, and instantly create high-quality AI-generated images from text prompts.  
Built with **React, Tailwind CSS, Node.js, Express, and REST APIs**, it’s fast, beautiful, and fun to use.  

---

## 🚀 Live Demo  
🔗 **[View Live Site](https://your-live-site-link.com)**  

📽 **Demo Video (Click to Play)**  
[![Watch the video](https://img.shields.io/badge/▶%20Watch%20Demo-blue?style=for-the-badge)](demo/demo.mp4)  

You can also [download the demo video](demo/demo.mp4) and play it locally.

---

## ✨ Features
- 🎨 **Multiple Styles** – Anime, Ghibli, Watercolor, Cyberpunk, Pixel Art, and more.
- 🖼 **AI Image Generation** – Powered by Stability AI & ClipDrop APIs.
- ⚡ **Instant Preview** – See generated images in real-time.
- 📥 **Easy Download** – Save generated images directly.
- 📱 **Responsive UI** – Works seamlessly across all devices.
- 🎭 **Interactive Animations** – Smooth UI with motion effects.

---

## 🛠 Tech Stack
**Frontend**  
- React.js  
- Tailwind CSS  
- Framer Motion  

**Backend**  
- Node.js  
- Express.js  
- Stability AI API  
- ClipDrop API  

**Deployment**  
- Render / Vercel  

---

## 🧑‍💻 Installation & Setup

```bash
# Clone repository
git clone https://github.com/YOUR_GITHUB_USERNAME/DreamSketch.git

# Navigate to folder
cd DreamSketch

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Create .env file in server folder with:
STABILITY_API_KEY=your_key
CLIPDROP_API_KEY=your_key

# Start backend server
cd ../server
npm run start

# Start frontend
cd ../client
npm start
