import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../styles/AISummary.css";

function AISummary({ profile, repos }) {
  const [summary, setSummary] = useState("🤖 Generating AI Summary...");

  useEffect(() => {
    if (!profile || repos.length === 0) return;

    const generateSummary = async () => {
      try {
        const genAI = new GoogleGenerativeAI(
          import.meta.env.VITE_GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

        const repoNames = repos
          .slice(0, 10)
          .map((repo) => repo.name)
          .join(", ");

        const prompt = `
You are an expert GitHub reviewer.

Analyze this GitHub profile and write:
- 3 to 5 concise sentences
- Mention strengths
- Mention primary technologies
- Mention development focus
- Keep it professional

Name: ${profile.name || profile.login}

Bio:
${profile.bio || "No bio"}

Repositories:
${repoNames}
`;

        const result = await model.generateContent(prompt);

        setSummary(result.response.text());
      } catch (error) {
        console.error(error);
        setSummary("❌ Unable to generate AI summary.");
      }
    };

    generateSummary();
  }, [profile, repos]);

  return (
    <div className="ai-summary">
      <h2>🤖 AI Developer Summary</h2>
      <p>{summary}</p>
    </div>
  );
}

export default AISummary;