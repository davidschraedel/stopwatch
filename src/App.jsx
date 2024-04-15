import { useState } from "react";

import Stopwatch from "./Stopwatch";

function App() {
  return (
    <>
      <div className="z-0 py-5 px-2 text-center text-2xl bg-gradient-to-br from-yellow-600 to-indigo-600 antialiased">
        <div className="flex flex-1 p-5 justify-center items-center"></div>
        <Stopwatch />
      </div>
    </>
  );
}

export default App;
