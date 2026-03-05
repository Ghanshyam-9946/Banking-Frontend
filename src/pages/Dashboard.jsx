import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("/accounts/user");
      setAccounts(res.data.accounts || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + (acc.balance || 0),
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Banking Dashboard</h1>
          <p className="text-sm opacity-80">Manage your accounts & transfers</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Accounts</h2>
          <p className="text-3xl font-bold mt-2">{accounts.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Balance</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹ {totalBalance}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm mb-3">Quick Actions</h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/accounts")}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold transition"
            >
              Manage Accounts
            </button>

            <button
              onClick={() => navigate("/transactions")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-semibold transition"
            >
              Transfer Money
            </button>
          </div>
        </div>

      </div>

      {/* Accounts Section */}
      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          My Accounts
        </h2>

        {accounts.length === 0 ? (
          <p className="text-gray-500">No accounts found</p>
        ) : (

          <div className="space-y-4">

            {accounts.map((acc) => (

              <div
                key={acc._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
              >

                <div>
                  <p className="text-sm text-gray-500">Account ID</p>
                  <p className="font-medium">{acc._id}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹ {acc.balance}
                  </p>
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}