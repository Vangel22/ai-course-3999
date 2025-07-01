const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const chatWithAI = async (prompt) => {
  // req.body
  try {
    const response = await cohere.v2.chat({
      model: "command-r",
      messages: [{ role: "user", content: prompt }], // chat history array
      temperature: 0.1,
      // Lower values more accurate
      // Higher values more creative but not so accurate
    });

    console.log(response);

    return {
      success: true,
      answer: response.message.content[0].text,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};

module.exports = { chatWithAI };
