import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ReportLost() {
  const [formData, setFormData] = useState({
    title: '', category: '', location: '', dateLost: '', description: '', visibility: 'public'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/items/lost', formData);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to report lost item');
    }
  };

  return (
    <div className="max-w-2xl mx-auto border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Report Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" type="text" className="w-full border border-gray-300 p-2" onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input name="category" type="text" className="w-full border border-gray-300 p-2" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location Lost</label>
            <input name="location" type="text" className="w-full border border-gray-300 p-2" onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Lost</label>
            <input name="dateLost" type="date" className="w-full border border-gray-300 p-2" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select name="visibility" className="w-full border border-gray-300 p-2" onChange={handleChange}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" rows="4" className="w-full border border-gray-300 p-2" onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="bg-brand text-white px-6 py-2 font-medium">Submit Report</button>
      </form>
    </div>
  );
}
