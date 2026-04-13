import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askApi } from "../services/openRouter.services.js";

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

        // 6. AI Prompt (IMPORTANT FIXES HERE)
        const message = [
            {
                role: "system",
                content: `
Extract structured data from resume.

Return strictly JSON:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}`
            },
            {
                role: "user",
                content: resumeText
            }
        ];

        // 7. Call AI
        const aiResponse = await askApi(message);

        // 8. Safe JSON parse (VERY IMPORTANT)
        let parsed;
        try {
            parsed = JSON.parse(aiResponse);
        } catch (err) {
            console.error("JSON parse error:", aiResponse);
            throw new Error("Invalid AI response format");
        }

        // 9. Delete file
        fs.unlinkSync(filePath);

        // 10. Response (FIXED KEY NAME)
        res.json({
            role: parsed.role,
            experience: parsed.experience,
            projects: parsed.projects,
            skills: parsed.skills,
            resumeText
        });

    } catch (error) {
        console.error(error);

        // Safe file delete
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: error.message });
    }
};