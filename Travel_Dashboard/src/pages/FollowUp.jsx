import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function FollowUp() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [activeDay, setActiveDay] = useState("MON");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [draggedItem, setDraggedItem] = useState(null);

  // ---- SAMPLE FOLLOW-UP TASKS (local state) ----
  const [followUps, setFollowUps] = useState({
    SUN: [],
    MON: [
      { id: 1, name: "Call passenger for cruise documents", priority: "High" },
      { id: 2, name: "Send flight ticket reminder", priority: "Medium" },
    ],
    TUE: [],
    WED: [{ id: 3, name: "Hotel check-in confirmation", priority: "Low" }],
    THU: [],
    FRI: [],
    SAT: [],
  });

  // ---- UPCOMING BOOKINGS GROUPED BY SERVICE ----
  const upcoming = {
    Flight: [
      { id: "FL1001", guest: "Ravi Kumar", date: "03 Feb 2026" },
      { id: "FL1004", guest: "Maria Singh", date: "05 Feb 2026" },
    ],
    Cruise: [{ id: "CR2001", guest: "Aanya", date: "02 Feb 2026" }],
    Hotel: [{ id: "HT3301", guest: "Neha", date: "07 Feb 2026" }],
    Car: [{ id: "CAR9901", guest: "Arun", date: "11 Feb 2026" }],
    Train: [{ id: "TR7722", guest: "Rahul", date: "06 Feb 2026" }],
  };

  // ---- DRAG HANDLERS ----
  const handleDragStart = (item) => setDraggedItem(item);
  const handleDrop = (day) => {
    if (!draggedItem) return;

    // Remove from all days
    const updatedDays = { ...followUps };
    for (let d of days) {
      updatedDays[d] = updatedDays[d].filter((t) => t.id !== draggedItem.id);
    }

    // Add to new day
    updatedDays[day].push(draggedItem);

    setFollowUps(updatedDays);
    setDraggedItem(null);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-4 sm:ml-64 mt-16">
          {/* ------------------ PAGE TITLE ------------------ */}
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            Passenger Follow-Up Dashboard
          </h1>

          {/* ------------------ STAT CARDS ------------------ */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
            <StatCard title="Follow-Ups Today" count="0" icon={<FaCalendarAlt />} color="blue" />
            <StatCard title="Overdue" count="0" icon={<FaClock />} color="red" subtitle="Requires immediate attention" />
            <StatCard title="High Priority" count="0" icon={<FaExclamationTriangle />} color="yellow" subtitle="High priority tasks" />
            <StatCard title="Completed" count="0" icon={<FaCheckCircle />} color="green" subtitle="Successfully completed" />
          </div>

          {/* ------------------ WEEK BAR WITH DRAG & DROP ------------------ */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10 select-none">
            <div className="flex justify-between items-center mb-5">
              <button
                onClick={() => setCalendarOpen(!calendarOpen)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Pick Date
              </button>

              {selectedDate && (
                <div className="text-sm text-gray-500">Selected: {selectedDate}</div>
              )}
            </div>

            {/* Simple calendar popup */}
            {calendarOpen && (
              <div className="bg-white shadow-lg p-4 rounded-xl w-56 mb-5">
                <input
                  type="date"
                  className="border rounded-md w-full px-3 py-2"
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setCalendarOpen(false);
                  }}
                />
              </div>
            )}

            {/* Day Strip */}
            <div className="grid grid-cols-7 text-center gap-4">
              {days.map((day) => (
                <div
                  key={day}
                  onClick={() => setActiveDay(day)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(day)}
                  className={`cursor-pointer py-4 rounded-xl border transition shadow-sm ${
                    activeDay === day
                      ? "bg-blue-50 border-blue-400 shadow-md"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <span className="font-semibold text-gray-700">{day}</span>
                </div>
              ))}
            </div>

            {/* Tasks for selected day */}
            <div className="mt-8">
              <h2 className="text-md font-semibold text-gray-700 mb-3">
                Tasks for {activeDay}
              </h2>

              {followUps[activeDay].length === 0 ? (
                <p className="text-gray-400 text-sm">No follow-ups for this day.</p>
              ) : (
                <div className="space-y-3">
                  {followUps[activeDay].map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="p-4 bg-white rounded-lg border shadow-sm flex justify-between items-center cursor-move hover:shadow-md transition"
                    >
                      <span className="font-medium">{task.name}</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ------------------ UPCOMING BOOKINGS GROUPED ------------------ */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Upcoming Bookings
          </h2>

          <div className="space-y-6">
            {Object.keys(upcoming).map((category) => (
              <div key={category}>
                <div className="font-semibold text-gray-600 mb-2">{category}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcoming[category].map((b, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition"
                    >
                      <div className="text-sm text-gray-500">Booking ID</div>
                      <div className="text-lg font-bold text-gray-800">{b.id}</div>

                      <div className="mt-2 text-sm">
                        <span className="font-semibold">{category}</span> — {b.guest}
                      </div>

                      <div className="mt-2 text-xs text-gray-500">Travel Date:</div>
                      <div className="font-medium text-gray-700">{b.date}</div>

                      <div className="mt-3">
                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, color, subtitle }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-500",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>
            {count}
          </div>
          {subtitle && (
            <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
          )}
        </div>

        <div className={`${colorMap[color]} p-3 rounded-full text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
