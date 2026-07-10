function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <h3>📁 {repo.name}</h3>

      <p>⭐ Stars: {repo.stargazers_count}</p>

      <p>🍴 Forks: {repo.forks_count}</p>

      <p>💻 Language: {repo.language || "Not Available"}</p>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="repo-btn"
      >
        🔗 Open Repository
      </a>
    </div>
  );
}

export default RepoCard;