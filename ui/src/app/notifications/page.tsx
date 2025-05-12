"use client"
import React, { useEffect } from 'react'
import useNotification from '@/store/useAuthNotification'
import { io } from 'socket.io-client'

interface Notification {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

// Initialize the socket
const socket = io('http://localhost:7000');

const Notifications = () => {
  const { fetchNotifications, notifications = [], setNotifications, deleteNotification } = useNotification();

  useEffect(() => {
    socket.on("new-notification", (newNotification: Notification) => {
      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    });

    fetchNotifications();

    return () => {
      socket.off('new-notification');
    };
  }, [fetchNotifications, setNotifications]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif._id === id ? { ...notif, read: true } : notif
    ));
  };

  const removeNotification = (id: string) => {
    deleteNotification(id);
  };

  const getNotificationColor = (type?: string) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-500';
      case 'warning': return 'bg-yellow-50 border-yellow-500';
      case 'error': return 'bg-red-50 border-red-500';
      default: return 'bg-blue-50 border-blue-500';
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lab Notifications</h1>
        <p className="text-gray-600">Important alerts about patient tests and lab operations</p>
      </div>

      {/* Lab Status Section */}
      <div className="mb-10 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold mb-2 text-blue-800 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          Lab System Status
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Tests Processed Today:</p>
            <p className="text-blue-600">42</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Pending Results:</p>
            <p className="text-blue-600">8</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Critical Alerts:</p>
            <p className="text-blue-600">2</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">System Uptime:</p>
            <p className="text-blue-600">99.9%</p>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Recent Alerts
        </h3>

        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif._id}
              className={`p-5 rounded-lg shadow-sm transition-all duration-200 border-l-4 ${
                notif.read ? 'bg-gray-50' : `${getNotificationColor(notif.type)} shadow-md`
              } hover:shadow-lg`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    {!notif.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    )}
                    <h4 className={`font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notif.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 mt-1">{notif.message}</p>
                  <small className="text-gray-400 text-xs block mt-2">
                    {new Date(notif.createdAt).toLocaleString()}
                  </small>
                </div>
                <button 
                  onClick={() => removeNotification(notif._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  aria-label="Remove notification"
                >
                  ✕
                </button>
              </div>
              {!notif.read && (
                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    onClick={() => markAsRead(notif._id)}
                    className="text-xs px-3 py-1 rounded-md bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="mt-4 text-lg font-medium text-gray-700">No new alerts</h4>
            <p className="mt-1 text-gray-500">You'll be notified about important patient results and system updates</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
            </svg>
            New Patient
          </button>
          <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
            </svg>
            View Reports
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notifications