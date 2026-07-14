import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "../styles/Chart.css";

function LanguageChart({ repos }) {
  const languageCount = {};

  repos.forEach((repo) => {
    const lang = repo.language || "Unknown";
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });

  const data = Object.keys(languageCount).map((lang) => ({
    name: lang,
    value: languageCount[lang],
  }));

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f97316",
    "#a855f7",
    "#06b6d4",
    "#e11d48",
    "#facc15",
    "#64748b",
  ];

  return (
    <div className="chart-container">
      <h2>💻 Repository Languages</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LanguageChart;