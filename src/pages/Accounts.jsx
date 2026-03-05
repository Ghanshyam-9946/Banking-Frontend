import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post("/accounts");

      fetchAccounts();
    } catch (err) {
      console.log(err.response?.data || err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          My Accounts
        </h1>
      </div>

      {/* Create Account Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-lg font-semibold mb-4">
          Create New Account
        </h2>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

      </div>

      {/* Accounts List */}
      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-6">
          Your Accounts
        </h2>

        {accounts.length === 0 ? (
          <p className="text-gray-500">
            No accounts found
          </p>
        ) : (

          <div className="space-y-4">

            {accounts.map((acc) => (

              <div
                key={acc._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
              >

                <div>
                  <p className="text-sm text-gray-500">
                    Account Number
                  </p>

                  <p className="font-semibold">
                    ****{acc._id.slice(-6)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Currency
                  </p>

                  <p className="font-semibold">
                    {acc.currency}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Balance
                  </p>

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