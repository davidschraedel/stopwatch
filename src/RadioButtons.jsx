// // import sound1 from "./assets/ConvocationCheer_16.wav";
// // import { Background, First, Second, LinkedIn } from "./assets/audio";
// import { cheer, trumpet, bowl } from "./assets";

// function RadioButtons({ setSound }) {
//   const soundList = [
//     {
//       id: 1,
//       name: "Cheer",
//       path: cheer,
//     },
//     {
//       id: 2,
//       name: "Bowl",
//       path: bowl,
//     },
//     {
//       id: 3,
//       name: "Trumpet",
//       path: trumpet,
//     },
//   ];

//   return (
//     <>
//       <div
//         onChange={(e) => setSound(e.target.value)}
//         className={`text-2xl grid grid-rows-[${soundList.length}] sm:grid-flow-col px-2 py-2 my-5 mx-2  border-4 border-stone-200 bg-stone-50 text-stone-700 rounded-2xl font-semibold shadow-lg`}>
//         {soundList.map((sound) => {
//           return (
//             <div key={sound.id} className="py-2">
//               <div className={`row-start-[${sound.id}] pt-2`}>
//                 <input
//                   defaultChecked
//                   className="size-4 w-6 h-6 rounded-full m-auto opacity-70 checked:bg-gradient-to-tr checked:from-indigo-600 checked:to-yellow-300 checked:border-indigo-950 checked:ring-indigo-200 checked:ring-2 border-4 border-stone-400"
//                   type="radio"
//                   name="sound"
//                   value={sound.path}
//                 />
//               </div>
//               <p className={`row-start-[${sound.id}] m-auto`}>{sound.name}</p>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default RadioButtons;
