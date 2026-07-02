import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Serve static assets from 'static' folder under '/static' path
app.use("/static", express.static(path.join(process.cwd(), "static")));

// Serve assets from src/assets/images folder under '/src/assets/images' path
app.use("/src/assets/images", express.static(path.join(process.cwd(), "src", "assets", "images")));

// Portfolio data matching the Python Flask app.py for consistency
const PORTFOLIO_CONTEXT = {
  name: "Karri Venkata Abhishek Reddy",
  title: "Artificial Intelligence Engineering Student & Developer",
  email: "karriabhishek2006@gmail.com",
  location: "Andhra Pradesh, India",
  degree: "B.Tech in Artificial Intelligence",
  college: "Sri Vasavi Engineering College",
  graduation_year: "2023 - Present (Final Year)",
  phone: "Available via Email",
  career_objective: (
    "Passionate and detail-oriented B.Tech Artificial Intelligence student seeking to " +
    "leverage strong software development skills in Python, Flask, and Machine Learning " +
    "to build robust, innovative, and user-centric AI solutions. Eager to contribute to " +
    "cutting-edge technology projects in a professional, collaborative environment."
  ),
  education: [
    {
      institution: "Sri Vasavi Engineering College",
      degree: "B.Tech in Artificial Intelligence",
      duration: "2023 - Present",
      details: "Focusing on Deep Learning, Machine Learning, Python, and Web Frameworks."
    },
    {
      institution: "Sasi Junior College",
      degree: "Intermediate (MPC)",
      duration: "2020 - 2022",
      details: "Completed higher secondary education with a focus on Mathematics, Physics, and Chemistry."
    },
    {
      institution: "Bhashyam English Medium School",
      degree: "SSC (Secondary School Certificate)",
      duration: "Graduated 2020",
      details: "Completed secondary school education with an outstanding GPA of 10/10."
    }
  ],
  skills: {
    programming: ["Python", "Java", "C++", "JavaScript", "HTML5", "CSS3", "SQL"],
    frameworks: ["Flask", "Django", "React", "Bootstrap 5"],
    ai_ml: ["Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Analysis"],
    tools_devops: ["Linux", "Git", "VS Code", "GitHub", "Vite"]
  },
  projects: [
    {
      title: "Student Admission Portal",
      description: "A comprehensive web portal designed to streamline the student admission workflow, featuring secure authentication, document uploads, and an interactive admin dashboard.",
      tech: "Flask, Python, SQL, Bootstrap 5",
      github: "https://github.com/karriabhishek",
      demo: "#"
    },
    {
      title: "AI Chatbot",
      description: "An intelligent conversational chatbot integrated with a large language model, designed to answer queries, provide contextual responses, and assist users seamlessly.",
      tech: "Python, Gemini API, JavaScript, Flask",
      github: "https://github.com/karriabhishek",
      demo: "#"
    },
    {
      title: "E-Commerce Website",
      description: "A fully functional e-commerce web platform showcasing seamless product listing, shopping cart operations, checkout options, and responsive styling.",
      tech: "React, HTML, CSS, Bootstrap, SQL",
      github: "https://github.com/karriabhishek",
      demo: "#"
    },
    {
      title: "Portfolio Website",
      description: "The premium portfolio website you are currently viewing! Built to showcase academic accomplishments, core technical skills, and projects with a futuristic and luxury design.",
      tech: "Flask, Bootstrap 5, Glassmorphism, CSS3",
      github: "https://github.com/karriabhishek",
      demo: "#"
    }
  ],
  certificates: [
    { issuer: "Oracle", title: "Oracle Cloud Infrastructure Certified Associate" },
    { issuer: "Google", title: "Google Data Analytics Professional Certificate" },
    { issuer: "IBM", title: "IBM AI Engineering Specialist" },
    { issuer: "AWS", title: "AWS Certified Cloud Practitioner" },
    { issuer: "Internship", title: "Web Development & AI Engineering Internships" }
  ],
  achievements: {
    projects_completed: "12+",
    technologies_mastered: "15+",
    certificates_earned: "8+",
    programming_languages: "5+"
  }
};

const SYSTEM_INSTRUCTION = `
You are the personal AI Portfolio Assistant of Karri Venkata Abhishek Reddy.
Your job is to assist recruiters, tech leads, and website visitors by answering questions about Abhishek in an elegant, professional, helpful, and polite manner.

Here is Abhishek's official portfolio data:
- Name: ${PORTFOLIO_CONTEXT.name}
- Title: ${PORTFOLIO_CONTEXT.title}
- Email: ${PORTFOLIO_CONTEXT.email}
- Location: ${PORTFOLIO_CONTEXT.location}
- Degree: ${PORTFOLIO_CONTEXT.degree}
- College: ${PORTFOLIO_CONTEXT.college}
- Graduation: ${PORTFOLIO_CONTEXT.graduation_year}
- Objective: ${PORTFOLIO_CONTEXT.career_objective}
- Contact: ${PORTFOLIO_CONTEXT.phone}

Education Details:
${JSON.stringify(PORTFOLIO_CONTEXT.education, null, 2)}

Core Skills:
${JSON.stringify(PORTFOLIO_CONTEXT.skills, null, 2)}

Featured Projects:
${JSON.stringify(PORTFOLIO_CONTEXT.projects, null, 2)}

Certifications:
${JSON.stringify(PORTFOLIO_CONTEXT.certificates, null, 2)}

Key Achievements:
${JSON.stringify(PORTFOLIO_CONTEXT.achievements, null, 2)}

Guidelines:
1. Always be professional, confident, and enthusiastic about Abhishek's qualifications.
2. Keep your answers concise, clear, and easy to read. Use bullet points if listing items.
3. Suggest that the visitor contact Abhishek directly at "${PORTFOLIO_CONTEXT.email}" for interview invites or professional collaborations.
4. If asked questions unrelated to Abhishek or his professional profile, gently steer the conversation back, saying: "I am Abhishek's AI assistant, and I'd be happy to tell you more about his skills, projects, and educational background!"
5. Do not invent details not present in his portfolio. Highlight his active focus on Artificial Intelligence and Flask/Python web development.
`;

// Lazy Gemini API initialization helper (prevents app crash if key is missing)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// REST route to deliver portfolio data to client if requested
app.get("/api/portfolio-data", (req, res) => {
  res.json(PORTFOLIO_CONTEXT);
});

// Interactive AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ response: "Message content is required." });
    }

    const client = getGeminiClient();
    if (client) {
      try {
        const response = await client.models.generateContent({
          model: "gemini-3.5-flash",
          contents: message.trim(),
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return res.json({ response: response.text.trim() });
        }
      } catch (err) {
        console.error("Gemini API call failed:", err);
      }
    }

    // Elegant rule-based fallback assistant when Gemini API Key is missing or fails
    const msgLower = message.toLowerCase();
    let resp = "";

    if (msgLower.includes("education") || msgLower.includes("college") || msgLower.includes("study") || msgLower.includes("school") || msgLower.includes("degree")) {
      resp = `Abhishek is currently pursuing his **${PORTFOLIO_CONTEXT.degree}** at **${PORTFOLIO_CONTEXT.college}** (${PORTFOLIO_CONTEXT.graduation_year}). Prior to this, he completed his Intermediate MPC at Sasi Junior College and his SSC from Bhashyam English Medium School with an outstanding GPA of 10/10!`;
    } else if (msgLower.includes("project") || msgLower.includes("admission") || msgLower.includes("commerce") || msgLower.includes("chatbot")) {
      const projectsList = PORTFOLIO_CONTEXT.projects.map(p => `- **${p.title}**: ${p.description} (built with *${p.tech}*)`).join("\n");
      resp = `Abhishek has built several impressive technical projects, including:\n\n${projectsList}\n\nYou can find details and source links in the projects section of this page!`;
    } else if (msgLower.includes("skill") || msgLower.includes("programming") || msgLower.includes("python") || msgLower.includes("language")) {
      const skillsStr = 
        `**Languages:** ${PORTFOLIO_CONTEXT.skills.programming.join(", ")}\n` +
        `**Frameworks:** ${PORTFOLIO_CONTEXT.skills.frameworks.join(", ")}\n` +
        `**AI/ML:** ${PORTFOLIO_CONTEXT.skills.ai_ml.join(", ")}\n` +
        `**Tools:** ${PORTFOLIO_CONTEXT.skills.tools_devops.join(", ")}`;
      resp = `Abhishek's core competencies span across software engineering and artificial intelligence:\n\n${skillsStr}`;
    } else if (msgLower.includes("contact") || msgLower.includes("email") || msgLower.includes("phone") || msgLower.includes("hire") || msgLower.includes("resume")) {
      resp = `You can contact Abhishek directly via email at **${PORTFOLIO_CONTEXT.email}**. He is based in **${PORTFOLIO_CONTEXT.location}**. You can also download, view or print his professional resume from the Resume section of this website!`;
    } else if (msgLower.includes("certificate") || msgLower.includes("oracle") || msgLower.includes("google") || msgLower.includes("ibm") || msgLower.includes("aws")) {
      const certs = PORTFOLIO_CONTEXT.certificates.map(c => `${c.title} (${c.issuer})`).join(", ");
      resp = `Abhishek has earned prestigious industry certifications, including: ${certs}. These demonstrate his continuous learning and commitment to state-of-the-art technology!`;
    } else {
      resp = `Hello! I am Abhishek's AI Assistant. I can tell you all about his academic background, technical skills, certifications, and projects.\n\nAsk me anything like:\n- *Where does Abhishek study and what is his major?*\n- *What are his skills in Python and Machine Learning?*\n- *Can you list some of his key projects?*\n- *How do I contact Abhishek or view his resume?*`;
    }

    return res.json({ response: resp });
  } catch (error) {
    console.error("Internal server error in chat API:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Render index.html for any frontend requests
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "templates", "index.html"));
});

// Catch-all route to serve index.html for SPA/HTML routing
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "templates", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Node Express Server running at http://localhost:${PORT}`);
});
