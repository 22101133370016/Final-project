'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { authApi } from '../../services/api';

export default function DistributorSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    card_id_no: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const signupData = {
        card_id_no: formData.card_id_no,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      };

      const response = await authApi.distributorSignup(signupData);

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to signin page after signup
      router.push('/distributor/signin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-700 text-white p-6">
            <h2 className="text-2xl font-bold text-center">Signup as Distributor</h2>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Card ID
              </label>
              <input
                type="text"
                name="card_id_no"
                value={formData.card_id_no}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 text-center">
              Already have an account? <a href="/distributor/signin" className="text-purple-600 font-medium hover:text-purple-800">Login</a>
            </p>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 text-center">
              <a href="/" className="text-purple-600 font-medium hover:text-purple-800">Back to Home</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
