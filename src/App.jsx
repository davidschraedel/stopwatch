import { useState } from "react";
import stopwatchsvg from "../public/StopWatch.svg";

import Stopwatch from "./Stopwatch";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="z-0 pt-24 px-2 sm:min-w-min  text-center text-2xl bg-gradient-to-br from-yellow-600 to-indigo-600 antialiased">
        <Stopwatch />
        <Footer />
      </div>
    </>
  );
}

export default App;
