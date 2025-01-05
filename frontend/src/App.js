import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Signup Page */}
          <Route path="/signup" element={<SignupPage />} />
          {/* Default route (can be updated later) */}
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to the Interview Assistance Platform</h1>
                <p>Please navigate to /signup to register.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
