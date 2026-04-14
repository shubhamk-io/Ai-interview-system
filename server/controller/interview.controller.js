import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askApi } from "../services/gemini.services.js";

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