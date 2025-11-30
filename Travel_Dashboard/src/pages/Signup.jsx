import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    centerId: "",
  });

  const [roles, setRoles] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch roles + centers from API
  useEffect(() => {
    axios
      .get("https://43.204.227.49.sslip.io/api/v1/users/roles")
      .then((res) => setRoles(res.data || []))
      .catch(() => toast.error("Failed to load roles"));

    axios
      .get("https://43.204.227.49.sslip.io/api/v1/center/list")
      .then((res) => setCenters(res.data.data || []))
      .catch(() => toast.error("Failed to load centers"));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    // Password match check (client-side)
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://43.204.227.49.sslip.io/api/v1/users/signup",
        form
      );

      toast.success("Account created successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Signup failed";
      toast.error(msg);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Your Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role *</label>
            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Center */}
          <div>
            <label className="text-sm font-medium text-gray-700">Center *</label>
            <select
              name="centerId"
              value={form.centerId}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select Center</option>
              {centers?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must contain uppercase, lowercase, number & special character.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
