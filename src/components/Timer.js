import React, { useState, useEffect } from 'react';

const Timer = ({ activeTime, restTime, reps }) => {
  const [time, setTime] = useState(activeTime);
  const [isResting, setIsResting] = useState(false); // Track whether it's currently resting
  const [isPaused, setIsPaused] = useState(false);
  const [repsCompleted, setRepsCompleted] = useState(0);

  useEffect(() => {
    let interval;
    console.log(reps);
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsResting(!isResting); // Toggle between active and resting
            setRepsCompleted((prevRep) => prevRep + 1); // Increment reps completed
            return isResting ? activeTime : restTime; // Switch between active and rest time
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeTime, isPaused, restTime, isResting]); // Removed reps from dependency array

  const handlePauseClick = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div>
      <h2>{isResting ? 'Rest Time' : 'Active Time'}</h2>
      <div>Time: {time}s</div>
      <div>Reps Completed: {repsCompleted}/{reps}</div>
      <button onClick={handlePauseClick}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};

export default Timer;
