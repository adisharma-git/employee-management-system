import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faCamera } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

export default function EmployeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    department: "",
    designation: "",
    dateOfJoining: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  /* ================= GET EMPLOYEE DATA ================= */
  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await api.get("/employee/me");


        const emp = response.data.data;

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
      } catch (error) {
        console.error("Failed to fetch employee", error);

        if (error.response?.status === 401) {
          alert("Unauthorized. Please login again.");
          window.location.href = "/login";
        } else {
          alert("Failed to load employee data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  /* ================= INPUT HANDLER ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ profileImage: "Please upload an image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ profileImage: "Image size should be less than 5MB" });
      return;
    }

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    setErrors({});
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone required";

    if (!formData.department)
      newErrors.department = "Department is required";

    if (!formData.designation)
      newErrors.designation = "Designation is required";

    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of joining required";

    if (!profileImage && !previewImage)
      newErrors.profileImage = "Profile image required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("phone", formData.phone);
      submitData.append("department", formData.department);
      submitData.append("designation", formData.designation);
      submitData.append("dateOfJoining", formData.dateOfJoining);

      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      await api.put("/employee/update", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ msg }) =>
    msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

  /* ================= UI ================= */
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
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Personal Details</h1>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-[#021f54] text-white rounded-lg"
          >
            <FontAwesomeIcon icon={faPlus} /> Update Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <input disabled value={name} className="input bg-gray-100" />
              <input disabled value={email} className="input bg-gray-100" />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input"
              />
              <ErrorText msg={errors.phone} />

              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleInputChange}
                className="input"
              />
              <ErrorText msg={errors.department} />

              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="input"
              />
              <ErrorText msg={errors.designation} />

              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
                className="input"
              />
              <ErrorText msg={errors.dateOfJoining} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-lg text-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="profile"
                className="h-32 w-32 rounded-full mx-auto"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} size="4x" />
            )}

            <button
              onClick={() => document.getElementById("imageInput").click()}
              className="mt-4 w-full border py-2 rounded"
            >
              <FontAwesomeIcon icon={faCamera} /> Upload Photo
            </button>

            <input
              id="imageInput"
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
            <ErrorText msg={errors.profileImage} />
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
