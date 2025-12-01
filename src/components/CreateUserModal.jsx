import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateUserModal({ open, onClose, fetchUsers, fetchStats, roles, centers }) {
  const API = "https://43.204.227.49.sslip.io/api/v1";

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    roleId: "",
    centerId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${API}/users/create`, form);
      toast.success("User created successfully!");

      fetchUsers();
      fetchStats();
      onClose();

      setForm({
        username: "",
        email: "",
        phone: "",
        roleId: "",
        centerId: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      toast.error(err?.response?.data?.message || "User creation failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create User</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 rounded" required />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" required />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 rounded" required />

          <select name="roleId" onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Select Role</option>
            {roles.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}
          </select>

          <select name="centerId" onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Select Center</option>
            {centers.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>

          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" required />
          
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="border p-2 rounded" required />

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
