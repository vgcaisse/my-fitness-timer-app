// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Timer from './components/Timer';
import RepForm from './components/RepForm';

const App = () => {
  const [times, setTimes] = useState({ restTime: 0, activeTime: 0 });

  const handleFormSubmit = ({ restTime, activeTime }) => {
    setTimes({ restTime, activeTime });
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
                {times.restTime === 0 && times.activeTime === 0 ? (
                  <div>Please add a timer to start the timers</div>
                ) : (
                  <Timer restTime={times.restTime} activeTime={times.activeTime} />
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

