'use client';

import React from 'react';
import Link from 'next/link';
import { authApi } from '../../services/api';

export default function AdminDashboard() {
  const handleLogout = async () => {
    await authApi.logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome to SYSTEM ADMIN DASHBOARD</h1>

      <div className="w-full max-w-4xl mb-6">
        <nav className="flex space-x-4 border-b border-gray-300">
          <Link href="/admin/farmer-admin" className="py-2 px-4 border-b-2 border-blue-600 font-semibold text-black cursor-pointer">
            Farmer Admins
          </Link>
        </nav>
      </div>
    </div>
  );
}
