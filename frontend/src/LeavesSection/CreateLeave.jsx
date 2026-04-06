import React, { useState, useEffect } from "react";
import api from "../api/axios";

const CreateLeave = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    defaultDays: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "defaultDays" ? parseFloat(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Leave name is required";
    }

    if (formData.defaultDays === "" || Number.isNaN(Number(formData.defaultDays)) || Number(formData.defaultDays) <= 0) {
      newErrors.defaultDays = "Default days must be greater than 0";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Reason is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Reason must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const fetchLeaves = async () => {
    try {
      const response = await api.get('/leave-types');
      console.log('Fetched Leaves:', response.data.data);
    }
    catch(error){
      console.error('Error fetching leave types:', error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await api.post('/leave-types', {
          ...formData,
          defaultDays: Number(formData.defaultDays)
        });
        await fetchLeaves();
        if (onSubmit) onSubmit(formData);
        onClose?.();
      } catch (error) {
        console.error('Error saving leave type:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={() => onClose?.()}
      />

      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl p-6">
        <button
          onClick={() => onClose?.()}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Create Leave
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Leave Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Default Days */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Default Days
            </label>

            <input
              type="number"
              name="defaultDays"
              value={formData.defaultDays}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />

            {errors.defaultDays && (
              <p className="text-red-500 text-sm mt-1">
                {errors.defaultDays}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-4 py-2"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose?.()}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black px-4 py-2 rounded-lg transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeave;