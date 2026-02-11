import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import Loader from "../Loader/Loader";

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

  const handlePhoto = () => alert("This Feature Is Coming Soon! Stay Connected");

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee/me");
      const emp = res.data.data;

      setName(emp.name || "");
      setEmail(emp.user?.email || "");
      setFormData({
        phone: emp.phone || "",
        department: emp.department === "Not Assigned" ? "" : emp.department,
        designation: emp.designation === "Not Assigned" ? "" : emp.designation,
        dateOfJoining: emp.dateOfJoining ? emp.dateOfJoining.split("T")[0] : "",
      });

      if (emp.profileImage) setPreviewImage(emp.profileImage);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter valid 10 digit phone number";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of joining is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = () => setIsEditMode(true);

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
      if (profileImage) payload.append("profileImage", profileImage);

      await api.put("/employee/update", payload);
      alert("Profile updated successfully ");

      const fileInput = document.getElementById("imageInput");
      if (fileInput) fileInput.value = "";

      await fetchEmployee();
    } catch (error) {
      console.error(error);
      alert("Profile update failed ");
    } finally {
      setLoading(false);
    }
  };

  const ErrorText = ({ msg }) => msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

  if (loading && !name) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Employee Details</h1>
          <div className="flex gap-3">
            {!isEditMode && (
              <button
                onClick={handleEditClick}
                className="px-6 py-2 bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium rounded-md transition"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </button>
            )}
            {isEditMode && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium rounded-md transition disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPlus} /> Update Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
       
          <div className="lg:col-span-2 bg-white shadow-lg p-6 rounded-xl transition hover:shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Name", value: name, disabled: true, name: "name" },
                { label: "Email", value: email, disabled: true, name: "email" },
                { label: "Phone", value: formData.phone, disabled: !isEditMode, name: "phone" },
                { label: "Department", value: formData.department, disabled: !isEditMode, name: "department" },
                { label: "Designation", value: formData.designation, disabled: !isEditMode, name: "designation" },
                { label: "Date of Joining", value: formData.dateOfJoining, disabled: !isEditMode, name: "dateOfJoining", type: "date" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={field.value}
                    onChange={handleInputChange}
                    disabled={field.disabled}
                    className={`w-full px-4 py-3 border rounded-lg transition ${
                      field.disabled ? "bg-gray-100 border-gray-200" : "border-gray-300 focus:border-[#021f54] focus:ring-1 focus:ring-[#021f54]"
                    }`}
                  />
                  <ErrorText msg={errors[field.name]} />
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white shadow-lg p-6 rounded-xl text-center transition hover:shadow-2xl">
            {previewImage ? (
              <img src={previewImage} alt="profile" className="h-32 w-32 rounded-full mx-auto object-cover" />
            ) : (
              <FontAwesomeIcon icon={faUser} size="4x" className="text-gray-400 mt-4" />
            )}

            <button
              type="button"
              onClick={handlePhoto}
              disabled={!isEditMode}
              className={`mt-6 w-full flex justify-center items-center gap-2 py-2 rounded-lg border border-gray-300 transition ${
                !isEditMode ? "bg-gray-100 cursor-not-allowed opacity-50" : "hover:bg-gray-50"
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
    </div>
  );
}
