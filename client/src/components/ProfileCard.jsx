import StatCard from "./StatCard";
import "../styles/StatCard.css";

function ProfileCard({ profile }) {
  return (
    <div className="profile-card">

      <img
        src={profile.avatar_url}
        alt="Profile"
        className="profile-image"
      />

      <h2>
        👤 {profile.name || profile.login}
      </h2>

      <p>
        {profile.bio || "GitHub Developer"}
      </p>

      <div className="profile-stats">

        <StatCard
          icon="📁"
          value={profile.public_repos}
          title="Repositories"
        />

        <StatCard
          icon="👥"
          value={profile.followers}
          title="Followers"
        />

        <StatCard
          icon="🤝"
          value={profile.following}
          title="Following"
        />

      </div>

      <a
        href={profile.html_url}
        target="_blank"
        rel="noreferrer"
        className="profile-btn"
      >
        🔗 View GitHub Profile
      </a>

    </div>
  );
}

export default ProfileCard;