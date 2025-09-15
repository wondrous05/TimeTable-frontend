"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-gray-100 relative">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4 rounded-b-xl z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div>
              <span className="font-bold text-lg text-green-800">NACOSMAPOLY</span>
              <div className="text-xs text-gray-500">Networking the world!</div>
            </div>
            <img src="/nacos-logo.png" alt="NACOS" className="h-12 w-12 object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/signup">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-800 transition">Signup</button>
          </Link>
          <Link href="/login">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-800 transition">Sign In</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center h-[70vh] bg-cover bg-center" style={{backgroundImage: 'url(/table.png)'}}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-start max-w-2xl px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm">WELCOME TO NACOS MAPOLY TIMETABLE PRO</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Have a great experience<br />
            <span className="text-blue-400">#Professional Development</span>
          </h1>
          <p className="text-lg text-white mb-8 font-medium drop-shadow">
            NACOS MAPOLY TIMETABLE PRO allow you to manage your schedules, classes, and more. 
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/login">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-white-800 transition">Nacos Student Portal</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
