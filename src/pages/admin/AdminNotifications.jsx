// src/admin/AdminNotifications.js
import React, { useState, useEffect } from "react";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = () =>
    setNotifications(
      JSON.parse(localStorage.getItem("adminNotifications") || "[]").reverse()
    );

  useEffect(() => {
    loadNotifications();
    window.addEventListener("notificationsUpdated", loadNotifications);
    return () =>
      window.removeEventListener("notificationsUpdated", loadNotifications);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="space-y-3 max-w-md">
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((n, i) => (
            <div
              key={n.id || i}
              className="p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded shadow-sm hover:bg-yellow-200 transition"
            >
              <strong className="block text-gray-800">{n.msg}</strong>
              <span className="text-xs text-gray-600">{n.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";

// export default function AdminNotifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("adminNotifications") || "[]");
//     setNotifications([...data].reverse());
//   }, []);

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>

//       <div className="space-y-3 max-w-md">
//         {notifications.length === 0 && (
//           <p className="text-gray-500">No notifications yet.</p>
//         )}

//         {notifications.map((n, i) => (
//           <div
//             key={n.id || i}
//             className="p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded shadow-sm hover:bg-yellow-200 transition"
//           >
//             <strong className="block text-gray-800">{n.msg}</strong>
//             <span className="text-xs text-gray-600">{n.time}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
