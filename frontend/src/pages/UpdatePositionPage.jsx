import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PositionsPage.css';

const UpdatePositionPage = () => {
  const [positionId, setPositionId] = useState('');
  const [formData, setFormData] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  const fetchPosition = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/positions/${positionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Position not found');
      }

      const data = await response.json();
      setFormData(data);
      setIsSubmitEnabled(true);
    } catch (error) {
      console.error('Error fetching position:', error);
      alert('Position not found');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/positions/${positionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update position');
      }

      alert('Position updated successfully');
      navigate('/positions');
    } catch (error) {
      console.error('Error updating position:', error);
      alert('Failed to update position');
    }
  };

  return (
    <div className="update-position-page">
      <button className="back-button" onClick={() => navigate('/manager/positions')}>
        ← Back to Positions
      </button>
      <h1>Update Position</h1>
      {!formData ? (
        <>
          <input
            type="text"
            value={positionId}
            onChange={(e) => setPositionId(e.target.value)}
            placeholder="Enter Position ID"
          />
          <button onClick={fetchPosition}>Fetch Position</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
          />
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="Grade"
          />
          <input
            type="text"
            name="reportingTo"
            value={formData.reportingTo}
            onChange={handleChange}
            placeholder="Reporting To"
          />
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Organization ID"
          />
          <button type="submit" disabled={!isSubmitEnabled}>
            Update Position
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePositionPage;
