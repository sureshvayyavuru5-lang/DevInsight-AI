import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import "../styles/Chart.css";

function Chart({ repos }) {
  const data = repos.map((repo) => ({
    name: repo.name,
    stars: repo.stargazers_count,
  }));

  return (
    <div className="chart-container">
      <h2>⭐ Repository Stars</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={70}
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="stars"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;