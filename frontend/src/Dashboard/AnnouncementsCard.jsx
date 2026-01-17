export default function AnnouncementsCard({
  title = "Announcements",
  announcements = [],
  height = "h-[420px]",
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col ${height}`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <span className="text-gray-400 text-lg">⋮⋮</span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
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
          <p className="text-sm text-gray-400 text-center mt-6">
            No announcements available
          </p>
        ) : (
          announcements.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-gray-50"
            >
              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.time}
                </p>
              </div>

              {/* Avatar */}
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
