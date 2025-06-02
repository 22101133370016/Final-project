'use client';

import React, { useEffect, useState } from 'react';

interface Farmer {
  id: number;
  full_name: string;
  mobile_number: string;
  registration_number: string;
  location: string;
  email: string;
}

const FarmerAdminPage: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarmers = async () => {
    try {
      const response = await fetch('/api/admin/farmers?station='); // Add station query param as needed
      if (!response.ok) {
        throw new Error('Failed to fetch farmers');
      }
      const data = await response.json();
      setFarmers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this farmer?')) return;
    try {
      const response = await fetch(`/api/admin/farmers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete farmer');
      }
      setFarmers(farmers.filter((farmer) => farmer.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Unknown error');
      }
    }
  };

  // For update, you can implement a modal or separate page - omitted here for brevity

  if (loading) return <div>Loading farmers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Farmers Registered at Station</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Registration Number</th>
            <th>Location</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td>{farmer.full_name}</td>
              <td>{farmer.mobile_number}</td>
              <td>{farmer.registration_number}</td>
              <td>{farmer.location}</td>
              <td>{farmer.email}</td>
              <td>
                <button onClick={() => handleDelete(farmer.id)}>Delete</button>
                {/* Add update button and functionality as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerAdminPage;
