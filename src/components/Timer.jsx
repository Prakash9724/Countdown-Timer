import React, { forwardRef, useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "./ui/BackgroundBeamsWithCollision";
import gsap from "gsap";
import { a } from "framer-motion/client";


const Timer = () => {
  const [countdowns , setCountdowns] = useState([]);
  const [targetTime, setTargetTime] = useState(""); //target time ke liye 
  const [targetDate, setTargetDate] = useState(""); //target date ke liye
  const [timeleft, setTimeLeft] = useState({ 
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }); //time left ke liye 
  const [isRunning, setisRunning] = useState(false); //timer chal raha hai ya nahi
  const [message, setMessage] = useState(""); //message ke liye
  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState('')



  // useEffect(() => {
  //   let timer;

  //   if (isRunning) {
  //     timer = window.setInterval(() => {
  //       const now = new Date().getTime();
       
  //       //current time
  //       const target = new Date(`${targetDate} ${targetTime}`).getTime(); //target time

  //       const timeleft = target - now; //time left in milliseconds

  //       if (timeleft > 0) {
  //         setTimeLeft({
  //           days: Math.floor(timeleft / (1000 * 60 * 60 * 24)),
  //           hours: Math.floor(
  //             (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //           ),
  //           minutes: Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)),
  //           seconds: Math.floor((timeleft % (1000 * 60)) / 1000),
  //         });
  //       } else {
  //         clearInterval(timer);
  //         setisRunning(false);
  //         setMessage("Countdown Finished");
  //       }
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [isRunning, targetDate, targetTime]);


  useEffect(() => {
    
    const interval = setInterval(() => {
      setCountdowns.map((cd)=>{
        const now = new Date().getTime();
        const target = new Date()
        const timeleft = target - now;

        if(timeleft > 0){
          return{
            ...cd,timeleft:{
              days:Math.floor(timeleft/(1000 * 60 * 60 * 24)),
              hours:Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes:Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)),
              seconds:Math.floor((timeleft % (1000 * 60)) / 1000)
            },
          };
        }else{
          if(!cd.finished){
            playSound();
          }
          return {...cd ,finished:true}
        }
      })
    }, 1000);
  
    return () => clearInterval(interval);
  }, [])
  

  const handleStart = () => {
    
    if(inputValue.trim() !== "" || targetDate || targetTime){
      setTitle(inputValue);
      setInputValue('')
      setMessage("Please select a date and time")
    }

    setCountdowns((prev)=>[
      ...prev,{
        id:Date.now(),
        title:inputValue,
        targetDate,
        targetTime,
        timeleft:{
          days:0,
          hours:0,
          minutes:0,
          seconds:0
        },
        finished:false

      },
    ])

    setInputValue("");
    setTargetDate("");
    setTargetTime("");
    setMessage("");

  };

  const playSound = () => {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
    audio.loop = true;
  }

  const timeranimation = () =>{
    gsap.to("#timer",{
      duration: 1,
      scale: 1.10,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.2
    })
  }

  const timeranimationout = () =>{
    gsap.to("#timer",{
      scale: 1,
      duration:1,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.2
    })
  }


  return (
<>
    
   <BackgroundBeamsWithCollision/>
   
    <div  id="timer" onMouseLeave={timeranimationout} onMouseEnter={timeranimation} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" >
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-lg ">
        <h1 className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to bg-pink-600 transition-all duration-300 ">
          {title || "Countdown Timer"}
        </h1>
        <input type="text" placeholder="Enter your Title" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  className="text-xl/2 w-full p-2 border rounded-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to bg-pink-600 transition-all duration-300 " />
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-xl/2 font-medium text-gray-700 mb-1"
          >
            Countdown Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-3 border rounded-md"
            id="date"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-xl/2 font-medium text-gray-700 mb-1  "
          >
            Target Time:
          </label>
          <input
            type="time"
            value={targetTime}
            onChange={(e) => setTargetTime(e.target.value)}
            className="w-full border rounded-md p-3"
          />
        </div>

        <button
          onClick={()=>{
            handleStart();
            
          }}
         
          className="w-full text-white p-3 rounded-md bg-gradient-to-r from-purple-500 transition-colors to-pink-500"
        >
          Start Countdown
        </button>

        {isRunning && (
          <div className="mt-6 text-center">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500  p-3 rounded-md">
                <div className="text-2xl font-bold">{timeleft.days}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 p-3 rounded-md">
                <div className="text-2xl font-bold">{timeleft.hours}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 p-3 rounded-md">
                <div className="text-2xl font-bold">{timeleft.minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 p-3 rounded-md">
                <div className="text-2xl font-bold">{timeleft.seconds}</div>
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



    
    </>   
  );
};

export default Timer;
