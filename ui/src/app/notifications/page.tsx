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
  const { fetchNotifications, notifications = [], setNotifications } = useNotification();

  console.log("Notifications: ", notifications);
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
    setNotifications(notifications.filter(notif => notif._id !== id));
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
    <div className="max-w-md mx-auto mt-12 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>

      {Array.isArray(notifications) && notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif._id}
              className={`p-4 rounded-lg shadow-md transition-all duration-200 border-l-4 ${
                notif.read ? 'bg-gray-100' : getNotificationColor(notif.type)
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{notif.title}</h4>
                  <p className="text-gray-600 mt-1">{notif.message}</p>
                  <small className="text-gray-400 text-sm">
                    {new Date(notif.createdAt).toLocaleString()}
                  </small>
                </div>
                <button 
                  onClick={() => removeNotification(notif._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove notification"
                >
                  ✕
                </button>
              </div>
              {!notif.read && (
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => markAsRead(notif._id)}
                    className="text-sm px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No notifications yet
        </div>
      )}
    </div>
  )
}

export default Notifications
