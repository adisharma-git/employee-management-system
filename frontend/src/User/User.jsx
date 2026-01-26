import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faUpload,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

export default function EmployeeForm() {
  const [name, setName] = useState("");


  const [formData, setFormData] = useState({
    phone: "",
    department: "",
    designation: "",
    dateOfJoining: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------------- GET API (TEMP) ---------------- */
  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await fetch("/api/employee/me");

        const data = await res.json();
        setName(name);
      } catch (err) {
        console.error("Failed to fetch name", err);
      }
    };

    fetchName();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };


  const validateForm = () => {
    let newErrors = {};

    if (!formData.phone.trim())
      newErrors.phone = "Phone is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of joining is required";
    if (!profileImage)
      newErrors.profileImage = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("FINAL DATA", {
      name,
      ...formData,
      profileImage,
    });
  };

  const ErrorText = ({ msg }) =>
    msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Personal Details</h1>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-[#021f54] text-white rounded-lg hover:bg-blue-500"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add
          </button>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="font-semibold mb-6">Employee Details</h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <input
                    type="text"
                    value={name}
                    disabled
                    placeholder="Name"
                    className="input bg-gray-100 cursor-not-allowed"
                  />
                </div>


                <div>
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                  />
                  <ErrorText msg={errors.phone} />
                </div>


                <div>
                  <input
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="input"
                  />
                  <ErrorText msg={errors.department} />
                </div>


                <div>
                  <input
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="input"
                  />
                  <ErrorText msg={errors.designation} />
                </div>


                <div>
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
            </div>
          </div>


          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="font-semibold mb-4">Profile Image</h2>

              {previewImage ? (
                <img
                  src={previewImage}
                  alt="preview"
                  className="h-32 w-full object-cover rounded mb-3"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-3xl mb-3" />
              )}

              <button
                type="button"
                onClick={() =>
                  document.getElementById("imageInput").click()
                }
                className="w-full border py-2 rounded"
              >
                <FontAwesomeIcon icon={faCamera} /> Upload / Take Photo
              </button>

              <input
                id="imageInput"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

              <ErrorText msg={errors.profileImage} />
            </div>
          </div>
        </form>
      </div>


      <style>{`
        .input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
        }
        .input:focus {
          border-color: #021f54;
        }
      `}</style>
    </div>
  );
}
