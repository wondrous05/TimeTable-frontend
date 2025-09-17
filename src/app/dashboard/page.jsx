"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";

// Generate academic sessions
function getAcademicSessions(startYear = 2015, count = 15) {
  const sessions = [];
  for (let i = 0; i < count; i++) {
    const year1 = startYear + i;
    sessions.push(`${year1}/${year1 + 1}`);
  }
  return sessions.reverse();
}

export default function Dashboard() {
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState(""); // ✅ fixed lowercase
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const academicSessions = getAcademicSessions(2015, 15);
  const departmentOptions = [
    { value: "COMPSCI", label: "Computer Science" },
    { value: "Statistics", label: "Statistics" },
    { value: "Science Laboratory Technology", label: "Science Laboratory Technology" },
    { value: "Food Technology", label: "Food Technology" },
    { value: "Pharmaceutical Technology", label: "Pharmaceutical Technology" },
    { value: "Other", label: "Other" },
  ];

  // Load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      showToast("You are not logged in. Please log in first.", "error");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      showToast("No token found. Please log in again.", "error");
      return;
    }

    setLoading(true);
    setTimetable([]);

    try {
  const res = await axios.get("https://api-time-1scv.onrender.com/api/v1/student/view", {
        params: { semester, level, year, department }, // ✅ department now correct
        headers: { Authorization: `Bearer ${token}` },
      });

      setTimetable(res.data);
      if (res.data.length === 0) {
        showToast("No timetable found for the selected filters.", "info");
      } else {
        showToast("Timetable fetched successfully!", "success");
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to fetch timetable.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
  ];

  // Convert department to sentence case for display
  const sentenceCaseDept = department
    ? department.charAt(0).toUpperCase() + department.slice(1).toLowerCase()
    : "";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Timetable Dashboard
        </h1>

        {/* Filters */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Semester</option>
            <option value="first">First</option>
            <option value="second">Second</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Level</option>
            <option value="ND 1">ND1</option>
            <option value="ND 2">ND2</option>
            <option value="HND 1 ">HND1</option>
            <option value="HND 2">HND2</option>
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Academic Session</option>
            {academicSessions.map((session) => (
              <option key={session} value={session}>{session}</option>
            ))}
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200 mt-2"
          >
            {loading ? "Loading..." : "View Timetable"}
          </button>
        </form>

        {/* Timetable */}
        {timetable.length > 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              {sentenceCaseDept} Timetable ({level}, {semester} Semester, {year})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Time</th>
                    {days.map((day) => (
                      <th key={day} className="p-2 border">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot}>
                      <td className="p-2 border font-semibold bg-gray-100">
                        {timeSlot}
                      </td>
                      {days.map((day) => {
                        const entry = timetable.find(
                          (row) =>
                            row.time === timeSlot &&
                            row.day.toLowerCase() === day.toLowerCase()
                        );
                        return (
                          <td key={day} className="p-2 border">
                            {entry ? (
                              <div>
                                <p className="font-bold">{entry.course}</p>
                                <p className="text-sm">{entry.lecturer}</p>
                                <p className="text-xs text-gray-500">
                                  {entry.lectureRoom}
                                </p>
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500 mt-6">
              No timetable found. Try adjusting your filters.
            </p>
          )
        )}
      </div>
    </div>
  );
}
