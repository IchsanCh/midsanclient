import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const token = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [serverUser, setServerUser] = useState(null);
  const [stats, setStats] = useState({
    totalSales: 25420,
    activeUsers: 1240,
    orders: 156,
    revenue: 89340,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:1031/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setServerUser(data.user))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                Welcome back, {localUser?.name || "User"}! 👋
              </h1>
              <p className="text-base-content/70 mt-2">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-base-content/50">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title text-sm opacity-90">Total Sales</h2>
                  <p className="text-2xl font-bold">
                    ${stats.totalSales.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-75">+12% from last month</p>
                </div>
                <div className="text-3xl opacity-75">📈</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title text-sm opacity-90">
                    Active Users
                  </h2>
                  <p className="text-2xl font-bold">
                    {stats.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-75">+8% from last week</p>
                </div>
                <div className="text-3xl opacity-75">👥</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-accent to-accent-focus text-accent-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title text-sm opacity-90">Orders</h2>
                  <p className="text-2xl font-bold">{stats.orders}</p>
                  <p className="text-xs opacity-75">+23 today</p>
                </div>
                <div className="text-3xl opacity-75">📦</div>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-success to-success-focus text-success-content shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title text-sm opacity-90">Revenue</h2>
                  <p className="text-2xl font-bold">
                    ${stats.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-75">+15% from last month</p>
                </div>
                <div className="text-3xl opacity-75">💰</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Recent Activity</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Action</th>
                        <th>Status</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">John Doe</div>
                              <div className="text-sm opacity-50">
                                john@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>Made a purchase</td>
                        <td>
                          <span className="badge badge-success">Completed</span>
                        </td>
                        <td>2 min ago</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">Jane Smith</div>
                              <div className="text-sm opacity-50">
                                jane@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>Updated profile</td>
                        <td>
                          <span className="badge badge-info">Processing</span>
                        </td>
                        <td>5 min ago</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">Mike Johnson</div>
                              <div className="text-sm opacity-50">
                                mike@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>Submitted review</td>
                        <td>
                          <span className="badge badge-warning">Pending</span>
                        </td>
                        <td>10 min ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="btn btn-primary btn-block">
                    <span>📊</span>
                    View Reports
                  </button>
                  <button className="btn btn-secondary btn-block">
                    <span>👤</span>
                    Manage Users
                  </button>
                  <button className="btn btn-accent btn-block">
                    <span>⚙️</span>
                    Settings
                  </button>
                  <button className="btn btn-outline btn-block">
                    <span>📞</span>
                    Support
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">System Status</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Server Health</span>
                    <div className="badge badge-success">Online</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <div className="badge badge-success">Connected</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>API Status</span>
                    <div className="badge badge-warning">Slow</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Backup</span>
                    <div className="text-sm opacity-70">2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Monthly Progress</h2>
              <div className="py-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Sales Target</span>
                    <span>78%</span>
                  </div>
                  <progress
                    className="progress progress-primary"
                    value="78"
                    max="100"></progress>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Growth</span>
                    <span>65%</span>
                  </div>
                  <progress
                    className="progress progress-secondary"
                    value="65"
                    max="100"></progress>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Revenue Goal</span>
                    <span>92%</span>
                  </div>
                  <progress
                    className="progress progress-success"
                    value="92"
                    max="100"></progress>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Top Performing Categories</h2>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Electronics</span>
                  </div>
                  <span className="font-semibold">$12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Clothing</span>
                  </div>
                  <span className="font-semibold">$8,320</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Books</span>
                  </div>
                  <span className="font-semibold">$5,180</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>Home & Garden</span>
                  </div>
                  <span className="font-semibold">$3,420</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
