import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { selectedCompetencies, candidateName, positionId } = location.state || {};
  const navigate = useNavigate();

  const handleConfirm = () => {
    const interviewData = {
      candidateName,
      position: positionId,
      competencies: selectedCompetencies.technical
        .concat(selectedCompetencies.behavioral)
        .map((c) => ({ competency: c._id })),
    };

    fetch('http://localhost:5000/api/interviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(interviewData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert('Interview instance created successfully!');

        // Store critical data in localStorage
        localStorage.setItem(
          'interviewData',
          JSON.stringify({
            selectedCompetencies,
            interviewId: data.interview._id,
            completedCompetencies: [],
          })
        );

        navigate('/competencies');
      })
      .catch((error) => {
        console.error('Error creating interview:', error);
        alert('Failed to create interview instance.');
      });
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
