export async function generateQuiz(prompt) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyBi8wbH2BX77MbCjbBjwwfTGVLl_64fq4Q';
  
  if (!apiKey) {
    throw new Error("Missing Gemini API Key. Please configure it in your environment.");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Invalid response format from Gemini API.");
    }
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error; // Let caller handle
  }
}
