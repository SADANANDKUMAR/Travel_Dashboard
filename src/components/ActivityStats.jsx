import React from "react";

const Box = ({ title, value, color }) => (
  <div className="flex flex-col items-center justify-center border shadow-sm rounded-xl p-4 w-40 bg-white">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <div className="text-2xl font-bold mt-2" style={{ color }}>{value}</div>
  </div>
);

const ActivityStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="flex gap-4">
      <Box title="Total Activities" value={stats.total || 0} color="#2563EB" />
      <Box title="Create Actions" value={stats.createCount || 0} color="#10B981" />
      <Box title="Update Actions" value={stats.updateCount || 0} color="#2563EB" />
      <Box title="Delete Actions" value={stats.deleteCount || 0} color="#EF4444" />
    </div>
  );
};

export default ActivityStats;
