"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toast";

// Utility to generate academic sessions
function getAcademicSessions(startYear = 2015, count = 15) {
  const sessions = [];
  for (let i = 0; i < count; i++) {
    const year1 = startYear + i;
    const year2 = year1 + 1;
    sessions.push(`${year1}/${year2}`);
  }
  return sessions.reverse(); // Most recent first
}

// Utility for department options
const departmentOptions = [
  { value: "COMPSCI", label: "Computer Science" },
  { value: "Statistics", label: "Statistics" },
  { value: "Science Laboratory Technology", label: "Science Laboratory Technology" },
  { value: "Food Technology", label: "Food Technology" },
  { value: "Pharmaceutical Technology", label: "Pharmaceutical Technology" },
  { value: "Other", label: "Other" },
];

// Utility for time slots (same as dashboard)
const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

// Predefined lecture rooms
const lectureRoomOptions = [
  "COM RM 1",
  "COM RM 2",
  "ICT RM 7",
  "ICT RM 8",
  "ICT RM 11",
  "LAB 10",
  "LAB 11",
  "LAB 12",
  "HW Lab",
  "Other"
];

// Predefined lecturers
const lecturerOptions = [
  "MR. AKINLADE",
  " DR (MRS). ALARAN",
  "MR. ADEBESIN",
  "MRS. ADEBAYO",
  "MRS. ADESINA",
  "MR ADEBAYO",
  "MR. ADETONA",
  "DR. ORUNSOLU",
  "DR. (MRS) LAWAL",
  "MR. ELEGBEDE",
  "MR. ODEKUNLE",
  "MR. OLADIMEJI",
  "MR. OLATUNJI",
  "MRS. OYELOWO",
  "MR. KAREEM",
  "MR. SALAWU",
  "Other"
];

export default function CreateTable() {
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const academicSessions = getAcademicSessions(2015, 15);
  const [lectureRoom, setLectureRoom] = useState("");
  const [customLectureRoom, setCustomLectureRoom] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [customLecturer, setCustomLecturer] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false); // ✅ only loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://api-time-1scv.onrender.com/api/v1/table/create/table",
        {
          department,
          course,
          time,
          day,
          semester,
          year,
          lectureRoom: lectureRoom === "Other" ? customLectureRoom : lectureRoom,
          lecturer: lecturer === "Other" ? customLecturer : lecturer,
          level,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast(res.data.msg || "Timetable created successfully.", "success");
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to create timetable.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Create Timetable
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-700 font-medium mb-2">Department</label>
            <select
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Course</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter course name/code"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Time</label>
            <select
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Semester</option>
              <option value="first">First</option>
              <option value="second">Second</option>
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Academic Session</label>
            <select
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Academic Session</option>
              {academicSessions.map((session) => (
                <option key={session} value={session}>{session}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Lecture Room</label>
            <select
              required
              value={lectureRoom}
              onChange={(e) => setLectureRoom(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Lecture Room</option>
              {lectureRoomOptions.map((room) => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
            {lectureRoom === "Other" && (
              <input
                type="text"
                required
                value={customLectureRoom}
                onChange={(e) => setCustomLectureRoom(e.target.value)}
                placeholder="Enter custom lecture room"
                className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Lecturer</label>
            <select
              required
              value={lecturer}
              onChange={(e) => setLecturer(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Lecturer</option>
              {lecturerOptions.map((lect) => (
                <option key={lect} value={lect}>{lect}</option>
              ))}
            </select>
            {lecturer === "Other" && (
              <input
                type="text"
                required
                value={customLecturer}
                onChange={(e) => setCustomLecturer(e.target.value)}
                placeholder="Enter custom lecturer"
                className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Level</option>
              <option value="ND 1">ND1</option>
              <option value="ND 2">ND2</option>
              <option value="HND 1">HND1 NCC</option>
              <option value="HND 2">HND2 SWD</option>
            </select>
          </div>
          {/* Department field removed */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-black py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Creating..." : "Create Timetable"}
          </button>
        </form>
      </div>
    </div>
  );
}
