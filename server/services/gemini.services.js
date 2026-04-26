import axios from "axios"

export const askApi = async (message) => {
    try {
        if (!message || !Array.isArray(message) || message.length === 0) {
            throw new Error("Message array is empty.")
        }

        // Convert system role → prepend to first user message
        let systemPrompt = "";
        const userMessages = [];

        for (const msg of message) {
            if (msg.role === "system") {
                systemPrompt = msg.content + "\n\n";
            } else {
                userMessages.push(msg);
            }
        }

        // Inject system prompt into first user message
        if (systemPrompt && userMessages.length > 0) {
            userMessages[0] = {
                ...userMessages[0],
                content: systemPrompt + userMessages[0].content
            };
        }

        if (userMessages.length === 0) {
            throw new Error("Message array is empty.")
        }

        // Convert messages to Gemini format
        const contents = userMessages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }))

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent",
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
        console.error("Gemini API Error:", error.response?.data || error.message)
        throw new Error("Gemini API Error")
    }
}