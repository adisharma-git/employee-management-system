import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../services/notificationService';

export default function HorizontalNavbar({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const [notificationsError, setNotificationsError] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profileName, setProfileName] = useState('User');
  const [profileRole, setProfileRole] = useState('Employee');

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const handleNavigateHelpPage = () => window.open("/dashboardNew/help", "_blank");

  const loadProfile = async () => {
    try {
      const response = await api.get('/employee/me');
      const userData = response?.data?.data;

      if (userData?.name) {
        setProfileName(userData.name);
      }

      const role = userData?.user?.role;
      if (role) {
        setProfileRole(role.charAt(0).toUpperCase() + role.slice(1));
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const loadNotifications = async () => {
    try {
      setNotificationsLoading(true);
      setNotificationsError('');

      const response = await getNotifications();
      setNotifications(response?.data || []);
      setUnreadCount(response?.unreadCount || 0);
    } catch (error) {
      setNotificationsError(error?.response?.data?.message || 'Failed to load notifications');
    } finally {
      setNotificationsLoading(false);
    }
  };

  const handleToggleNotifications = async () => {
    const shouldOpen = !notificationsOpen;
    setNotificationsOpen(shouldOpen);

    if (shouldOpen) {
      setProfileDropdownOpen(false);
      await loadNotifications();
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification || notification.isRead) return;

       // Optimistic UI update to keep the bell badge responsive//
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, isRead: true } : item
      )
    );
    setUnreadCount((prev) => Math.max(prev - 1, 0));

    try {
      await markNotificationAsRead(notification.id);
    } catch (error) {
      setNotificationsError(error?.response?.data?.message || 'Failed to mark notification as read');
      await loadNotifications();
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!unreadCount || markingAll) return;

    try {
      setMarkingAll(true);
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      setNotificationsError(error?.response?.data?.message || 'Failed to mark all notifications as read');
    } finally {
      setMarkingAll(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    loadProfile();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const getTypeLabel = (type) => {
    switch (type) {
      case 'leave':
        return 'Leave';
      case 'announcement':
        return 'Announcement';
      case 'meeting':
        return 'Meeting';
      case 'task':
        return 'Task';
      case "role":
        return "Role";
      default:
        return 'Update';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString(undefined, {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const navTabs = [
    { id: "employees", label: "Employees" },
    { id: "Attendance", label: "Attendance" },
    { id: "LeavesPage", label: "Leaves" },
    { id: "TaskManagement", label: "Tasks" },
    { id: "reports", label: "Reports" },
    { id: "Announcement", label: "Announcement" },
    { id: "ProjectActivity", label: "ProjectActivity" },
    { id: "Payroll", label: "Payroll" },
    { id: "role", label: "role" }
  ];

  return (
    <nav className="bg-[#021f54] sticky top-0 z-50 w-full border-b border-blue-900">
      <div className="flex items-center justify-between h-14 px-4 md:px-6 relative">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 z-20">
          <img
            src="/logo.png"
            alt="WorkAligner Logo"
            className="w-11 h-11 object-contain rounded-lg"
          />
          <span className="hidden md:flex text-base font-semibold tracking-wide">
            <span className="text-white">Work</span>
            <span className="text-orange-500">Alignr</span>
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm font-medium text-white">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`transition-all duration-200 pb-1 border-b-2 ${
                selectedTab === tab.id
                  ? "text-orange-500 border-orange-500"
                  : "text-white border-transparent hover:text-orange-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 ml-auto text-white">
          <button
            className="hover:text-orange-400 transition-colors text-sm md:text-base"
            onClick={handleNavigateHelpPage}
          >
            Help
          </button>

          <div ref={notificationRef} className="relative">
            <button
              className="relative hover:text-orange-400 transition-colors text-lg p-2 rounded"
              title="Notifications"
              onClick={handleToggleNotifications}
            >
              <i className="fas fa-bell"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] leading-[18px] font-semibold text-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-[340px] max-w-[92vw] bg-white rounded-md shadow-lg z-[70] border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Notifications</p>
                    <p className="text-xs text-gray-500">{unreadCount} unread</p>
                  </div>
                  <button
                    onClick={handleMarkAllAsRead}
                    disabled={!unreadCount || markingAll}
                    className="text-xs font-medium text-blue-700 hover:text-blue-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    {markingAll ? 'Marking...' : 'Mark all as read'}
                  </button>
                </div>

                {notificationsLoading ? (
                  <div className="px-4 py-6 text-sm text-gray-500 text-center">Loading notifications...</div>
                ) : notificationsError ? (
                  <div className="px-4 py-6 text-sm text-red-600 text-center">{notificationsError}</div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-500 text-center">No notifications yet.</div>
                ) : (
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                          notification.isRead ? 'bg-white' : 'bg-blue-50/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">{notification.title}</p>
                          {!notification.isRead && (
                            <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-gray-600 line-clamp-2">{notification.message}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[11px] text-blue-700 font-medium uppercase tracking-wide">
                            {getTypeLabel(notification.type)}
                          </span>
                          <span className="text-[11px] text-gray-500">{formatDate(notification.createdAt)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown Container */}
          <div
            ref={profileRef}
            className="relative"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <button
              className="hover:text-orange-400 transition-colors text-2xl p-2 rounded flex items-center"
              title="Profile"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <i className="fas fa-user-circle"></i>
            </button>

            {/* The Actual Pop-up/Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-[60] border border-gray-200 animate-in fade-in zoom-in duration-150">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800">{profileName}</p>
                  <p className="text-xs text-gray-500 truncate">{profileRole} Account</p>
                </div>
                
                <button 
                  onClick={() => setSelectedTab('EmployeeForm')} 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <i className="fas fa-user mr-2"></i> Profile
                </button>

                <button 
                  onClick={() => setSelectedTab('settings')} 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <i className="fas fa-cog mr-2"></i> Settings
                </button>

                <hr className="my-1 border-gray-100" />

                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            )}
          </div>

         
          <button
            className="md:hidden ml-2 p-2 rounded text-white transition z-30 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#021f54] border-t border-blue-900 z-10 relative">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-white hover:bg-blue-800 ${
                selectedTab === tab.id ? "bg-blue-700" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}