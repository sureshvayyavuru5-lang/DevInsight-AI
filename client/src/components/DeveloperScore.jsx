import "../styles/DeveloperScore.css";

function DeveloperScore({ repos }) {
  if (!repos || repos.length === 0) return null;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  let score = 50;

  score += Math.min(totalStars * 2, 20);
  score += Math.min(repos.length, 20);

  if (score > 100) score = 100;

  return (
    <div className="developer-score">
      <h2>🧠 AI Developer Score</h2>

      <h1>{score}/100</h1>

      <div className="strengths">
        <h3>✅ Strengths</h3>

        <ul>
          <li>✔ Active GitHub Profile</li>
          <li>✔ Multiple Repositories</li>
          <li>✔ Open Source Development</li>
        </ul>
      </div>

      <div className="suggestions">
        <h3>🚀 Suggestions</h3>

        <ul>
          <li>Improve documentation</li>
          <li>Add more starred projects</li>
          <li>Build larger full-stack apps</li>
        </ul>
      </div>
    </div>
  );
}

export default DeveloperScore;