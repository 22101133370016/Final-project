// app/farmer/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { authApi } from '../../../services/api';

export default function FarmerSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    registration_number: '',
    location: ''
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
    setLoading(true);
    setError('');
    
    try {
      const response = await authApi.registerFarmer(formData);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard
      router.push('/farmer/dashboard');
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
          <div className="bg-green-700 text-white p-6">
            <h2 className="text-2xl font-bold text-center">Signup as Farmer</h2>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <p className="text-xs text-gray-500">You will use this for login. Keep it secure.</p>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 text-center">
              Already have an account? <a href="#" className="text-green-600 font-medium hover:text-green-800">Login</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}