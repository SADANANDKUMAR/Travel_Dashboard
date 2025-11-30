import React from "react";

/**
 * Props:
 * - title (string)
 * - value (number|string)
 * - icon (React node)
 * - subtitle (string) (optional)
 */
export default function UserStatCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{value}</div>
          {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
