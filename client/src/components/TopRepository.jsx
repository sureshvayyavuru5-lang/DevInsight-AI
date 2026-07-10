function TopRepository({ repos }) {

  if (!repos || repos.length === 0) {
    return null;
  }

  // Find repository with highest stars
  const topRepo = repos.reduce((prev, current) =>
    prev.stargazers_count > current.stargazers_count ? prev : current
  );

  return (
    <div className="top-repo">

      <h2>🏆 Top Repository</h2>

      <h3>{topRepo.name}</h3>

      <p>⭐ Stars: {topRepo.stargazers_count}</p>

      <p>🍴 Forks: {topRepo.forks_count}</p>

      <p>💻 Language: {topRepo.language || "Not Available"}</p>

      <a
        href={topRepo.html_url}
        target="_blank"
        rel="noreferrer"
        className="repo-btn"
      >
        🔗 Open Repository
      </a>

    </div>
  );
}

export default TopRepository;