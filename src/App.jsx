import Stopwatch from "./stopwatch/Stopwatch";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="z-0 min-h-screen pt-20 px-1 sm:px-10 sm:min-w-min text-center text-2xl bg-gradient-to-b from-[#3d4351] via-[#a36873] to-[#c48858] antialiased shadow-outer">
        <Stopwatch />
        <Footer />
      </div>
    </>
  );
}

export default App;
