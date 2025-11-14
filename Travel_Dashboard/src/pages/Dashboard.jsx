import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* <StatsCard title="Total Bookings" value="3" subtitle="0% from last month" icon={<FaChartLine />} />
          <StatsCard title="Confirmed" value="1" subtitle="1 pending approval" icon={<FaCheckCircle />} />
          <StatsCard title="Pending" value="1" subtitle="Out of 3 total" icon={<FaHourglassHalf />} /> */}
        </div>

        <div className="p-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
          {/* <BookingStatusChart /> */}
          {/* <RevenueChart /> */}
        </div>

        <div className="p-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
          {/* <RecentBookings />
          <RecentActivity /> */}
        </div>
      </div>
    </div>
  );
}
