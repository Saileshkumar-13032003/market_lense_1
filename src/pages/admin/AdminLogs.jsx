// src/admin/AdminLogs.js
import React, { useState, useEffect } from "react";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  const loadLogs = () =>
    setLogs(JSON.parse(localStorage.getItem("adminLogs") || "[]").reverse());

  useEffect(() => {
    loadLogs();
    window.addEventListener("logsUpdated", loadLogs);
    return () => window.removeEventListener("logsUpdated", loadLogs);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Activity Logs</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center p-3 text-gray-500">
                  No Logs Yet.
                </td>
              </tr>
            ) : (
              logs.map((log, i) => (
                <tr key={log.id || i} className="hover:bg-gray-100">
                  <td className="border p-2">{log.action}</td>
                  <td className="border p-2">{log.time}</td>
                  <td className="border p-2">{log.ip || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";

// export default function AdminLogs() {
//   const [logs, setLogs] = useState([]);

//   // Function to load logs from localStorage
//   const loadLogs = () => {
//     const data = JSON.parse(localStorage.getItem("adminLogs") || "[]");
//     setLogs([...data].reverse()); // reverse without mutating original array
//   };

//   useEffect(() => {
//     loadLogs(); // initial load

//     // Optional: live update every 2 seconds
//     const interval = setInterval(loadLogs, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Activity Logs</h1>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 rounded-lg shadow-sm">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 border">Action</th>
//               <th className="p-2 border">Time</th>
//               <th className="p-2 border">IP</th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.length === 0 ? (
//               <tr>
//                 <td colSpan={3} className="text-center p-3 text-gray-500">
//                   No Logs Yet.
//                 </td>
//               </tr>
//             ) : (
//               logs.map((log, index) => (
//                 <tr
//                   key={log.id || index} // unique key if available
//                   className="hover:bg-gray-100 transition"
//                 >
//                   <td className="border p-2">{log.action}</td>
//                   <td className="border p-2">
//                     {new Date(log.time).toLocaleString()}
//                   </td>
//                   <td className="border p-2">{log.ip || "N/A"}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
