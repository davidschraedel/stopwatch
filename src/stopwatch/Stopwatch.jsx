import { useEffect, useRef, useState } from "react";
import { soundList } from "../assets";
import Display from "./Display";

const CONSTANTS = {
  START: "START",
  STOP: "STOP",
};

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
      if (textBeforeChange === CONSTANTS.START) {
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
    <div className=" pt-10 pb-10 rounded-t-md rounded-b-md outline-2 -outline-offset-1 outline-[#ded7d5] mx-2 overflow-clip ">
      <Display
        hours={formattedTime.hours}
        minutes={formattedTime.minutes}
        seconds={formattedTime.seconds}
        milliseconds={formattedTime.milliseconds}
      />

      <div className="bg-gradient-to-tl from-stone-800 to-neutral-950 pb-1 w-11/12 sm:w-2/3 lg:w-1/2 mx-auto mt-14 rounded-md shadow-display outline -outline-offset-1 outline-2 outline-stone-700 font-calc">
        {/* clock buttons */}
        <div className="flex flex-col pt-12 sm:pt-16 pb-20 ">
          <div className="basis-1/2 pb-2">
            <button
              className={`text-4xl ease-out w-48 duration-75 px-8 pt-2 pb-1.5 rounded-md font-semibold select-none ${
                isRunning
                  ? "text-stone-700 bg-stone-300 hover:text-stone-200 hover:bg-stone-700"
                  : "text-stone-100 bg-stone-800 hover:text-stone-800 hover:bg-stone-200"
              }`}
              onClick={startStopTime}>
              {isRunning ? CONSTANTS.STOP : CONSTANTS.START}
            </button>
          </div>
          <div className="basis-1/2 pt-10">
            <button
              className="text-4xl ease-out w-48 duration-75 px-8 pt-2 pb-1.5 text-stone-100 bg-stone-800 hover:text-stone-800 hover:bg-stone-200 rounded-md font-semibold select-none"
              onClick={resetWatch}>
              RESET
            </button>
          </div>
        </div>

        {/* settings */}
        <div className="flex flex-col pt-2 mb-20 mx-auto w-10/12 sm:w-9/12 xl:mx-[28rem] overflow-clip">
          <div className="flex flex-col justify-center">
            <div className=" py-3 bg-stone-800 bg-opacity-100 shadow-plasticBacking text-stone-100 rounded-md select-none">
              <h3 className="mt-5 select-none text-stone-300 font-semibold">INTERVAL IN MINUTES</h3>
              <input
                type="number"
                min={0}
                placeholder="NONE"
                step={1}
                onWheel={(e) => e.target.blur()}
                onChange={handleSoundInterval}
                id="minutes"
                className=" w-32 ease-out duration-300 px-2 py-1.5 my-2 border-4 focus-within:ring-4 outline-none placeholder:text-stone-500 focus:ring-green-500 border-stone-200 bg-stone-50 text-stone-700 rounded-2xl font-semibold shadow-lg text-center"
              />
              <h3 className="mt-6 select-none text-stone-300 font-semibold">SOUND</h3>
              <div className="flex items-center justify-center my-2 pb-6 ">
                <label htmlFor="soundSelect" className="sr-only">
                  SOUND
                </label>
                <select
                  onChange={handleSoundSelection}
                  id="soundSelect"
                  name="soundSelect"
                  className="appearance-none ease-in-out font-semibold duration-300 rounded-2xl py-2 px-0 sm:px-7 text-center select-none text-stone-500 focus:ring-4 focus:ring-inset focus:ring-green-500 outline-none ">
                  <option value={null}>NONE</option>
                  {soundList.map((sound) => {
                    return (
                      <option key={sound.id} value={sound.path}>
                        {sound.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mt-4 py-1.5 flex justify-center space-x-2 mx-auto">
                <h3 className=" select-none text-stone-300 font-semibold">VOLUME</h3>
              </div>
              <div className="">
                <input
                  className="w-5/6 sm:w-2/3 py-1 my-auto cursor-pointer accent-stone-300 outline-none ring-0 focus:ring-4 focus:ring-green-500 rounded-md bg-transparent mx-auto ease-out duration-300 "
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.02}
                  value={muted ? 0 : volume}
                  onInput={handleVolume}
                  id="volume"
                />
              </div>
              <div className="py-2 flex mx-2 ">
                <div className="w-full pb-5">
                  <button
                    className={`py-1.5 border-4 mx-auto font-semibold px-3 ease-out duration-300 outline-none  border-stone-200 bg-stone-50 rounded-full shadow-lg text-xl text-center focus:ring-4 focus:ring-green-500
                ${
                  muted
                    ? "line-through text-stone-400 hover:border-stone-300"
                    : "text-stone-500 hover:border-stone-400"
                }`}
                    onClick={() => setMuted((m) => !m)}>
                    MUTE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
