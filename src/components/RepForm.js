// RepForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RepForm = ({ onSubmit }) => {
  const [reps, setReps] = useState('');
  const [restTime, setRestTime] = useState('');
  const [activeTime, setActiveTime] = useState('');

  const [repsError, setRepsError] = useState('');
  const [restTimeError, setRestTimeError] = useState('');
  const [activeTimeError, setActiveTimeError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      restTime: parseInt(restTime),
      activeTime: parseInt(activeTime),
      reps: parseInt(reps)
    });
    navigate('/');
  };

  const handleRestTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setRestTime(value);
      setRestTimeError('');
    } else {
      setRestTimeError('Rest time must be a non-negative integer.');
    }
  };

  const handleActiveTimeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setActiveTime(value);
      setActiveTimeError('');
    } else {
      setActiveTimeError('Active time must be a non-negative integer.');
    }
  };

  const handleRepsChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setReps(value);
      setRepsError('');
    } else {
      setRepsError('Amount of reps must be a non-negative integer.');
    }
  };

  const isDisabled =
    restTime.trim() === '' ||
    activeTime.trim() === '' ||
    reps.trim() === '' ||
    restTimeError !== '' ||
    activeTimeError !== '' ||
    repsError !== '';

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="activeTime">Active Time (seconds):</label>
        <input
          type="number"
          id="activeTime"
          value={activeTime}
          onChange={handleActiveTimeChange}
        />
        {activeTimeError && <div style={{ color: 'red' }}>{activeTimeError}</div>}
      </div>
      <div>
        <label htmlFor="restTime">Rest Time (seconds):</label>
        <input
          type="number"
          id="restTime"
          value={restTime}
          onChange={handleRestTimeChange}
        />
        {restTimeError && <div style={{ color: 'red' }}>{restTimeError}</div>}
      </div>
      <div>
        <label htmlFor="reps">Reps (amount):</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={handleRepsChange}
        />
        {repsError && <div style={{ color: 'red' }}>{repsError}</div>}
      </div>
      <button type="submit" disabled={isDisabled}>
        Submit
      </button>
    </form>
  );
};

export default RepForm;
