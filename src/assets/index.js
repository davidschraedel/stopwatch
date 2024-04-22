import Activity from "./audio/Activity.wav";
import Appearance from "./audio/Appearance.wav";
import Bitrate from "./audio/Bitrate.wav";
import Calm from "./audio/Calm.wav";
import Cutout from "./audio/Cutout.wav";
import Depth from "./audio/Depth.wav";
import Forest from "./audio/Forest.wav";
import Gamelan from "./audio/Gamelan.wav";
import Gong from "./audio/Gong.wav";
import Hello from "./audio/Hello.wav";
import Kalimba from "./audio/Kalimba.wav";
import Marimba from "./audio/Marimba.wav";
import Piano from "./audio/Piano.wav";
import Pulses from "./audio/Pulses.wav";
import Room from "./audio/Room.wav";
import SingingBowl from "./audio/Singing Bowl.wav";
import Space from "./audio/Space.wav";
import Up from "./audio/Up.wav";
import WoodFrog from "./audio/Wood Frog.wav";
import Zither from "./audio/Zither.wav";

const importList = [
  Activity,
  Appearance,
  Bitrate,
  Calm,
  Cutout,
  Depth,
  Forest,
  Gamelan,
  Gong,
  Hello,
  Kalimba,
  Marimba,
  Piano,
  Pulses,
  Room,
  SingingBowl,
  Space,
  Up,
  WoodFrog,
  Zither,
];

const soundList = [];

for (let i = 0; i < importList.length; i++) {
  soundList.push({
    id: i + 1,
    name: importList[i]
      .split("/")
      .slice(-1)
      .toString()
      .split(".")[0]
      .replace("%20", " ")
      .split("-")[0],
    path: importList[i],
  });
}

export { soundList };
