import Stopwatch from "./Stopwatch";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="z-0 pt-28 px-1 sm:min-w-min text-center text-2xl bg-gradient-to-br from-indigo-500 to-90% to-orange-400 antialiased">
        <Stopwatch />
        <Footer />
      </div>
    </>
  );
}

export default App;
