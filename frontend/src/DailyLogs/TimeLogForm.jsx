import { useEffect, useState } from 'react'

export default function TimeLogForm({ onClose, onSubmit, editingLog }) {
  const [formData, setFormData] = useState({
    date: '',
    workName: '',
    description: '',
    status: 'Pending',
    timeTaken: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingLog) {
      setFormData(editingLog)
    }
  }, [editingLog])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    // real-time error clear
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let newErrors = {}

    if (!formData.workName.trim()) {
      newErrors.workName = 'Work item name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.timeTaken || formData.timeTaken <= 0) {
      newErrors.timeTaken = 'Time must be greater than 0'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

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
            className="w-full border rounded px-3 py-2"
          />

          <div>
            <input
              type="text"
              name="workName"
              value={formData.workName}
              onChange={handleChange}
              placeholder="Work Name"
              className="w-full border rounded px-3 py-2"
            />
            {errors.workName && (
              <p className="text-red-500 text-sm mt-1">{errors.workName}</p>
            )}
          </div>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
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

            <div>
              <input
                type="number"
                name="timeTaken"
                value={formData.timeTaken}
                onChange={handleChange}
                placeholder="Time (hrs)"
                className="border rounded px-3 py-2 w-full"
              />
              {errors.timeTaken && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.timeTaken}
                </p>
              )}
            </div>
          </div> */}

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
