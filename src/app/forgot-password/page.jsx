"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  // Remove error/success state, use toast instead
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  // No error/success state, clear toast
    const endpoint = role === "admin"
      ? "http://localhost:4500/api/v1/admin/forgotpassword"
      : "http://localhost:4500/api/v1/student/forgotpassword";
    try {
      const res = await axios.post(endpoint, { email }, {
        headers: { "Content-Type": "application/json" },
      });
      showToast(res.data.msg || "Check your email for reset instructions.", "success");
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to send reset email.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Forgot Password</h2>
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
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-black py-2 rounded font-semibold hover:bg-blue-700 transition duration-200">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
