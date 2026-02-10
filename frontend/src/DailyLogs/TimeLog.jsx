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
import api from '../api/axios'

export default function TimeLogDashboard() {
  const [timeLogs, setTimeLogs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingLog, setEditingLog] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')


  const fetchLogs = async () => {
    try {
      const res = await api.get('/logs')
      const apiData = res.data.data

      const formattedLogs = apiData.flatMap((dayLog) =>
        dayLog.workItems.map((item) => ({
          logId: dayLog.id,      // parent log id
          taskId: item.id,      // work item id

          date: new Date(dayLog.date).toISOString().split('T')[0],
          workName: item.title,
          description: item.description,
          status: item.status,
          timeTaken: item.timeTaken,
        }))
      )

      setTimeLogs(formattedLogs)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  // ================= ADD / UPDATE =================
  const handleAddLog = () => {
    fetchLogs()
    setShowForm(false)
  }

  const handleUpdateLog = () => {
    fetchLogs()
    setEditingLog(null)
    setShowForm(false)
  }

  // ================= DELETE =================
  const handleDeleteLog = async (log) => {
    if (!confirm('Delete this time log?')) return

    try {
      await api.delete('/logs/delete', {
        data: {
          logId: log.logId,
          taskId: log.taskId,
        },
      })

      setTimeLogs((prev) =>
        prev.filter(
          (l) =>
            !(l.logId === log.logId && l.taskId === log.taskId)
        )
      )
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete log')
    }
  }

  // ================= FILTER =================
  const filteredLogs = timeLogs.filter((log) => {
    const matchesSearch =
      log.workName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.includes(searchTerm)

    const matchesStatus =
      filterStatus === 'All' || log.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // ================= EXPORT =================
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

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">My Time Log</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-44 border rounded px-3 py-2"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>

          <div className="relative flex-1 min-w-[220px]">
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
            onClick={() => {
              setEditingLog(null)
              setShowForm(true)
            }}
            className="bg-[#021f54] text-white px-4 py-2 rounded-md"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Time Log
          </button>

          <button
            onClick={handleExportToCSV}
            className="bg-[#021f54] text-white px-4 py-2 rounded-md"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

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
                <tr key={log.taskId} className="border-t">
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
                      className="text-blue-600"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      onClick={() => handleDeleteLog(log)}
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
