'use client';

import React, { useEffect, useState } from 'react';
import { authApi } from '../../services/api';

export default function FarmerAdminList() {
  const [farmerAdmins, setFarmerAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    card_id_no: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    fetchFarmerAdmins();
  }, []);

  const fetchFarmerAdmins = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authApi.getFarmerAdmins();
      setFarmerAdmins(response.data.farmerAdmins);
    } catch (err) {
      setError('Failed to fetch farmer admins');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setEditId(admin.id);
    setFormData({
      email: admin.email,
      card_id_no: admin.card_id_no,
      password: '',
      password_confirmation: '',
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      email: '',
      card_id_no: '',
      password: '',
      password_confirmation: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authApi.updateFarmerAdmin(editId, formData);
      await fetchFarmerAdmins();
      setEditId(null);
    } catch (err) {
      setError('Failed to update farmer admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this farmer admin?')) return;
    setLoading(true);
    setError('');
    try {
      await authApi.deleteFarmerAdmin(id);
      await fetchFarmerAdmins();
    } catch (err) {
      setError('Failed to delete farmer admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Farmer Admin Management</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p>Loading...</p>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Card ID No</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmerAdmins.map(admin => (
            <tr key={admin.id} className="border-t">
              <td className="border px-4 py-2">
                {editId === admin.id ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  admin.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editId === admin.id ? (
                  <input
                    type="text"
                    name="card_id_no"
                    value={formData.card_id_no}
                    onChange={handleChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  admin.card_id_no
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editId === admin.id ? (
                  <>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border p-1"
                    />
                    <input
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      className="border p-1"
                    />
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(admin)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {farmerAdmins.length === 0 && !loading && (
            <tr>
              <td colSpan="3" className="text-center p-4">No farmer admins found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
