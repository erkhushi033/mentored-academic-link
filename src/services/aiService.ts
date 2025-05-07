
import { toast } from "sonner";

const API_URL = "https://api.openai.com/v1/chat/completions";

// This is a placeholder API key variable - in production, this should be securely managed
// In a real app, you would use environment variables or have the API key on the server side
let API_KEY = "";

export const configureAIService = (apiKey: string) => {
  API_KEY = apiKey;
};

export const getAIResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    // If no API key is set, use our mock service
    return getMockAIResponse(prompt);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful academic assistant that provides concise, accurate responses to student questions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast.error("Failed to get a response from the AI assistant");
    return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
  }
};

function getMockAIResponse(prompt: string): string {
  // These are mock responses that simulate an AI chat assistant
  const promptLower = prompt.toLowerCase();
  
  // Academic topic detection
  if (promptLower.includes("math") || promptLower.includes("calculus") || promptLower.includes("equation")) {
    return "Mathematics is all about problem-solving approaches. For calculus problems, try breaking them down into steps: understand the question, identify the relevant formulas, apply appropriate techniques (like derivatives or integrals), and verify your answer. Would you like me to help with a specific math concept?";
  }
  
  if (promptLower.includes("physics") || promptLower.includes("force") || promptLower.includes("motion")) {
    return "Physics problems typically involve identifying the relevant laws (like Newton's laws or conservation principles), setting up equations that represent the situation, and solving for unknowns. Remember to check units and dimensional consistency. Is there a specific physics topic you're studying?";
  }
  
  if (promptLower.includes("chemistry") || promptLower.includes("reaction") || promptLower.includes("molecule")) {
    return "Chemistry concepts often build upon each other. Understanding atomic structure leads to understanding bonding, which helps explain reactions. When studying reactions, focus on conservation of mass and energy. Would you like to discuss a particular chemistry topic?";
  }
  
  if (promptLower.includes("biology") || promptLower.includes("cell") || promptLower.includes("organism")) {
    return "Biology involves understanding systems at different scales - from molecules to cells to organisms to ecosystems. When studying complex biological processes, try to understand the function at each level and how they integrate. Is there a specific biology concept you're working on?";
  }
  
  if (promptLower.includes("history") || promptLower.includes("century") || promptLower.includes("war")) {
    return "Historical analysis involves examining causes and effects, considering multiple perspectives, and placing events in their broader context. When studying history, timelines and connections between events are important. What historical period or event are you interested in?";
  }
  
  if (promptLower.includes("literature") || promptLower.includes("book") || promptLower.includes("novel") || promptLower.includes("poem")) {
    return "Literary analysis involves examining elements like theme, character development, symbolism, and narrative structure. Consider the historical and cultural context in which a work was written. Would you like to discuss a specific literary work?";
  }
  
  // Study techniques
  if (promptLower.includes("study") || promptLower.includes("exam") || promptLower.includes("test")) {
    return "Effective study techniques include active recall (testing yourself), spaced repetition (reviewing material at increasing intervals), explaining concepts in your own words, and connecting new information to things you already know. Creating mind maps or teaching concepts to others can also reinforce learning. Would you like more specific study tips?";
  }
  
  if (promptLower.includes("memory") || promptLower.includes("remember") || promptLower.includes("memorize")) {
    return "To improve memory retention, try techniques like creating mnemonic devices, chunking information into manageable groups, using visual imagery, practicing spaced repetition, and ensuring adequate sleep. Physical exercise and proper nutrition also support cognitive function.";
  }
  
  if (promptLower.includes("essay") || promptLower.includes("writing") || promptLower.includes("paper")) {
    return "Academic writing improves with clear structure and planning. Start with an outline, develop a strong thesis statement, support your arguments with evidence, and revise thoroughly. Remember to cite sources properly and check university guidelines for formatting requirements.";
  }
  
  if (promptLower.includes("time") || promptLower.includes("schedule") || promptLower.includes("procrastination")) {
    return "Time management for students can be improved by breaking large tasks into smaller ones, using a calendar or planner, setting specific goals for each study session, and eliminating distractions. The Pomodoro Technique (25 minutes of focused work followed by a 5-minute break) works well for many students.";
  }
  
  // Default responses
  const defaultResponses = [
    "That's an interesting question. To help you effectively, could you provide more details about the specific academic concept or problem you're working with?",
    "I'd be happy to help with your academic question. To give you the best guidance, could you specify what subject area this relates to and what aspect you're finding challenging?",
    "I'm your academic assistant and I'm here to help. Could you elaborate on your question so I can provide more specific guidance?",
    "Learning is a journey! To help you with this particular question, I'd need a bit more context about what you're studying and what concepts you've covered so far."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
