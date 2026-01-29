import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

export default function EmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    department: "",
    designation: "",
    dateOfJoining: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handlePhoto = () => {
    alert("This Feature Is Coming Soon! Stay Connected")
  }

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee/me");
      const emp = res.data.data;

      setName(emp.name || "");
      setEmail(emp.user?.email || "");

      setFormData({
        phone: emp.phone || "",
        department:
          emp.department === "Not Assigned" ? "" : emp.department,
        designation:
          emp.designation === "Not Assigned" ? "" : emp.designation,
        dateOfJoining: emp.dateOfJoining
          ? emp.dateOfJoining.split("T")[0]
          : "",
      });

      if (emp.profileImage) {
        setPreviewImage(emp.profileImage);
      }


      setIsEditMode(false);
      setProfileImage(null);
      setErrors({});

    } catch (error) {
      console.error(error);
      alert("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  /* ================= INPUT HANDLER ================= */
  const handleInputChange = (e) => {
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


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ profileImage: "Only image files allowed" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ profileImage: "Image must be under 5MB" });
      return;
    }

    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setErrors({});
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10 digit phone number";

    if (!formData.department)
      newErrors.department = "Department is required";

    if (!formData.designation)
      newErrors.designation = "Designation is required";

    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of joining is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= EDIT MODE TOGGLE ================= */
  const handleEditClick = () => {
    setIsEditMode(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = new FormData();

      payload.append("phone", formData.phone);
      payload.append("department", formData.department);
      payload.append("designation", formData.designation);
      payload.append("dateOfJoining", formData.dateOfJoining);

      if (profileImage) {
        payload.append("profileImage", profileImage);
      }

      await api.put("/employee/update", payload);

      alert("Profile updated successfully ✅");


      const fileInput = document.getElementById("imageInput");
      if (fileInput) {
        fileInput.value = "";
      }


      await fetchEmployee();

    } catch (error) {
      console.error(error);
      alert("Profile update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ msg }) =>
    msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

  if (loading && !name) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Employee Details</h1>
          <div className="flex gap-3">
            {!isEditMode && (
              <button
                onClick={handleEditClick}
                className="px-6 py-2  bg-[#021f54] text-white hover:bg-orange-400
                hover:text-black text-sm font-medium rounded-md transition"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </button>
            )}
            {isEditMode && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2  bg-[#021f54] text-white hover:bg-orange-400
                hover:text-black text-sm font-medium rounded-md transition disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPlus} /> Update Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  disabled
                  value={name}
                  placeholder="Name"
                  className="input bg-gray-100"
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  disabled
                  value={email}
                  placeholder="Email"
                  className="input bg-gray-100"
                />
              </div>

              <div>
                <label className="label">Phone</label>
                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className={`input ${!isEditMode ? 'bg-gray-100' : ''}`}
                />
                <ErrorText msg={errors.phone} />
              </div>

              <div>
                <label className="label">Department</label>
                <input
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className={`input ${!isEditMode ? 'bg-gray-100' : ''}`}
                />
                <ErrorText msg={errors.department} />
              </div>

              <div>
                <label className="label">Designation</label>
                <input
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className={`input ${!isEditMode ? 'bg-gray-100' : ''}`}
                />
                <ErrorText msg={errors.designation} />
              </div>

              <div>
                <label className="label">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                  className={`input ${!isEditMode ? 'bg-gray-100' : ''}`}
                />
                <ErrorText msg={errors.dateOfJoining} />
              </div>
            </div>
          </div>


          <div className="bg-white p-6 rounded-lg text-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="profile"
                className="h-32 w-32 rounded-full mx-auto object-cover"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} size="4x" />
            )}

            <button
              type="button"
              onClick={() => handlePhoto()}
              disabled={!isEditMode}
              className={`mt-4 w-full border py-2 rounded transition ${!isEditMode
                  ? 'bg-gray-100 cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-50'
                }`}
            >
              <FontAwesomeIcon icon={faCamera} /> Upload Photo
            </button>

            <input
              id="imageInput"
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
              disabled={!isEditMode}
            />
            <ErrorText msg={errors.profileImage} />
          </div>
        </div>
      </div>

      <style>{`
        .label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .input:disabled {
          cursor: not-allowed;
        }
        .input:not(:disabled):focus {
          outline: none;
          border-color: #021f54;
          box-shadow: 0 0 0 3px rgba(2, 31, 84, 0.1);
        }
      `}</style>
    </div>
  );
}