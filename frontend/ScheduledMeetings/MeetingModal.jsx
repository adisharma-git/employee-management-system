import React, { useState } from "react";
import api from "../src/api/axios";
import ToastContainer from "../src/Toaster/Toast";

const MeetingModal = ({ onClose, onSuccess }) => {

    const [toasts, setToasts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addToast = (type, message) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, message }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        meetLink: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const payload = {
                title: formData.title,
                date: new Date(formData.date).toISOString(),
                ...(formData.description && { description: formData.description }),
                ...(formData.meetLink && { meetLink: formData.meetLink }),
            };
            const res = await api.post("/meetings", payload);
            if (res.data.success) {
                addToast("success", "Meeting scheduled successfully!");
                onSuccess();
            }
        } catch (error) {
            console.error("Create meeting error", error);
            addToast("error", error.response?.data?.message || "Failed to schedule meeting");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="fixed inset-0 z-50 flex items-center justify-center">

                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fadeIn">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Schedule Meeting
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-red-500 text-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter meeting agenda"
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Date &amp; Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Description <span className="text-gray-400">(optional)</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Write meeting notes or agenda details..."
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Meeting Link <span className="text-gray-400">(optional)</span>
                            </label>
                            <input
                                type="url"
                                name="meetLink"
                                value={formData.meetLink}
                                onChange={handleChange}
                                placeholder="https://meet.google.com/..."
                                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default MeetingModal;