import React, { useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState([
    // Sample notifications (you can replace these with actual data)
    {
      id: 1,
      title: "New Message",
      message: "You have received a new message from a friend.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Reminder",
      message: "Don't forget to complete your profile!",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "New Message",
      message: "You have received a new message from a friend.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 4,
      title: "Reminder",
      message: "Don't forget to complete your profile!",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 5,
      title: "New Message",
      message: "You have received a new message from a friend.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 6,
      title: "Reminder",
      message: "Don't forget to complete your profile!",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 7,
      title: "New Message",
      message: "You have received a new message from a friend.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 8,
      title: "Reminder",
      message: "Don't forget to complete your profile!",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 9,
      title: "New Message",
      message: "You have received a new message from a friend.",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 10,
      title: "Reminder",
      message: "Don't forget to complete your profile!",
      time: "1 hour ago",
      read: true,
    },
  ]);

  //it makes marks the notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  //function that deletes notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-white">Notifications</h1>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex bg-white shadow-md rounded-lg mb-4 p-4 ${
              notification.read ? "bg-gray-200" : ""
            }`}
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {notification.title.charAt(0)}
            </div>
            <div className="block"> 
            <div className="ml-4 flex-grow">
              <h2 className="text-lg font-semibold">{notification.title}</h2>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>

            <div className="flex justify-end items-center">
              {!notification.read ? (
                <button
                  className="py-2 px-4 rounded-lg bg-green-500 text-white"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              ) : (
                <button
                  className="py-2 px-4 rounded-lg bg-red-500 text-white"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              )}
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
