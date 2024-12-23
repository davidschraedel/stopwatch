import React from "react";

const Display = (props) => {
  return (
    <>
      {/* clock face */}
      <div className="flex gap-1 sm:gap-0 outline -outline-offset-1 outline-2 outline-stone-700 shadow-display justify-center items-end sm:text-3xl text-green-500 bg-stone-950 md:text-4xl lg:text-5xl pt-14 pb-16 sm:pt-10 sm:pb-12 px-2 mx-auto w-11/12 sm:w-10/12 md:w-9/12 rounded-md selection:bg-stone-700 selection:text-green-500 ">
        <div className={`flex-1 ${props.hours === "00" && "text-darkGreen"}`}>{props.hours}</div>
        <div className="hidden sm:block w-4 text-4xl md:text-5xl lg:text-6xl text-stone-600 select-none">
          {" "}
        </div>
        <div
          className={`flex-1 ${
            props.minutes === "00" && "text-darkGreen"
          } text-6xl sm:text-8xl md:text-[7rem] lg:text-[10rem]`}>
          {props.minutes}
        </div>
        <div className="hidden sm:block w-4 text-8xl md:text-9xl lg:text-7xl text-stone-600 select-none">
          {" "}
        </div>
        <div
          className={`flex-1 ${
            props.seconds === "00" && "text-darkGreen"
          } text-6xl sm:text-8xl md:text-[7rem] lg:text-[10rem] `}>
          {props.seconds}
        </div>
        <div className="hidden sm:block w-4 text-4xl md:text-5xl lg:text-6xl text-stone-600 select-none">
          {" "}
        </div>
        <div className={`flex-1  ${props.milliseconds === "00" && "text-darkGreen"} `}>
          {props.milliseconds}
        </div>
      </div>
    </>
  );
};

export default Display;
