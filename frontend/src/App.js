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
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerInterviewsPage from './pages/ManagerInterviewsPage';
import PositionsPage from './pages/PositionsPage';
import CreatePositionPage from './pages/CreatePositionPage';
import UpdatePositionPage from './pages/UpdatePositionPage';
import DeletePositionPage from './pages/DeletePositionPage';
import CompetenciesPage from './pages/CompetenciesPage';
import CreateCompetencyPage from './pages/CreateCompetencyPage';
import UpdateCompetencyPage from './pages/UpdateCompetencyPage';
import DeleteCompetencyPage from './pages/DeleteCompetencyPage';
import ManageQuestionsPage from './pages/ManageQuestionsPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import UpdateQuestionPage from './pages/UpdateQuestionPage';
import DeleteQuestionPage from './pages/DeleteQuestionPage';
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
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/interviews" element={<ManagerInterviewsPage />} />
          <Route path="/manager/positions" element={<PositionsPage />} />
          <Route path="/manager/positions/create" element={<CreatePositionPage />} />
          <Route path="/manager/positions/update" element={<UpdatePositionPage />} />
          <Route path="/manager/positions/delete" element={<DeletePositionPage />} />
          <Route path="/manager/competencies" element={<CompetenciesPage />} />
          <Route path="/manager/competencies/create" element={<CreateCompetencyPage />} />
          <Route path="/manager/competencies/update" element={<UpdateCompetencyPage />} />
          <Route path="/manager/competencies/delete" element={<DeleteCompetencyPage />} />
          <Route path="/manager/questions/" element={<ManageQuestionsPage />} />
<Route path="/manager/questions/create" element={<CreateQuestionPage />} />
<Route path="/manager/questions/update" element={<UpdateQuestionPage />} />
<Route path="/manager/questions/delete" element={<DeleteQuestionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
