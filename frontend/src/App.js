import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import InitialInterviewPage from './pages/InitialInterviewPage';
import CompetencySelectionPage from './pages/CompetencySelectionPage';
import ConfirmationPage from './pages/ConfirmationPage';
import CompetencyTilesPage from './pages/CompetencyTilesPage';
import QuestionsPage from './pages/QuestionsPage';
import FinalReviewPage from './pages/FinalReviewPage';
import './App.css';

function LandingPage() {
  return (
    <div className="landing-text">
      <h1>Welcome to SimpliInterview</h1>
      <p>SimpliInterview helps streamline your interview process by guiding interviewers through structured steps, selecting competencies, and recording results.</p>
      <p>Please log in or sign up to get started.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/start-interview" element={<InitialInterviewPage />} />
          <Route path="/select-competencies" element={<CompetencySelectionPage />} />
          <Route path="/confirm-competencies" element={<ConfirmationPage />} />
          <Route path="/competencies" element={<CompetencyTilesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/final-review" element={<FinalReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
