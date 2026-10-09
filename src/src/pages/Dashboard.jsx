import { useState, useEffect } from 'react';
import api from '../api';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const res = await api.get('/items/my-items');
      setItems(res.data);
    } catch (err) {
      setError('Failed to fetch items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Items Dashboard</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      {items.length === 0 ? (
        <p className="text-gray-600">You haven't reported any items yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border border-gray-200 font-semibold">Title</th>
                <th className="p-3 border border-gray-200 font-semibold">Type</th>
                <th className="p-3 border border-gray-200 font-semibold">Status</th>
                <th className="p-3 border border-gray-200 font-semibold">Visibility</th>
                <th className="p-3 border border-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">{item.title}</td>
                  <td className="p-3 border border-gray-200 capitalize">{item.type}</td>
                  <td className="p-3 border border-gray-200 capitalize">{item.status}</td>
                  <td className="p-3 border border-gray-200 capitalize">{item.visibility}</td>
                  <td className="p-3 border border-gray-200">
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
