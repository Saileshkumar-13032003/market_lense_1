// src/admin/AdminLogin.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import {
  addAdminLog,
  addAdminNotification,
  STORAGE_KEYS,
  initAdmin,
} from "./admin/helpers";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    initAdmin();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const adminData = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ADMIN_CREDENTIALS)
    );
    if (!adminData) return setError("Admin account missing.");
    if (adminData.email !== email || adminData.password !== pass)
      return setError("Invalid credentials.");

    localStorage.setItem("adminLoggedIn", "true");
    addAdminLog(`Admin ${email} logged in`);
    addAdminNotification(`Admin ${email} logged in`);
    navigate("/admin");
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#080c12]">
      <motion.div className="w-[380px] p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          Admin Portal 🔐
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="p-3 rounded-lg bg-white/10 text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center bg-white/10 rounded-lg border">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="p-3 flex-1 bg-transparent text-white"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="button"
              className="px-3 text-gray-300"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <button className="p-3 bg-green-500 rounded-lg mt-3 hover:bg-green-600">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import { addAdminLog, addAdminNotification } from "./admin/helpers"; // Correct path to helpers.js

// export default function AdminLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const adminData = JSON.parse(localStorage.getItem("adminCredentials"));

//     if (!adminData) {
//       setError("Admin account missing.");
//       return;
//     }

//     if (adminData.email !== email || adminData.password !== pass) {
//       setError("Invalid admin credentials.");
//       return;
//     }

//     // ✅ Set logged in
//     localStorage.setItem("adminLoggedIn", "true");

//     // ✅ Add log and notification
//     addAdminLog(`Admin ${email} logged in`);
//     addAdminNotification(`Admin ${email} logged in successfully`);

//     navigate("/admin");
//   };

//   return (
//     <div className="relative w-full h-screen flex items-center justify-center bg-[#080c12] overflow-hidden">
//       {/* Background Animation */}
//       <motion.svg
//         className="absolute w-full h-full opacity-20"
//         animate={{ opacity: [0.1, 0.3, 0.1] }}
//         transition={{ repeat: Infinity, duration: 8 }}
//       >
//         <motion.polyline
//           points="0,300 200,200 400,350 600,150 800,300 1000,180"
//           fill="none"
//           stroke="#22c55e"
//           strokeWidth="3"
//           animate={{ pathLength: [0, 1, 0] }}
//           transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//         />
//       </motion.svg>

//       {/* Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-[380px] p-8 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl"
//       >
//         <h2 className="text-center text-3xl text-white font-bold mb-6">
//           Admin Portal 🔐
//         </h2>

//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Admin Email"
//             className="p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <div className="flex items-center bg-white/10 border border-white/20 rounded-lg">
//             <input
//               type={showPass ? "text" : "password"}
//               placeholder="Password"
//               className="p-3 flex-1 bg-transparent text-white outline-none"
//               onChange={(e) => setPass(e.target.value)}
//             />
//             <button
//               type="button"
//               className="px-3 text-gray-300"
//               onClick={() => setShowPass(!showPass)}
//             >
//               {showPass ? <EyeOff /> : <Eye />}
//             </button>
//           </div>

//           {error && (
//             <motion.p
//               initial={{ x: -10 }}
//               animate={{ x: [0, -4, 4, -4, 0] }}
//               transition={{ duration: 0.4 }}
//               className="text-red-400 text-sm"
//             >
//               {error}
//             </motion.p>
//           )}

//           <button className="p-3 bg-green-500 text-black font-semibold rounded-lg mt-3 hover:bg-green-600 transition">
//             Login
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }
