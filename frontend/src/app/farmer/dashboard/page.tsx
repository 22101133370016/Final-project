'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { farmerApi } from '../../services/api';

interface Update {
  id: number;
  message: string;
  created_at: string;
}

export default function FarmerDashboard() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await farmerApi.getDashboardData();
        setUpdates(response.data.updates || []);
        setItems(response.data.items || []);
        setLoans(response.data.loans || []);
      } catch {
        setError('Failed to fetch updates');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-green-700">Welcome To Farmer Dashboard</h1>

        {loading && <p>Loading updates...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {updates.length === 0 && items.length === 0 && loans.length === 0 ? (
              <p>No Hakuna kilichokwisha weka kwenye hii account</p>
            ) : (
              <>
                {updates.length > 0 && (
                  <ul className="space-y-4 mb-6">
                    {updates.map(update => (
                      <li key={update.id} className="bg-white p-4 rounded shadow">
                        <p className="text-green-900">{update.message}</p>
                        <p className="text-sm text-green-600 mt-1 italic">{new Date(update.created_at).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {items.length > 0 && (
                  <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-green-300 pb-2 text-green-800">Allocated Items</h2>
                    <ul className="space-y-3">
                      {items.map(item => (
                        <li key={item.id} className="p-3 border border-green-200 rounded hover:shadow-md transition-shadow duration-300">
                          <p><span className="font-semibold text-green-900">Item:</span> {item.item_name}</p>
                          <p><span className="font-semibold text-green-900">Quantity:</span> {item.quantity}</p>
                          <p><span className="font-semibold text-green-900">Cost per item:</span> {item.cost_per_item}</p>
                          <p className="text-sm text-green-600 mt-1 italic">Allocated on: {new Date(item.created_at).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {loans.length > 0 && (
                  <section className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 border-b border-green-300 pb-2 text-green-800">Allocated Loans</h2>
                    <ul className="space-y-3">
                      {loans.map(loan => (
                        <li key={loan.id} className="p-3 border border-green-200 rounded hover:shadow-md transition-shadow duration-300">
                          <p><span className="font-semibold text-green-900">Loan Item:</span> {loan.loan_item_name}</p>
                          <p><span className="font-semibold text-green-900">Amount Received:</span> {loan.amount_received}</p>
                          <p><span className="font-semibold text-green-900">Purpose:</span> {loan.purpose}</p>
                          <p className="text-sm text-green-600 mt-1 italic">Allocated on: {new Date(loan.created_at).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="mt-6">
        <Link href="/" className="text-green-700 font-semibold hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </>
  );
}
