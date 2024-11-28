import Stopwatch from "./stopwatch/Stopwatch";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="z-0 pt-20 px-1 sm:px-10 sm:min-w-min text-center text-2xl bg-gradient-to-b from-[#8b657d] to-[#a7a490] antialiased">
        <Stopwatch />
        <Footer />
      </div>
    </>
  );
}

export default App;
