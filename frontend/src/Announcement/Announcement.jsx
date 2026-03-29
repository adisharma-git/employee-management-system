import React, { useEffect, useState } from "react";
import AddAnnouncementModal from "./AddAnnouncementModal";
import api from "../api/axios";
import { usePermission } from "../hooks/usePermission";

const AnnouncementPage = () => {

  const { can } = usePermission();

  // 🔥 permissions yahin handle hongi
  const canCreate = can("create_announcement");

  const [announcements, setAnnouncements] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnnouncements(page);
  }, [page]);

  const fetchAnnouncements = async (pageNum) => {
    try {
      const res = await api.get(`/announcements?page=${pageNum}&limit=10`);

      if (res.data.success) {
        setAnnouncements(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Fetch announcements error", error);
    }
  };

  const handleSuccess = () => {
    fetchAnnouncements(page);
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Announcements
          </h1>
          <p className="text-gray-500 text-sm">
            Manage company announcements
          </p>
        </div>

        {/* 🔥 BUTTON CONTROL (FINAL) */}
        {canCreate && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#021f54] text-white hover:bg-orange-400
            hover:text-black text-sm font-medium px-4 py-1.5
            rounded-md transition-colors duration-200"
          >
            + Add Announcement
          </button>
        )}

      </div>

      {/* List */}
      <div className="grid gap-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-1 text-sm max-w-xl">
                {item.content}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 block">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>

              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mt-2 inline-block">
                Published
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <AddAnnouncementModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;