import React, { useState, useEffect } from 'react';

const Timer = ({ activeTime, restTime }) => {
  const [time, setTime] = useState(activeTime);
  const [isResting, setIsResting] = useState(false); // Track whether it's currently resting
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsResting(!isResting); // Toggle between active and resting
            return isResting ? activeTime : restTime; // Switch between active and rest time
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeTime, isPaused, restTime, isResting]); // Added isResting to dependency array

  const handlePauseClick = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div>
      <h2>{isResting ? 'Rest Time' : 'Active Time'}</h2>
      <div>Time: {time}s</div>
      <button onClick={handlePauseClick}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};

export default Timer;
