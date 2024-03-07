import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Timer from './components/Timer';
import RepForm from './components/RepForm';

const App = () => {
  const [timerData, setTimerData] = useState({ restTime: 0, activeTime: 0, reps: 0 });

  const handleFormSubmit = ({ restTime, activeTime, reps }) => {
    setTimerData({ restTime, activeTime, reps });
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/repForm" element={<RepForm onSubmit={handleFormSubmit} />} />
          <Route
            path="/"
            element={
              <>
                {timerData.restTime === 0 && timerData.activeTime === 0 ? (
                  <div>Please add a timer to start the timers</div>
                ) : (
                  <Timer {...timerData} />
                )}
              </>
            }
          />
        </Routes>

        <Link to="/repForm">New Timers</Link>
      </div>
    </Router>
  );
};

export default App;
