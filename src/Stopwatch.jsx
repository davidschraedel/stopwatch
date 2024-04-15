import { useEffect, useState } from "react";
import cheer from "./assets/audio/ConvocationCheer_16.wav";
import trumpet from "./assets/audio/Mark'sTrumpet_3.wav";
import bowl from "./assets/audio/MetalBowl_1.wav";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [minuteInterval, setMinuteInterval] = useState(0);
  const [sound, setSound] = useState(null);

  const soundList = [
    {
      id: 1,
      name: "Cheer",
      path: cheer,
    },
    {
      id: 2,
      name: "Bowl",
      path: bowl,
    },
    {
      id: 3,
      name: "Trumpet",
      path: trumpet,
    },
  ];

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    if (Math.floor((time % 360000) / 6000 > 0) && ((time % 360000) / 6000) % minuteInterval === 0) {
      playSound();
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startStopTime = () => {
    setIsRunning(!isRunning);
  };
  const resetTime = () => {
    setIsRunning(false);
    setTime(0);
  };

  function playSound() {
    if (sound != null) {
      const audio = new Audio(sound);
      audio.play();
    }
  }

  const handleSoundInterval = (event) => {
    setMinuteInterval(event.target.value);
  };

  return (
    <>
      <div className="flex gap-1 sm:gap-0 justify-center items-end sm:text-3xl text-stone-50 bg-stone-950 md:text-4xl lg:text-5xl pt-12 pb-14 sm:pt-8 sm:pb-10 px-2 sm:mx-10 md:mx-24 lg:mx-40 xl:mx-52 rounded-md selection:bg-stone-700 selection:text-green-500">
        <div className={`flex-1 ${hours === 0 ? "text-stone-800" : "text-stone-300"}`}>
          {hours.toString().padStart(2, "0")}
        </div>
        <div className="hidden sm:block w-5 text-4xl md:text-5xl lg:text-6xl text-stone-600 select-none">
          :
        </div>
        <div
          className={`flex-1 ${
            minutes === 0 ? "text-stone-800" : ""
          } text-6xl sm:text-8xl md:text-[7rem] lg:text-[10rem]`}>
          {minutes.toString().padStart(2, "0")}
        </div>
        <div className="hidden sm:block w-5 text-5xl md:text-6xl lg:text-7xl text-stone-600 select-none">
          :
        </div>
        <div
          className={`flex-1 ${
            seconds === 0 ? "text-stone-800" : ""
          } text-6xl sm:text-8xl md:text-[7rem] lg:text-[10rem] `}>
          {seconds.toString().padStart(2, "0")}
        </div>
        <div className="hidden sm:block w-5 text-4xl md:text-5xl lg:text-6xl text-stone-600 select-none">
          :
        </div>
        <div className={`flex-1  ${milliseconds === 0 ? "text-stone-800" : "text-stone-300"} `}>
          {milliseconds.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col pt-16 pb-20 sm:px-20 md:px-40">
        <div className="basis-1/2 pb-2">
          <button
            className={`text-5xl hover:scale-110 ease-out duration-75 px-8 py-3 border-4  ${
              isRunning
                ? "border-amber-800 bg-amber-100 text-amber-700 hover:border-amber-200  hover:bg-amber-100 hover:text-amber-500 animate-pulse"
                : "border-green-600 bg-green-50 text-green-700 hover:border-green-200  hover:bg-green-100 hover:text-green-600"
            } rounded-md font-semibold pb-3.5 shadow-lg select-none`}
            onClick={startStopTime}>
            {isRunning ? "Stop" : "Start"}
          </button>
        </div>
        <div className="basis-1/2 pt-10">
          <button
            className="ease-out duration-75 hover:origin-center hover:rotate-6 px-6 py-2  border-4 border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-800 hover:text-stone-50 hover:border-stone-300 text-4xl rounded-md font-semibold shadow-lg select-none"
            onClick={resetTime}>
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col pt-2 pb-24 mb-40 sm:px-10 md:px-30 mx-5 sm:mx-20 md:mx-40 lg:mx-80 xl:mx-[28rem]">
        <h2 className="text-4xl p-5 pb-6 font-bold text-stone-300 select-none">Settings</h2>
        <div className="flex flex-col justify-center">
          <div className=" py-3 bg-stone-700 bg-opacity-40 text-stone-100 text-2xl rounded-md shadow-lg select-none">
            <h3 className="mt-6 select-none">Interval in Minutes</h3>
            <input
              type="number"
              min={0}
              placeholder="None"
              step={1}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => handleSoundInterval(e)}
              className="text-2xl w-32 focus:scale-105 ease-out duration-300 px-2 py-2 my-5 border-4 focus-within:ring-4 focus:ring-offset-2 outline-none focus:ring-yellow-800 border-stone-200 bg-stone-50 text-stone-700 rounded-2xl font-semibold shadow-lg text-center"
            />
            <h3 className="mt-6 select-none">Sound</h3>
            <div className="flex items-center justify-center my-4 ">
              <label htmlFor="soundSelect" className="sr-only">
                Currency
              </label>
              <select
                onChange={(e) => setSound(e.target.value)}
                id="soundSelect"
                name="soundSelect"
                className="appearance-none ease-in-out duration-300 rounded-2xl py-2 px-7 text-center select-none text-stone-600 focus:ring-4 focus:ring-inset focus:ring-indigo-300 outline-none focus:scale-105 ">
                <option value={null}>None</option>
                {soundList.map((sound) => {
                  return (
                    <option key={sound.id} value={sound.path}>
                      {sound.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
