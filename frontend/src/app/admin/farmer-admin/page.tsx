'use client';

import React, { useEffect, useState } from 'react';
import { authApi } from '../../services/api';

interface FarmerAdmin {
  id: number;
  name: string;
  email: string;
}

export default function FarmerAdminPage() {
  const [farmerAdmins, setFarmerAdmins] = useState<FarmerAdmin[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<FarmerAdmin | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Fetch farmer admins from API
  const fetchFarmerAdmins = async () => {
    try {
      const response = await authApi.getFarmerAdmins();
      setFarmerAdmins(response.data);
    } catch {
      setError('Failed to fetch farmer admins.');
    }
  };

  useEffect(() => {
    fetchFarmerAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await authApi.deleteFarmerAdmin(id);
      setFarmerAdmins(farmerAdmins.filter((admin) => admin.id !== id));
    } catch {
      setError('Failed to delete farmer admin.');
    }
  };

  const handleEdit = (admin: FarmerAdmin) => {
    setEditingAdmin(admin);
    setName(admin.name);
    setEmail(admin.email);
    setError('');
  };

  const handleUpdate = async () => {
    if (editingAdmin) {
      try {
        await authApi.updateFarmerAdmin(editingAdmin.id, { name, email });
        setFarmerAdmins(
          farmerAdmins.map((admin) =>
            admin.id === editingAdmin.id ? { ...admin, name, email } : admin
          )
        );
        setEditingAdmin(null);
        setName('');
        setEmail('');
        setError('');
      } catch {
        setError('Failed to update farmer admin.');
      }
    }
  };

  const handleCancel = () => {
    setEditingAdmin(null);
    setName('');
    setEmail('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Farmer Admin Management</h1>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      {editingAdmin ? (
        <div className="w-full max-w-3xl p-4 border border-gray-300 rounded bg-white mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Farmer Admin</h2>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <table className="w-full max-w-3xl border border-gray-300 rounded bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b border-gray-300 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmerAdmins.map((admin) => (
            <tr key={admin.id}>
              <td className="py-2 px-4 border-b border-gray-300">{admin.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{admin.email}</td>
              <td className="py-2 px-4 border-b border-gray-300 space-x-2">
                <button
                  onClick={() => handleEdit(admin)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {farmerAdmins.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No farmer admins found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
