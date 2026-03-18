export default function AnnouncementsCard({
  title = "Announcements",
  announcements = [],
  height = "h-[420px]",
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-md flex flex-col ${height} transition-transform hover:scale-[1.01] duration-200`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <span className="text-gray-400 text-xl cursor-pointer hover:text-gray-600">⋮</span>
      </div>

      {/* Scrollable body */}
      <div
        className="
          flex-1 overflow-y-auto
          scrollbar-thin
          scrollbar-thumb-gray-300
          scrollbar-track-gray-100
        "
      >
        {announcements.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-10">
            No announcements available
          </p>
        ) : (
          announcements.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-5 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Avatar */}
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
              )}

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
              </div>

              {/* Optional action icon */}
              <button className="text-gray-400 hover:text-gray-600 text-sm">
                ➔
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}