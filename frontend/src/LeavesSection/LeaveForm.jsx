import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "../api/axios";

const ApplyLeaveForm = ({ date, onSubmit, onClose }) => {

  const [leaveTypes, setLeaveTypes] = useState([]);

  const [formData, setFormData] = useState({
    leaveTypeId: "",
    startDate: null,
    endDate: null,
    reason: "",
    isHalfDay: false  
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const res = await api.get("/leave-types");

      if (res.data.success) {
        setLeaveTypes(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching leave types", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.leaveTypeId) {
      newErrors.leaveTypeId = "Please select leave type";
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      leaveTypeId: formData.leaveTypeId,
      description: formData.reason,
      startDate: format(formData.startDate, "yyyy-MM-dd"),
      endDate: format(formData.endDate, "yyyy-MM-dd"),
      isHalfDay: formData.isHalfDay,
    };

    try {
      const res = await api.post("/leaves/apply", payload);

      if (res.data) {
        alert("Leave Applied Successfully ✅");

        setFormData({
          leaveTypeId: "",
          startDate: null,
          endDate: null,
          reason: "",
          isHalfDay: false,
        });

        if (onSubmit) {
          onSubmit(res.data);
        }
      }
    } catch (error) {
      console.error("Leave Apply Error", error);
      alert("Failed to apply leave ❌");
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
        </div>

 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Start Date *
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value
                }))
              }
              className="w-full border rounded-lg px-4 py-2"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              End Date *
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: e.target.value
                }))
              }
              className="w-full border rounded-lg px-4 py-2"
              min={formData.startDate || new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

      
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isHalfDay"
            checked={formData.isHalfDay}
            onChange={handleChange}
          />
          <label className="text-gray-600">Half Day Leave</label>
        </div>

   
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Reason *
          </label>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Enter reason..."
          />
        </div>


        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-4 py-2 rounded-md transition"
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;