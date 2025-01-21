import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PositionsPage.css';

const PositionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="positions-page">
      <button className="back-button" onClick={() => navigate('/manager-dashboard')}>
        ← Back to Dashboard
      </button>
      <h1>Manage Positions</h1>
      <div className="positions-options">
        <div className="position-option" onClick={() => navigate('/manager/positions/create')}>
          Create Position
        </div>
        <div className="position-option" onClick={() => navigate('/manager/positions/update')}>
          Update Position
        </div>
        <div className="position-option" onClick={() => navigate('/manager/positions/delete')}>
          Delete Position
        </div>
      </div>
    </div>
  );
};

export default PositionsPage;
