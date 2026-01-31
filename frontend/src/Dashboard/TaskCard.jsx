export default function TaskCompletionCard({
  title = "Task completion",
  percentage,
  label = "Good score",
  icon = "fa-clipboard-check",
  isPunchedIn,
}) {
  return (
    <div className="w-full min-h-[120px] bg-white rounded-md border p-3">

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs text-gray-500 font-medium">{title}</h3>
        <div className="bg-blue-50 rounded-md p-2">
          <i className={`fas ${icon} text-blue-400`}></i>
        </div>
      </div>

      {percentage !== undefined && (
        <p className="text-2xl font-bold text-gray-900 mb-1">
          {percentage}%
        </p>
      )}


      {isPunchedIn !== undefined && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
      shadow-sm transition-all duration-300 select-none
      ${isPunchedIn
              ? "bg-green-500 text-white"
              : "bg-red-400 text-white"
            }
    `}
        >

          <span>{label}</span>
        </div>
      )}


    </div>
  );
}
