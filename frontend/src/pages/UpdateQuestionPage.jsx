import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UpdateQuestionPage.css';

const UpdateQuestionPage = () => {
  const [questionId, setQuestionId] = useState('');
  const [formData, setFormData] = useState(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/questions/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Question not found');
      }

      const data = await response.json();
      setFormData({
        ...data,
        topics: data.topics.join(', '),
      });
      setIsSubmitEnabled(true);
    } catch (error) {
      console.error('Error fetching question:', error);
      alert('Question not found');
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
      const response = await fetch(`http://localhost:5000/api/questions/${questionId}`, {
        method: 'PUT',
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
        throw new Error('Failed to update question');
      }

      alert('Question updated successfully');
      navigate('/manager/questions/');
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Failed to update question');
    }
  };

  return (
    <div className="update-question-page">
      <button className="back-button" onClick={() => navigate('/manager/questions/')}>
        ← Back to Questions
      </button>
      <h1>Update Question</h1>
      {!formData ? (
        <>
          <input
            type="text"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            placeholder="Enter Question ID"
          />
          <button onClick={fetchQuestion}>Fetch Question</button>
        </>
      ) : (
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
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
          <button type="submit" disabled={!isSubmitEnabled}>
            Update Question
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateQuestionPage;
