import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling

// Components
import Timer from './components/Timer';
import RepForm from './components/RepForm';

const App = () => {
  const [timerData, setTimerData] = useState({ restTime: 0, activeTime: 0, reps: 0 });

  const handleFormSubmit = ({ restTime, activeTime, reps }) => {
    setTimerData({ restTime, activeTime, reps });
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/repForm" element={<RepForm onSubmit={handleFormSubmit} />} />
          <Route
            path="/"
            element={
              <>
                {timerData.restTime === 0 && timerData.activeTime === 0 ? (
                  <div className="card">
                    <h1>Please add your timers and reps to start</h1>
                    <Link to="/repForm" className="button">
                      Set Timers & Reps
                    </Link>
                  </div>
                ) : (
                  <Timer {...timerData} />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
