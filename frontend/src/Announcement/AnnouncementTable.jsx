import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullhorn, faFileAlt, faCalendarAlt, faUserFriends, 
   faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

const announcements = [
  { id: 1, title: 'System Maintenance - bhjdevfhkfvkhbfvrhkefvbebvhekhfvbebhvkfehbvkhfbvkerjbvkemnbvfjmbvjhbvkfjbvkermbvke...', dept: 'IT', priority: 'High', status: 'Active', date: '10 March 2026', icon: faBullhorn },
  { id: 2, title: 'New Remote Work Policy regarding the upcoming changes in the workplace environment for 2026', dept: 'HR', priority: 'Medium', status: 'Active', date: '08 March 2026', icon: faFileAlt },
  { id: 3, title: 'Office Closed for Holiday', dept: 'Admin', priority: 'Low', status: '25 March 2026', date: '05 March 2026', icon: faCalendarAlt },
  { id: 4, title: 'Team Building Event', dept: 'HR', priority: 'Low', status: 'Expired', date: '02 March 2026', icon: faUserFriends },
    { id: 3, title: 'Office Closed for Holiday', dept: 'Admin', priority: 'Low', status: '25 March 2026', date: '05 March 2026', icon: faCalendarAlt },
    { id: 3, title: 'Office Closed for Holiday', dept: 'Admin', priority: 'Low', status: '25 March 2026', date: '05 March 2026', icon: faCalendarAlt },

];

const PriorityBadge = ({ level }) => {
  const styles = {
    High: 'bg-red-100 text-red-600',
    Medium: 'bg-orange-100 text-orange-600',
    Low: 'bg-emerald-100 text-emerald-600',
  };
  return <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${styles[level]}`}>{level}</span>;
};


export default function AnnouncementTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
            <th className="px-6 py-4 font-semibold w-2/5">Title</th>
            <th className="px-6 py-4 font-semibold w-1/6 text-center">Department</th>
            <th className="px-6 py-4 font-semibold w-1/6 text-center">Priority</th>
            <th className="px-6 py-4 font-semibold w-1/6 text-center">Date</th>
            <th className="px-4 py-4 w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {announcements.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-5 align-top">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center bg-slate-50 mt-0.5 ${item.priority === 'High' ? 'text-red-500' : 'text-slate-400'}`}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  
                  {/* HOVER TOOLTIP LOGIC */}
                  <div className="relative group/tooltip overflow-visible">
                    <span className="font-semibold text-slate-700 text-sm leading-snug line-clamp-2 break-all cursor-help">
                      {item.title}
                    </span>
                    
                    {/* Tooltip Box: Only shows on hover */}
                    <div className="absolute z-50 invisible group-hover/tooltip:visible opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded p-2 w-64 -bottom-2 translate-y-full left-0 shadow-xl pointer-events-none">
                      {item.title}
                      {/* Tooltip Arrow */}
                      <div className="absolute -top-1 left-4 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-slate-800"></div>
                    </div>
                  </div>
                </div>
              </td>
              
              <td className="px-6 py-5 align-top text-center">
                <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase inline-block">
                  {item.dept}
                </span>
              </td>
              <td className="px-6 py-5 align-top text-center"><PriorityBadge level={item.priority} /></td>
              <td className="px-6 py-5 align-top text-sm text-slate-500 font-medium whitespace-nowrap text-center">{item.date}</td>
              <td className="px-4 py-5 align-top text-right text-slate-300">
                <button className="hover:text-slate-600"><FontAwesomeIcon icon={faEllipsisH} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}