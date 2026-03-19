import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "../api/axios";
import ToastContainer from "../Toaster/Toast";

const LeaveFormModal = ({ onSubmit, onClose }) => {

  const [leaveTypes, setLeaveTypes] = useState([]);

  const [formData, setFormData] = useState({
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    description: "",
    isHalfDay: false
  });

  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Leave Types
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {

      const res = await api.get("/leave-types");

      if (res.data.success) {
        setLeaveTypes(res.data.data);
      }

    } catch (error) {
      console.error("Error fetching leave types", error);
    }
  };

  // Input Change
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  // Validation
  const validate = () => {

    let newErrors = {};

    if (!formData.leaveTypeId)
      newErrors.leaveTypeId = "Please select leave type";

    if (!formData.startDate)
      newErrors.startDate = "Start date is required";

    if (!formData.endDate)
      newErrors.endDate = "End date is required";

    if (!formData.description.trim())
      newErrors.description = "Reason is required";

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    const payload = {
      leaveTypeId: formData.leaveTypeId,
      description: formData.description,
      startDate: format(new Date(formData.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(formData.endDate), "yyyy-MM-dd"),
      isHalfDay: formData.isHalfDay
    };

    try {

      const res = await api.post("/leaves/apply", payload);

      if (res.data) {

        const successMessage =
          res?.data?.message ||
          res?.data?.data?.message ||
          "Leave applied successfully";

        addToast("success", successMessage);

        setFormData({
          leaveTypeId: "",
          startDate: "",
          endDate: "",
          description: "",
          isHalfDay: false
        });

        if (onSubmit) onSubmit(res.data);

        onClose();
      }

    } catch (error) {

      console.error("Leave Apply Error", error);
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to apply leave";
      addToast("error", backendMessage);

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Apply Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Leave Type */}
          <div>
            <label className="block mb-2 font-medium">
              Leave Type *
            </label>

            <select
              name="leaveTypeId"
              value={formData.leaveTypeId}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >

              <option value="">Select Leave Type</option>

              {leaveTypes.map((leave) => (
                <option key={leave.id} value={leave.id}>
                  {leave.name}
                </option>
              ))}

            </select>

            {errors.leaveTypeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.leaveTypeId}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Start Date *
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">
                End Date *
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              {errors.endDate && (
                <p className="text-red-500 text-sm">
                  {errors.endDate}
                </p>
              )}
            </div>

          </div>

          {/* Half Day */}
          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              name="isHalfDay"
              checked={formData.isHalfDay}
              onChange={handleChange}
            />

            <label>Half Day Leave</label>

          </div>

          {/* Description */}
          <div>

            <label className="block mb-2 font-medium">
              Reason *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter reason..."
            />

            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description}
              </p>
            )}

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#021f54] text-white px-5 py-2 rounded-lg hover:bg-orange-400 hover:text-black transition"
            >
              Submit
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default LeaveFormModal;