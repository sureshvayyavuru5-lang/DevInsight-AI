import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { jsPDF } from "jspdf";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Chart from "../components/Chart";
import LanguageChart from "../components/LanguageChart";
import TopRepository from "../components/TopRepository";
import AISummary from "../components/AISummary";
import RepoCard from "../components/RepoCard";
import Sidebar from "../components/Sidebar";
import OverviewCards from "../components/OverviewCards";
import DeveloperScore from "../components/DeveloperScore";

import "../styles/Dashboard.css";
import "../styles/Responsive.css";

  function Dashboard() {
  const { darkMode } = useContext(ThemeContext);

  const API_URL = "https://devinsight-ai-production.up.railway.app";

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepos = async (username) => {
    if (!username) return;

    setLoading(true);
    setError("");

    try {
      // Profile
      const profileRes = await fetch(`${API_URL}/github/${username}`);

      if (!profileRes.ok) {
        throw new Error("GitHub user not found");
      }

      const profileData = await profileRes.json();
      setProfile(profileData);

      // Repositories
      const repoRes = await fetch(`${API_URL}/repos/${username}`);

      if (!repoRes.ok) {
        throw new Error("Unable to fetch repositories");
      }

      const repoData = await repoRes.json();

      if (Array.isArray(repoData)) {
        setRepos(repoData);
      } else {
        setRepos([]);
      }
    } catch (err) {
      console.error(err);

      setError(err.message || "Something went wrong.");

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
    doc.text("DevInsight AI Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`Name : ${profile.name || profile.login}`, 20, 40);
    doc.text(`Username : ${profile.login}`, 20, 50);
    doc.text(`Followers : ${profile.followers}`, 20, 60);
    doc.text(`Following : ${profile.following}`, 20, 70);
    doc.text(`Repositories : ${profile.public_repos}`, 20, 80);

    doc.text("Top Repositories", 20, 100);

    repos.slice(0, 5).forEach((repo, index) => {
      doc.text(`${index + 1}. ${repo.name}`, 25, 115 + index * 10);
    });

    doc.save(`${profile.login}-GitHub-Report.pdf`);
  };

  return (
  <div className={darkMode ? "app-layout dark" : "app-layout"}>
    <Sidebar />

    <div className="dashboard">
      <Navbar />

        <SearchBar onSearch={fetchRepos} />

        {loading && <Loader />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && profile && (
          <>
            <button className="pdf-btn" onClick={downloadReport}>
              📄 Download Report
            </button>
            <OverviewCards repos={repos} />

            <ProfileCard profile={profile} />

            <Chart repos={repos} />

            <LanguageChart repos={repos} />

            <TopRepository repos={repos} />

            <AISummary profile={profile} repos={repos} />
            <DeveloperScore repos={repos} />

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