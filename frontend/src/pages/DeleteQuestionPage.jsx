import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DeleteQuestionPage.css';

const DeleteQuestionPage = () => {
  const [questionId, setQuestionId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/questions/${questionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      alert('Question deleted successfully');
      navigate('/manager/questions/');
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question');
    }
  };

  return (
    <div className="delete-question-page">
      <button className="back-button" onClick={() => navigate('/manager/questions/')}>
        ← Back to Questions
      </button>
      <h1>Delete Question</h1>
      <input
        type="text"
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
        placeholder="Enter Question ID"
      />
      <button onClick={handleDelete}>Delete Question</button>
    </div>
  );
};

export default DeleteQuestionPage;
