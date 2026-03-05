import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Transactions() {

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fromAccount: "",
    toAccount: "",
    amount: ""
  });

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

const handleTransfer = async (e) => {
  e.preventDefault();

  const payload = {
    fromAccount: form.fromAccount?.trim(),
    toAccount: form.toAccount?.trim(),
    amount: Number(form.amount),
    idempotencyKey: Date.now().toString()
  };

  if (!payload.fromAccount || !payload.toAccount || !payload.amount) {
    alert("All fields are required ❌");
    return;
  }

  setLoading(true);

  try {

    const res = await axios.post("/transactions", payload, {
      timeout: 30000
    });

    console.log("Transaction response:", res.data);

    alert("Transfer Successful 💸");

    await fetchAccounts();

    setForm({
      fromAccount: "",
      toAccount: "",
      amount: ""
    });

  } catch (err) {

    console.log("Transaction error:", err);

    alert(err?.response?.data?.message || "Transfer Failed ❌");

  }

  setLoading(false);
};
  const getBalance = (acc) => {
    return acc.balance ?? acc.availableBalance ?? acc.currentBalance ?? 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">
        Transfer Money
      </h1>

      {/* Account Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Your Accounts
        </h2>

        {accounts.length === 0 ? (
          <p className="text-gray-500">
            No accounts found
          </p>
        ) : (

          <div className="space-y-3">

            {accounts.map((acc) => (

              <div
                key={acc._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
              >

                <div>
                  <p className="text-sm text-gray-500">
                    Account ID
                  </p>

                  <p className="font-medium">
                    ****{acc._id.slice(-6)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Available Balance
                  </p>

                  <p className="text-lg font-bold text-green-600">
                    ₹ {getBalance(acc)}
                  </p>
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Transfer Form */}
      <div className="bg-white rounded-xl shadow-md p-6">

        <h2 className="text-xl font-semibold mb-6">
          Send Money
        </h2>

        <form
          onSubmit={handleTransfer}
          className="grid md:grid-cols-4 gap-4"
        >

          {/* From Account */}
          <select
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.fromAccount}
            onChange={(e) =>
              setForm({ ...form, fromAccount: e.target.value })
            }
            required
          >
            <option value="">Select Account</option>

            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                ****{acc._id.slice(-6)} - ₹{getBalance(acc)}
              </option>
            ))}

          </select>

          {/* Receiver */}
          <input
            type="text"
            placeholder="Receiver Account ID"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.toAccount}
            onChange={(e) =>
              setForm({ ...form, toAccount: e.target.value })
            }
            required
          />

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            required
          />

          {/* Button */}
         <button
  type="submit"
  disabled={loading}
  className={`text-white font-semibold rounded-lg px-4 py-3 ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Processing..." : "Transfer"}
</button>

        </form>

      </div>

    </div>
  );
}