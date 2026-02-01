import { useEffect, useState } from 'react'

export default function TimeLogForm({ onClose, onSubmit, editingLog }) {
  const [formData, setFormData] = useState({
    date: '',
    workName: '',
    description: '',
    status: 'Pending',
    timeTaken: '',
  })

  useEffect(() => {
    if (editingLog) {
      setFormData(editingLog)
    }
  }, [editingLog])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-lg shadow p-6 z-50">
        <h2 className="text-xl font-semibold mb-4">
          {editingLog ? 'Edit Time Log' : 'Add Time Log'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="workName"
            value={formData.workName}
            onChange={handleChange}
            placeholder="Work Name"
            required
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <input
              type="number"
              name="timeTaken"
              value={formData.timeTaken}
              onChange={handleChange}
              placeholder="Time (hrs)"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                bg-[#021f54] text-white hover:bg-orange-400
                hover:text-black text-sm font-medium
                px-4 py-1.5
                rounded-md
                transition-colors duration-200
              "
            >
              {editingLog ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
