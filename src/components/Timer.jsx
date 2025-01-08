import React, { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "./ui/BackgroundBeamsWithCollision";
import song from "../assets/song.mp3";
import gsap from "gsap";


const Timer = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [countdowns, setCountdowns] = useState([]); // Multiple countdowns ke liye
  const [inputValue, setInputValue] = useState(""); // Title ke liye
  const [targetDate, setTargetDate] = useState(""); // Target date ke liye
  const [targetTime, setTargetTime] = useState(""); // Target time ke liye
  const [message, setMessage] = useState(""); // Message display ke liye

  const timeranimation = () => {
    gsap.to("#timer", {
      duration: 1,
      scale: 1.1,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.2,
    });
  };

  const timeranimationout = () => {
    gsap.to("#timer", {
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.2,
    });
  };


  const playSound = () => {
    if (song && !isAudioPlaying) {
      const audio = new Audio(song);
      audio.play();
      audio.loop = false; // Loop ko false rakha hai tak ki ek baar bajke ruk jaye
      setIsAudioPlaying(true);
    }
  };
  
  const triggerVisualEffect = (timerId) => {
    gsap.fromTo(
      `#timer-${timerId}`,
      { backgroundColor: "#f3f4f6" },
      {
        backgroundColor: "#ff4d4d",
        duration: 0.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 9, // Animation repeat hoga
      }
    );
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) =>
        prevCountdowns.map((cd) => {
          const now = new Date().getTime();
          const target = new Date(`${cd.targetDate} ${cd.targetTime}`).getTime();
          const timeLeft = target - now;
  
          if (timeLeft > 0) {
            const updatedTimeLeft = {
              days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
              hours: Math.floor(
                (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              ),
              minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
            };
            animateTimeChange(cd.id);
            return { ...cd, timeleft: updatedTimeLeft };
          } else {
            if (!cd.finished) {
              playSound(); // Timer completion sound
              triggerVisualEffect(cd.id); // Visual effect trigger
            }
            return { ...cd, finished: true };
          }
        })
      );
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  // Animation for individual timer updates
  const animateTimeChange = (timerId) => {
    gsap.fromTo(
      `#timer-${timerId} .time-digit`,
      { scale: 1.2, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power1.inOut" }
    );
  };

  const handleStart = () => {
    if (inputValue.trim() === "" || !targetDate || !targetTime) {
      setMessage("Please provide all inputs");
      return;
    }

    setCountdowns((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: inputValue,
        targetDate,
        targetTime,
        timeleft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        finished: false,
      },
    ]);

    setInputValue("");
    setTargetDate("");
    setTargetTime("");
    setMessage("");
  };

  return (
    <>
      <BackgroundBeamsWithCollision />
      <div
        id="timer"
        onMouseEnter={timeranimation}
        onMouseLeave={timeranimationout}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-5xl font-bold mb-6 text-center text-transparent min-w-96 bg-clip-text bg-gradient-to-r from-purple-400 to bg-pink-600">
            Multiple Countdown Timer
          </h1>
          <input
            type="text"
            placeholder="Enter your Title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-xl w-full p-2 border rounded-lg mb-4"
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-3 border rounded-md mb-4"
          />
          <input
            type="time"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
            className="w-full p-3 border rounded-md mb-4"
          />
          <button
            onClick={() => {
              handleStart();
             
            }}
            className="w-full text-white p-3 rounded-md bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Add Countdown
          </button>

          {message && (
            <div className="mt-4 text-red-500 text-center">{message}</div>
          )}

          <div className="mt-6 max-h-96 overflow-y-scroll">
            {countdowns.map((cd) => (
              <div
                id={`timer-${cd.id}`}
                key={cd.id}
                className="mb-4 p-4 bg-gray-100 rounded-md"
              >
                <h2 className="text-2xl font-bold mb-2">{cd.title}</h2>
                {cd.finished ? (
                  <div className="text-red-500 font-bold">Time's Up!</div>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-purple-200 p-2 rounded time-digit">
                      <div className="text-lg font-bold">
                        {cd.timeleft.days}
                      </div>
                      <div>Days</div>
                    </div>
                    <div className="bg-purple-200 p-2 rounded time-digit">
                      <div className="text-lg font-bold">
                        {cd.timeleft.hours}
                      </div>
                      <div>Hours</div>
                    </div>
                    <div className="bg-purple-200 p-2 rounded time-digit">
                      <div className="text-lg font-bold">
                        {cd.timeleft.minutes}
                      </div>
                      <div>Minutes</div>
                    </div>
                    <div className="bg-purple-200 p-2 rounded time-digit">
                      <div className="text-lg font-bold">
                        {cd.timeleft.seconds}
                      </div>
                      <div>Seconds</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
