import React, { useState, useEffect } from "react";
import { addAdminLog, addAdminNotification } from "./helpers";

export default function AdminSettings() {
  // State
  const [theme, setTheme] = useState(
    localStorage.getItem("adminTheme") || "light"
  );
  const [name, setName] = useState(
    localStorage.getItem("adminName") || "Admin"
  );
  const [email, setEmail] = useState(
    localStorage.getItem("adminEmail") || "admin@site.com"
  );

  // Apply theme to body
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  }, [theme]);

  // Save settings
  const saveSettings = () => {
    localStorage.setItem("adminTheme", theme);
    localStorage.setItem("adminName", name);
    localStorage.setItem("adminEmail", email);

    addAdminNotification("Settings updated successfully");
    addAdminLog("Updated admin settings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div
        className={`w-full max-w-md p-6 rounded-lg space-y-5 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-bold text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Admin Settings
        </h1>

        {/* Admin Name */}
        <div>
          <label
            className={`block text-sm font-semibold mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Admin Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 rounded border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400"
            }`}
          />
        </div>

        {/* Admin Email */}
        <div>
          <label
            className={`block text-sm font-semibold mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Admin Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 rounded border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400"
            }`}
          />
        </div>

        {/* Theme Selector */}
        <div>
          <label
            className={`block text-sm font-semibold mb-1 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className={`w-full p-2 rounded border focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-400"
            }`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={saveSettings}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";

// export default function AdminSettings() {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("adminTheme") || "light"
//   );
//   const [name, setName] = useState(
//     localStorage.getItem("adminName") || "Admin"
//   );
//   const [email, setEmail] = useState(
//     localStorage.getItem("adminEmail") || "admin@site.com"
//   );

//   useEffect(() => {
//     document.body.className = theme === "dark" ? "dark" : "";
//   }, [theme]);

//   const saveSettings = () => {
//     localStorage.setItem("adminTheme", theme);
//     localStorage.setItem("adminName", name);
//     localStorage.setItem("adminEmail", email);

//     addAdminNotification("Settings updated successfully");
//     addAdminLog("Updated admin settings");
//     alert("Settings saved!");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>

//       <div className="space-y-4 max-w-lg">
//         <div>
//           <label className="block text-sm font-semibold">Admin Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold">Admin Email</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold">Theme</label>
//           <select
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className="border p-2 w-full rounded"
//           >
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </div>

//         <button
//           onClick={saveSettings}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// }

// // ------------------ HELPERS ------------------

// export const addAdminNotification = (msg) => {
//   const old = JSON.parse(localStorage.getItem("adminNotifications") || "[]");
//   old.push({ msg, time: new Date().toLocaleString() });
//   localStorage.setItem("adminNotifications", JSON.stringify(old));
// };

// export const addAdminLog = (action) => {
//   const old = JSON.parse(localStorage.getItem("adminLogs") || "[]");

//   // Simulated IP for tracking (in real world backend gives this)
//   const fakeIP = "192.168.1." + Math.floor(Math.random() * 255);

//   old.push({
//     action,
//     time: new Date().toLocaleString(),
//     ip: fakeIP,
//   });

//   localStorage.setItem("adminLogs", JSON.stringify(old));
// };
