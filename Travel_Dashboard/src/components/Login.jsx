import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Demo credentials
    if (username === "demo" && password === "demo@123") {
      // store simple session flag (replace with real auth in production)
      localStorage.setItem("user", JSON.stringify({ username: "demo" }));
      navigate("/dashboard"); // redirect to dashboard after login
      return;
    }

    setError("Invalid username or password. Use username: demo, password: demo@123");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between font-sans">
      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              Log in
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-indigo-500">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-indigo-500">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600" role="alert" aria-live="assertive">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition flex justify-center items-center gap-2"
                >
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-500 text-center">
              Demo credentials — username: <b>demo</b>, password: <b>demo@123</b>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        CRM Version 12 &copy; 2025
      </footer>
    </div>
  );
};

export default Login;