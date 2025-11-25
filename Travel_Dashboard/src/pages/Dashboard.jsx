// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { FaTicketAlt, FaCheckCircle, FaHourglassHalf, FaPercent, FaArrowUp } from "react-icons/fa";

// export default function Dashboard() {
//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col">

//         {/* Navbar */}
//         <Navbar />

//         {/* --- MAIN CONTENT --- */}
//         <div className="p-4 sm:ml-64 mt-16">

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
//             {/* Total Bookings */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="text-xs font-semibold uppercase text-gray-500">Total Bookings</div>
//                 <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
//                   <FaTicketAlt className="text-blue-600" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
//               <div className="flex items-center gap-1 text-xs">
//                 <FaArrowUp className="text-green-500" />
//                 <span className="text-green-600 font-medium">0% from last month</span>
//                 <span className="text-gray-500 ml-1">vs last month</span>
//               </div>
//             </div>

//             {/* Confirmed */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="text-xs font-semibold uppercase text-gray-500">Confirmed</div>
//                 <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
//                   <FaCheckCircle className="text-green-600" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-2">1</div>
//               <div className="text-xs text-gray-500">1 pending approval</div>
//             </div>

//             {/* Pending */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="text-xs font-semibold uppercase text-gray-500">Pending</div>
//                 <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
//                   <FaHourglassHalf className="text-orange-500" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-2">1</div>
//               <div className="text-xs text-gray-500">Out of 3 total</div>
//             </div>

//             {/* Conversion Rate */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="text-xs font-semibold uppercase text-gray-500">Conversion Rate</div>
//                 <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
//                   <FaPercent className="text-purple-600" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-gray-900 mb-2">33.33%</div>
//               <div className="flex items-center gap-1 text-xs">
//                 <FaArrowUp className="text-green-500" />
//                 <span className="text-green-600 font-medium">0.0% from last month</span>
//                 <span className="text-gray-500 ml-1">vs last month</span>
//               </div>
//             </div>

//           </div>

//           {/* Charts Row */}
//           <div className="flex flex-col lg:flex-row gap-4 mb-6">
            
//             {/* Booking Status Chart Placeholder */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full lg:w-1/3 h-64 flex items-center justify-center">
//               <p className="text-gray-500">Booking Status Chart</p>
//             </div>

//             {/* Revenue Chart Placeholder */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex-1 h-64 flex items-center justify-center">
//               <p className="text-gray-500">Revenue Chart</p>
//             </div>

//           </div>

          // {/* Recent Bookings & Activity */}
          // <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          //   {/* Recent Bookings */}
          //   <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          //     <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
          //       <div className="text-sm font-semibold text-gray-800 relative">
          //         Recent Bookings
          //         <div className="absolute left-0 -bottom-2 w-9 h-0.5 bg-blue-600"></div>
          //       </div>
          //     </div>

          //     <div className="overflow-x-auto text-xs">
          //       <table className="w-full border-collapse">
          //         <thead>
          //           <tr>
          //             <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Booking ID</th>
          //             <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Customer</th>
          //             <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Route</th>
          //             <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Date</th>
          //             <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Amount</th>
          //             <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Status</th>
          //           </tr>
          //         </thead>

          //         <tbody>
          //           {/* Sample row */}
          //           <tr>
          //             <td className="py-2 px-3 border-b">PUf6pq</td>
          //             <td className="py-2 px-3 border-b">Demo M Demo</td>
          //             <td className="py-2 px-3 border-b">Class: Economy, Passengers: 1</td>
          //             <td className="py-2 px-3 border-b">Oct 23, 2025</td>
          //             <td className="py-2 px-3 border-b">$450.00</td>
          //             <td className="py-2 px-3 border-b">
          //               <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-orange-100 text-orange-600">
          //                 Pending
          //               </span>
          //             </td>
          //           </tr>

          //           <tr>
          //             <td className="py-2 px-3 border-b">CRSE7309</td>
          //             <td className="py-2 px-3 border-b">Demo Demo</td>
          //             <td className="py-2 px-3 border-b">India → Dubai, 1 guests</td>
          //             <td className="py-2 px-3 border-b">Jul 12, 2025</td>
          //             <td className="py-2 px-3 border-b">$1020.00</td>
          //             <td className="py-2 px-3 border-b">
          //               <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-green-100 text-green-600">
          //                 Confirmed
          //               </span>
          //             </td>
          //           </tr>

          //           <tr>
          //             <td className="py-2 px-3 border-b">tkb5yeYv2M</td>
          //             <td className="py-2 px-3 border-b">Test</td>
          //             <td className="py-2 px-3 border-b">ALM → DLD</td>
          //             <td className="py-2 px-3 border-b">Jul 02, 2025</td>
          //             <td className="py-2 px-3 border-b">$1000.00</td>
          //             <td className="py-2 px-3 border-b">
          //               <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-red-100 text-red-600">
          //                 Cancelled
          //               </span>
          //             </td>
          //           </tr>
          //         </tbody>
          //       </table>
          //     </div>
          //   </div>

          //   {/* Recent Activity */}
          //   <div className="bg-white rounded-lg shadow-sm p-4 relative">
          //     <div className="flex justify-between items-center mb-3 pb-2 border-b">
          //       <div className="text-sm font-semibold text-gray-800 relative">
          //         Recent Activity
          //         <div className="absolute left-0 -bottom-2 w-9 h-0.5 bg-blue-600"></div>
          //       </div>
          //       <a href="/audit/activity-logs/" className="text-xs text-blue-600 font-medium">
          //         View All →
          //       </a>
          //     </div>

          //     <div className="pl-5 relative text-xs">
          //       <div className="absolute left-2 top-1 bottom-1 w-0.5 bg-gray-200"></div>

          //       {/* Activity items */}
          //       {[
          //         { text: "Booking Viewed", time: "Oct 29, 2025 07:41 PM" },
          //         { text: "Flight Booking Overview Accessed", time: "Oct 27, 2025 12:23 PM" },
          //         { text: "Cruise Booking Overview Viewed", time: "Oct 27, 2025 12:22 PM" },
          //       ].map((item, i) => (
          //         <div key={i} className="mb-4 relative">
          //           <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
          //           <div className="text-gray-400">{item.time}</div>
          //           <div className="text-gray-600 mt-1">{item.text}</div>
          //         </div>
          //       ))}

          //     </div>
          //   </div>

          // </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-4 sm:ml-64 mt-16">

          {/* -------------------- TOP SEARCH ROW -------------------- */}
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            
            {/* From Date */}
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-48"
              placeholder="mm/dd/yyyy"
            />

            {/* To Date */}
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-48"
              placeholder="mm/dd/yyyy"
            />

            {/* Search Button */}
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md text-sm font-medium">
              SEARCH
            </button>
          </div>

          {/* -------------------- METRIC CARDS ROW -------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {/* Total Bookings */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Total Bookings</div>
              <div className="text-3xl font-bold mt-2">3</div>
              <div className="mt-2 text-xs text-gray-500 leading-4">
                CRUISE <br />
                FLIGHT <br />
                TRAIN <br />
                HOTEL <br />
                CAR RENTAL <br />
                AMTRAK
              </div>
            </div>

            {/* Confirmed */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Confirmed</div>
              <div className="text-3xl font-bold text-green-600 mt-2">1</div>
              <div className="mt-2 text-xs text-gray-500 leading-4">
                CRUISE <br />
                FLIGHT <br />
                TRAIN <br />
                HOTEL <br />
                CAR RENTAL <br />
                AMTRAK
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Pending</div>
              <div className="text-3xl font-bold text-orange-500 mt-2">1</div>
              <div className="mt-2 text-xs text-gray-500 leading-4">
                CRUISE <br />
                FLIGHT <br />
                TRAIN <br />
                HOTEL <br />
                CAR RENTAL <br />
                AMTRAK
              </div>
            </div>

            {/* Cancelled */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Cancelled</div>
              <div className="text-3xl font-bold text-red-600 mt-2">1</div>
              <div className="mt-2 text-xs text-gray-500 leading-4">
                CRUISE <br />
                FLIGHT <br />
                TRAIN <br />
                HOTEL <br />
                CAR RENTAL <br />
                AMTRAK
              </div>
            </div>
          </div>

          {/* -------------------- SECOND METRIC ROW -------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            {/* Total Calls */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Total Calls</div>
              <div className="text-3xl font-bold mt-2">10</div>
              <div className="mt-2 text-xs text-gray-500 leading-4">
                CRUISE <br />
                FLIGHT <br />
                TRAIN <br />
                HOTEL <br />
                CAR RENTAL <br />
                AMTRAK
              </div>
            </div>

            {/* Total MCO */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Total MCO</div>
              <div className="text-3xl font-bold text-green-600 mt-2">$5000.00</div>
              <div className="mt-2 text-xs text-gray-500 leading-4">
                CRUISE <br />
                FLIGHT <br />
                TRAIN <br />
                HOTEL <br />
                CAR RENTAL <br />
                AMTRAK
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">Conversion Rate</div>
              <div className="text-3xl font-bold mt-2">30 %</div>
            </div>

            {/* RPC */}
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-gray-600 uppercase">RPC</div>
              <div className="text-3xl font-bold text-black mt-2">$500.00</div>
            </div>
          </div>

          {/* -------------------- BOTTOM CHART ROW -------------------- */}
          <div className="grid grid-cols-1 xl:grid-cols-2 mb-6 gap-6">

            {/* Booking Status chart */}
            <div className="bg-white rounded-xl border shadow-sm p-4 h-80">
              <div className="text-sm font-semibold mb-3">Booking Status</div>

              {/* PIE CHART placeholder box */}
              <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Pie Chart (Confirmed / Pending / Cancelled)</span>
              </div>
            </div>

            {/* Revenue chart */}
            <div className="bg-white rounded-xl border shadow-sm p-4 h-80">
              <div className="text-sm font-semibold mb-3">Revenue</div>

              {/* REVENUE CHART placeholder */}
              <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Line Chart (Monthly Performance)</span>
              </div>
            </div>

          </div>

                    {/* Recent Bookings & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols gap-4">
            {/* Recent Bookings */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-800 relative">
                  Current Bookings
                  <div className="absolute left-0 -bottom-2 w-9 h-0.5 bg-blue-600"></div>
                </div>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Booking ID</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Type</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Guest</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Booking Date</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Brand Name</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Duration</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Date of Travel</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">Status</th>
                      <th className="bg-gray-50 text-left py-2 px-3 font-semibold text-gray-600">MCO</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Sample row */}
                    <tr>
                      <td className="py-2 px-3 border-b">PUf6pq</td>
                      <td className="py-2 px-3 border-b">Demo M Demo</td>
                      <td className="py-2 px-3 border-b">Class: Economy, Passengers: 1</td>
                      <td className="py-2 px-3 border-b">Oct 23, 2025</td>
                      <td className="py-2 px-3 border-b">$450.00</td>
                      <td className="py-2 px-3 border-b">7  days</td>
                      <td className="py-2 px-3 border-b">Oct 23, 2025</td>
                      <td className="py-2 px-3 border-b">
                        <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-orange-100 text-orange-600">
                          Pending
                        </span>
                      </td>
                      <td className="py-2 px-3 border-b">$450.00</td>
                    </tr> 

                 
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
