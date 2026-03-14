import React, { useState } from "react";
import api from "../src/api/axios";

const AddAnnouncementModal = ({ onClose, onSuccess }) => {

  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/announcements", formData);

      if (res.data) {
        alert("Announcement Created ✅");
        onSuccess();
      }

    } catch (error) {
      console.error("Create announcement error", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold text-gray-800">
            Add Announcement
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter announcement title"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

          </div>

          {/* Content */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Content
            </label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              placeholder="Write announcement..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

                      <button
                          type="submit"
                          className="bg-[#021f54] text-white hover:bg-orange-400
    hover:text-black text-sm font-medium px-4 py-1.5
    rounded-md transition-colors duration-200"
                      >
                          Create Announcement
                      </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddAnnouncementModal;