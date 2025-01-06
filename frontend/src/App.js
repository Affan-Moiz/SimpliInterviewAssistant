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
          <Route path="/competencies" element={<CompetencyTilesPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/final-review" element={<FinalReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
