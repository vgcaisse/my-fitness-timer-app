// Timer.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Timer.css'; // Import your CSS file for styling

const Timer = ({ activeTime, restTime, reps }) => {
  const [time, setTime] = useState(activeTime);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [repsCompleted, setRepsCompleted] = useState(0);

  const [repsMessage, setRepsMessage] = useState('');

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/repForm')
  }

  useEffect(() => {
    let interval;

    if (!isPaused && repsCompleted < reps) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            if (!isResting) {
              // If it's transitioning from active to rest time
              setIsResting(true);
              setRepsCompleted((prevReps) => prevReps + 1); // Increment reps
              if (repsCompleted === reps - 1) {
                // Pause the timer when reps are completed
                setIsPaused(true);
                setRepsMessage('You Finished!');
              }
              return restTime;
            } else {
              // If it's transitioning from rest to active time
              setIsResting(false);
              return activeTime;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeTime, isPaused, restTime, isResting, reps, repsCompleted]);

  const handlePauseClick = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div className="timer-container">
      <h2 className="title">{isResting ? 'Rest Time' : 'Active Time'}</h2>
      <h2 className="message">{repsMessage ? repsMessage : ''}</h2>
      <div className="time">Time: {time}s</div>
      <div className="reps">Reps Completed: {repsCompleted}/{reps}</div>
      <div className="button-container">
        <button className={`button pause-button`} onClick={handlePauseClick}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button className={`button navigate-button`} onClick={handleOnClick}>Set Timers & Reps</button>
      </div>
    </div>
  );
};

export default Timer;
