import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ManagerDashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    alert('Logged out successfully!');
    navigate('/login'); // Redirect to login page
  };

  // Handlers for navigating to different options
  const handleTileClick = (route) => {
    navigate(route);
  };

  return (
    <div className="manager-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1>Manager Dashboard</h1>
      <div className="dashboard-tiles">
        <div
          className="dashboard-tile"
          onClick={() => handleTileClick('/manager/interviews')}
        >
          Manage Interviews
        </div>
        <div
          className="dashboard-tile"
          onClick={() => handleTileClick('/manager/positions')}
        >
          Manage Positions
        </div>
        <div
          className="dashboard-tile"
          onClick={() => handleTileClick('/manager/competencies')}
        >
          Manage Competencies
        </div>
        <div
          className="dashboard-tile"
          onClick={() => handleTileClick('/manager/questions/')}
        >
          Manage Questions
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
