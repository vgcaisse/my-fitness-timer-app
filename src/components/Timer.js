import React, { useState, useEffect } from 'react';

const Timer = ({ activeTime, restTime, reps }) => {
  const [time, setTime] = useState(activeTime);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [repsCompleted, setRepsCompleted] = useState(0);

  const [repsMessage, setRepsMessage] = useState('');

  useEffect(() => {
    let interval;

    if (!isPaused && repsCompleted < reps) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            if (!isResting) {
              // If it's transitioning from active to rest time
              setIsResting(true);
              setRepsCompleted((prevReps) => prevReps + 1/2); // Increment reps
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
    <div>
      <h2>{isResting ? 'Rest Time' : 'Active Time'}</h2>
      <h2>{repsMessage ? 'You Finished!' : ''}</h2>
      <div>Time: {time}s</div>
      <div>Reps Completed: {repsCompleted}/{reps}</div>
      <button onClick={handlePauseClick}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};

export default Timer;
