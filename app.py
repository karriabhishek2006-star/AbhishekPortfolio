# -*- coding: utf-8 -*-
"""
Karri Venkata Abhishek Reddy - Premium Portfolio Website
Backend: Python Flask
File: app.py
"""

import os
import json
from flask import Flask, render_template, request, jsonify, send_from_directory
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

# Configure secret key for sessions if needed
app.secret_key = os.getenv("FLASK_SECRET_KEY", "abhishek_portfolio_secret_key_2026")

# Initialize Gemini API if key is available
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Profile Data for the AI Assistant context
PORTFOLIO_CONTEXT = {
    "name": "Karri Venkata Abhishek Reddy",
    "title": "Artificial Intelligence Engineering Student & Developer",
    "email": "karriabhishek2006@gmail.com",
    "location": "Andhra Pradesh, India",
    "degree": "B.Tech in Artificial Intelligence",
    "college": "Sri Vasavi Engineering College",
    "graduation_year": "2023 - Present (Final Year)",
    "phone": "Available via Email",
    "career_objective": (
        "Passionate and detail-oriented B.Tech Artificial Intelligence student seeking to "
        "leverage strong software development skills in Python, Flask, and Machine Learning "
        "to build robust, innovative, and user-centric AI solutions. Eager to contribute to "
        "cutting-edge technology projects in a professional, collaborative environment."
    ),
    "education": [
        {
            "institution": "Sri Vasavi Engineering College",
            "degree": "B.Tech in Artificial Intelligence",
            "duration": "2023 - Present",
            "details": "Focusing on Deep Learning, Machine Learning, Python, and Web Frameworks."
        },
        {
            "institution": "Sasi Junior College",
            "degree": "Intermediate (MPC)",
            "duration": "2020 - 2022",
            "details": "Completed higher secondary education with a focus on Mathematics, Physics, and Chemistry."
        },
        {
            "institution": "Bhashyam English Medium School",
            "degree": "SSC (Secondary School Certificate)",
            "duration": "Graduated 2020",
            "details": "Completed secondary school education with an outstanding GPA of 10/10."
        }
    ],
    "skills": {
        "programming": ["Python", "Java", "C++", "JavaScript", "HTML5", "CSS3", "SQL"],
        "frameworks": ["Flask", "Django", "React", "Bootstrap 5"],
        "ai_ml": ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Analysis"],
        "tools_devops": ["Linux", "Git", "VS Code", "GitHub", "Vite"]
    },
    "projects": [
        {
            "title": "Student Admission Portal",
            "description": "A comprehensive web portal designed to streamline the student admission workflow, featuring secure authentication, document uploads, and an interactive admin dashboard.",
            "tech": "Flask, Python, SQL, Bootstrap 5",
            "github": "https://github.com/karriabhishek",
            "demo": "#"
        },
        {
            "title": "AI Chatbot",
            "description": "An intelligent conversational chatbot integrated with a large language model, designed to answer queries, provide contextual responses, and assist users seamlessly.",
            "tech": "Python, Gemini API, JavaScript, Flask",
            "github": "https://github.com/karriabhishek",
            "demo": "#"
        },
        {
            "title": "E-Commerce Website",
            "description": "A fully functional e-commerce web platform showcasing seamless product listing, shopping cart operations, checkout options, and responsive styling.",
            "tech": "React, HTML, CSS, Bootstrap, SQL",
            "github": "https://github.com/karriabhishek",
            "demo": "#"
        },
        {
            "title": "Portfolio Website",
            "description": "The premium portfolio website you are currently viewing! Built to showcase academic accomplishments, core technical skills, and projects with a futuristic and luxury design.",
            "tech": "Flask, Bootstrap 5, Glassmorphism, CSS3",
            "github": "https://github.com/karriabhishek",
            "demo": "#"
        }
    ],
    "certificates": [
        {"issuer": "Oracle", "title": "Oracle Cloud Infrastructure Certified Associate"},
        {"issuer": "Google", "title": "Google Data Analytics Professional Certificate"},
        {"issuer": "IBM", "title": "IBM AI Engineering Specialist"},
        {"issuer": "AWS", "title": "AWS Certified Cloud Practitioner"},
        {"issuer": "Internship", "title": "Web Development & AI Engineering Internships"}
    ],
    "achievements": {
        "projects_completed": "12+",
        "technologies_mastered": "15+",
        "certificates_earned": "8+",
        "programming_languages": "5+"
    }
}

SYSTEM_INSTRUCTION = f"""
You are the personal AI Portfolio Assistant of Karri Venkata Abhishek Reddy.
Your job is to assist recruiters, tech leads, and website visitors by answering questions about Abhishek in an elegant, professional, helpful, and polite manner.

Here is Abhishek's official portfolio data:
- Name: {PORTFOLIO_CONTEXT['name']}
- Title: {PORTFOLIO_CONTEXT['title']}
- Email: {PORTFOLIO_CONTEXT['email']}
- Location: {PORTFOLIO_CONTEXT['location']}
- Degree: {PORTFOLIO_CONTEXT['degree']}
- College: {PORTFOLIO_CONTEXT['college']}
- Graduation: {PORTFOLIO_CONTEXT['graduation_year']}
- Objective: {PORTFOLIO_CONTEXT['career_objective']}
- Contact: {PORTFOLIO_CONTEXT['phone']}

Education Details:
{json.dumps(PORTFOLIO_CONTEXT['education'], indent=2)}

Core Skills:
{json.dumps(PORTFOLIO_CONTEXT['skills'], indent=2)}

Featured Projects:
{json.dumps(PORTFOLIO_CONTEXT['projects'], indent=2)}

Certifications:
{json.dumps(PORTFOLIO_CONTEXT['certificates'], indent=2)}

Key Achievements:
{json.dumps(PORTFOLIO_CONTEXT['achievements'], indent=2)}

Guidelines:
1. Always be professional, confident, and enthusiastic about Abhishek's qualifications.
2. Keep your answers concise, clear, and easy to read. Use bullet points if listing items.
3. Suggest that the visitor contact Abhishek directly at "{PORTFOLIO_CONTEXT['email']}" for interview invites or professional collaborations.
4. If asked questions unrelated to Abhishek or his professional profile, gently steer the conversation back, saying: "I am Abhishek's AI assistant, and I'd be happy to tell you more about his skills, projects, and educational background!"
5. Do not invent details not present in his portfolio. Highlight his active focus on Artificial Intelligence and Flask/Python web development.
"""

@app.route("/")
def home():
    """Render the main portfolio landing page."""
    return render_template("index.html", data=PORTFOLIO_CONTEXT)

@app.route('/src/assets/images/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(app.root_path, 'src', 'assets', 'images'), filename)

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    API endpoint for the interactive AI Portfolio Chatbot.
    Supports integration with the Gemini API or falls back to rules if API key is missing.
    """
    try:
        user_data = request.get_json() or {}
        user_message = user_data.get("message", "").strip()
        
        if not user_message:
            return jsonify({"response": "I didn't receive a message. How can I help you today?"}), 400

        # Attempt to use Gemini API if key is present
        if GEMINI_API_KEY:
            try:
                # Using standard requests to hit Gemini endpoint if google-genai is not installed,
                # or import google.generativeai if available. 
                # This guarantees compatibility without forcing a specific SDK on the user's local python env.
                import requests
                
                # We can call the Gemini API via its REST endpoint
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
                headers = {"Content-Type": "application/json"}
                payload = {
                    "contents": [
                        {"role": "user", "parts": [{"text": user_message}]}
                    ],
                    "systemInstruction": {
                        "parts": [{"text": SYSTEM_INSTRUCTION}]
                    },
                    "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 400
                    }
                }
                
                response = requests.post(url, headers=headers, json=payload, timeout=10)
                if response.status_code == 200:
                    resp_json = response.json()
                    candidates = resp_json.get("candidates", [])
                    if candidates:
                        text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                        if text:
                            return jsonify({"response": text.strip()})
                
                # Fallback to local assistant if the REST call fails
                print(f"Gemini API request failed: {response.text}")
            except Exception as e:
                print(f"Error calling Gemini API: {str(e)}")

        # Rule-Based/Keyword-Based fallback assistant when no API key is set
        msg_lower = user_message.lower()
        
        if "education" in msg_lower or "college" in msg_lower or "study" in msg_lower or "school" in msg_lower or "degree" in msg_lower:
            resp = f"Abhishek is currently pursuing a **{PORTFOLIO_CONTEXT['degree']}** at **{PORTFOLIO_CONTEXT['college']}** (duration: {PORTFOLIO_CONTEXT['graduation_year']}). Prior to this, he completed his Intermediate MPC from Sasi Junior College and his SSC from Bhashyam English Medium School with an excellent 10/10 GPA!"
            
        elif "project" in msg_lower or "admission" in msg_lower or "commerce" in msg_lower or "chatbot" in msg_lower:
            projects_str = "\n".join([f"- **{p['title']}**: {p['description']} (built with *{p['tech']}*)" for p in PORTFOLIO_CONTEXT['projects']])
            resp = f"Abhishek has built several impressive technical projects, including:\n\n{projects_str}\n\nYou can find all GitHub links in the projects section of this page!"
            
        elif "skill" in msg_lower or "programming" in msg_lower or "python" in msg_lower or "language" in msg_lower:
            skills_list = (
                f"**Languages:** {', '.join(PORTFOLIO_CONTEXT['skills']['programming'])}\n"
                f"**Frameworks:** {', '.join(PORTFOLIO_CONTEXT['skills']['frameworks'])}\n"
                f"**AI/ML:** {', '.join(PORTFOLIO_CONTEXT['skills']['ai_ml'])}\n"
                f"**Tools:** {', '.join(PORTFOLIO_CONTEXT['skills']['tools_devops'])}"
            )
            resp = f"Abhishek's core competencies span across software engineering and artificial intelligence:\n\n{skills_list}"
            
        elif "contact" in msg_lower or "email" in msg_lower or "phone" in msg_lower or "hire" in msg_lower or "resume" in msg_lower:
            resp = f"You can contact Abhishek directly via email at **{PORTFOLIO_CONTEXT['email']}**. His current location is **{PORTFOLIO_CONTEXT['location']}**. You can also download or print his professional resume from the Resume section on this website!"
            
        elif "certificate" in msg_lower or "oracle" in msg_lower or "google" in msg_lower or "ibm" in msg_lower or "aws" in msg_lower:
            certs = ", ".join([f"{c['title']} ({c['issuer']})" for c in PORTFOLIO_CONTEXT['certificates']])
            resp = f"Abhishek has earned prestigious industry certifications including: {certs}. These showcase his continuous learning in Cloud, AI, and Data Analytics!"
            
        else:
            resp = (
                f"Hello! I am Abhishek's AI Assistant. I can tell you all about his academic background, technical skills, certifications, and projects.\n\n"
                f"Ask me anything like:\n"
                f"- *Where does Abhishek study and what is his major?*\n"
                f"- *What are his skills in Python and Machine Learning?*\n"
                f"- *Can you list some of his key projects?*\n"
                f"- *How do I contact Abhishek or view his resume?*"
            )
            
        return jsonify({"response": resp})

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    # Flask runs on Port 3000 locally to match VS Code defaults, but bindings are flexible
    app.run(host="0.0.0.0", port=3000, debug=True)
