'use client';

import React, { useEffect, useState } from 'react';

interface InputAllocation {
  id: number;
  quantity: number;
  cost: number;
  input: {
    name: string;
    description: string;
  };
}

const FarmerInputsPage: React.FC = () => {
  const [inputs, setInputs] = useState<InputAllocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInputs = async () => {
    try {
      const response = await fetch('/api/farmer/inputs');
      if (!response.ok) {
        throw new Error('Failed to fetch inputs');
      }
      const data = await response.json();
      setInputs(data);
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
    fetchInputs();
  }, []);

  if (loading) return <div>Loading inputs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Your Allocated Inputs</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {inputs.map((allocation) => (
            <tr key={allocation.id}>
              <td>{allocation.input.name}</td>
              <td>{allocation.input.description}</td>
              <td>{allocation.quantity}</td>
              <td>{allocation.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerInputsPage;
