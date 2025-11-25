import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaRegEye } from "react-icons/fa";

export default function Cruise() {
  const [filters, setFilters] = useState({
    bookingNumber: "",
    confirmation: "",
    name: "",
    phone: "",
    email: ""
  });

  // sample cruise booking (static)
  const bookings = [
    {
      id: "CR601428",
      type: "Cruise",
      guest: "Akshey Dull Sharma",
      bookingDate: "01 November 2025",
      brand: "Carnival",
      duration: "7 Nights Western Caribbean",
      travelDate: "02 Jan 2026",
      status: "Confirmed",
      mco: "$1000.00"
    }
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
       
        <div className="p-4 sm:ml-64 mt-16">
         <div className="flex items-center gap-2 mb-3">
            <h2 className="text-md font-semibold text-gray-700">Search Bookings</h2>
          </div>
          {/* ---------------- SEARCH BUTTON ---------------- */}
          {/* <div className="mb-5">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-medium shadow-md">
              Search
            </button>
          </div> */}
  
          {/* ---------------- FILTER FORM ---------------- */}
          <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Booking Number"
                className="border rounded-lg px-4 py-2 text-sm shadow-sm"
                value={filters.bookingNumber}
                onChange={(e) => setFilters({ ...filters, bookingNumber: e.target.value })}
              />

              <input
                type="text"
                placeholder="Cruise Line Confirmation"
                className="border rounded-lg px-4 py-2 text-sm shadow-sm"
                value={filters.confirmation}
                onChange={(e) => setFilters({ ...filters, confirmation: e.target.value })}
              />

              <input
                type="text"
                placeholder="Name"
                className="border rounded-lg px-4 py-2 text-sm shadow-sm"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Phone Number"
                className="border rounded-lg px-4 py-2 text-sm shadow-sm"
                value={filters.phone}
                onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
              />

              <input
                type="text"
                placeholder="Email"
                className="border rounded-lg px-4 py-2 text-sm shadow-sm"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              />

              <button className="border px-6 py-2 rounded-lg shadow-sm font-medium bg-white hover:bg-gray-50">
                Search
              </button>
            </div>
          </div>

          {/* ---------------- ADD NEW BOOKING ---------------- */}
          <div className="mb-4 flex justify-between items-center">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm shadow">
              + New Booking
            </button>
          </div>

          {/* ---------------- CURRENT BOOKINGS TITLE ---------------- */}
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-md font-semibold text-gray-700">Current Bookings</h2>
          </div>

          {/* ---------------- BOOKINGS TABLE ---------------- */}
          <div className="bg-white rounded-xl shadow-sm border overflow-x-auto p-4">

            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600 text-left border-b">
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Booking Date</th>
                  <th className="py-3 px-4">Brand Name</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Date Of Travel</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">MCO</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{b.id}</td>
                    <td className="py-3 px-4">{b.type}</td>
                    <td className="py-3 px-4">{b.guest}</td>
                    <td className="py-3 px-4">{b.bookingDate}</td>
                    <td className="py-3 px-4">{b.brand}</td>
                    <td className="py-3 px-4">{b.duration}</td>
                    <td className="py-3 px-4">{b.travelDate}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{b.mco}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaRegEye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}
