import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ManagerInterviewsPage.css';

const ManagerInterviewsPage = () => {
  const [interviews, setInterviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/interviews', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setInterviews(data || {}); // Default to an empty object if no data
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setError('Failed to fetch interviews. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/interviews/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ decision }),
      });

      if (!response.ok) {
        throw new Error('Failed to update interview');
      }

      // Fetch updated interviews after making a decision
      const updatedResponse = await fetch('http://localhost:5000/api/interviews', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedResponse.json();

      setInterviews(updatedData || {}); // Update state with the latest data
      alert('Decision updated successfully');
    } catch (error) {
      console.error('Error updating interview:', error);
      alert('Failed to update decision');
    }
  };

  if (isLoading) {
    return <p>Loading interviews...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="manager-interviews-page">
      <button className="back-button" onClick={() => navigate('/manager-dashboard')}>
        ← Back to Dashboard
      </button>
      <h1>Interviews</h1>
      {Object.keys(interviews).length === 0 ? (
        <p>No interviews available.</p>
      ) : (
        Object.keys(interviews).map((position) => (
          <div key={position} className="position-section">
            <h2>{position}</h2>
            {interviews[position]?.length > 0 ? (
              <ul>
                {interviews[position].map((interview) => (
                  <li key={interview._id} className="interview-card">
                    <p>
                      <strong>Candidate:</strong> {interview.candidateName}
                    </p>
                    <p>
                      <strong>Decision:</strong> {interview.decision}
                    </p>
                    <button onClick={() => handleDecision(interview._id, 'Hire')}>Hire</button>
                    <button onClick={() => handleDecision(interview._id, 'Reject')}>Reject</button>
                    <button onClick={() => handleDecision(interview._id, 'Hold')}>Hold</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No interviews for this position.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ManagerInterviewsPage;
