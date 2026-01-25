export default function TaskCompletionCard({
  title = "Task completion",
  percentage = 98.56,
  label = "Good score",
  icon = "fa-clipboard-check",
}) {
  return (
    <div
      className="
        w-full

        min-h-[120px]
        sm:min-h-[130px]
        md:min-h-[140px]

        bg-white
        rounded-md
        border border-gray-100
        shadow-sm
        p-3
        sm:p-3.5
        hover:shadow-md
        transition-all
        duration-300
      "
    >

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[11px] sm:text-xs text-gray-500 font-medium">
          {title}
        </h3>

        <div className="bg-blue-50 rounded-md p-1.5 sm:p-2">
          <i className={`fas ${icon} text-blue-400 text-sm sm:text-base`}></i>
        </div>
      </div>


      <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-1">
        {percentage}%
      </p>

      <div className="flex items-center gap-2 border-l-2 border-[#021f54] pl-2">
        <p className="text-[11px] sm:text-xs text-gray-400 leading-tight">
          {label}
        </p>
      </div>
    </div>
  );
}
