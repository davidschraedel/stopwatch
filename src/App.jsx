import { useState, useEffect } from "react";
import Stopwatch from "./stopwatch/Stopwatch";
import Footer from "./Footer";
import { THEMES } from "./themes";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("soundwatch-theme") || "dawn";
  });

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("soundwatch-theme", newTheme);
  };

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <>
      <div
        className={`z-0 min-h-screen pt-20 px-1 sm:px-10 sm:min-w-min text-center text-2xl bg-gradient-to-b ${activeTheme.className} antialiased shadow-outer`}
      >
        <Stopwatch theme={theme} setTheme={handleSetTheme} />
        <Footer />
      </div>
    </>
  );
}

export default App;
