import React, { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserStatCard from "../components/UserStatCard";

/**
 * Static demo log lines
 */
const LOGS = [
  { id: 1, username: "demo", center: "Demo", ip: "106.222.225.88", status: "Success", timestamp: "Sep 18, 2025 06:51 AM" },
  { id: 2, username: "demo", center: "Demo", ip: "106.222.224.50", status: "Success", timestamp: "Oct 23, 2025 06:33 AM" },
  { id: 3, username: "demo", center: "Demo", ip: "106.222.224.50", status: "Success", timestamp: "Oct 23, 2025 06:36 AM" },
  // ... add more demo rows
];

export default function LoginLogs() {
  const [logs, setLogs] = useState(LOGS);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const stats = useMemo(() => {
    const total = logs.length;
    const success = logs.filter(l => l.status === "Success").length;
    const failed = logs.filter(l => l.status !== "Success").length;
    const uniqueUsers = new Set(logs.map(l => l.username)).size;
    return { total, success, failed, uniqueUsers };
  }, [logs]);

  function exportCSV() {
    const header = ["username,center,ip,status,timestamp"].join(",");
    const rows = logs.map(l => [l.username,l.center,l.ip,l.status,l.timestamp].join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "login_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function refresh() {
    // demo: shuffle or reload; in real scenario call API
    alert("Refresh logs (demo)");
  }

  const totalPages = Math.max(1, Math.ceil(logs.length / perPage));
  const items = logs.slice((page-1)*perPage, page*perPage);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 sm:ml-64 mt-16">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Login Logs</h1>
              <p className="text-sm text-gray-500 mt-1">Track and monitor all user authentication attempts and access history</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={exportCSV} className="px-4 py-2 bg-white border rounded-md">Export</button>
              <button onClick={refresh} className="px-4 py-2 bg-blue-600 text-white rounded-md">Refresh</button>
            </div>
          </div>

          {/* top stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <UserStatCard title="Total Logins" value={stats.total} icon={<div className="w-5 h-5 bg-blue-200 rounded-full" />} />
            <UserStatCard title="Successful" value={stats.success} icon={<div className="w-5 h-5 bg-green-200 rounded-full" />} />
            <UserStatCard title="Failed Attempts" value={stats.failed} icon={<div className="w-5 h-5 bg-red-200 rounded-full" />} />
            <UserStatCard title="Unique Users" value={stats.uniqueUsers} icon={<div className="w-5 h-5 bg-purple-200 rounded-full" />} />
          </div>

          {/* table */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left">USERNAME</th>
                    <th className="py-3 px-6 text-left">CENTER</th>
                    <th className="py-3 px-6 text-left">IP ADDRESS</th>
                    <th className="py-3 px-6 text-left">STATUS</th>
                    <th className="py-3 px-6 text-left">TIMESTAMP</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map(l => (
                    <tr key={l.id} className="border-b">
                      <td className="py-4 px-6">{l.username}</td>
                      <td className="py-4 px-6">{l.center}</td>
                      <td className="py-4 px-6 text-blue-600">{l.ip}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${l.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{l.status}</span>
                      </td>
                      <td className="py-4 px-6">{l.timestamp}</td>
                    </tr>
                  ))}

                  {items.length === 0 && <tr><td colSpan="5" className="py-6 text-center text-gray-500">No logs found.</td></tr>}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div className="py-6">
              <div className="flex items-center justify-center gap-3">
                <button className="px-3 py-2 border rounded-l" onClick={() => setPage(1)} disabled={page === 1}>« First</button>
                <button className="px-3 py-2 border" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>‹ Prev</button>
                <div className="px-4 py-2 bg-blue-600 text-white rounded">{page}</div>
                <button className="px-3 py-2 border" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>Next ›</button>
                <button className="px-3 py-2 border rounded-r" onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last »</button>
              </div>
              <div className="text-center text-sm text-gray-500 mt-4">Page {page} of {totalPages}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
