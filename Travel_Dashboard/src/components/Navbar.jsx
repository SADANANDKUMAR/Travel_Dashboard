
import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    // <nav className="nh-nav">
          <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b">

        {/* Left side */}
        <div className="nh-left">
          <div className="nh-search-desktop">
            <FaSearch className="nh-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="nh-search-input"
            />
          </div>
   <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">● Demo</span>        </div>

        {/* Right side */}
        <div className="nh-right">
          {/* Notification */}
          <button className="nh-btn">
            <FaBell className="nh-icon" />
            <span className="nh-badge">20</span>
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              className="nh-user-btn"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <div className="nh-avatar">D</div>
            </button>

            {openProfile && (
              <div className="nh-dropdown nh-dropdown-right">
                <div className="nh-user-info">
                  <div className="nh-avatar large">D</div>
                  <div>
                    <div className="nh-user-name">demo (Manager)</div>
                    <div className="nh-user-email">demo@email.com</div>
                  </div>
                </div>
                <ul className="nh-dropdown-list">
                  <li className="nh-dropdown-item hover:bg-red-50 text-red-500 font-medium cursor-pointer">
                    <i className="fas fa-shield-alt mr-2"></i> Set Privilege
                  </li>
                  <li className="nh-dropdown-item cursor-pointer">
                    <i className="fas fa-cog mr-2"></i> Settings
                  </li>
                  <li className="nh-dropdown-item cursor-pointer">
                    <i className="fas fa-key mr-2"></i> Change Password
                  </li>
                </ul>
                <div className="nh-dropdown-footer">
                  <button
                    className="nh-logout"
                    onClick={() => window.location.href = "/login"}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    // </nav>
  );
}
