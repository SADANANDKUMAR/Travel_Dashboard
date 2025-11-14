import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Flight from "./pages/Flight";
import Train from "./pages/Train";
import Cruise from "./pages/Cruise";
import Hotel from "./pages/Hotel";
import Car from "./pages/Car";
import Conversation from "./pages/Conversation";
import Users from "./pages/Users";
import Chargeback from "./pages/Chargeback";
import Login from "./components/Login";

function RequireAuth({ children }) {
  const user = typeof window !== "undefined" && localStorage.getItem("user");
  if (!user) return <Navigate to="/" replace />; // root is login
  return children;
}

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* root is login page (no sidebar/navbar) */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* protected routes render inside MainLayout (with sidebar + navbar) */}
      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/train" element={<Train />} />
        <Route path="/cruise" element={<Cruise />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/car" element={<Car />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chargeback" element={<Chargeback />} />
      </Route>

      {/* fallback */}
      <Route
        path="*"
        element={
          localStorage.getItem("user") ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}
