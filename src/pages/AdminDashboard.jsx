// src/admin/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUsers } from "./admin/helpers";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updateUsers = () => setUsers(getUsers());
    updateUsers();
    window.addEventListener("usersUpdated", updateUsers);
    return () => window.removeEventListener("usersUpdated", updateUsers);
  }, []);

  const stats = {
    total: users.length,
    verified: users.filter((u) => u.emailVerified).length,
    admins: users.filter((u) => u.isAdmin).length,
    blocked: users.filter((u) => u.blocked).length,
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: stats.total },
          { label: "Verified Users", value: stats.verified },
          { label: "Admins", value: stats.admins },
          { label: "Blocked", value: stats.blocked },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-[#1f2633] shadow-lg border border-white/10 hover:bg-[#252d3b]"
          >
            <h2 className="text-xl font-semibold">{card.label}</h2>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function AdminDashboard() {
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

//   const stats = {
//     total: users.length,
//     verified: users.filter((u) => u.emailVerified).length,
//     admins: users.filter((u) => u.isAdmin).length,
//     blocked: users.filter((u) => u.blocked).length,
//   };

//   return (
//     <div className="p-10 min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {[
//           { label: "Total Users", value: stats.total },
//           { label: "Verified Users", value: stats.verified },
//           { label: "Admins", value: stats.admins },
//           { label: "Blocked", value: stats.blocked },
//         ].map((card, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="p-6 rounded-xl bg-[#1f2633] shadow-lg border border-white/10 hover:bg-[#252d3b] transition"
//           >
//             <h2 className="text-xl font-semibold">{card.label}</h2>
//             <p className="mt-2 text-3xl font-bold text-green-400">
//               {card.value}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
