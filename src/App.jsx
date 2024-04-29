import Stopwatch from "./Stopwatch";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="z-0 pt-28 px-1 sm:min-w-min text-center text-2xl bg-gradient-to-b from-rose-200 to-slate-500 antialiased">
        <Stopwatch />
        <Footer />
      </div>
    </>
  );
}

export default App;
