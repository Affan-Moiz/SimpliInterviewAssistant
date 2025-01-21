import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import '../styles/InitialInterviewPage.css';

const InitialInterviewPage = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    position: '',
    competencyType: '', // Added for HR/Technical/Both
  });
  const [positions, setPositions] = useState([]);
  const [positionDetails, setPositionDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all available positions when the page loads
    fetch('http://localhost:5000/api/positions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch positions');
        }
        return response.json();
      })
      .then((data) => setPositions(data))
      .catch((error) => console.error('Error fetching positions:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePositionChange = (e) => {
    const selectedPositionId = e.target.value;
    setFormData({ ...formData, position: selectedPositionId });

    // Fetch details for the selected position
    fetch(`http://localhost:5000/api/positions/${selectedPositionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch position details');
        }
        return response.json();
      })
      .then((data) => setPositionDetails(data))
      .catch((error) => console.error('Error fetching position details:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.candidateName || !formData.position || !formData.competencyType) {
      alert('Please fill in all fields before proceeding.');
      return;
    }

    console.log('Interview Start Data:', formData);

    // Redirect to Competency Selection Page with candidate and position details
    navigate('/select-competencies', {
      state: {
        positionId: formData.position,
        candidateName: formData.candidateName,
        competencyType: formData.competencyType,
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="initial-interview-page">
      <h1>Start Interview</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Candidate Name"
          type="text"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          placeholder="Enter candidate's name"
        />

        <div className="input-field">
          <label>Select Position</label>
          <select name="position" value={formData.position} onChange={handlePositionChange}>
            <option value="">Select a position</option>
            {positions.map((position) => (
              <option key={position._id} value={position._id}>
                {position.title}
              </option>
            ))}
          </select>
        </div>

        {positionDetails && (
          <div className="position-details">
            <h3>Position Details</h3>
            <p>
              <strong>Department:</strong> {positionDetails.department}
            </p>
            <p>
              <strong>Grade:</strong> {positionDetails.grade}
            </p>
            <p>
              <strong>Reporting To:</strong> {positionDetails.reportingTo}
            </p>
          </div>
        )}

        <div className="competency-type-selection">
          <label>Select Competency Type</label>
          <div className="options">
            <label className="radio-option">
              <input
                type="radio"
                name="competencyType"
                value="HR"
                checked={formData.competencyType === 'HR'}
                onChange={handleChange}
              />
              HR
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="competencyType"
                value="Technical"
                checked={formData.competencyType === 'Technical'}
                onChange={handleChange}
              />
              Technical
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="competencyType"
                value="Both"
                checked={formData.competencyType === 'Both'}
                onChange={handleChange}
              />
              Both
            </label>
          </div>
        </div>

        <Button text="Start Interview" type="submit" />
        <Button text="Logout" onClick={handleLogout} className="logout-button" />
      </form>
    </div>
  );
};

export default InitialInterviewPage;
