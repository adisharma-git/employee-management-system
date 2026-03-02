import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ApplyLeaveForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: null,
    endDate: null,
    reason: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.leaveType) {
      newErrors.leaveType = "Please select leave type";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
    } else if (formData.reason.length < 10) {
      newErrors.reason = "Reason must be at least 10 characters";
    }

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

      console.log("Submitted Data:", finalData);

      if (onSubmit) {
        onSubmit(finalData);
      }

      alert("Leave Applied Successfully ✅");

      setFormData({
        leaveType: "",
        startDate: null,
        endDate: null,
        reason: "",
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">
        Apply Leave
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>

            <DatePicker
              selected={formData.startDate}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: date,
                }))
              }
              dateFormat="dd-MMM-yyyy"
              placeholderText="Select start date"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.startDate
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              minDate={new Date()}
            />

            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              End Date <span className="text-red-500">*</span>
            </label>

            <DatePicker
              selected={formData.endDate}
              onChange={(date) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: date,
                }))
              }
              dateFormat="dd-MMM-yyyy"
              placeholderText="Select end date"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.endDate
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              minDate={formData.startDate || new Date()}
            />

            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Reason for Leave <span className="text-red-500">*</span>
          </label>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            placeholder="Enter your reason..."
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.reason
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />

          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">
              {errors.reason}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData({
                leaveType: "",
                startDate: null,
                endDate: null,
                reason: "",
              })
            }
            className="px-5 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#021f54] text-white hover:bg-orange-400
            hover:text-black text-sm font-medium px-4 py-1.5
            rounded-md transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;