import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RepoCard from "../components/RepoCard";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Chart from "../components/Chart";
import LanguageChart from "../components/LanguageChart";
import TopRepository from "../components/TopRepository";
import AISummary from "../components/AISummary";

import "../styles/Dashboard.css";
import "../styles/Responsive.css";

function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepos = async (user) => {
    setLoading(true);
    setError("");

    try {
      const profileResponse = await fetch(
        `http://localhost:5000/github/${user}`
      );

      if (!profileResponse.ok) {
        throw new Error("GitHub user not found");
      }

      const profileData = await profileResponse.json();
      setProfile(profileData);

      const repoResponse = await fetch(
        `http://localhost:5000/repos/${user}`
      );

      const repoData = await repoResponse.json();

      setRepos(Array.isArray(repoData) ? repoData : []);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to backend.");
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos("octocat");
  }, []);

  const downloadReport = () => {
    if (!profile) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("DevInsight AI - GitHub Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Name: ${profile.name || profile.login}`, 20, 40);
    doc.text(`Username: ${profile.login}`, 20, 50);
    doc.text(`Followers: ${profile.followers}`, 20, 60);
    doc.text(`Following: ${profile.following}`, 20, 70);
    doc.text(`Repositories: ${profile.public_repos}`, 20, 80);

    doc.text("Top Repositories:", 20, 100);

    repos.slice(0, 5).forEach((repo, index) => {
      doc.text(`${index + 1}. ${repo.name}`, 25, 115 + index * 10);
    });

    doc.save(`${profile.login}-GitHub-Report.pdf`);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="dashboard">
        <Navbar />

        <SearchBar onSearch={fetchRepos} />

        {error && <ErrorMessage message={error} />}
        {loading && <Loader />}

        {!loading && !error && profile && (
          <>
            <button className="pdf-btn" onClick={downloadReport}>
              📄 Download Report
            </button>

            <ProfileCard profile={profile} />

            <h2>📊 Repository Stars Analytics</h2>

            <Chart repos={repos} />

            <LanguageChart repos={repos} />

            <TopRepository repos={repos} />

            <AISummary
              profile={profile}
              repos={repos}
            />

            <div className="repositories">
              <h2>📁 Repositories</h2>

              {repos.length > 0 ? (
                repos.map((repo) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                  />
                ))
              ) : (
                <p>No repositories found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;