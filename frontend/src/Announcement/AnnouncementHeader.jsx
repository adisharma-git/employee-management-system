import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function AnnouncementHeader() {
  return (
    <div className="mb-6">

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 leading-tight">Announcements</h1>
          <p className="text-slate-500 text-sm">Company Announcements & Updates</p>
        </div>
        <button className="bg-[#021f54] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all font-medium shadow-sm">
          <FontAwesomeIcon icon={faPlus} className="text-sm" /> Create Announcement
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search announcements by title, department, or keyword..." 
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white placeholder-slate-400"
        />
      </div>
    </div>
  );
}