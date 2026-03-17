import React, { useState } from "react";
import api from "../src/api/axios";
import ToastContainer from "../src/Toaster/Toast";

const HolidayModal = ({ onClose, onSuccess }) => {

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
        name: "",
        date: ""
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
                name: formData.name,
                date: formData.date, // YYYY-MM-DD
            };

            const res = await api.post("/holidays", payload);

            if (res.data.success) {
                addToast("success", "Holiday added!");
                onSuccess();
            }

        } catch (error) {
            console.error(error);
            addToast("error", error.response?.data?.message || "Failed to add holiday");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            <div className="fixed inset-0 flex items-center justify-center z-50">

                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={onClose}
                />

                <div className="bg-white p-6 rounded-xl w-full max-w-md relative">

                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                            Add Holiday
                        </h2>
                        <button onClick={onClose}>✕</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Holiday Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {isSubmitting ? "Adding..." : "Add"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default HolidayModal;