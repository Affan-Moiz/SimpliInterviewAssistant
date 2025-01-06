import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/CompetencyTilesPage.css';

const CompetencyTilesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [selectedCompetencies, setSelectedCompetencies] = useState(null);
  const [completedCompetencies, setCompletedCompetencies] = useState([]);
  const [interviewId, setInterviewId] = useState(null);

  useEffect(() => {
    let data = location.state;

    // If state is missing, retrieve data from localStorage
    if (!data) {
      const storedData = localStorage.getItem('interviewData');
      if (storedData) {
        data = JSON.parse(storedData);
      }
    }

    if (data && data.selectedCompetencies && data.interviewId) {
      setSelectedCompetencies(data.selectedCompetencies);
      setCompletedCompetencies(data.completedCompetencies || []);
      setInterviewId(data.interviewId);
      setIsLoading(false);
    } else {
      alert('Required information is missing. Redirecting to start interview page.');
      navigate('/start-interview');
    }
  }, [location.state, navigate]);

  const handleTileClick = (competency) => {
    if (completedCompetencies.includes(competency._id)) return;

    navigate('/questions', {
      state: {
        competencyId: competency._id,
        competencyTitle: competency.title,
        interviewId,
      },
    });
  };

  const handleFinalSubmit = () => {
    alert('All competencies have been completed. Submitting the final review.');
    navigate('/final-review', { state: { interviewId } });
  };

  const allCompetenciesCompleted =
    selectedCompetencies &&
    completedCompetencies.length ===
      selectedCompetencies.technical.length + selectedCompetencies.behavioral.length;

  if (isLoading) {
    return <p>Loading competencies...</p>;
  }

  return (
    <div className="competency-tiles-page">
      <h1>Select a Competency</h1>
      <div className="tiles-container">
        {selectedCompetencies.technical.map((c) => (
          <div
            key={c._id}
            className={`tile ${completedCompetencies.includes(c._id) ? 'completed' : ''}`}
            onClick={() => handleTileClick(c)}
          >
            {c.title}
          </div>
        ))}
        {selectedCompetencies.behavioral.map((c) => (
          <div
            key={c._id}
            className={`tile ${completedCompetencies.includes(c._id) ? 'completed' : ''}`}
            onClick={() => handleTileClick(c)}
          >
            {c.title}
          </div>
        ))}
      </div>
      {allCompetenciesCompleted && (
        <Button text="Submit Final Review" onClick={handleFinalSubmit} />
      )}
    </div>
  );
};

export default CompetencyTilesPage;
