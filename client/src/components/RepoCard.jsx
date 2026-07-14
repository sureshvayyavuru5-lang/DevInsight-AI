import "../styles/RepoCard.css";

function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3>📁 {repo.name}</h3>

      <p>
        ⭐ <strong>Stars:</strong> {repo.stargazers_count}
      </p>

      <p>
        🍴 <strong>Forks:</strong> {repo.forks_count}
      </p>

      <p>
        💻 <strong>Language:</strong> {repo.language || "Not Available"}
      </p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="repo-btn"
      >
        🔗 View Repository
      </a>
    </div>
  );
}

export default RepoCard;