"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = role === "admin"
        ? "http://localhost:4500/api/v1/admin/reset-password"
        : "http://localhost:4500/api/v1/student/reset-password";
      const res = await axios.post(endpoint, { email, token, password }, {
        headers: { "Content-Type": "application/json" },
      });
      showToast(res.data.msg || "Password reset successful.", "success");
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to reset password.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-green-700 font-medium mb-2">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Reset Token</label>
            <input type="text" required value={token} onChange={e => setToken(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">New Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-black py-2 rounded font-semibold hover:bg-blue-700 transition duration-200">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
