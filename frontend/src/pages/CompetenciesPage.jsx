import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CompetenciesPage.css';

const CompetenciesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="competencies-page">
      <button className="back-button" onClick={() => navigate('/manager-dashboard')}>
        ← Back to Dashboard
      </button>
      <h1>Manage Competencies</h1>
      <div className="competencies-options">
        <div
          className="competency-option"
          onClick={() => navigate('/manager/competencies/create')}
        >
          Create Competency
        </div>
        <div
          className="competency-option"
          onClick={() => navigate('/manager/competencies/update')}
        >
          Update Competency
        </div>
        <div
          className="competency-option"
          onClick={() => navigate('/manager/competencies/delete')}
        >
          Delete Competency
        </div>
      </div>
    </div>
  );
};

export default CompetenciesPage;
