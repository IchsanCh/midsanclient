import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user")); // ambil data user dari localStorage
  const [serverUser, setServerUser] = useState(null);
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
        navigate("/login"); // redirect kalau token invalid
      });
  }, [token, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="mt-4">
        <h2 className="text-xl">👤 Biodata (LocalStorage):</h2>
        <p>Nama: {localUser?.name}</p>
        <p>Email: {localUser?.email}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl">🔄 Biodata (From Server):</h2>
        {serverUser ? (
          <>
            <p>Nama: {serverUser.name}</p>
            <p>Email: {serverUser.email}</p>
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>

      <div className="mt-6">
        <Link to="/" className="btn btn-error">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
