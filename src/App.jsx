import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";

export default function App(){
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
      <Route 
  path="/transactions"
  element={
    <ProtectedRoute>
      <Transactions/>
    </ProtectedRoute>
  }
/>
<Route 
  path="/accounts"
  element={
    <ProtectedRoute>
      <Accounts/>
    </ProtectedRoute>
  }
/>

    </Routes>
  )
}