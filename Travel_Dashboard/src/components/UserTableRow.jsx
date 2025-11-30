import React from "react";
import { FaEdit, FaBan, FaTrash } from "react-icons/fa";

/**
 * Props:
 * - user: { id, username, email, phone, role, status }
 * - onEdit(user), onDisable(user), onDelete(user)
 */
export default function UserTableRow({ user, onEdit, onDisable, onDelete }) {
    return (
        <tr className="border-b">
            <td className="py-4 px-6 font-medium">{user.username}</td>
            <td className="py-4 px-6">{user.email}</td>
            <td className="py-4 px-6">{user.phone}</td>
            <td className="py-4 px-6">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                    {user.roleId?.name ?? "—"}
                </span>
            </td>

            <td className="py-4 px-6">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {user.centerId?.name ?? "—"}
                </span>
            </td>

            <td className="py-4 px-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {user.status}
                </span>
            </td>
            <td className="py-4 px-6 text-right space-x-2">
                <button onClick={() => onEdit(user)} className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-blue-600 text-white"><FaEdit /></button>
                <button onClick={() => onDisable(user)} className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-yellow-50 text-yellow-800 border"><FaBan /></button>
                <button onClick={() => onDelete(user)} className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-red-600 text-white"><FaTrash /></button>
            </td>
        </tr>
    );
}
