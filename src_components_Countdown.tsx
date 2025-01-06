import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = window.setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(`${targetDate}T${targetTime}`).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          });
        } else {
          clearInterval(timer);
          setIsRunning(false);
          setMessage('Countdown finished!');
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, targetDate, targetTime]);

  const handleStart = () => {
    if (targetDate && targetTime) {
      setIsRunning(true);
      setMessage('');
    } else {
      setMessage('Please set both date and time');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Countdown Timer</h1>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Target Date:</label>
          <input
            type="date"
            id="date"
            className="w-full p-2 border rounded"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Target Time:</label>
          <input
            type="time"
            id="time"
            className="w-full p-2 border rounded"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleStart}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Start Countdown
        </button>
        
        {isRunning && (
          <div className="mt-6 text-center">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-200 p-3 rounded">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="bg-gray-200 p-3 rounded">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-gray-200 p-3 rounded">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-gray-200 p-3 rounded">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>
          </div>
        )}
        
        {message && (
          <div className="mt-4 text-center text-red-500">{message}</div>
        )}
      </div>
    </div>
  );
}

