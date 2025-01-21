import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CompetenciesPage.css';

const CreateCompetencyPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    position: '',
    difficulty: '',
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Enable submit button only if all fields are filled
    setIsSubmitEnabled(Object.values(updatedFormData).every((field) => field.trim() !== ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/competencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create competency');
      }

      alert('Competency created successfully');
      navigate('/competencies');
    } catch (error) {
      console.error('Error creating competency:', error);
      alert('Failed to create competency');
    }
  };

  return (
    <div className="create-competency-page">
      <button className="back-button" onClick={() => navigate('/manager/competencies')}>
        ← Back to Competencies
      </button>
      <h1>Create Competency</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
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
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
        <button type="submit" disabled={!isSubmitEnabled}>
          Create Competency
        </button>
      </form>
    </div>
  );
};

export default CreateCompetencyPage;
