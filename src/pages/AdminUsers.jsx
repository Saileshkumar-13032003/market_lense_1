// src/admin/AdminUsers.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  addAdminLog,
  addAdminNotification,
  getUsers,
  saveUsers,
} from "./admin/helpers";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updateUsers = () => setUsers(getUsers());
    updateUsers();
    window.addEventListener("usersUpdated", updateUsers);
    return () => window.removeEventListener("usersUpdated", updateUsers);
  }, []);

  const deleteUser = (email) => {
    if (!window.confirm("Delete this user?")) return;
    const updated = users.filter((u) => u.email !== email);
    saveUsers(updated);
    addAdminLog(`Deleted user ${email}`);
    addAdminNotification(`User ${email} deleted`);
  };

  const blockUser = (email) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, blocked: true } : u
    );
    saveUsers(updated);
    addAdminLog(`Blocked user ${email}`);
    addAdminNotification(`User ${email} blocked`);
  };

  const makeAdmin = (email) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, isAdmin: true } : u
    );
    saveUsers(updated);
    addAdminLog(`Made user ${email} an admin`);
    addAdminNotification(`User ${email} is now admin`);
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-[#141922] rounded-lg">
          <thead className="bg-[#1f2633]">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-3 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u, i) => (
                <motion.tr
                  key={u.email}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-700"
                >
                  <td className="p-3 flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-black font-bold">
                      {u.email[0].toUpperCase()}
                    </div>
                    {u.email}
                  </td>
                  <td className="p-3">{u.emailVerified ? "✔" : "❌"}</td>
                  <td className="p-3">{u.isAdmin ? "Admin" : "-"}</td>
                  <td className="p-3">
                    {u.blocked ? (
                      <span className="text-red-400">Blocked</span>
                    ) : (
                      <span className="text-green-400">Active</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-3">
                    {!u.isAdmin && (
                      <button
                        className="text-blue-400 hover:underline"
                        onClick={() => makeAdmin(u.email)}
                      >
                        Make Admin
                      </button>
                    )}
                    {!u.blocked && (
                      <button
                        className="text-yellow-400 hover:underline"
                        onClick={() => blockUser(u.email)}
                      >
                        Block
                      </button>
                    )}
                    <button
                      className="text-red-400 hover:underline"
                      onClick={() => deleteUser(u.email)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { addAdminLog, addAdminNotification } from "./admin/helpers"; // import your helpers

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const updateUsers = () => {
//       const data = JSON.parse(localStorage.getItem("users") || "[]");
//       setUsers(data);
//     };
//     updateUsers();
//     const interval = setInterval(updateUsers, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const save = (updated) => {
//     setUsers(updated);
//     localStorage.setItem("users", JSON.stringify(updated));
//   };

//   const deleteUser = (email) => {
//     if (!window.confirm("Delete this user?")) return;
//     const updated = users.filter((u) => u.email !== email);
//     save(updated);
//     addAdminLog(`Deleted user ${email}`);
//     addAdminNotification(`User ${email} deleted`);
//   };

//   const blockUser = (email) => {
//     const updated = users.map((u) =>
//       u.email === email ? { ...u, blocked: true } : u
//     );
//     save(updated);
//     addAdminLog(`Blocked user ${email}`);
//     addAdminNotification(`User ${email} blocked`);
//   };

//   const makeAdmin = (email) => {
//     const updated = users.map((u) =>
//       u.email === email ? { ...u, isAdmin: true } : u
//     );
//     save(updated);
//     addAdminLog(`Made user ${email} an admin`);
//     addAdminNotification(`User ${email} is now admin`);
//   };

//   return (
//     <div className="p-10 min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full bg-[#141922] rounded-lg overflow-hidden">
//           <thead className="bg-[#1f2633]">
//             <tr>
//               <th className="p-3 text-left">User</th>
//               <th className="p-3">Verified</th>
//               <th className="p-3">Admin</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center p-3 text-gray-400">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//             {users.map((u, i) => (
//               <motion.tr
//                 key={u.email}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="border-b border-gray-700"
//               >
//                 <td className="p-3 flex gap-3 items-center">
//                   <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-black font-bold">
//                     {u.email[0].toUpperCase()}
//                   </div>
//                   {u.email}
//                 </td>
//                 <td className="p-3">{u.emailVerified ? "✔" : "❌"}</td>
//                 <td className="p-3">{u.isAdmin ? "Admin" : "-"}</td>
//                 <td className="p-3">
//                   {u.blocked ? (
//                     <span className="text-red-400">Blocked</span>
//                   ) : (
//                     <span className="text-green-400">Active</span>
//                   )}
//                 </td>
//                 <td className="p-3 flex gap-3">
//                   {!u.isAdmin && (
//                     <button
//                       className="text-blue-400 hover:underline"
//                       onClick={() => makeAdmin(u.email)}
//                     >
//                       Make Admin
//                     </button>
//                   )}
//                   {!u.blocked && (
//                     <button
//                       className="text-yellow-400 hover:underline"
//                       onClick={() => blockUser(u.email)}
//                     >
//                       Block
//                     </button>
//                   )}
//                   <button
//                     className="text-red-400 hover:underline"
//                     onClick={() => deleteUser(u.email)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
