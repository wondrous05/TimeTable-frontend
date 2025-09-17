"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// You may want to get the token from localStorage or context

const FetchTimetables = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [lectureRoom, setLectureRoom] = useState("");
  const [lecturerOptions, setLecturerOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
  }, []);

  async function fetchtable(e) {
  
    e.preventDefault();
     setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:4500/api/v1/admin/viewtable",
        // "https://api-time-1scv.onrender.com/api/v1/admin/admin/viewtable",
        {
          params: { semester, level, year, department, lecturer, lectureRoom },
          headers: { Authorization: `Bearer ${token}` } ,
        }
      );

      console.log(res, "this is the response");
      
      setTimetables(res.data);
      // Extract unique lecturers and rooms for dropdowns
      const lecturers = Array.from(
        new Set(res.data.map((row) => row.lecturer))
      ).filter(Boolean);
      const rooms = Array.from(
        new Set(res.data.map((row) => row.lectureRoom))
      ).filter(Boolean);
      setLecturerOptions(lecturers);
      setRoomOptions(rooms);
      toast.success("Timetable fetched successfully");
    } catch (err) {
      setLecturerOptions([]);
      setRoomOptions([]);
      if (err.response?.status === 404) {
        toast.error("No timetable found for the selected criteria.");
      } else if (err.response?.status === 403) {
        toast.error("Unauthorized: Only admins can view this data.");
      } else {
        toast.error(
          err.response?.data?.msg ||
            "Failed to fetch timetable. Check your credentials."
        );
      }
      setTimetables([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-green-800">
          Admin Timetable Dashboard
        </h1>
        <form
          className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8"
          onSubmit={fetchtable}
        >
          <select
            className="border rounded px-3 py-2"
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
          >
            <option value="">Lecturer</option>
            {lecturerOptions.map((l, idx) => (
              <option key={idx} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={lectureRoom}
            onChange={(e) => setLectureRoom(e.target.value)}
          >
            <option value="">Lecture Room</option>
            {roomOptions.map((r, idx) => (
              <option key={idx} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option value="">Semester</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">Level</option>
            <option value="ND1">ND1</option>
            <option value="ND2">ND2</option>
            <option value="HND1">HND1</option>
            <option value="HND2">HND2</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Academic Year</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2025/2026">2025/2026</option>
          </select>
          <select
            className="border rounded px-3 py-2"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Statistics">Statistics</option>
            <option value="Office Technology Management">
              Office Technology Management
            </option>
          </select>
          <button
            type="submit"
            
            className="col-span-1 md:col-span-4 bg-green-700 text-white py-2 rounded font-semibold hover:bg-green-800 transition duration-200 mt-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "View Timetable"}
          </button>
        </form>
        <div>
          {timetables.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border px-2 py-1">Course</th>
                    <th className="border px-2 py-1">Lecturer</th>
                    <th className="border px-2 py-1">Room</th>
                    <th className="border px-2 py-1">Day</th>
                    <th className="border px-2 py-1">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {timetables.map((row, idx) => (
                    <tr key={idx} className="even:bg-gray-50">
                      <td className="border px-2 py-1">{row.course}</td>
                      <td className="border px-2 py-1">{row.lecturer}</td>
                      <td className="border px-2 py-1">{row.lectureRoom}</td>
                      <td className="border px-2 py-1">{row.day}</td>
                      <td className="border px-2 py-1">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              No timetable data to display.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// ...existing code...
export default FetchTimetables;
