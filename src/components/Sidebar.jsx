import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(""); // "services" or "conversation" or ""

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  // helper to set aria-expanded
  const isOpen = (menu) => (openMenu === menu ? "true" : "false");

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform sm:translate-x-0 flex flex-col"
      aria-label="Sidebar"
    >
      <div className="sidebar-logo mx-4 mt-6 flex-shrink-0">
        <a href="/dashboard/" className="flex items-center justify-center">
          {/* Replace src with your logo path if needed */}
          <img
            src="/logo-cuise.jpg"
            alt="Logo"
            style={{ height: 42, width: "auto" }}
          />
        </a>
      </div>

      <div className="flex-1 px-4 pb-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <ul className="space-y-1 font-medium mt-6">
          {/* Dashboard */}
          <li className="sidebar-menu-item active">
            <NavLink
              to="/dashboard/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg ${
                  isActive ? "sidebar-link-active" : ""
                }`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v11h-7V3zm0 13h7v5h-7v-5z" />
              </svg>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Services dropdown */}
          <li className="sidebar-menu-item">
            <button
              type="button"
              className="sidebar-dropdown-toggle"
              aria-controls="services-dropdown"
              aria-expanded={isOpen("services")}
              onClick={() => toggleMenu("services")}
            >
              <div className="sidebar-dropdown-content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" style={{ width: 20, height: 20, marginRight: 12 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Services</span>
              </div>

              <svg
                className="sidebar-dropdown-arrow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  transform: openMenu === "services" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ul id="services-dropdown" className={`sidebar-submenu ${openMenu === "services" ? "" : "hidden"}`}>
              <li>
                <NavLink to="/flight/" className="flex items-center px-3 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginRight: 8 }}>
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                  Flight
                </NavLink>
              </li>

              <li>
                <NavLink to="/amtrak-dash/" className="flex items-center px-3 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginRight: 8 }}>
                    <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
                    <path d="m9 15-1-1" />
                    <path d="m15 15 1-1" />
                    <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
                    <path d="m8 19-2 3" />
                    <path d="m16 19 2 3" />
                  </svg>
                  Train
                </NavLink>
              </li>

              <li>
                <NavLink to="/cruise/" className="flex items-center px-3 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginRight: 8 }}>
                    <path d="M12 10.189V14" />
                    <path d="M12 2v3" />
                    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
                    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
                  </svg>
                  Cruise
                </NavLink>
              </li>

              <li>
                <NavLink to="/hotel/hotel-booking-list/" className="flex items-center px-3 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginRight: 8 }}>
                    <path d="M10 22v-6.57" />
                    <path d="M12 11h.01" />
                    <path d="M12 7h.01" />
                    <path d="M14 15.43V22" />
                    <path d="M15 16a5 5 0 0 0-6 0" />
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                  </svg>
                  Hotel
                </NavLink>
              </li>

              <li>
                <NavLink to="/car/car-booking-list/" className="flex items-center px-3 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ marginRight: 8 }}>
                    <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
                    <path d="M7 14h.01" />
                    <path d="M17 14h.01" />
                    <rect width="18" height="8" x="3" y="10" rx="2" />
                  </svg>
                  Car
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Conversation dropdown */}
          <li className="sidebar-menu-item">
            <button
              type="button"
              className="sidebar-dropdown-toggle"
              aria-controls="dropdown-conversation"
              aria-expanded={isOpen("conversation")}
              onClick={() => toggleMenu("conversation")}
            >
              <div className="sidebar-dropdown-content">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" style={{ width: 20, height: 20, marginRight: 12 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Conversation</span>
              </div>

              <svg className="sidebar-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ transform: openMenu === "conversation" ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ul id="dropdown-conversation" className={`sidebar-submenu ${openMenu === "conversation" ? "" : "hidden"}`}>
              <li>
                <NavLink to="/chat/" className="flex items-center px-3 py-1 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: 8 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9" />
                  </svg>
                  Chat
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Users */}
          <li className="sidebar-menu-item">
            <NavLink to="/users" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
              </svg>
              <span>Users</span>
            </NavLink>
          </li>

          {/* Chargeback */}
          <li className="sidebar-menu-item">
            <NavLink to="/chargeback/chargeback-list/" className="flex items-center space-x-2 px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 9V6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25V9M2.25 9h19.5M2.25 9v9.75A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9M7.5 14.25l-2.25 2.25L7.5 18.75M7.5 14.25h4.5a2.25 2.25 0 002.25-2.25V9" />
              </svg>
              <span>Chargeback</span>
            </NavLink>
          </li>

          {/* Notes */}
          <li className="sidebar-menu-item">
            <NavLink to="/myNotes/" className="flex items-center space-x-2 px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Notes</span>
            </NavLink>
          </li>

          {/* Followup */}
          <li className="sidebar-menu-item">
            <NavLink to="/followup/" className="flex items-center space-x-2 px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Followup</span>
            </NavLink>
          </li>

          {/* Activity Logs */}
          <li className="sidebar-menu-item">
            <NavLink to="/activity-log/" className="flex items-center space-x-2 px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Activity Logs</span>
            </NavLink>
          </li>


           {/* <li className="sidebar-menu-item">
            <NavLink to="/signup/" className="flex items-center space-x-2 px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Singup</span>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </aside>
  );
}
