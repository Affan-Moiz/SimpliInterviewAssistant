import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { selectedCompetencies } = location.state || {};
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert('Competencies confirmed. Proceeding to next step.');
    // Proceed to the next step of the interview process
  };

  return (
    <div className="confirmation-page">
      <h1>Confirm Competencies</h1>
      <div className="competency-columns">
        <div className="competency-column">
          <h2>Technical Competencies</h2>
          {selectedCompetencies.technical.map((c) => (
            <div key={c._id} className="competency-item">
              {c.title}
            </div>
          ))}
        </div>
        <div className="competency-column">
          <h2>Behavioral Competencies</h2>
          {selectedCompetencies.behavioral.map((c) => (
            <div key={c._id} className="competency-item">
              {c.title}
            </div>
          ))}
        </div>
      </div>
      <Button text="Confirm" onClick={handleConfirm} />
    </div>
  );
};

export default ConfirmationPage;
