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
  const { positionId } = location.state || {};

  useEffect(() => {
    if (!positionId) {
      alert('Position not selected. Redirecting to start interview page.');
      navigate('/start-interview');
      return;
    }

    // Fetch competencies related to the selected position
    fetch(`http://localhost:5000/api/competencies?position=${positionId}`)
      .then((response) => response.json())
      .then((data) => setCompetencies(data))
      .catch((error) => console.error('Error fetching competencies:', error));
  }, [positionId, navigate]);

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

    navigate('/confirm-competencies', { state: { selectedCompetencies } });
  };

  return (
    <div className="competency-selection-page">
      <h1>Select Competencies</h1>
      <div className="competency-columns">
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
      </div>
      <Button text="Proceed" onClick={handleProceed} />
    </div>
  );
};

export default CompetencySelectionPage;
