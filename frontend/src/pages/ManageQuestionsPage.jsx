import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageQuestionsPage.css';

const ManageQuestionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-questions-page">
      <button className="back-button" onClick={() => navigate('/manager-dashboard')}>
        ← Back to Dashboard
      </button>
      <h1>Manage Questions</h1>
      <div className="questions-options">
        <div
          className="question-option"
          onClick={() => navigate('/manager/questions/create')}
        >
          Create Question
        </div>
        <div
          className="question-option"
          onClick={() => navigate('/manager/questions/update')}
        >
          Update Question
        </div>
        <div
          className="question-option"
          onClick={() => navigate('/manager/questions/delete')}
        >
          Delete Question
        </div>
      </div>
    </div>
  );
};

export default ManageQuestionsPage;
