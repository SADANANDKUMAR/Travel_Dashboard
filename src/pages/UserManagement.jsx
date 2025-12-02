// import React, { useState, useMemo } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import UserStatCard from "../components/UserStatCard";
// import UserTableRow from "../components/UserTableRow";
// import CreateUserModal from "../components/CreateUserModal";
// import { FaUsers, FaUserShield, FaUserTie, FaUserSlash } from "react-icons/fa";

// /**
//  * Static demo data - replace with API responses later
//  */
// const INITIAL_USERS = [
//   { id: "1", username: "Demo12", email: "demo12@email.com", phone: "0000000000", role: "Manager", status: "Active", center: "Demo" },
//   { id: "2", username: "Demo11", email: "demo@demo.com", phone: "123456789", role: "Customer Service", status: "Active", center: "Demo" },
// ];

// const CENTERS = [{ id: "Demo", name: "Demo" }];
// const ROLES = ["Manager", "Customer Service", "Agent"];

// export default function UserManagement() {
//   const [users, setUsers] = useState(INITIAL_USERS);
//   const [openCreate, setOpenCreate] = useState(false);
//   const [filterRole, setFilterRole] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 6;

//   // derived counts
//   const counts = useMemo(() => {
//     const total = users.length;
//     const managers = users.filter(u => u.role === "Manager").length;
//     const agents = users.filter(u => u.role === "Agent").length;
//     const blocked = users.filter(u => u.status !== "Active").length;
//     return { total, managers, agents, blocked };
//   }, [users]);

//   function handleCreate(newUser) {
//     setUsers(prev => [newUser, ...prev]);
//     setPage(1);
//   }

//   function handleEdit(user) {
//     // simple prompt edit (demo). Replace with proper modal/form
//     const newName = prompt("Edit username", user.username);
//     if (!newName) return;
//     setUsers(prev => prev.map(u => u.id === user.id ? { ...u, username: newName } : u));
//   }

//   function handleDisable(user) {
//     setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
//   }

//   function handleDelete(user) {
//     // if (!confirm("Delete this user?")) return;
//     // setUsers(prev => prev.filter(u => u.id !== user.id));
//   }

//   // export to CSV
//   function exportCSV() {
//     const header = ["username,email,phone,role,status,center"].join(",");
//     const rows = users.map(u => [u.username,u.email,u.phone,u.role,u.status,u.center].join(","));
//     const csv = [header, ...rows].join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "users.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   }

//   const filtered = users.filter(u => (filterRole ? u.role === filterRole : true));
//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const pageItems = filtered.slice((page-1)*perPage, page*perPage);

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Navbar />

//         <div className="p-6 sm:ml-64 mt-16">

//           {/* Header */}
//           <div className="flex items-start justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
//               <p className="text-sm text-gray-500 mt-1">Manage and monitor all user accounts</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button onClick={() => setOpenCreate(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md">+ Create User</button>
//               <button onClick={() => alert("Logs (open dedicated page)")} className="px-3 py-2 border rounded-md">Logs</button>
//             </div>
//           </div>

//           {/* Stats cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//             <UserStatCard title="Total Users" value={counts.total} icon={<FaUsers />} />
//             <UserStatCard title="Managers" value={counts.managers} icon={<FaUserShield />} />
//             <UserStatCard title="Agents" value={counts.agents} icon={<FaUserTie />} />
//             <UserStatCard title="Blocked Users" value={counts.blocked} icon={<FaUserSlash />} />
//           </div>

//           {/* Controls (role filter + export) */}
//           <div className="bg-white rounded-lg p-4 border mb-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="border rounded px-3 py-2 text-sm">
//                   <option value="">All Roles</option>
//                   {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
//                 </select>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button onClick={exportCSV} className="px-4 py-2 bg-green-600 text-white rounded-md">Export</button>
//               </div>
//             </div>
//           </div>

//           {/* User List */}
//           <div className="bg-white rounded-lg p-4 border">
//             <div className="text-lg font-semibold text-gray-800 mb-4">User List</div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="py-3 px-6 text-left">USERNAME</th>
//                     <th className="py-3 px-6 text-left">EMAIL</th>
//                     <th className="py-3 px-6 text-left">PHONE</th>
//                     <th className="py-3 px-6 text-left">ROLE</th>
//                     <th className="py-3 px-6 text-left">STATUS</th>
//                     <th className="py-3 px-6 text-right">ACTIONS</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {pageItems.map(u => (
//                     <UserTableRow key={u.id} user={u} onEdit={handleEdit} onDisable={handleDisable} onDelete={handleDelete} />
//                   ))}

//                   {pageItems.length === 0 && (
//                     <tr>
//                       <td colSpan="6" className="py-6 text-center text-gray-500">No users found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="py-6">
//               <div className="flex items-center justify-center gap-3">
//                 <button className="px-3 py-2 border rounded-l" onClick={() => setPage(1)} disabled={page === 1}>« First</button>
//                 <button className="px-3 py-2 border" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>‹ Prev</button>
//                 <div className="px-4 py-2 bg-blue-600 text-white rounded">{page}</div>
//                 <button className="px-3 py-2 border" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>Next ›</button>
//                 <button className="px-3 py-2 border rounded-r" onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last »</button>
//               </div>
//               <div className="text-center text-sm text-gray-500 mt-4">Page {page} of {totalPages}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <CreateUserModal
//         open={openCreate}
//         onClose={() => setOpenCreate(false)}
//         onCreate={handleCreate}
//         centers={CENTERS}
//         roles={ROLES}
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserStatCard from "../components/UserStatCard";
import UserTableRow from "../components/UserTableRow";
import CreateUserModal from "../components/CreateUserModal";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUsers, FaUserShield, FaUserTie, FaUserSlash } from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [roles, setRoles] = useState([]);
  const [centers, setCenters] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // ⭕ BASE API URL
  const API = "https://43.204.227.49.sslip.io/api/v1";

  // Fetch ALL DATA when page loads
  useEffect(() => {
    fetchRoles();
    fetchCenters();
    fetchStats();
    fetchUsers();
  }, [page]);

  /* ------------------- API FUNCTIONS -------------------- */

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API}/users/roles`);
      setRoles(res.data);
    } catch {
      toast.error("Failed to load roles");
    }
  };

  const fetchCenters = async () => {
    try {
      const res = await axios.get(`${API}/center/list`);
      setCenters(res.data.data);
    } catch {
      toast.error("Failed to load centers");
    }
  };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API}/users/stats`);
//       setStats(res.data.data);
//     } catch {
//       toast.error("Failed to load user stats");
//     }
//   };
const fetchStats = async () => {
  try {
    const res = await axios.get(`${API}/users/stats`);
    setStats(res.data);   // ✅ Correct — stats are returned directly
  } catch {
    toast.error("Failed to load user stats");
  }
};

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users/list?page=${page}&limit=${limit}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await axios.put(`${API}/users/toggle-status/${userId}`);
      toast.success("Status updated");

      fetchUsers();
      fetchStats();
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ------------------- RENDER -------------------- */

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 sm:ml-64 mt-16">

          {/* Header */}
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
              <p className="text-sm text-gray-500">Manage and monitor all user accounts</p>
            </div>

            <button
              onClick={() => setOpenCreate(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              + Create User
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <UserStatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={<FaUsers />}  />
            <UserStatCard title="Managers" value={stats.managers ?? 0}  icon={<FaUserShield />}/>
            <UserStatCard title="Agents" value={stats.agents ?? 0}  icon={<FaUserTie />}/>
            <UserStatCard title="Blocked Users" value={stats.blockedUsers ?? 0} icon={<FaUserSlash />} />
          </div>
               {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <UserStatCard title="Total Users" value={counts.total} icon={<FaUsers />} />
            <UserStatCard title="Managers" value={counts.managers} icon={<FaUserShield />} />
            <UserStatCard title="Agents" value={counts.agents} icon={<FaUserTie />} />
            <UserStatCard title="Blocked Users" value={counts.blocked} icon={<FaUserSlash />} />
          </div> */}
          {/* User Table */}
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-2 px-3 text-left">Username</th>
                  <th className="py-2 px-3 text-left">Email</th>
                  <th className="py-2 px-3 text-left">Phone</th>
                  <th className="py-2 px-3 text-left">Role</th>
                  <th className="py-2 px-3 text-left">Center</th>
                  <th className="py-2 px-3 text-left">Status</th>
                  <th className="py-2 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <UserTableRow
                    key={u._id}
                    user={u}
                    onDisable={() => handleToggleStatus(u._id)}
                  />
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="mt-4 flex justify-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(1)}
                className="px-3 py-2 border rounded"
              >
                « First
              </button>

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-2 border rounded"
              >
                ‹ Prev
              </button>

              <span className="px-4 py-2 bg-blue-600 text-white rounded">
                {page}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-2 border rounded"
              >
                Next ›
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(totalPages)}
                className="px-3 py-2 border rounded"
              >
                Last »
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
   <CreateUserModal
  open={openCreate}
  onClose={() => setOpenCreate(false)}
  fetchUsers={fetchUsers}
  fetchStats={fetchStats}
  roles={roles || []}
  centers={centers || []}
/>

    </div>
  );
}

