import React from "react";

const ActivityTable = ({ logs, loading }) => {
  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th className="py-3 w-[150px]">Type</th>
            <th className="w-[150px]">User</th>
            <th className="w-[300px]">Description</th>
            <th className="w-[140px]">Content Type</th>
            <th className="w-[120px]">Role</th>
            <th className="w-[150px]">Center</th>
            <th className="w-[150px]">IP Address</th>
            <th className="w-[160px]">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((item, index) => (
            <tr key={index} className="border-b text-sm">

              {/* TYPE */}
              <td className="py-3 text-blue-600 font-medium">
                {item?.action || "—"}
              </td>

              {/* USER */}
              <td className="text-blue-600 font-medium">
                {item?.userId?.username || "—"}
              </td>

              {/* DESCRIPTION */}
              <td className="max-w-[280px] truncate">
                {item?.description || "—"}
              </td>

              {/* CONTENT TYPE */}
              <td>
                {item?.module ? (
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                    {item.module}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* ROLE (Static for now) */}
              <td>Manager</td>

              {/* CENTER */}
              <td>{item?.centerId?.name || "—"}</td>

              {/* IP ADDRESS */}
              <td>
                <span className="px-2 py-1 rounded border border-red-400 text-red-500">
                  {item?.ipAddress || "—"}
                </span>
              </td>

              {/* TIME */}
              <td>
                {item?.createdAt
                  ? new Date(item.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "—"}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
