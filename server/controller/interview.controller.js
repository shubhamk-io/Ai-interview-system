import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askApi } from "../services/gemini.services.js";
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

export const analyzeResume = async (req, res) => {
  try {
    // 1. Check file
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const filePath = req.file.path;

    // 2. Read file
    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    // 3. Load PDF
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";

    // 4. Extract text
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map(item => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    // 5. Clean text
    resumeText = resumeText.replace(/\s+/g, " ").trim();

    // 6. AI Prompt (Gemini Friendly)
    const message = [
      {
        role: "user",
        content: `
Extract structured data from this resume.

Return ONLY valid JSON (no explanation):

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}

Resume:
${resumeText}
`
      }
    ];

    // 7. Call AI (✅ FIXED)
    const aiResponse = await askApi({ message });

    // 8. Clean AI response (IMPORTANT)
    let cleaned = aiResponse.trim();

    // remove ```json ``` if exists
    cleaned = cleaned.replace(/```json|```/g, "");

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse error:", cleaned);
      throw new Error("Invalid AI response format");
    }

    // 9. Delete file
    fs.unlinkSync(filePath);

    // 10. Response
    res.json({
      role: parsed.role || "",
      experience: parsed.experience || "",
      projects: parsed.projects || [],
      skills: parsed.skills || [],
      resumeText
    });

  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: error.message });
  }
};


export const generateQuestion = async (req, res) => {
  try {
    const { role, experience, mode, resumeText, projects, skills } = req.body

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res.status(400).json({ message: "Role, Experience and mode are required" })
    }

    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "User is not found"
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: "Not enough credits. Minimum 50 required."
      })
    }

    const projectText = Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const skillText = Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
Role:${role}
Experience:${experience}
InterviewMode:${mode}
Project:${projectText}
Skills:${skillText}
resume:${safeResume}
`;

    if (!userPrompt.trim()) {
      return res.status(400).json({
        message: "Prompt content is empty"
      })
    }

    const message = [

      {
        role: "system",
        content: `
        You are a real human interviw conducting a professional interview.

        Speak in simple, natural English as if you are directly taling to the candidate.

        Generate exactly 5 interview questions.

        Strict Rules:
        - Each question must contain between 15 and 25 words.
        - Each questions must be a single complete sentence. 
        - Do NOT number them.
        - Do NOT add explanations.
        - Do NOT add extra text before or after.
        - One question per line only.
        - Keep language simple and conversational.
        - Questions must feel practical and realistic.

        Difficulty progression:
        Question 1 -> easy
        Question 2 -> easy
        Question 3 -> medium
        Question 4 -> hard
        Question 5 -> hard

Make questions based on the candidat's role, interviewMode, experience, project, skills, and resume details.
        `
      },

      {
        role: "user",
        content: userPrompt
      }
    ];


    const aiResponse = await askApi(message)

    if (!aiResponse || !aiResponse.trim()) {
      return res.status(500).json({
        message: "AI returned empty response"
      })
    }

    const questionsArray = aiResponse
      .split("\n")
      .map(q => q.trim())
      .filter(q => q.length > 0)
      .slice(0, 5)

    if (questionsArray.length === 0) {
      return res.status(500).json({
        meIssage: "AI Faile to generate quesitons."
      });
    }

    user.credits -= 50
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText,
      questions: questionsArray.map((q, index) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "hard", "hard"][index],
        timeLimit: [60, 60, 90, 120, 120][index],
      }))
    })


    res.json({
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions
    });

  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}




