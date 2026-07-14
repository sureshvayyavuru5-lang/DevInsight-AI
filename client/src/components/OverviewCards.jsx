import "../styles/OverviewCards.css";

function OverviewCards({ repos }) {
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const totalRepos = repos.length;

  const languages = [
    ...new Set(
      repos
        .map((repo) => repo.language)
        .filter(Boolean)
    ),
  ].length;

  return (
    <div className="overview-grid">
      <div className="overview-card">
        <h1>⭐</h1>
        <h2>{totalStars}</h2>
        <p>Total Stars</p>
      </div>

      <div className="overview-card">
        <h1>🍴</h1>
        <h2>{totalForks}</h2>
        <p>Total Forks</p>
      </div>

      <div className="overview-card">
        <h1>📁</h1>
        <h2>{totalRepos}</h2>
        <p>Repositories</p>
      </div>

      <div className="overview-card">
        <h1>💻</h1>
        <h2>{languages}</h2>
        <p>Languages</p>
      </div>
    </div>
  );
}

export default OverviewCards;