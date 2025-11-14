// import { FaChartPie, FaComments, FaUsers, FaMoneyBill, FaStickyNote, FaRedoAlt, FaClipboardList } from "react-icons/fa";

// export default function Sidebar() {
//   const menu = [
//     { name: "Dashboard", icon: <FaChartPie /> },
//     { name: "Services", icon: <FaMoneyBill /> },
//     { name: "Conversation", icon: <FaComments /> },
//     { name: "Users", icon: <FaUsers /> },
//     { name: "Chargeback", icon: <FaRedoAlt /> },
//     { name: "Notes", icon: <FaStickyNote /> },
//     { name: "Followup", icon: <FaClipboardList /> },
//     { name: "Activity Logs", icon: <FaClipboardList /> },
//   ];

//   return (
//     <div className="h-screen w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white p-4 flex flex-col">
//       <h2 className="text-xl font-bold mb-6">Demo</h2>
//       <ul className="space-y-3">
//         {menu.map((item, i) => (
//           <li key={i} className="flex items-center space-x-3 hover:bg-blue-600 p-2 rounded-lg cursor-pointer">
//             <span>{item.icon}</span>
//             <span>{item.name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlane, FaShip, FaHotel, FaCar, FaUser, FaComments, FaHome, FaExchangeAlt, FaTrain } from "react-icons/fa";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("services");

  return (
    <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-col">
      <div className="p-4 border-b border-blue-400 flex items-center gap-3">
        <img src="/logo-cuise.jpg" alt="Logo" className="w-28 h-auto rounded-sm object-cover" />
        {/* <div className="text-lg font-bold">Dashboard</div> */}
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isActive ? "bg-blue-400 text-white" : "hover:bg-blue-600"
                }`
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          {/* Services Menu */}
          <li>
            <button
              onClick={() => setOpenMenu(openMenu === "services" ? "" : "services")}
              className="flex items-center justify-between w-full px-3 py-2 hover:bg-blue-600 rounded-lg"
            >
              <span className="flex items-center gap-3">
                <FaPlane /> Services
              </span>
              <span>{openMenu === "services" ? "▾" : "▸"}</span>
            </button>
            {openMenu === "services" && (
              <ul className="ml-6 mt-1 space-y-1">
                <li><NavLink to="/flight" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-400"><FaPlane size={14}/> Flight</NavLink></li>
                <li><NavLink to="/train" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-400"><FaTrain size={14}/> Train</NavLink></li>
                <li><NavLink to="/cruise" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-400"><FaShip size={14}/> Cruise</NavLink></li>
                <li><NavLink to="/hotel" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-400"><FaHotel size={14}/> Hotel</NavLink></li>
                <li><NavLink to="/car" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-400"><FaCar size={14}/> Car</NavLink></li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/conversation" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600">
              <FaComments /> Conversation
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600">
              <FaUser /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/chargeback" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600">
              <FaExchangeAlt /> Chargeback
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
