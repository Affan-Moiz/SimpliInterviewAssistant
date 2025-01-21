import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CompetenciesPage.css';

const DeleteCompetencyPage = () => {
  const [competencyId, setCompetencyId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/competencies/${competencyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete competency');
      }

      alert('Competency deleted successfully');
      navigate('/manager/competencies');
    } catch (error) {
      console.error('Error deleting competency:', error);
      alert('Failed to delete competency');
    }
  };

  return (
    <div className="delete-competency-page">
      <button className="back-button" onClick={() => navigate('/manager/competencies')}>
        ← Back to Competencies
      </button>
      <h1>Delete Competency</h1>
      <input
        type="text"
        value={competencyId}
        onChange={(e) => setCompetencyId(e.target.value)}
        placeholder="Enter Competency ID"
      />
      <button onClick={handleDelete}>Delete Competency</button>
    </div>
  );
};

export default DeleteCompetencyPage;
