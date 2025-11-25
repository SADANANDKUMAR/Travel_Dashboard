// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// /**
//  * Flight.jsx
//  * - Table + filters (UI taken from your uploaded HTML)
//  * - "View" action opens a modal and fetches /get-booking-details/{id}/
//  * - Uses Tailwind classes and your global index.css styles (already provided)
//  *
//  * NOTE: Replace fetch URLs if your backend endpoints differ.
//  */

// export default function Flight() {
//   const [query, setQuery] = useState("");
//   const [filters, setFilters] = useState({
//     owner: "",
//     status: "",
//     from_date: "",
//     to_date: ""
//   });
//   const [bookings, setBookings] = useState([]); // table data
//   const [loading, setLoading] = useState(false);

//   // Modal state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalLoading, setModalLoading] = useState(false);
//   const [modalError, setModalError] = useState(null);
//   const [modalData, setModalData] = useState(null);

//   // Pagination (simple)
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // initial fetch for bookings - replace API path as needed
//   useEffect(() => {
//     fetchBookings();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   async function fetchBookings() {
//     setLoading(true);
//     setModalError(null);
//     try {
//       // Example API: /api/bookings/?page=1&q=... adapt to your backend
//       const q = encodeURIComponent(query);
//       const res = await fetch(`/bookings/?page=${page}&q=${q}`);
//       if (!res.ok) throw new Error("Failed to load bookings");
//       const data = await res.json();
//       // Expecting shape: { results: [...], total_pages: n }
//       setBookings(data.results || []);
//       setTotalPages(data.total_pages || 1);
//     } catch (err) {
//       console.error(err);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Open modal and fetch booking details (same endpoint used in original HTML)
//   async function openBookingModal(bookingId) {
//     setModalOpen(true);
//     setModalLoading(true);
//     setModalError(null);
//     setModalData(null);

//     try {
//       const res = await fetch(`/get-booking-details/${bookingId}/`);
//       if (!res.ok) {
//         throw new Error("Booking not found");
//       }
//       const data = await res.json();
//       setModalData(data);
//     } catch (err) {
//       console.error(err);
//       setModalError(err.message || "Failed to load booking details");
//     } finally {
//       setModalLoading(false);
//     }
//   }

//   function closeModal() {
//     setModalOpen(false);
//     setModalData(null);
//     setModalError(null);
//   }

//   // Helper to render flight segments (departure/return)
//   function renderSegments(segments = []) {
//     if (!segments || segments.length === 0) return <div className="text-sm text-gray-500">No segments</div>;

//     return segments.map((seg, idx) => (
//       <div key={idx} className="space-y-3 border-b pb-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <img
//               src={`/static/tail-icons/${seg.airline || "XX"}.png`}
//               alt={seg.airline || "logo"}
//               className="w-8 h-8"
//               onError={(e) => { e.currentTarget.style.display = "none"; }}
//             />
//             <div>
//               <div className="font-semibold text-sm">{(seg.airline || "") + (seg.flight_no ? ` ${seg.flight_no}` : "")}</div>
//               <div className="text-xs text-gray-500">Operated by {seg.airline || "—"}</div>
//             </div>
//           </div>
//           <div className="text-xs text-gray-500 text-right">
//             Duration: <span className="font-medium text-gray-800">{seg.duration || "—"}</span>
//           </div>
//         </div>

//         <div className="flex justify-between text-sm items-center">
//           <div>
//             <div className="font-bold">{seg.from || "—"}</div>
//             <div className="text-xs text-gray-400">{seg.dep_date || ""} {seg.dep_time || ""}</div>
//           </div>

//           <div className="flex items-center text-purple-600">
//             <i className="fas fa-plane mr-2" />
//           </div>

//           <div className="text-right">
//             <div className="font-bold">{seg.to || "—"}</div>
//             <div className="text-xs text-gray-400">{seg.arr_date || ""} {seg.arr_time || ""}</div>
//           </div>
//         </div>
//       </div>
//     ));
//   }

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Navbar />

//         <div className="p-4 sm:ml-64 mt-16">
//           {/* Title + Search */}
//           <div className="mx-auto px-0 mb-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//               <h1 className="text-sm font-black uppercase text-gray-800 tracking-wide">Total Bookings Overview</h1>

//               <form
//                 className="flex w-full sm:w-auto items-end space-x-2"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   setPage(1);
//                   fetchBookings();
//                 }}
//               >
//                 <div className="w-full sm:w-64">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="search"
//                       name="search"
//                       placeholder="Search bookings."
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       className="text-xs border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1.5 pr-10 bg-white"
//                     />
//                     <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
//                       <svg className="w-3.5 h-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                         <path stroke="currentColor" strokeWidth="1.5" d="m19 19-4-4m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="text-xs px-3 ml-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
//                 >
//                   Search
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm mb-4">
//             <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-end">
//               <div className="flex items-center space-x-2">
//                 <label htmlFor="owner" className="text-[11px] font-medium text-gray-700 whitespace-nowrap">Owner:</label>
//                 <select
//                   id="owner"
//                   name="owner"
//                   value={filters.owner}
//                   onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
//                   className="text-xs border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 flex-1"
//                 >
//                   <option value="">All Owners</option>
//                   <option value="me">Me</option>
//                 </select>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <label htmlFor="status" className="text-[11px] font-medium text-gray-700 whitespace-nowrap">Status:</label>
//                 <select
//                   id="status"
//                   name="status"
//                   value={filters.status}
//                   onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//                   className="text-xs border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 flex-1"
//                 >
//                   <option value="">All</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Confirmed">Confirmed</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-[11px] font-medium text-gray-700">From</label>
//                 <input
//                   type="date"
//                   value={filters.from_date}
//                   onChange={(e) => setFilters({ ...filters, from_date: e.target.value })}
//                   className="text-xs border border-gray-300 rounded-md p-1.5 w-full"
//                 />
//               </div>

//               <div>
//                 <label className="text-[11px] font-medium text-gray-700">To</label>
//                 <input
//                   type="date"
//                   value={filters.to_date}
//                   onChange={(e) => setFilters({ ...filters, to_date: e.target.value })}
//                   className="text-xs border border-gray-300 rounded-md p-1.5 w-full"
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Flight table card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//             <div className="flex justify-between items-center mb-4">
//               <div className="relative">
//                 <span className="text-sm font-semibold text-gray-800">Flight Booking List</span>
//                 <div className="absolute left-0 -bottom-2 w-10 h-0.5 bg-blue-600"></div>
//               </div>

//               <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700">+ New Booking</button>
//             </div>

//             <div className="overflow-x-auto text-sm">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 text-left text-gray-600">
//                     <th className="py-2 px-3 font-medium">Booking ID</th>
//                     <th className="py-2 px-3 font-medium">Passenger</th>
//                     <th className="py-2 px-3 font-medium">Route</th>
//                     <th className="py-2 px-3 font-medium">Date</th>
//                     <th className="py-2 px-3 font-medium">Amount</th>
//                     <th className="py-2 px-3 font-medium">Status</th>
//                     <th className="py-2 px-3 font-medium text-center">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="7" className="py-8 text-center text-gray-500">Loading bookings...</td>
//                     </tr>
//                   ) : bookings.length === 0 ? (
//                     <tr>
//                       <td colSpan="7" className="py-8 text-center text-gray-500">No bookings found.</td>
//                     </tr>
//                   ) : (
//                     bookings.map((b) => (
//                       <tr key={b.id} className="border-b">
//                         <td className="py-2 px-3">{b.booking_ref || b.id}</td>
//                         <td className="py-2 px-3">{b.customer_name || "—"}</td>
//                         <td className="py-2 px-3">{b.route || (b.from && b.to ? `${b.from} → ${b.to}` : "—")}</td>
//                         <td className="py-2 px-3">{b.travel_date || b.date || "—"}</td>
//                         <td className="py-2 px-3">{b.amount ? `$${b.amount}` : "—"}</td>
//                         <td className="py-2 px-3">
//                           <span className={
//                             "px-2 py-1 rounded-xl text-xs font-semibold " +
//                             (b.status === "Confirmed" ? "bg-green-100 text-green-600" :
//                              b.status === "Cancelled" ? "bg-red-100 text-red-600" :
//                              "bg-orange-100 text-orange-600")
//                           }>
//                             {b.status || "Pending"}
//                           </span>
//                         </td>

//                         <td className="px-3 py-4 text-center">
//                           <div className="flex items-center justify-center space-x-2">
//                             <button
//                               className="open-booking text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
//                               onClick={() => openBookingModal(b.id)}
//                             >
//                               <i className="fas fa-eye text-sm"></i>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination (simple) */}
//             <div className="flex justify-center my-6">
//               <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                 <button
//                   onClick={() => setPage(1)}
//                   disabled={page === 1}
//                   className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-l"
//                 >
//                   « First
//                 </button>
//                 <button
//                   onClick={() => setPage(Math.max(1, page - 1))}
//                   disabled={page === 1}
//                   className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300"
//                 >
//                   ‹ Prev
//                 </button>

//                 <span className="px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-blue-600">
//                   {page}
//                 </span>

//                 <button
//                   onClick={() => setPage(Math.min(totalPages, page + 1))}
//                   disabled={page >= totalPages}
//                   className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300"
//                 >
//                   Next ›
//                 </button>
//                 <button
//                   onClick={() => setPage(totalPages)}
//                   disabled={page >= totalPages}
//                   className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded-r"
//                 >
//                   Last »
//                 </button>
//               </nav>
//             </div>

//             <div className="text-center text-sm text-gray-500">Page {page} of {totalPages}</div>
//           </div>
//         </div>
//       </div>

//       {/* Modal (full screen centered) */}
//       {modalOpen && (
//         <div
//           id="flightModal"
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div
//             className="fixed inset-0 bg-black/40"
//             onClick={closeModal}
//             aria-hidden="true"
//           />
//           <div className="bg-white border border-blue-500 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden m-4">
//             <div className="p-4 border-b flex items-center justify-between">
//               <h2 className="text-lg font-bold">Flight Details</h2>
//               <button onClick={closeModal} className="text-sm text-gray-600 px-3 py-1 hover:bg-gray-100 rounded">Close</button>
//             </div>

//             <div id="modalContent" className="p-4 overflow-y-auto text-sm text-gray-700 flex-1">
//               {modalLoading ? (
//                 <div className="text-center py-10">Loading details...</div>
//               ) : modalError ? (
//                 <div className="text-center text-red-500 py-6">{modalError}</div>
//               ) : modalData ? (
//                 <>
//                   {/* Traveler info */}
//                   <div className="space-y-2 mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
//                         {modalData.travelers && modalData.travelers[0] ? (modalData.travelers[0].name || "U") : "U"}
//                       </div>
//                       <div>
//                         <div className="font-semibold">{modalData.travelers && modalData.travelers[0] ? modalData.travelers[0].name : "Traveler"}</div>
//                         <div className="text-xs text-gray-500">{modalData.email || ""}</div>
//                       </div>
//                     </div>
//                     <div className="text-xs text-gray-500">Booking Ref: <strong>{modalData.booking_ref || modalData.id}</strong></div>
//                   </div>

//                   {/* Outbound */}
//                   <div className="mb-4">
//                     <div className="text-sm font-semibold mb-2">Outbound</div>
//                     <div>{renderSegments(modalData.departure_flights)}</div>
//                   </div>

//                   {/* Return */}
//                   <div className="mb-4">
//                     <div className="text-sm font-semibold mb-2">Return</div>
//                     <div>{renderSegments(modalData.return_flights)}</div>
//                   </div>

//                   {/* Raw JSON (optional debug) */}
//                   <details className="text-xs text-gray-500 mt-4">
//                     <summary className="cursor-pointer">Debug: view raw data</summary>
//                     <pre className="text-xs whitespace-pre-wrap mt-2 bg-gray-50 p-2 rounded max-h-56 overflow-auto">
//                       {JSON.stringify(modalData, null, 2)}
//                     </pre>
//                   </details>
//                 </>
//               ) : (
//                 <div className="text-center text-gray-500">No details available.</div>
//               )}
//             </div>

//             <div className="p-4 border-t text-right">
//               <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/**
 * Full CRM Flight Booking page (matches screenshot A)
 * - Uses Tailwind + your global index.css (CRM theme)
 * - Mock data included for preview; replace fetches with your API
 */

const SAMPLE_BOOKINGS = [
  {
    id: 1,
    booking_ref: "PUF6PQ",
    created_at: "Oct. 23, 2025, 2:08 P.M.",
    passenger: {
      name: "Demo M Demo",
      phone: "+1 1234567890",
      email: "anityamkalita@gmail.com",
      pax: 1,
    },
    itinerary: {
      outbound: { from: "MIA", to: "JFK", dep_date: "2025-10-24", arr_date: "2025-10-23", airline: "DL", flight_no: "DL 310", stops: 0 },
      // In screenshot, two segments are shown (MIA -> JFK); adapt as needed
    },
    amount: 450.0,
    lead_status: "pending",
    owner: { name: "Demo" },
    status: "Pending"
  }
];

export default function Flight() {
  // controls
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS);
  const [query, setQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages] = useState(1);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  // stats (derived from bookings or API)
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "Confirmed").length,
    pending: bookings.filter(b => b.status === "Pending").length,
    cancelled: bookings.filter(b => b.status === "Cancelled").length,
  };

  // load bookings function (replace with API)
  useEffect(() => {
    // If you have an API, fetch here. We're using SAMPLE_BOOKINGS for the screenshot UI.
    // Example:
    // fetch(`/api/flights?page=${page}&q=${query}&owner=${ownerFilter}&date=${dateFilter}`)
    //   .then(r=>r.json()).then(data => setBookings(data.results));
  }, [page]);

  function openModal(b) {
    setActiveBooking(b);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setActiveBooking(null);
  }

  function updateStatus(bookingId, newStatus) {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  }

  // Simple filtered view for client-side demo
  const filtered = bookings.filter(b => {
    if (query && !(`${b.booking_ref} ${b.passenger.name} ${b.passenger.email} ${b.itinerary.outbound.from} ${b.itinerary.outbound.to}`).toLowerCase().includes(query.toLowerCase())) return false;
    if (ownerFilter && b.owner.name !== ownerFilter) return false;
    if (dateFilter && b.itinerary.outbound.dep_date !== dateFilter) return false;
    return true;
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 sm:ml-64 mt-16">
          {/* Heading + actions */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Flight Bookings</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track all flight reservations</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-md shadow-sm text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10v10H3V4h11" strokeWidth="1.5"/></svg>
                Export
              </button>

              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md shadow-sm text-sm">
                + New Booking
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-xl font-bold text-gray-800">{stats.total}</div>
              </div>
              <div className="bg-blue-50 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18" strokeWidth="1.5"/></svg>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Confirmed</div>
                <div className="text-xl font-bold text-green-600">{stats.confirmed}</div>
              </div>
              <div className="bg-green-50 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l4 4L19 6" strokeWidth="1.5"/></svg>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Pending</div>
                <div className="text-xl font-bold text-orange-600">{stats.pending}</div>
              </div>
              <div className="bg-orange-50 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 6v6l4 2" strokeWidth="1.5"/></svg>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Cancelled</div>
                <div className="text-xl font-bold text-red-600">{stats.cancelled}</div>
              </div>
              <div className="bg-red-50 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6l12 12M6 18L18 6" strokeWidth="1.5"/></svg>
              </div>
            </div>
          </div>

          {/* Overview Title + Search */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-800 uppercase">Total Bookings Overview</h2>
            <div className="flex items-center gap-2">
              <input
                placeholder="Search bookings..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
              />
              <button onClick={() => setPage(1)} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Search</button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-600">Owner:</label>
                <select value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option value="">All Owners</option>
                  <option value="Demo">Demo</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-600">Date:</label>
                <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"/>
              </div>

              <div className="md:col-span-2 text-right">
                <button onClick={() => { setOwnerFilter(""); setDateFilter(""); setQuery(""); }} className="px-4 py-2 border rounded-md text-sm mr-2">Reset</button>
                <button onClick={() => setPage(1)} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Filter</button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-0 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="text-sm font-semibold text-gray-800">Flight Booking List</div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">+ New Booking</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="py-4 px-6 text-left">Booking ID</th>
                    <th className="py-4 px-6 text-left">Passenger</th>
                    <th className="py-4 px-6 text-left">Itinerary</th>
                    <th className="py-4 px-6 text-left">Price</th>
                    <th className="py-4 px-6 text-left">Lead Status</th>
                    <th className="py-4 px-6 text-left">Owner</th>
                    <th className="py-4 px-6 text-left">Status</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-10 text-center text-gray-500">No bookings found.</td>
                    </tr>
                  ) : filtered.map((b) => (
                    <tr key={b.id} className="border-t">
                      {/* Booking ID */}
                      <td className="py-5 px-6 align-top w-48">
                        <div className="font-semibold">{b.booking_ref}</div>
                        <div className="text-xs text-gray-400 mt-2">{b.created_at}</div>
                      </td>

                      {/* Passenger */}
                      <td className="py-5 px-6 align-top">
                        <div className="font-medium">{b.passenger.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{b.passenger.phone}</div>
                        <div className="text-xs text-gray-500">{b.passenger.email}</div>
                        <div className="text-xs text-gray-400 mt-1">No. pax: {b.passenger.pax}</div>
                      </td>

                      {/* Itinerary */}
                      <td className="py-5 px-6 align-top">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm font-semibold">{b.itinerary.outbound.from}</div>
                            <div className="text-xs text-gray-400">{b.itinerary.outbound.dep_date}</div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12h20" strokeWidth="1.5" /></svg>
                              <div className="text-xs text-gray-500">{b.itinerary.outbound.flight_no ? `${b.itinerary.outbound.flight_no}` : ""}</div>
                            </div>

                            <div className="mt-1 text-xs text-gray-500 p-2 bg-gray-50 rounded-md">
                              <span className="inline-flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18" strokeWidth="1.5" /></svg>
                                <span className="text-xs">{b.itinerary.outbound.airline} | Flight {b.itinerary.outbound.flight_no}</span>
                                <span className="ml-2 text-purple-600 text-xs">{b.itinerary.outbound.stops} Stop(s)</span>
                              </span>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm font-semibold">{b.itinerary.outbound.to}</div>
                            <div className="text-xs text-gray-400">{b.itinerary.outbound.arr_date}</div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-5 px-6 align-top w-28 font-semibold">${b.amount.toFixed(1)}</td>

                      {/* Lead Status */}
                      <td className="py-5 px-6 align-top text-sm">
                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 12v.01" strokeWidth="1.5"/></svg>
                          <span className="capitalize">{b.lead_status}</span>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="py-5 px-6 align-top text-sm">
                        <div className="font-medium">{b.owner.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{b.owner.name}</div>
                      </td>

                      {/* Status dropdown */}
                      <td className="py-5 px-6 align-top text-sm">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="border border-gray-200 rounded-md px-3 py-2 text-sm"
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-5 px-6 align-top text-center w-20">
                        <button onClick={() => openModal(b)} className="text-blue-600 hover:text-blue-800">
                          <svg className="w-5 h-5 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.5"/><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" strokeWidth="1.5"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6">
              <div className="flex flex-col items-center gap-3">
                <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l text-sm" onClick={() => setPage(1)} disabled={page === 1}>« First</button>
                  <button className="px-3 py-2 bg-gray-100 border border-gray-300 text-sm" onClick={() => setPage(p => Math.max(1, p-1))}>‹ Prev</button>
                  <span className="px-3 py-2 bg-blue-600 text-white border border-blue-600 text-sm">{page}</span>
                  <button className="px-3 py-2 bg-gray-100 border border-gray-300 text-sm" onClick={() => setPage(p => Math.min(totalPages, p+1))}>Next ›</button>
                  <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r text-sm" onClick={() => setPage(totalPages)}>Last »</button>
                </nav>

                <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal */}
        {modalOpen && activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>

            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Booking Details</h3>
                <button onClick={closeModal} className="text-sm text-gray-600 px-2 py-1 hover:bg-gray-100 rounded">Close</button>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">{activeBooking.passenger.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold">{activeBooking.passenger.name}</div>
                    <div className="text-xs text-gray-500">{activeBooking.passenger.email}</div>
                    <div className="text-xs text-gray-400 mt-1">Booking ref: <strong>{activeBooking.booking_ref}</strong></div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">Itinerary</div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{activeBooking.itinerary.outbound.from} → {activeBooking.itinerary.outbound.to}</div>
                        <div className="text-xs text-gray-500">{activeBooking.itinerary.outbound.dep_date} - {activeBooking.itinerary.outbound.arr_date}</div>
                      </div>
                      <div className="text-sm text-gray-700">Flight {activeBooking.itinerary.outbound.flight_no}</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm">
                  <div><strong>Price:</strong> ${activeBooking.amount.toFixed(1)}</div>
                  <div className="mt-2"><strong>Lead status:</strong> {activeBooking.lead_status}</div>
                  <div className="mt-2"><strong>Owner:</strong> {activeBooking.owner.name}</div>
                </div>
              </div>

              <div className="p-4 border-t text-right">
                <button onClick={closeModal} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
