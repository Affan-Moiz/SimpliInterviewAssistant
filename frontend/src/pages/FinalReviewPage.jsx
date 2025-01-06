import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/FinalReviewPage.css';

const FinalReviewPage = () => {
  const location = useLocation();
  const { interviewId } = location.state || {};
  const [interviewData, setInterviewData] = useState(null);
  const [decision, setDecision] = useState('Hold');
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewId) {
      alert('Required information is missing. Redirecting to start interview page.');
      navigate('/start-interview');
      return;
    }

    // Fetch interview data from the backend
    fetch(`http://localhost:5000/api/interviews/${interviewId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInterviewData(data))
      .catch((error) => console.error('Error fetching interview data:', error));
  }, [interviewId, navigate]);

  const handleSubmitDecision = () => {
    fetch(`http://localhost:5000/api/interviews/${interviewId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ decision }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        alert('Final decision submitted successfully!');
        navigate('/dashboard'); // Navigate back to the dashboard or a confirmation screen
      })
      .catch((error) => {
        console.error('Error submitting final decision:', error);
        alert('Failed to submit final decision.');
      });
  };

  if (!interviewData) {
    return <p>Loading interview summary...</p>;
  }

  return (
    <div className="final-review-page">
      <h1>Final Review</h1>
      <p><strong>Candidate Name:</strong> {interviewData.candidateName}</p>
      <p><strong>Position:</strong> {interviewData.position.title}</p>
      <h2>Competencies</h2>
      <ul>
        {interviewData.competencies.map((comp) => (
          <li key={comp.competency._id}>
            {comp.competency.title} - {comp.completed ? 'Completed' : 'Incomplete'}
          </li>
        ))}
      </ul>
      <div className="decision-section">
        <label><strong>Final Decision:</strong></label>
        <select value={decision} onChange={(e) => setDecision(e.target.value)}>
          <option value="Hold">Hold</option>
          <option value="Reject">Reject</option>
          <option value="Hire">Hire</option>
        </select>
      </div>
      <Button text="Submit Decision" onClick={handleSubmitDecision} />
    </div>
  );
};

export default FinalReviewPage;
