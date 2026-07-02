# 🌌 Premium AI Personal Portfolio Website

A highly polished, luxury, glassmorphic portfolio website built for **Karri Venkata Abhishek Reddy**, B.Tech Artificial Intelligence student. This portfolio is designed to look like a modern, professional, high-end engineer portfolio from companies like Apple, Google, Tesla, or OpenAI. It features dark visual modes, glowing accents, scroll animations, dynamic counters, and a fully functional **Interactive AI Assistant (Chatbot)** integrated with Gemini to answer recruiters' questions in real-time.

---

## 🚀 Key Features

*   **Premium Visual Identity**: Designed with a dark space slate backdrop, glowing blue-cyan neon rings, glassmorphism, and custom negative space layout.
*   **Ambient Background Video**: Supports a looping, muted, full-screen background video overlay with custom color-grading glass layers.
*   **Dynamic Role Typist**: Interactively animates educational focus and skill tags (AI Engineer, Python Developer, Machine Learning Enthusiast, etc.) dynamically.
*   **Core Skills Bento Progress Grid**: Custom styled progress trackers showing coding language and engineering proficiencies.
*   **Bento Project Showcase**: Displays featured projects with glowing card boundaries, tag arrays, and functional actions.
*   **Interactive AI Recruiter Assistant**: A floating chat widget enabling users to discuss Abhishek's skills, academics, and projects using Gemini.
*   **Responsive Precision**: Crafted using Bootstrap 5 fluid grid components to render perfectly across desktops, tablets, and phones.
*   **Resume Download, View & Print**: Live preview of professional resume sheet with seamless integration to print or download immediately.

---

## 📂 Project Structure

```text
Portfolio/
│
├── app.py                # Python Flask Backend (For local Python run)
├── server.ts             # Node.js Express Backend (For live server runtime)
│
├── templates/
│   └── index.html        # Main HTML5 Template (Bootstrap 5 & Lucide Icons)
│
├── static/
│   ├── css/
│   │   └── style.css     # Premium Custom Styles (Glassmorphism & animations)
│   ├── js/
│   │   └── script.js    # Typing role loops, counters, dynamic modal & Chatbot API calls
│   ├── images/
│   │   ├── profile.jpg   # Professional profile avatar placeholder
│   │   └── logo.png      # Minimal monogram logo asset
│   ├── videos/
│   │   └── bg.mp4        # Loop background video placeholder
│   └── resume/
│       └── Resume.pdf    # Downloadable Resume PDF placeholder
│
├── package.json          # Node configuration file (Build & Dev server)
└── README.md             # Guide documentation (This file!)
```

---

## 🛠️ Local Setup Guide (Visual Studio Code)

Follow these easy steps to launch this portfolio website on your local machine using **Python Flask**:

### 1. Prerequisites
Ensure you have **Python 3.x** installed on your system. You can verify this by running:
```bash
python --version
```

### 2. Open Project in VS Code
1. Open Visual Studio Code.
2. Select **File > Open Folder...** and select the `Portfolio/` root directory.

### 3. Set Up Virtual Environment (Recommended)
Open a terminal in VS Code (Ctrl+\`) and run:
```bash
# Create a virtual environment
python -m venv venv

# Activate Virtual Environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 4. Install Dependencies
Install Python Flask and dotenv to handle configuration:
```bash
pip install Flask python-dotenv requests
```

### 5. Configure Environment Secrets
Create a `.env` file in your root folder:
```env
# Optional: Set your Gemini API Key to enable the Interactive AI Assistant chatbot
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 6. Run Python Flask Server
Start the Flask application:
```bash
python app.py
```
Open your browser and navigate to: `http://localhost:3000`

---

## 🤖 Configuring the AI Assistant Chatbot
The portfolio's interactive chatbot acts as an AI agent for Abhishek.
1. When a recruiter queries the chatbot, it relays the question to the backend (`app.py` or `server.ts`).
2. If a `GEMINI_API_KEY` is loaded into the environment, the server communicates with Gemini's API (`gemini-3.5-flash`), priming it with Abhishek's complete biography, skills, and project list.
3. If no key is configured, the chatbot falls back to a clever, keywords-based interactive assistant which answers common queries instantly (Education, Projects, Skills, Contacts).

To get an API key:
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API key**.
3. Add the key to your `.env` configuration file.

---

## 🎨 Visual Assets Customization

*   **Profile Picture**: Replace `/static/images/profile.jpg` with your professional headshot.
*   **Video Background**: Place a lightweight looping video file (e.g. abstract network dots, cosmic grids) at `/static/videos/bg.mp4`.
*   **Resume File**: Replace `/static/resume/Resume.pdf` with your actual professional CV PDF file.

---

## 📜 Copyright
&copy; 2026 **Karri Venkata Abhishek Reddy**. Developed with professional craftsmanship and state-of-the-art AI design.
