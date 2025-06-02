'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../services/api';

export default function AdminSigninForm() {
  const router = useRouter();
  const [cardId, setCardId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/signin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cardId || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await authApi.login({ card_id_no: cardId, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        router.push('/admin/dashboard');
      } else {
        setError('Login failed: No token received.');
      }
    } catch {
      setError('Login failed: Invalid credentials or server error.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">System Admin Sign In</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="cardId" className="block text-gray-700 font-semibold mb-2">
          Card ID
        </label>
        <input
          type="text"
          id="cardId"
          name="cardId"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your Card ID"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Sign In
      </button>
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </form>
  );
}
