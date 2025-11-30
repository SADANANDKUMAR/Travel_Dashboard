import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: username,
          password: password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid username or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between font-sans">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Log in
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username (Email)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-3 pr-4 py-2 w-full border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-3 pr-4 py-2 w-full border rounded-md"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        CRM Version 12 © 2025
      </footer>
    </div>
  );
};

export default Login;
