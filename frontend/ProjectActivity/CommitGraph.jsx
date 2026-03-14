import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CommitGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/adisharma-git/employee-management-system/commits?per_page=100"
    )
      .then((res) => res.json())
      .then((commits) => {

        const commitsByDate = {};

        commits.forEach((commit) => {
          const date = new Date(commit.commit.author.date)
            .toISOString()
            .split("T")[0];

          commitsByDate[date] = (commitsByDate[date] || 0) + 1;
        });

        const formatted = Object.keys(commitsByDate).map((date) => ({
          date,
          commits: commitsByDate[date],
        }));

        setData(formatted);
      });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 h-[320px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        GitHub Commit Activity
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="commits"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitGraph;