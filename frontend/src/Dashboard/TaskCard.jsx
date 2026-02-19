const TaskCompletionCard = ({
  title,
  percentage,
  value,
  label,
  icon,
  accentColor = "teal",
  isPunchedIn,
  isCount,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <i className={`fas ${icon} text-${accentColor}-500 text-lg`} />
      </div>

      <div className="mt-3">
        {isCount ? (
          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        ) : isPunchedIn !== undefined ? (
          <h2
            className={`text-xl font-semibold ${
              isPunchedIn ? "text-green-600" : "text-red-500"
            }`}
          >
            {label}
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800">{percentage}%</h2>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className={`bg-${accentColor}-500 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        )}
      </div>

      {!isPunchedIn && <p className="text-gray-400 text-sm mt-2">{label}</p>}
    </div>
  );
};

export default TaskCompletionCard;
