import React, { useState, useEffect } from "react";
import axios from "axios";
import ActivityStats from "../components/ActivityStats";
import ActivityTable from "../components/ActivityTable";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
console.log(logs,'-----------')
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://43.204.227.49.sslip.io/api/v1/activity-logs/get-activity-logs?page=${page}&limit=${limit}`
      );
      setLogs(res.data?.logs || []);
    } catch (err) {
      console.log("Log error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `https://43.204.227.49.sslip.io/api/activity-logs/stats`
      );
      setStats(res.data?.data || {});
    } catch (err) {
      console.log("Stats error:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [page, limit]);

  const filteredLogs = logs.filter((log) =>
    log?.description?.toLowerCase().includes(search.toLowerCase())
  );

return (
    <div className="pl-64 p-6"> 
      {/* <h1 className="text-xl font-semibold text-gray-800 mb-4">Activity Log</h1> */}

      {/* Stats */}
      <ActivityStats stats={stats} />

      {/* Filters */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-3">
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search activities..."
          className="border px-3 py-2 rounded-lg w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <ActivityTable logs={filteredLogs} loading={loading} />
    </div>
  );
};

export default ActivityLog;
