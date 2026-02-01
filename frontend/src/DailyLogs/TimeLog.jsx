import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faMagnifyingGlass,
  faDownload,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import TimeLogForm from './TimeLogForm'

export default function TimeLogDashboard() {
  const [timeLogs, setTimeLogs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingLog, setEditingLog] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    const saved = localStorage.getItem('timeLogs')
    if (saved) setTimeLogs(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('timeLogs', JSON.stringify(timeLogs))
  }, [timeLogs])

  const handleAddLog = (log) => {
    setTimeLogs([...timeLogs, { ...log, id: Date.now() }])
    setShowForm(false)
  }

  const handleUpdateLog = (updatedLog) => {
    setTimeLogs(
      timeLogs.map((log) =>
        log.id === updatedLog.id ? updatedLog : log
      )
    )
    setEditingLog(null)
    setShowForm(false)
  }

  const handleDeleteLog = (id) => {
    if (confirm('Delete this time log?')) {
      setTimeLogs(timeLogs.filter((log) => log.id !== id))
    }
  }

  const filteredLogs = timeLogs.filter((log) => {
    const matchesSearch =
      log.workName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date?.includes(searchTerm)

    const matchesStatus =
      filterStatus === 'All' || log.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleExportToCSV = () => {
    const headers = ['Date', 'Work', 'Time', 'Status']
    const rows = filteredLogs.map((log) => [
      log.date,
      log.workName,
      log.timeTaken,
      log.status,
    ])

    let csv = 'data:text/csv;charset=utf-8,'
    csv += headers.join(',') + '\n'
    rows.forEach((r) => {
      csv += r.map((c) => `"${c}"`).join(',') + '\n'
    })

    const link = document.createElement('a')
    link.href = encodeURI(csv)
    link.download = 'time-logs.csv'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">My Time Log</h1>
      <div className="bg-white p-4 rounded shadow mb-6 grid md:grid-cols-4 gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <div className="md:col-span-2 relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            placeholder="Search by work or date"
            className="w-full pl-10 border rounded px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={handleExportToCSV}
          className="
                bg-[#021f54] text-white hover:bg-orange-400
                hover:text-black text-sm font-medium
                px-4 py-1.5
                rounded-md
                transition-colors duration-200
              "
        >
          <FontAwesomeIcon icon={faDownload} />
          Export CSV
        </button>
      </div>

      <button
        onClick={() => {
          setEditingLog(null)
          setShowForm(true)
        }}
        className="
                bg-[#021f54] text-white hover:bg-orange-400
                hover:text-black text-sm font-medium
                px-4 py-1.5
                rounded-md
                transition-colors duration-200
              "
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Time Log
      </button>

      {/* Table */}
      <div className="bg-white rounded shadow">
        {filteredLogs.length === 0 ? (
          <p className="p-4 text-gray-500">No records found</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Work</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-3">{log.date}</td>
                  <td className="p-3">{log.workName}</td>
                  <td className="p-3">{log.timeTaken} hrs</td>
                  <td className="p-3">{log.status}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingLog(log)
                        setShowForm(true)
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <TimeLogForm
          onClose={() => {
            setShowForm(false)
            setEditingLog(null)
          }}
          onSubmit={editingLog ? handleUpdateLog : handleAddLog}
          editingLog={editingLog}
        />
      )}
    </div>
  )
}
