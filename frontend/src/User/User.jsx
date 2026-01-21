import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faX, faPlus, faUpload, faCamera, faFileAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    oib: '',
    datumRodenja: '',
    kontaktBroj: '',
    emailAdresa: '',
    adresa: '',
    grad: '',
    postavkaBroj: '',
    drzava: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map((file) => ({
      id: Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      file: file,
      progress: 100,
    }));
    setDocuments((prev) => [...prev, ...newDocuments]);
  };

  // Remove document
  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      formData,
      profileImage,
      documents,
    });
    // API call will be added here later
  };

  // Handle cancel
  const handleCancel = () => {
    console.log('Form cancelled');
    // Add navigation or reset logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personal Details</h1>
          <div className="flex gap-4">
            {/* <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faX} className="text-lg" />
              Odustani
            </button> */}
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
            >
              <FontAwesomeIcon icon={faPlus} className="text-lg" />
              Spremi
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ime */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="ime"
                    value={formData.ime}
                    onChange={handleInputChange}
                    placeholder="Unesite ime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Prezime */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SirName</label>
                  <input
                    type="text"
                    name="prezime"
                    value={formData.prezime}
                    onChange={handleInputChange}
                    placeholder="Unesite prezime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* OIB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="oib"
                    value={formData.oib}
                    onChange={handleInputChange}
                    placeholder="Unesite OIB (11 znamenki)"
                    maxLength="11"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Datum rodenja */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Of Birth</label>
                  <input
                    type="text"
                    name="datumRodenja"
                    value={formData.datumRodenja}
                    onChange={handleInputChange}
                    placeholder="DD/MM/GGGG"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Other Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kontakt broj */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Number</label>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <input
                      type="tel"
                      name="kontaktBroj"
                      value={formData.kontaktBroj}
                      onChange={handleInputChange}
                      placeholder="Unesite kontakt broj"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email adresa</label>
                  <input
                    type="email"
                    name="emailAdresa"
                    value={formData.emailAdresa}
                    onChange={handleInputChange}
                    placeholder="Unesite email adresu"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Adresa */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresa</label>
                  <input
                    type="text"
                    name="adresa"
                    value={formData.adresa}
                    onChange={handleInputChange}
                    placeholder="Unesite prezime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Grad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grad</label>
                  <input
                    type="text"
                    name="grad"
                    value={formData.grad}
                    onChange={handleInputChange}
                    placeholder="Unesite ime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Poštanski broj */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poštanski broj</label>
                  <input
                    type="text"
                    name="postavkaBroj"
                    value={formData.postavkaBroj}
                    onChange={handleInputChange}
                    placeholder="Unesite prezime"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Država */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Država</label>
                  <select
                    name="drzava"
                    value={formData.drzava}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="">Odaberite državu</option>
                    <option value="hr">Hrvatska</option>
                    <option value="de">Njemačka</option>
                    <option value="at">Austrija</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Documents and Profile Picture */}
          <div className="lg:col-span-1">
            {/* Documents Section */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Dokumenti</h2>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-teal-500 transition"
                onClick={() => document.getElementById('documentInput').click()}
              >
                <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-400 mb-3" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-teal-500">Kliknite da dodate</span> ili prevucite u ovo polje
                </p>
                <p className="text-xs text-gray-500 mt-2">svg, PNG, JPG or GIF (max. 800×400px)</p>
                <input
                  id="documentInput"
                  type="file"
                  multiple
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
              </div>

              {/* Documents List */}
              {documents.length > 0 && (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          <FontAwesomeIcon icon={faFileAlt} className="text-red-500 text-lg mt-1" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-600">{doc.size} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeDocument(doc.id)}
                          className="text-teal-500 hover:text-teal-700"
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{ width: `${doc.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{doc.progress}%</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Picture Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Slika profila</h2>
              <p className="text-xs text-gray-600 mb-4">max. 2MB</p>

              {/* Profile Picture Preview */}
              {previewImage ? (
                <div className="mb-4">
                  <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xl" />
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={() => document.getElementById('imageInput').click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <FontAwesomeIcon icon={faCamera} />
                Priloži fotografiju
              </button>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
