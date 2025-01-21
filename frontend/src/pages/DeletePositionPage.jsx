import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PositionsPage.css';

const DeletePositionPage = () => {
  const [positionId, setPositionId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/positions/${positionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete position');
      }

      alert('Position deleted successfully');
      navigate('/positions');
    } catch (error) {
      console.error('Error deleting position:', error);
      alert('Failed to delete position');
    }
  };

  return (
    <div className="delete-position-page">
      <button className="back-button" onClick={() => navigate('/manager/positions')}>
        ← Back to Positions
      </button>
      <h1>Delete Position</h1>
      <input
        type="text"
        value={positionId}
        onChange={(e) => setPositionId(e.target.value)}
        placeholder="Enter Position ID"
      />
      <button onClick={handleDelete}>Delete Position</button>
    </div>
  );
};

export default DeletePositionPage;
