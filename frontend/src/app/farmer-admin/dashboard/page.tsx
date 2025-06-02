'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { authApi } from '../../services/api';

export default function FarmerAdminDashboard() {
  const [farmers, setFarmers] = useState<any[]>([]);
  const [itemForm, setItemForm] = useState({
    farmer_registration_number: '',
    item_name: '',
    quantity: '',
    cost_per_item: '',
  });
  const [loanForm, setLoanForm] = useState({
    farmer_registration_number: '',
    loan_item_name: '',
    amount_received: '',
    purpose: '',
  });
  const [editForm, setEditForm] = useState({
    id: 0,
    full_name: '',
    mobile_number: '',
    registration_number: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [assignItemsOpen, setAssignItemsOpen] = useState(false);
  const [assignLoansOpen, setAssignLoansOpen] = useState(false);
  const [viewFarmersOpen, setViewFarmersOpen] = useState(false);
  const [editFarmerOpen, setEditFarmerOpen] = useState(false);

  // Fetch farmers on mount
  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await authApi.getFarmerAdminFarmers();
      setFarmers(response.data.farmers);
    } catch {
      setError('Failed to fetch farmers');
    }
  };

  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoanChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAssignItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await authApi.assignFarmerItem(itemForm);
      setMessage('Item assigned successfully');
      setItemForm({
        farmer_registration_number: '',
        item_name: '',
        quantity: '',
        cost_per_item: '',
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const messages = Object.values(error.response.data.errors).flat().join(' ');
        setError(messages);
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to assign item');
      }
    }
  };

  const handleAssignLoan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await authApi.assignFarmerLoan(loanForm);
      setMessage('Loan assigned successfully');
      setLoanForm({
        farmer_registration_number: '',
        loan_item_name: '',
        amount_received: '',
        purpose: '',
      });
    } catch {
      setError('Failed to assign loan');
    }
  };

  const handleDeleteFarmer = async (id: number) => {
    setError('');
    setMessage('');
    try {
      await authApi.deleteFarmer(id);
      setMessage('Farmer deleted successfully');
      fetchFarmers();
    } catch {
      setError('Failed to delete farmer');
    }
  };

  const openEditFarmer = (farmer: any) => {
    setEditForm({
      id: farmer.id,
      full_name: farmer.full_name,
      mobile_number: farmer.mobile_number,
      registration_number: farmer.registration_number,
      location: farmer.location,
    });
    setEditFarmerOpen(true);
  };

  const handleUpdateFarmer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await authApi.updateFarmer(editForm.id, {
        full_name: editForm.full_name,
        mobile_number: editForm.mobile_number,
        registration_number: editForm.registration_number,
        location: editForm.location,
      });
      setMessage('Farmer updated successfully');
      setEditFarmerOpen(false);
      fetchFarmers();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const messages = Object.values(error.response.data.errors).flat().join(' ');
        setError(messages);
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to update farmer');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 p-8 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <button
          onClick={async () => {
            await authApi.logout();
            window.location.href = '/';
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-900 text-center drop-shadow-md">Welcome To Farmer Admin Dashboard</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-full max-w-4xl text-center">{error}</div>}
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 w-full max-w-4xl text-center">{message}</div>}

      <div className="flex flex-col space-y-6 w-full max-w-md">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setAssignItemsOpen(!assignItemsOpen)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAssignItemsOpen(!assignItemsOpen); }}
          className="w-full py-4 mb-4 border border-indigo-700 rounded-full text-indigo-700 font-semibold hover:bg-indigo-100 cursor-pointer flex items-center justify-center select-none shadow-md"
        >
          Assign Farmer Items
        </div>
        {assignItemsOpen && (
          <section className="mb-8 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleAssignItem} className="space-y-4">
              <input
                type="text"
                name="farmer_registration_number"
                placeholder="Farmer Registration Number"
                value={itemForm.farmer_registration_number}
                onChange={handleItemChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="item_name"
                placeholder="Item Name"
                value={itemForm.item_name}
                onChange={handleItemChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={itemForm.quantity}
                onChange={handleItemChange}
                required
                min="1"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="cost_per_item"
                placeholder="Cost Per Item"
                value={itemForm.cost_per_item}
                onChange={handleItemChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-[46px] hover:bg-indigo-700 transition-colors duration-300">
                Assign Item
              </button>
            </form>
          </section>
        )}
      </div>

      <div className="flex flex-col space-y-6 w-full max-w-md">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setAssignLoansOpen(!assignLoansOpen)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAssignLoansOpen(!assignLoansOpen); }}
          className="w-full py-4 mb-4 border border-indigo-700 rounded-full text-indigo-700 font-semibold hover:bg-indigo-100 cursor-pointer flex items-center justify-center select-none shadow-md"
        >
          Assign Farmer Loan
        </div>
        {assignLoansOpen && (
          <section className="mb-8 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleAssignLoan} className="space-y-4">
              <input
                type="text"
                name="farmer_registration_number"
                placeholder="Farmer Registration Number"
                value={loanForm.farmer_registration_number}
                onChange={handleLoanChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="loan_item_name"
                placeholder="Loan Item Name"
                value={loanForm.loan_item_name}
                onChange={handleLoanChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="amount_received"
                placeholder="Amount Received"
                value={loanForm.amount_received}
                onChange={handleLoanChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="purpose"
                placeholder="Purpose"
                value={loanForm.purpose}
                onChange={handleLoanChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-[46px] hover:bg-indigo-700 transition-colors duration-300">
                Assign Loan
              </button>
            </form>
          </section>
        )}
      </div>

      <div className="flex flex-col space-y-6 w-full max-w-4xl">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setViewFarmersOpen(!viewFarmersOpen)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setViewFarmersOpen(!viewFarmersOpen); }}
          className="w-full py-4 mb-4 border border-indigo-700 rounded-full text-indigo-700 font-semibold hover:bg-indigo-100 cursor-pointer flex items-center justify-center select-none shadow-md"
        >
          View Farmers
        </div>
        {viewFarmersOpen && (
          <section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-indigo-200">
                  <th className="border px-4 py-2 text-left">Full Name</th>
                  <th className="border px-4 py-2 text-left">Mobile Number</th>
                  <th className="border px-4 py-2 text-left">Registration Number</th>
                  <th className="border px-4 py-2 text-left">Location</th>
                  <th className="border px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((farmer) => (
                  <tr key={farmer.id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="border px-4 py-2">{farmer.full_name}</td>
                    <td className="border px-4 py-2">{farmer.mobile_number}</td>
                    <td className="border px-4 py-2">{farmer.registration_number}</td>
                    <td className="border px-4 py-2">{farmer.location}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => openEditFarmer(farmer)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-[46px] border border-yellow-500 hover:bg-yellow-600 w-20 h-10 transition-colors duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFarmer(farmer.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded-[46px] border border-red-600 hover:bg-red-700 w-24 h-10 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>

      {editFarmerOpen && (
        <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-900">Edit Farmer Details</h2>
            <form onSubmit={handleUpdateFarmer} className="space-y-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={editForm.full_name}
                onChange={handleEditChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="mobile_number"
                placeholder="Mobile Number"
                value={editForm.mobile_number}
                onChange={handleEditChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="registration_number"
                placeholder="Registration Number"
                value={editForm.registration_number}
                onChange={handleEditChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={editForm.location}
                onChange={handleEditChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-between">
                <button type="submit" className="bg-indigo-600 text-white py-2 px-6 rounded-[46px] hover:bg-indigo-700 transition-colors duration-300">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditFarmerOpen(false)}
                  className="bg-gray-400 text-white py-2 px-6 rounded-[46px] hover:bg-gray-500 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

    </div>
  );
}
