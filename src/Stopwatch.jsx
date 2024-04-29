import { useEffect, useRef, useState } from "react";
import { soundList } from "./assets";

function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [minuteInterval, setMinuteInterval] = useState(0);
  const [sound, setSound] = useState(null);

  const [volume, setVolume] = useState(0.24);
  const [muted, setMuted] = useState(false);

  const [wakeLock, setWakeLock] = useState(null);

  const intervalRef = useRef(0);

  const acquireLock = async () => {
    try {
      setWakeLock(await navigator.wakeLock.request("screen"));
    } catch (err) {
      console.log(`${err.name}, ${err.message}`);
    }
  };
  const releaseLock = () => {
    if (wakeLock) {
      wakeLock.release().then(() => {
        setWakeLock(null);
      });
    }
  };

  function handleVisibility() {
    if (document.hidden) {
      if (wakeLock !== null) {
        releaseLock();
        setIsRunning(false);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
    }
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    // else {
    //   clearInterval(timer);
    // }

    if (
      Math.floor((elapsedTime / (1000 * 60)) % 60) > 0 &&
      (((Math.round((elapsedTime / (1000 * 60)) * 10000) / 10000).toFixed(4) % minuteInterval >
        0.0 &&
        (Math.round((elapsedTime / (1000 * 60)) * 10000) / 10000).toFixed(4) % minuteInterval <
          0.0004) ||
        (Math.round((elapsedTime / (1000 * 60)) * 10000) / 10000).toFixed(4) % minuteInterval ===
          0.0)
    ) {
      playSound();
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, elapsedTime]);

  document.addEventListener("visibilitychange", handleVisibility);

  const formatTime = () => {
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor(elapsedTime / 60000);
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  };

  const formattedTime = formatTime();

  const startStopTime = (e) => {
    setIsRunning(!isRunning);
    if (e) {
      let textBeforeChange = e.target.innerText;
      if (textBeforeChange === "Start") {
        acquireLock();
        setStartTime(Date.now() - elapsedTime);
      } else {
        releaseLock();
      }
    }
  };

  const resetWatch = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    releaseLock();
  };

  let handleVolume = (e) => {
    setVolume(e.target.valueAsNumber);
    let vol = e.target.valueAsNumber;
    return playSound(vol);
  };

  function playSound(vol) {
    if (sound != null) {
      if (muted) return;

      const audio = new Audio(sound);
      typeof vol !== "undefined" ? (audio.volume = vol) : (audio.volume = volume);
      audio.play();
    }
  }

  const handleSoundInterval = (event) => {
    setMinuteInterval(event.target.value);
  };

  const handleSoundSelection = (e) => {
    setSound(e.target.value);
  };

  return (
    <>
      <div className="flex gap-1 sm:gap-0 justify-center items-end sm:text-3xl text-stone-50 bg-stone-950 md:text-4xl lg:text-5xl pt-14 pb-16 sm:pt-10 sm:pb-12 px-2 sm:mx-10 md:mx-24 lg:mx-40 xl:mx-52 rounded-[2rem] selection:bg-stone-700 selection:text-green-500 shadow-md">
        <div
          className={`flex-1 ${
            formattedTime.hours === "00" ? "text-stone-700" : "text-stone-300"
          }`}>
          {formattedTime.hours}
        </div>
        <div className="hidden sm:block w-5 text-4xl md:text-5xl lg:text-6xl text-stone-600 select-none">
          {" "}
        </div>
        <div
          className={`flex-1 ${
            formattedTime.minutes === "00" ? "text-stone-700" : ""
          } text-6xl sm:text-8xl md:text-[7rem] lg:text-[10rem]`}>
          {formattedTime.minutes}
        </div>
        <div className="hidden sm:block w-5 text-8xl md:text-9xl lg:text-7xl text-stone-600 select-none">
          {" "}
        </div>
        <div
          className={`flex-1 ${
            formattedTime.seconds === "00" ? "text-stone-700" : ""
          } text-6xl sm:text-8xl md:text-[7rem] lg:text-[10rem] `}>
          {formattedTime.seconds}
        </div>
        <div className="hidden sm:block w-5 text-4xl md:text-5xl lg:text-6xl text-stone-600 select-none">
          {" "}
        </div>
        <div
          className={`flex-1  ${
            formattedTime.milliseconds === "00" ? "text-stone-700" : "text-stone-300"
          } `}>
          {formattedTime.milliseconds}
        </div>
      </div>

      <div className="flex flex-col pt-12 sm:pt-16 pb-20 sm:px-20 md:px-40">
        <div className="basis-1/2 pb-2">
          <button
            className={`text-5xl hover:scale-110 ease-out duration-75 px-8 py-3 border-4  ${
              isRunning
                ? "border-amber-600 bg-amber-100 text-amber-600 hover:border-amber-200  hover:bg-amber-100 hover:text-amber-500 animate-pulse"
                : "border-green-600 bg-green-50 text-green-600 hover:border-green-200  hover:bg-green-100 hover:text-green-600"
            } rounded-md font-semibold pb-3.5 shadow-lg select-none`}
            onClick={startStopTime}>
            {isRunning ? "Stop" : "Start"}
          </button>
        </div>
        <div className="basis-1/2 pt-10">
          <button
            className="ease-out duration-75 hover:origin-center hover:rotate-6 px-6 py-2  border-4 border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-800 hover:text-stone-50 hover:border-stone-300 text-4xl rounded-md font-semibold shadow-lg select-none hover:opacity-90"
            onClick={resetWatch}>
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col pt-2 mb-20 sm:px-10 md:px-30 mx-5 sm:mx-20 md:mx-40 lg:mx-80 xl:mx-[28rem]">
        <div className="flex flex-col justify-center">
          <div className=" py-3 bg-stone-700 bg-opacity-40 text-stone-100 text-2xl rounded-md shadow-lg select-none">
            <h2 className="text-4xl px-5 py-3 mt-5 opacity-50 font-bold text-stone-300 select-none">
              Settings
            </h2>
            <h3 className="mt-5 select-none text-stone-300 font-semibold opacity-90">
              Interval in Minutes
            </h3>
            <input
              type="number"
              min={0}
              placeholder="None"
              step={1}
              onWheel={(e) => e.target.blur()}
              onChange={handleSoundInterval}
              id="minutes"
              className="text-2xl w-32 focus:scale-105 ease-out duration-300 px-2 py-2 my-5 border-4 focus-within:ring-4 focus:ring-offset-2 outline-none focus:ring-yellow-800 border-stone-200 bg-stone-50 text-stone-700 rounded-2xl font-semibold shadow-lg text-center"
            />
            <h3 className="mt-6 select-none text-stone-300 font-semibold opacity-90">Sound</h3>
            <div className="flex items-center justify-center my-4 pb-6 ">
              <label htmlFor="soundSelect" className="sr-only">
                Sound
              </label>
              <select
                onChange={handleSoundSelection}
                id="soundSelect"
                name="soundSelect"
                className="appearance-none  ease-in-out duration-300 rounded-2xl py-2 px-7 text-center select-none text-stone-600 focus:ring-4 focus:ring-inset focus:ring-indigo-300 outline-none focus:scale-105 ">
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

            <div className="mt-6 py-2 flex justify-center space-x-2 mx-auto">
              <h3 className=" select-none text-stone-300 font-semibold opacity-90">Volume</h3>
            </div>
            <div className="py-2">
              <input
                className="w-2/3 my-auto cursor-pointer accent-stone-300 outline-none ring-0 bg-transparent mx-auto ease-out duration-300 "
                type="range"
                min={0}
                max={0.5}
                step={0.02}
                value={muted ? 0 : volume}
                onInput={handleVolume}
                id="volume"
              />
            </div>
            <div className="py-2 flex mx-2">
              <div className="w-full pb-5">
                <button
                  className={`py-1.5 border-4 mx-auto px-3 ease-out duration-300 outline-none  border-stone-200 hover:border-stone-400 bg-stone-50 rounded-full shadow-lg text-xl text-center
                ${muted ? "line-through text-stone-400" : "text-stone-600"}`}
                  onClick={() => setMuted((m) => !m)}>
                  Mute
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
