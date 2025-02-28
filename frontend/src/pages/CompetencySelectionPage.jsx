import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/CompetencySelectionPage.css';

const CompetencySelectionPage = () => {
  const [competencies, setCompetencies] = useState([]);
  const [selectedCompetencies, setSelectedCompetencies] = useState({
    technical: [],
    behavioral: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { positionId, candidateName, competencyType } = location.state || {};

  useEffect(() => {
    if (!positionId || !competencyType) {
      alert('Required information is missing. Redirecting to start interview page.');
      navigate('/start-interview');
      return;
    }

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      alert('User not authenticated. Redirecting to login page.');
      navigate('/login');
      return;
    }

    // Fetch competencies related to the selected position
    fetch(`http://localhost:5000/api/competencies?position=${positionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch competencies');
        }
        return response.json();
      })
      .then((data) => {
        let filteredCompetencies = data;
        if (competencyType === 'HR') {
          filteredCompetencies = data.filter((c) => c.type === 'behavioral');
        } else if (competencyType === 'Technical') {
          filteredCompetencies = data.filter((c) => c.type === 'technical');
        }
        setCompetencies(filteredCompetencies);
      })
      .catch((error) => {
        console.error('Error fetching competencies:', error);
        setCompetencies([]); // Fallback to empty array on error
      });
  }, [positionId, competencyType, navigate]);

  const handleSelectCompetency = (competency) => {
    const category = competency.type === 'technical' ? 'technical' : 'behavioral';

    setSelectedCompetencies((prevSelected) => {
      const alreadySelected = prevSelected[category].some((c) => c._id === competency._id);
      if (alreadySelected) {
        return {
          ...prevSelected,
          [category]: prevSelected[category].filter((c) => c._id !== competency._id),
        };
      } else {
        return {
          ...prevSelected,
          [category]: [...prevSelected[category], competency],
        };
      }
    });
  };

  const handleProceed = () => {
    if (selectedCompetencies.technical.length === 0 && selectedCompetencies.behavioral.length === 0) {
      alert('Please select at least one competency.');
      return;
    }

    navigate('/confirm-competencies', {
      state: {
        selectedCompetencies,
        candidateName,
        positionId,
      },
    });
  };

  return (
    <div className="competency-selection-page">
      <h1>Select Competencies</h1>
      <div className="competency-columns">
        {competencyType === 'Technical' || competencyType === 'Both' ? (
          <div className="competency-column">
            <h2>Technical Competencies</h2>
            {competencies
              .filter((c) => c.type === 'technical')
              .map((competency) => (
                <div
                  key={competency._id}
                  className={`competency-item ${
                    selectedCompetencies.technical.some((c) => c._id === competency._id) ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectCompetency(competency)}
                >
                  {competency.title}
                </div>
              ))}
          </div>
        ) : null}
  
        {competencyType === 'HR' || competencyType === 'Both' ? (
          <div className="competency-column">
            <h2>Behavioral Competencies</h2>
            {competencies
              .filter((c) => c.type === 'behavioral')
              .map((competency) => (
                <div
                  key={competency._id}
                  className={`competency-item ${
                    selectedCompetencies.behavioral.some((c) => c._id === competency._id) ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectCompetency(competency)}
                >
                  {competency.title}
                </div>
              ))}
          </div>
        ) : null}
      </div>
      <Button text="Proceed" onClick={handleProceed} />
    </div>
  );
  
};

export default CompetencySelectionPage;
