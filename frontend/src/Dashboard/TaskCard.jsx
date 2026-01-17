export default function TaskCompletionCard({
  title = "Task completion",
  percentage = 98.56,
  label = "Good score",
  icon = "fa-clipboard-check",
}) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="bg-blue-50 rounded-lg p-3">
          <i className={`fas ${icon} text-blue-400 text-xl`}></i>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-4xl font-bold text-gray-900">{percentage}%</p>
      </div>
      <div className="flex items-center gap-3 border-l-4 border-teal-500 pl-3">
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
    </div>
  )
}
