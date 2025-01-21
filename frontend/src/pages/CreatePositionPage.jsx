import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PositionsPage.css';

const CreatePositionPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    grade: '',
    reportingTo: '',
    organization: '', // Now included
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
      const response = await fetch('http://localhost:5000/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create position');
      }

      alert('Position created successfully');
      navigate('/positions');
    } catch (error) {
      console.error('Error creating position:', error);
      alert('Failed to create position');
    }
  };

  return (
    <div className="create-position-page">
      <button className="back-button" onClick={() => navigate('/manager/positions')}>
        ← Back to Positions
      </button>
      <h1>Create Position</h1>
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
          Create Position
        </button>
      </form>
    </div>
  );
};

export default CreatePositionPage;
