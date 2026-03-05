import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const LeaveFormModal = ({ date, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: date || null,
    endDate: date || null,
    reason: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        startDate: date,
        endDate: date,
      }));
    }
  }, [date]);

  // ESC close support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Earned Leave",
    "Maternity Leave",
    "Paternity Leave",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.leaveType) newErrors.leaveType = "Please select leave type";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (!formData.reason.trim())
      newErrors.reason = "Reason is required";
    else if (formData.reason.length < 10)
      newErrors.reason = "Reason must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const finalData = {
        ...formData,
        startDate: format(formData.startDate, "dd-MMM-yyyy"),
        endDate: format(formData.endDate, "dd-MMM-yyyy"),
      };

      if (onSubmit) onSubmit(finalData);

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔹 Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 🔹 Modal */}
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl p-6 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Apply Leave
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Leave Type */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Leave Type <span className="text-red-500">*</span>
            </label>

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.leaveType
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.leaveType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.leaveType}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Start Date *
              </label>

              <DatePicker
                selected={formData.startDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, startDate: date }))
                }
                dateFormat="dd-MMM-yyyy"
                className="w-full border rounded-lg px-4 py-2"
              />

              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                End Date *
              </label>

              <DatePicker
                selected={formData.endDate}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, endDate: date }))
                }
                dateFormat="dd-MMM-yyyy"
                className="w-full border rounded-lg px-4 py-2"
              />

              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Reason *
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-4 py-2"
            />

            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reason}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
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

export default LeaveFormModal;