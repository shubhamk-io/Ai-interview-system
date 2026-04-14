import axios from "axios"

export const askApi = async ({ message }) => {
    try {
        if (!message || !Array.isArray(message) || message.length === 0) {
            throw new Error("Message array is empty.")
        }

        // Convert OpenAI message format → Gemini contents format
        const contents = message.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }))

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
            { contents },
            {
                headers: {
                    "x-goog-api-key": process.env.GEMINI_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        )

        const content = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.")
        }

        return content

    } catch (error) {
        console.log("Gemini API Error:", error.response?.data || error.message)
        throw new Error("Gemini API Error")
    }
}