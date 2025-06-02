'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { resourceApi } from '../../services/api';

interface Input {
  id: number;
  type: string;
  weight: number;
  cost: number;
  image?: string;
}

export default function InputsDistribution() {
  const [inputs, setInputs] = useState<Input[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    weight: '',
    cost: '',
    image: null as File | null,
  });
  const [showDetails, setShowDetails] = useState<Input | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchInputs();
    }
  }, []);

  const fetchInputs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await resourceApi.getInputs();
      setInputs(response.data);
    } catch (err: unknown) {
      setError('Failed to fetch inputs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('type', formData.type);
      data.append('weight', formData.weight);
      data.append('cost', formData.cost);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await resourceApi.createInput(data);
      setFormData({ type: '', weight: '', cost: '', image: null });
      await fetchInputs();
    } catch (err: unknown) {
      setError('Failed to create input');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Inputs Distribution</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Weight</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Uploading...' : 'Upload Input'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Existing Inputs</h3>
      {loading && <p>Loading inputs...</p>}
      {!loading && inputs.length === 0 && <p>No inputs found.</p>}
      <ul>
        {inputs.map(input => (
          <li key={input.id} className="border p-4 mb-2 rounded flex items-center justify-between">
            <div>
              <p><strong>Type:</strong> {input.type}</p>
              <p><strong>Weight:</strong> {input.weight}</p>
              <p><strong>Cost:</strong> ${input.cost}</p>
            </div>
            {input.image && (
              <img src={input.image} alt={input.type} className="w-20 h-20 object-cover rounded" />
            )}
            <button
              onClick={() => setShowDetails(input)}
              className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Learn More
            </button>
          </li>
        ))}
      </ul>

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded max-w-md w-full relative">
            <button
              onClick={() => setShowDetails(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h4 className="text-xl font-bold mb-4">{showDetails.type} Details</h4>
            <p><strong>Weight:</strong> {showDetails.weight}</p>
            <p><strong>Cost:</strong> ${showDetails.cost}</p>
            {showDetails.image && (
              <img src={showDetails.image} alt={showDetails.type} className="w-full h-auto mt-4 rounded" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
