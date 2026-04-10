

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume required" })
        }

        const filePath = req.file.path

        const fileBuffer = await fs.promises.readFile(filePath)
const uint8Array = new Uint8Array(fileBuffer)

const pdf = await pdfjsLib.getDocument({data:uint8Array}).promise;

let resumeText = "";

//Extract text from all pages
for(let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const pageText = content.items.map(item => item.str).join(" ");
    resumeText += pageText + "\n";
}

resumeText = resumeText
.replace(/\s+/g, " ")
.trim();

    } catch (error) {

    }
}