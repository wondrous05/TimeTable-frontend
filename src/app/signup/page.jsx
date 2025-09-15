"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matricNo, setMatricNo] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [modeOfStudy, setModeOfStudy] = useState("fullTime");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = "http://localhost:4500/api/v1/student/signup";
    const body = {
      email,
      password,
      matricNo,
      level,
      department,
      modeOfStudy,
      role: "student", // hardcoded since only students sign up here
    };

    try {
      const res = await axios.post(endpoint, body, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Signup successful:", res.data);
      showToast("Signup successful!", "success");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Student Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email & Password */}
          <div>
            <label className="block text-blue-700 font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Student-specific Fields */}
          <div>
            <label className="block text-blue-700 font-medium mb-2">Matric No</label>
            <input
              type="text"
              required
              value={matricNo}
              onChange={(e) => setMatricNo(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Level</option>
              <option value="ND1">ND1</option>
              <option value="ND2">ND2</option>
              <option value="HND1">HND1</option>
              <option value="HND2">HND2</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Department</label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Mode of Study</label>
            <select
              value={modeOfStudy}
              onChange={(e) => setModeOfStudy(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
