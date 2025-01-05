import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import InitialInterviewPage from './pages/InitialInterviewPage';
import CompetencySelectionPage from './pages/CompetencySelectionPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/start-interview" element={<InitialInterviewPage />} />
          <Route path="/select-competencies" element={<CompetencySelectionPage />} />
          <Route path="/confirm-competencies" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
