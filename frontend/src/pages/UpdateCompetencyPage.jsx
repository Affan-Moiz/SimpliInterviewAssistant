import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CompetenciesPage.css';

const UpdateCompetencyPage = () => {
  const [competencyId, setCompetencyId] = useState('');
  const [formData, setFormData] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  const fetchCompetency = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/competencies/${competencyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Competency not found');
      }

      const data = await response.json();
      setFormData(data);
      setIsSubmitEnabled(true);
    } catch (error) {
      console.error('Error fetching competency:', error);
      alert('Competency not found');
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
      const response = await fetch(`http://localhost:5000/api/competencies/${competencyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update competency');
      }

      alert('Competency updated successfully');
      navigate('/manager/competencies');
    } catch (error) {
      console.error('Error updating competency:', error);
      alert('Failed to update competency');
    }
  };

  return (
    <div className="update-competency-page">
      <button className="back-button" onClick={() => navigate('/manager/competencies')}>
        ← Back to Competencies
      </button>
      <h1>Update Competency</h1>
      {!formData ? (
        <>
          <input
            type="text"
            value={competencyId}
            onChange={(e) => setCompetencyId(e.target.value)}
            placeholder="Enter Competency ID"
          />
          <button onClick={fetchCompetency}>Fetch Competency</button>
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
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="technical">Technical</option>
            <option value="behavioral">Behavioral</option>
          </select>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Position ID"
          />
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
          <button type="submit" disabled={!isSubmitEnabled}>
            Update Competency
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateCompetencyPage;
