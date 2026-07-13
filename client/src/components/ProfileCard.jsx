import StatCard from "./StatCard";
import "../styles/StatCard.css";

function ProfileCard({ profile }) {

  if (!profile) return null;

  return (
    <div className="profile-card">

      <img
        src={profile.avatar_url}
        alt={profile.login}
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
          value={profile.public_repos ?? 0}
          title="Repositories"
        />


        <StatCard
          icon="👥"
          value={profile.followers ?? 0}
          title="Followers"
        />


        <StatCard
          icon="🤝"
          value={profile.following ?? 0}
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