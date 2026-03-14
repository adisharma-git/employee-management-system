import React, { useEffect, useState } from "react";

const GithubCommits = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/repos/adisharma-git/employee-management-system/commits?per_page=10")
      .then((res) => res.json())
      .then((data) => {
        setCommits(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-blue-600">
          Latest Repository Commits
        </h2>

        <a
          href="https://github.com/adisharma-git/employee-management-system"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View Repository
        </a>
      </div>

      {loading && (
        <div className="text-center text-gray-500">Loading commits...</div>
      )}

      <div className="space-y-4">
        {commits.map((commit) => (
          <div
            key={commit.sha}
            className="border rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <div className="flex items-start justify-between">
              
              <div>
                <p className="font-medium text-gray-800">
                  {commit.commit.message}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {commit.commit.author.name} •{" "}
                  {new Date(commit.commit.author.date).toLocaleString()}
                </p>
              </div>

              <a
                href={commit.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubCommits;