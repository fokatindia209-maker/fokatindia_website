// ============================
// layouts/AdminLayout.tsx
// ============================

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* NAVBAR */}
      <Navbar
        //sidebarOpen={sidebarOpen}
        //setSidebarOpen={setSidebarOpen}
      />

      {/* CONTENT */}
      <main className="pt-20 md:ml-64 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}