import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>🚀 DevInsight AI</h2>
        <p>Developer Dashboard</p>
      </div>

      <ul className="menu">
        <li>🏠 Dashboard</li>
        <li>👤 Profile</li>
        <li>📊 Analytics</li>
        <li>📁 Repositories</li>
        <li>🤖 AI Summary</li>
        <li>📄 Reports</li>
        <li>⚙️ Settings</li>
      </ul>

      <div className="sidebar-footer">
        <p>Version 2.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;