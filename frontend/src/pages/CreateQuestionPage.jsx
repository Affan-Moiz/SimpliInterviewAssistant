import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateQuestionPage.css';

const CreateQuestionPage = () => {
  const [formData, setFormData] = useState({
    competency: '',
    text: '',
    topics: '',
    difficulty: '',
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    setIsSubmitEnabled(
      Object.values(updatedFormData).every((field) => field.trim() !== '')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          topics: formData.topics.split(',').map((topic) => topic.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create question');
      }

      alert('Question created successfully');
      navigate('/manager/questions/');
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question');
    }
  };

  return (
    <div className="create-question-page">
      <button className="back-button" onClick={() => navigate('/manager/questions/')}>
        ← Back to Questions
      </button>
      <h1>Create Question</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="competency"
          value={formData.competency}
          onChange={handleChange}
          placeholder="Competency ID"
        />
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Question Text"
        />
        <input
          type="text"
          name="topics"
          value={formData.topics}
          onChange={handleChange}
          placeholder="Topics (comma-separated)"
        />
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
        </select>
        <button type="submit" disabled={!isSubmitEnabled}>
          Create Question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestionPage;
