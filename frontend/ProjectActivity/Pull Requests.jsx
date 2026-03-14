import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodePullRequest,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const PullRequests = () => {
  const [pulls, setPulls] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/adisharma-git/employee-management-system/pulls?state=all"
    )
      .then((res) => res.json())
      .then((data) => setPulls(data));
  }, []);

  const activePR = pulls.filter((pr) => pr.state === "open");
  const completedPR = pulls.filter((pr) => pr.state === "closed");

  const getFilteredPR = () => {
    if (activeTab === "active") return activePR;
    if (activeTab === "completed") return completedPR;
    return pulls;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faGithub} className="text-2xl text-gray-700" />
        <h2 className="text-xl font-semibold text-blue-600">
          Repository Pull Requests
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <FontAwesomeIcon
            icon={faCodePullRequest}
            className="text-blue-600 text-2xl"
          />
          <div>
            <p className="text-gray-500 text-sm">Total Pull Requests</p>
            <p className="text-xl font-bold text-blue-600">{pulls.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <FontAwesomeIcon icon={faClock} className="text-yellow-600 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Active Pull Requests</p>
            <p className="text-xl font-bold text-yellow-600">
              {activePR.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-green-50 border border-green-200 p-4 rounded-lg">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-600 text-2xl"
          />
          <div>
            <p className="text-gray-500 text-sm">Completed Pull Requests</p>
            <p className="text-xl font-bold text-green-600">
              {completedPR.length}
            </p>
          </div>
        </div>

      </div>


      <div className="flex gap-4 border-b mb-5">

        {["all", "active", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 pb-2 capitalize transition ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Pull Requests List */}
      <div className="space-y-3">

        {getFilteredPR().map((pr) => (
          <div
            key={pr.id}
            className="flex items-center justify-between border rounded-lg p-4 hover:bg-blue-50 transition"
          >
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <img
                src={pr.user.avatar_url}
                alt=""
                className="w-10 h-10 rounded-full border"
              />

              <div>
                <p className="font-medium text-gray-800">{pr.title}</p>
                <p className="text-sm text-gray-500">
                  {pr.user.login} •{" "}
                  {new Date(pr.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <a
              href={pr.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              View
            </a>
          </div>
        ))}

      </div>
    </div>
  );
};

export default PullRequests;